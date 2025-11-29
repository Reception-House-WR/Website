// src/utils/autoTranslate.ts
import { translateText } from "./translator";

export const SOURCE_LOCALE = "en";
export const TARGET_LOCALES = ["es", "fr"] as const;

type AutoTranslateConfig = {
  /**
   * Fields in this content-type that should be translated
   * (text fields only).
   */
  translatableFields: readonly string[];

  /**
   * Function that builds the base data object for a given target locale.
   * - Should copy non-translatable fields as-is from `source`
   * - Should set `locale` and `triggeredByTranslation`
   * - MUST NOT call translateText here for the fields in `translatableFields`
   *   (this is done by the helper).
   */
  buildTranslatedData: (
    source: any,
    targetLocale: string
  ) => Promise<Record<string, any>> | Record<string, any>;
};

/**
 * Factory that returns a full set of lifecycles (afterCreate, beforeUpdate, afterDelete)
 * for a given content-type, reusing the same translation logic.
 */
export function createAutoTranslateLifecycles(config: AutoTranslateConfig) {
  const { translatableFields, buildTranslatedData } = config;

  return {
    /**
     * LIFECYCLE: afterCreate
     *
     * This will:
     *  - Run whenever an entry is created.
     *  - Only act when:
     *      - The entry is created in SOURCE_LOCALE
     *      - The entry is published (publishedAt not null)
     *      - It was NOT created by our own translation logic
     *  - For each TARGET_LOCALE:
     *      → create or update a localized document
     *      → publish it (status: "published")
     */
    async afterCreate(event: any) {
      const { model, result } = event;
      const entry = result;

      // Skip entries created/updated by our own translation logic
      if (entry?.data?.triggeredByTranslation) {
        return;
      }

      // Only act when the source locale entry is published
      if (!entry?.publishedAt) {
        return;
      }

      // Only auto-create translations from the source locale
      if (entry.locale !== SOURCE_LOCALE) {
        return;
      }

      console.log(`[autoTranslate] afterCreate → ${model.uid}`);

      for (const targetLocale of TARGET_LOCALES) {
        const baseData = await buildTranslatedData(entry, targetLocale);

        // Translate only the configured fields
        const translatedData: Record<string, any> = {
          ...baseData,
          triggeredByTranslation: true,
        };

        for (const field of translatableFields) {
          const value = entry[field];
          if (typeof value === "string" && value.trim().length > 0) {
            translatedData[field] = await translateText(
              value,
              SOURCE_LOCALE,
              targetLocale
            );
          }
        }

        await strapi.documents(model.uid).update({
          documentId: entry.documentId,
          locale: targetLocale,
          status: "published",
          data: translatedData,
        });

        console.log(
          `[autoTranslate] Created/updated ${model.uid} for locale ${targetLocale}`
        );
      }
    },

    /**
     * SINGLE LIFECYCLE: beforeUpdate
     *
     * This will:
     *  - Run whenever an entry is updated.
     *  - If the entry is in SOURCE_LOCALE (en):
     *      → detect which translatable fields changed
     *      → for each TARGET_LOCALE:
     *          - if a localized document exists → update it
     *          - if it does not exist → create it (and publish)
     */
    async beforeUpdate(event: any) {
      const { model, params } = event;
      const { data, where } = params;

      console.log(`[autoTranslate] beforeUpdate → ${model.uid}`);

      // 1) Skip if this comes from our own translation updates
      if (data?.triggeredByTranslation) {
        return;
      }

      // 2) We need the ID of the entry being updated
      if (!where?.id) {
        return;
      }

      // 3) Load current entry with its localizations
      const existing = await strapi.entityService.findOne(
        model.uid,
        where.id,
        {
          populate: ["localizations"],
        }
      );

      if (!existing) {
        return;
      }

      const currentLocale = existing.locale;

      // 4) Only propagate changes when editing the source locale
      if (!currentLocale || currentLocale !== SOURCE_LOCALE) {
        return;
      }

      // 5) Detect which translatable fields actually changed
      const changedFields: Record<string, string> = {};

      for (const field of translatableFields) {
        const newValue = data[field];
        const oldValue = existing[field];

        if (
          typeof newValue === "string" &&
          newValue.trim() !== (oldValue ?? "").trim()
        ) {
          changedFields[field] = newValue;
        }
      }

      // If nothing changed in the fields we care about, stop here
      if (Object.keys(changedFields).length === 0) {
        return;
      }

      const localizations = existing.localizations || [];

      // 6) For each target locale (es, fr...)
      for (const targetLocale of TARGET_LOCALES) {
        // Try to find an existing localized entry
        let targetEntry = localizations.find(
          (loc: any) => loc.locale === targetLocale
        );

        // 6.a) If it does NOT exist yet → create it with base data
        if (!targetEntry) {
          const baseData = await buildTranslatedData(existing, targetLocale);

          const created = await strapi.documents(model.uid).update({
            documentId: existing.documentId,
            locale: targetLocale,
            status: "published",
            data: {
              ...baseData
            },
          });

          targetEntry = created;
        }

        // 6.b) Build an update payload ONLY for the changed fields
        const updateData: Record<string, any> = {
          triggeredByTranslation: true, // avoid infinite loop
        };

        for (const [field, newValue] of Object.entries(changedFields)) {
          updateData[field] = await translateText(
            newValue!,
            SOURCE_LOCALE,
            targetLocale
          );
        }

        // 6.c) Update the localized document
        await strapi.documents(model.uid).update({
          documentId: targetEntry.documentId,
          locale: targetLocale,
          status: "published",
          data: updateData,
        });

        console.log(
          `[autoTranslate] Updated ${model.uid} ${targetLocale} for changed fields: ${Object.keys(
            changedFields
          ).join(", ")}`
        );
      }
    },

    /**
     * SINGLE LIFECYCLE: afterDelete
     *
     * This will:
     *  - Run whenever an entry is deleted.
     *  - If the deleted entry belongs to SOURCE_LOCALE (e.g. "en"):
     *        → Automatically delete ALL localized versions
     *          (en, es, fr, etc.) using locale: '*'
     *  - If the deleted entry is NOT in SOURCE_LOCALE:
     *        → Do nothing.
     */
    async afterDelete(event: any) {
      const { model, result } = event;

      // result could be an array or a single object
      const entry = Array.isArray(result) ? result[0] : result;

      const locale = entry?.locale;
      const documentId = entry?.documentId;

      if (!documentId) return;

      // Only cascade delete if the deleted version is the SOURCE_LOCALE
      if (locale !== SOURCE_LOCALE) {
        return;
      }

      console.log(
        `[autoTranslate] Cascade delete starting → ${model.uid}, documentId=${documentId}, locale=${locale}`
      );

      // Delete ALL locales for this document
      await strapi.documents(model.uid).delete({
        documentId,
        locale: "*",
      });

      console.log(
        `[autoTranslate] Cascade delete executed → Deleted all locales for documentId ${documentId}`
      );
    },
  };
}
