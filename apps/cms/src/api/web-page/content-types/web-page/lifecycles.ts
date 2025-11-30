import { translateText } from "../../../../utils/translator";
import { SOURCE_LOCALE, TARGET_LOCALES } from "../../../../utils/autoTranslate";
import { translateSectionsArray } from "../../../../utils/autoTranslate/index";

/**
 * Helper: build the translated payload for a WebPage entry.
 * - Translates the top-level title.
 * - Keeps the same identifier for all locales.
 * - Translates the dynamic zone sections using our per-component translators.
 * - Adds "triggeredByTranslation" as an internal flag (not a real field).
 */
async function buildWebPageTranslatedData(
  source: any,
  targetLocale: string
): Promise<Record<string, any>> {
  return {
    //Internal flag to avoid infinite lifecycle loops
    triggeredByTranslation: true,

    //Top-level fields
    title:
      typeof source.title === "string"
        ? await translateText(source.title, SOURCE_LOCALE, targetLocale)
        : source.title,

    //Identifier should be the same across locales for this document
    identifier: source.identifier,

    //Dynamic zone: translate each section with our helpers
    sections: await translateSectionsArray(source.sections, targetLocale),
  };
}

export default {
  /**
   * afterCreate:
   * - When a WebPage is created in SOURCE_LOCALE and published,
   *   create/update the corresponding entries in all TARGET_LOCALES.
   */
  async afterCreate(event: any) {
    const { model, result } = event;
    const entry = result;

    // Skip if this entry was created by our own translation logic
    if (entry?.triggeredByTranslation) return;

    // Only process published entries
    if (!entry?.publishedAt) return;

    // Only auto-translate from the source locale
    if (entry.locale !== SOURCE_LOCALE) return;

    const documentId = entry.documentId;
    if (!documentId) return;

    // Load full entry with localizations and sections populated
    const existing = await strapi.entityService.findOne(model.uid, entry.id, {
      populate: {
        localizations: true,
        sections: { populate: "*" },
      },
    });

    if (!existing) return;

    for (const targetLocale of TARGET_LOCALES) {
      const data = await buildWebPageTranslatedData(existing, targetLocale);

      await strapi.documents(model.uid).update({
        documentId,
        locale: targetLocale,
        status: "published",
        // Cast to any so TS does not complain about "triggeredByTranslation"
        data: data as any,
      });

      strapi.log.info(
        `[autoTranslate:web-page] afterCreate ${SOURCE_LOCALE} -> ${targetLocale}`
      );
    }
  },

  /**
   * afterUpdate:
   * - Whenever the WebPage in SOURCE_LOCALE is updated,
   *   regenerate the translated versions for all TARGET_LOCALES.
   * - Here we use entityService.update on each localized entry (by ID)
   *   instead of the Document Service, to avoid dynamic zone validation issues.
   */
  async afterUpdate(event: any) {
    const { model, params, result } = event;
    const { data } = params;
    const entry = result;

    // Ignore updates coming from our own translation logic
    if (data?.triggeredByTranslation || entry?.triggeredByTranslation) {
      return;
    }

    if (!entry?.id) return;

    // Load current SOURCE_LOCALE entry with localizations and sections populated
    const existing = await strapi.entityService.findOne(model.uid, entry.id, {
      populate: {
        localizations: true,
        sections: { populate: "*" },
      },
    });

    if (!existing) return;
    if (existing.locale !== SOURCE_LOCALE) return;

    const documentId = existing.documentId;
    if (!documentId) return;

    // Only translate if the page is published
    if (!existing.publishedAt) return;

    const localizations = Array.isArray(existing.localizations)
      ? existing.localizations
      : [];

    for (const targetLocale of TARGET_LOCALES) {
      const translatedData = await buildWebPageTranslatedData(
        existing,
        targetLocale
      );

      // Find the existing localized entry for this locale
      const localizedEntry = localizations.find(
        (loc: any) => loc.locale === targetLocale
      );

      if (!localizedEntry) {
        // Create missing translation using the Document Service.
        // This ensures the new entry is correctly tied to the same documentId.
        await strapi.documents(model.uid).create({
          documentId,
          locale: targetLocale,
          status: "published",
          data: {
            ...translatedData,
            triggeredByTranslation: true, // prevent lifecycle loops
          },
        });

        strapi.log.info(
          `[autoTranslate:web-page] afterUpdate → created missing locale ${targetLocale} (documentId=${documentId})`
        );

        continue;
      }

      // Update the localized entry by ID using entityService
      await strapi.entityService.update(model.uid, localizedEntry.id, {
        data: translatedData as any,
      });

      strapi.log.info(
        `[autoTranslate:web-page] afterUpdate updated locale ${targetLocale} (id=${localizedEntry.id})`
      );
    }
  },

  /**
   * afterDelete:
   * - When the SOURCE_LOCALE entry is fully deleted (no other "en" version left),
   *   delete all locales for that documentId using the Document Service.
   */
  async afterDelete(event: any) {
    const { model, result } = event;
    const entry = Array.isArray(result) ? result[0] : result;

    const locale = entry?.locale;
    const documentId = entry?.documentId;

    if (!documentId) return;

    // Only cascade when deleting the source locale
    if (locale !== SOURCE_LOCALE) return;

    const stillExists = await strapi.entityService.findMany(model.uid, {
      filters: {
        documentId,
        locale: SOURCE_LOCALE,
      },
    });

    // If another SOURCE_LOCALE entry still exists, this is likely
    // part of an internal publish/unpublish flow → do nothing.
    if (stillExists && stillExists.length > 0) {
      return;
    }

    // Now we know the document is really gone in SOURCE_LOCALE:
    // delete all locales for this document.
    await strapi.documents(model.uid).delete({
      documentId,
      locale: "*",
    });

    strapi.log.info(
      `[autoTranslate:web-page] afterDelete cascade documentId=${documentId}`
    );
  },
};
