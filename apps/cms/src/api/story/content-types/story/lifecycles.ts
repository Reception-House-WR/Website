import { translateText } from "../../../../utils/translator";

const SOURCE_LOCALE = "en"; // source language
const TARGET_LOCALES = ["es", "fr"]; // languages to update

// fields we want to auto-translate
const TRANSLATABLE_FIELDS = ["author", "quote"];
const SYNC_FIELDS = ["country", "image", "videoUrl"];
type TranslatableField = (typeof TRANSLATABLE_FIELDS)[number];

async function buildTranslatedData( source: any, targetLocale: string, ): Promise<Record<string, any>> { 
  const data: Record<string, any> = { 

    // documentId: source.documentId,
    // Non-translatable fields copied as-is 
    country: source.country, 
    image: source.image, // media relation 
    videoUrl: source.videoUrl, 
    // Localization info 
    locale: targetLocale, 
    
    // Internal flag, NOT a real field of the model: 
    // used only to detect that this entry was created/updated by our translation code. 
    triggeredByTranslation: true, 

  }; 

  // Translate text fields 
  for (const field of TRANSLATABLE_FIELDS) { 
    const value = source[field];
    data[field] = await translateText(value, SOURCE_LOCALE, targetLocale); 
  } 
  return data; 

}
export default {

  /** 
   * LIFECYCLE 1: afterCreate  
   * When a new Story is created: 
   * - If it's created in SOURCE_LOCALE (en): 
   * → automatically create Story documents in each TARGET_LOCALE (es, fr). 
   * - If it's created in a different locale (e.g. es directly): 
   * → do nothing (we only auto-translate from en → others). */
  async afterCreate(event) { 
    const { model, result } = event; 
    const story = result; 
  
    //If this Story was created by our own translation logic, 
    //skip it to avoid infinite loop. 
    
    if (story.data?.triggeredByTranslation) { 
      return; 
    } 
    
    //Only execute it when is publish and not save
    if (!story.publishedAt){
      return;
    }

    // Only auto-create translations from the source locale. 
    if (story.locale !== SOURCE_LOCALE) { 
      return; 
    } 
    
    console.log("AFTER CREATE CALLED") 
    
    // For each target locale, create a localized document 
    for (const targetLocale of TARGET_LOCALES) { 

      const data = await buildTranslatedData(story, targetLocale); 
      console.log("AFTER CREATE ", SOURCE_LOCALE, " -> ", targetLocale) 
      await strapi.documents(model.uid).update({ 
        documentId: story.documentId, locale: targetLocale, status: "published", data, 
      }); 
    
    } 
    
  },

   /**
   * SINGLE LIFECYCLE: beforeUpdate
   *
   * This will:
   *  - Run whenever a Story is updated (Strapi may also call it after create).
   *  - If the Story is in SOURCE_LOCALE (en):
   *      → detect which fields changed
   *      → for each TARGET_LOCALE:
   *          - if a localized document exists → update it
   *          - if it does not exist → create it
   */
  async afterUpdate(event) {

    console.log("BEFORE UPDATE CALLED")
    const { model, params, result } = event;
    const { data } = params;
    const entry = result;

    // 1) If this update comes from our own translation logic, skip it
    if (data?.triggeredByTranslation || entry?.triggeredByTranslation) {
    return;
  }

    // 2) We need the ID of the Story being updated
    if (!entry?.id) {
      return;
    }

    // 3) Load current entry with its localizations
    const existing = await strapi.entityService.findOne(model.uid, entry.id, {
      populate: ["localizations"],
    });

    if (!existing) {
      return;
    }

    const currentLocale = existing.locale;

    // 4) Only propagate changes when editing the source locale (en)
    if (!currentLocale || currentLocale !== SOURCE_LOCALE) {
      return;
    }

    // 5) Detect which translatable fields actually changed
    const changedFields: Partial<Record<TranslatableField, string>> = {};

    for (const field of TRANSLATABLE_FIELDS) {
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
      // Try to find an existing localized Story
      let targetEntry = localizations.find(
        (loc) => loc.locale === targetLocale,
      );

      // 6.a) If it does NOT exist yet → create it 
      if (!targetEntry) {
        const newData = await buildTranslatedData(existing, targetLocale);

        const created = await strapi.documents(model.uid).update({
          documentId: existing.documentId,
          locale: targetLocale,
          data: newData,
        });

        targetEntry = created;
      }


      console.log("BEFORE UPDATE")

      // 6.b) Now build an update payload ONLY for the changed fields
      const updateData: Record<string, any> = {
        triggeredByTranslation: true, // avoid infinite loop
      };

      for (const [field, newValue] of Object.entries(changedFields)) {
        updateData[field] = await translateText(
          newValue!,
          SOURCE_LOCALE,
          targetLocale,
        );
      }

      // 6.c) Sincronizar campos NO traducibles (IMAGEN, etc.)
      for (const field of SYNC_FIELDS) {
        // copiamos el valor de la versión en inglés
        updateData[field] = (existing as any)[field];
      }

      // 6.d) Update the localized document using the Document Service
      await strapi.documents(model.uid).update({
        documentId: targetEntry.documentId,
        locale: targetLocale,
        data: updateData,
      });
    }
  },

/**
 * SINGLE LIFECYCLE: afterDelete
 *
 * This will:
 *  - Run whenever a Story entry is deleted.
 *  - If the deleted entry belongs to SOURCE_LOCALE (e.g. "en"):
 *        → Automatically delete ALL localized versions
 *          (en, es, fr, etc.) using locale: '*'
 *  - If the deleted entry is NOT in SOURCE_LOCALE:
 *        → Do nothing.
 */
async afterDelete(event) {
  const { model, result } = event;

  // result could potentially be an array (bulk delete),
  // but in your use case we only care about single deletes.
  const story = Array.isArray(result) ? result[0] : result;

  const locale = story?.locale;
  const documentId = story?.documentId;

  if (!documentId) return;

  // Only cascade delete if the deleted version is the SOURCE_LOCALE
  if (locale !== SOURCE_LOCALE) {
    return;
  }

  // New: We check if there is ANY other entry in 'en'
  // for that same documentId. If there is, it means that this delete
  // is part of an internal operation (publish/unpublish), not a final deletion.
  const stillExists = await strapi.entityService.findMany(model.uid, {
    filters: {
      documentId,
      locale: SOURCE_LOCALE,
    },
  });

  if (stillExists && stillExists.length > 0) {
    console.log(
      `[afterDelete] Skip cascade delete → still has ${stillExists.length} entries in SOURCE_LOCALE for documentId ${documentId}`,
    );
    return;
  }


  console.log(
    `Cascade delete starting → documentId=${documentId}, locale=${locale}`
  );

  // Delete ALL locales for this document
  await strapi.documents(model.uid).delete({
    documentId: documentId,
    locale: "*", 
  });

  console.log(
    `Cascade delete executed → Deleted all locales for documentId ${documentId}`
  );
}


};


// src/api/story/content-types/story/lifecycles.ts
// import { createAutoTranslateLifecycles } from "../../../../utils/autoTranslate";

// export default createAutoTranslateLifecycles({
//   translatableFields: ["author", "quote"],

//   async buildTranslatedData(source, targetLocale) {
//     return {
//       // Non-translatable fields copied as-is
//       country: source.country,
//       image: source.image,
//       videoUrl: source.videoUrl,

//       // Localization info
//       locale: targetLocale,

//       // Internal flag, NOT a real field of the model:
//       // used only to detect that this entry was created/updated
//       // by our translation code.
//       triggeredByTranslation: true,
//     };
//   },
// });
