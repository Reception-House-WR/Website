import { translateText } from "./translator";

//SOURCE_LOCALE: Base language from which we translate.
export const SOURCE_LOCALE = "en";

//TARGET_LOCALES: All locales that should receive auto-translated content.
export const TARGET_LOCALES = ["es", "fr", "ar", "fa", "so", "pt", "ti", "sw", "zh-Hans", "am", "bn", "ur", "ps", "pa", "ne"] as const;

export type AutoTranslateConfig = {
  //Fields that will be translated with translateText()
  translatableFields: readonly string[];

  //Fields that are not translated but must stay in sync across all locales
  syncFields: readonly string[];

  //Base builder for each content type
  buildBaseData: (
    source: any,
    targetLocale: string
  ) => Promise<Record<string, any>> | Record<string, any>;

  //For custom translations (Tags)
  fieldTranslators?: {
    [fieldName: string]: (
      value: any,
      targetLocale: string
    ) => Promise<any> | any;
  };

  modelName?: string;
};

type TranslatableField = string;

/**
 * Helper: build the translated payload for "create" / "first time".
 * - Copies base fields from buildBaseData()
 * - Sets locale + triggeredByTranslation
 * - Translates all translatableFields
 */
async function buildTranslatedData(
  source: any,
  targetLocale: string,
  config: AutoTranslateConfig
): Promise<Record<string, any>> {
  const base = await config.buildBaseData(source, targetLocale);

  const data: Record<string, any> = {
    ...base,
    locale: targetLocale,
    //Internal flag, (not a real field of the model)
    //used only to detect that this entry was created/updated
    //by our translation code and avoid infinite loops.
    triggeredByTranslation: true,
  };

  for (const field of config.translatableFields) {
    const value = source[field];
    const customTranslator = config.fieldTranslators?.[field];

    if(customTranslator){
      data[field] = await customTranslator(value, targetLocale);
      continue;
    }

    if (typeof value === "string" && value.trim().length > 0) {
      data[field] = await translateText(value, SOURCE_LOCALE, targetLocale);
    } else {
      data[field] = value ?? "";
    }
  }

  return data;
}

/**
 * LIFECYCLE 1: afterCreate 
 *
 * When a new entry is created:
 *  - If it's created in SOURCE_LOCALE (en) and published:
 *      → automatically create / update documents in each TARGET_LOCALE
 *  - If it's created in a different locale:
 *      → do nothing (we only auto-translate from en → others).
 *  - If it was created by our own translation logic:
 *      → do nothing to avoid infinite loops.
 */
async function handleAfterCreate(
  event: any,
  config: AutoTranslateConfig
): Promise<void> {
  const { model, result } = event;
  const entry = result;

  //Skip if created by our own translation logic
  if (entry?.data?.triggeredByTranslation || entry?.triggeredByTranslation) {
    return;
  }

  //Only execute when the entry is published
  if (!entry?.publishedAt) {
    return;
  }

  //Only auto-create translations from the source locale
  if (entry.locale !== SOURCE_LOCALE) {
    return;
  }

  strapi.log.info(
    `[autoTranslate] afterCreate => ${config.modelName ?? model.uid}`
  );

  for (const targetLocale of TARGET_LOCALES) {
    const data = await buildTranslatedData(entry, targetLocale, config);

    await strapi.documents(model.uid).update({
      documentId: entry.documentId,
      locale: targetLocale,
      status: "published",
      data: data as any,
    });

    strapi.log.info(
      `[autoTranslate] afterCreate → ${SOURCE_LOCALE} -> ${targetLocale}`
    );
  }
}

/**
 * LIFECYCLE 2: afterUpdate (generic handler)
 *
 * This will:
 *  - Run whenever an entry is updated.
 *  - If the entry is in SOURCE_LOCALE (en):
 *      - detect which translatable fields changed
 *      - for each TARGET_LOCALE:
 *          - if a localized document exists => update only changed fields
 *          - if it does not exist → create a translated version
 *      - always sync non-translatable fields (SYNC_FIELDS) from en
 *  - If the update comes from our own translation logic:
 *      - do nothing to avoid infinite loops.
 */
async function handleAfterUpdate(
  event: any,
  config: AutoTranslateConfig
): Promise<void> {
  const { model, params, result } = event;
  const { data } = params;
  const entry = result;

  //Skip if this update was triggered by our own translation logic
  if (data?.triggeredByTranslation || entry?.triggeredByTranslation) {
    return;
  }

  if (!entry?.id) {
    return;
  }

  //Load current entry with its localizations
  const existing = await strapi.entityService.findOne(model.uid, entry.id, {
    populate: ["localizations"],
  });

  if (!existing) {
    return;
  }

  const currentLocale = existing.locale;

  //Only propagate changes when editing the source locale (en)
  if (!currentLocale || currentLocale !== SOURCE_LOCALE) {
    return;
  }

  //Detect which translatable fields actually changed
  const changedFields: Partial<Record<TranslatableField, string>> = {};

  for (const field of config.translatableFields) {
    const newValue = data[field];
    const oldValue = existing[field];

    //If field was not present in the payload, then it was not touched
    if (newValue === undefined) continue;

    if (
      typeof newValue === "string" &&
      newValue.trim() !== (oldValue ?? "").trim()
    ) {
      changedFields[field] = newValue;
    }
  }

  //If nothing changed in the fields we care about, stop
  if (Object.keys(changedFields).length === 0) {
    return;
  }

  const localizations = existing.localizations || [];

  for (const targetLocale of TARGET_LOCALES) {
    //Try to find an existing localized entry
    let targetEntry = localizations.find(
      (loc: any) => loc.locale === targetLocale
    );

    // 1) If it does NOT exist yet => create it with all base and translated fields
    if (!targetEntry) {
      const newData = await buildTranslatedData(existing, targetLocale, config);

      const created = await strapi.documents(model.uid).update({
        documentId: existing.documentId,
        locale: targetLocale,
        data: newData as any,
      });

      targetEntry = created;
    }

    // 2) Build update payload:
    //    - translated changed fields
    //    - synced non-translatable fields (like images)
    const updateData: Record<string, any> = {
      triggeredByTranslation: true, // avoid infinite loop
    };

    //Translate only changed translatable fields
    for (const [field, newValue] of Object.entries(changedFields)) {

      const customTranslator = config.fieldTranslators?.[field];

      if(customTranslator){
        updateData[field] = await customTranslator(newValue, targetLocale);
      }
      updateData[field] = await translateText(
        newValue!,
        SOURCE_LOCALE,
        targetLocale
      );
    }

    //Sync no translatable fields from the source entry
    for (const field of config.syncFields) {
      updateData[field] = (existing as any)[field];
    }

    // 3) Update the localized document using the Document Service
    await strapi.documents(model.uid).update({
      documentId: targetEntry.documentId,
      locale: targetLocale,
      data: updateData as any,
    });

    strapi.log.info(
      `[autoTranslate] afterUpdate → synced ${targetLocale} for ${config.modelName ?? model.uid}`
    );
  }
}

/**
 * LIFECYCLE 3: afterDelete (generic handler)
 *
 * This will:
 *  - Run whenever an entry is deleted.
 *  - If the deleted entry belongs to SOURCE_LOCALE (e.g. "en"):
 *        - Check if there is any other entry in SOURCE_LOCALE for
 *          the same documentId.
 *        - If there is none, it means the document is truly deleted:
 *              → delete ALL localized versions (en, es, fr, etc.)
 *          using locale: '*'.
 *  - If the deleted entry is NOT in SOURCE_LOCALE:
 *        - Do nothing (prevents loops).
 */
async function handleAfterDelete(event: any): Promise<void> {
  const { model, result } = event;

  const entry = Array.isArray(result) ? result[0] : result;

  const locale = entry?.locale;
  const documentId = entry?.documentId;

  if (!documentId) return;

  //Only cascade delete if the deleted version is the SOURCE_LOCALE
  if (locale !== SOURCE_LOCALE) {
    return;
  }

  //Check if there is still any entry in SOURCE_LOCALE for this documentId.
  //If there is, this delete is part of an internal publish/unpublish flow,
  //not a "final" deletion from the CMS.
  const stillExists = await strapi.entityService.findMany(model.uid, {
    filters: {
      documentId,
      locale: SOURCE_LOCALE,
    },
  });

  if (stillExists && stillExists.length > 0) {
    //Skip cascade delete in this case
    return;
  }

  //Now we know the document is really gone in SOURCE_LOCALE:
  //delete all locales for this document (en, es, fr, ...)
  await strapi.documents(model.uid).delete({
    documentId,
    locale: "*",
  });

  strapi.log.info(
    `[autoTranslate] afterDelete → Cascade delete executed for documentId=${documentId}`
  );
}

/**
 * Factory: returns the lifecycles object for a given content-type.
 *
 * Usage in each content-type lifecycle file:
 *
 *   import { createAutoTranslateLifecycles } from "../../../../utils/autoTranslate";
 *
 *   const storyConfig: AutoTranslateConfig = {
 *     translatableFields: ["author", "quote"],
 *     syncFields: ["country", "image", "videoUrl"],
 *     buildBaseData: (source) => ({
 *       country: source.country,
 *       image: source.image,
 *       videoUrl: source.videoUrl,
 *     }),
 *     modelName: "Story",
 *   };
 *
 *   export default createAutoTranslateLifecycles(storyConfig);
 */
export function createAutoTranslateLifecycles(config: AutoTranslateConfig) {
  return {
    async afterCreate(event: any) {
      await handleAfterCreate(event, config);
    },
    async afterUpdate(event: any) {
      await handleAfterUpdate(event, config);
    },
    async afterDelete(event: any) {
      await handleAfterDelete(event);
    },
  };
}
