// import { translateText } from "../../../../utils/translator";

// const SOURCE_LOCALE = "en"; // source language
// const TARGET_LOCALES = ["es"]; // languages to update

// // fields we want to auto-translate
// const TRANSLATABLE_FIELDS = ["author", "quote"];

// export default {

// //  async afterCreate(event) {
// //     const { result } = event;
// //     console.log("AFTER CREATE")
// //     strapi.log.info("AFTER CREATE--------------")
// //     // Call your 3rd party translation API here
// //     // Then use Strapi's APIs to create translated entries in other locales
// //   },

//   async beforeUpdate(event) {
//     console.log("BEFORE UPDATE")
//     strapi.log.info("BEFORE UPDATE--------------")
//     const { model, params } = event;
//     const { data, where } = params;

//     if (!where?.id) return;

//     // Load current entry with its localizations
//     const existing = await strapi.entityService.findOne(model.uid, where.id, {
//       populate: ["localizations"],
//     });

//     if (!existing) return;

//     const currentLocale = existing.locale;
//     console.log("CURRENT LOCALE: ", currentLocale);
//     console.log("SOURCE LOCALE", SOURCE_LOCALE);

//     // We ONLY translate when editing the source locale
//     if (currentLocale !== SOURCE_LOCALE || !currentLocale) return;

//     // Detect changed fields among the translatable ones
//     const changedFields: Record<string, any> = {};

//     for (const field of TRANSLATABLE_FIELDS) {
//       const newValue = data[field];
//       const oldValue = existing[field];

//       if (
//         typeof newValue === "string" &&
//         newValue.trim() !== oldValue?.trim()
//       ) {
//         changedFields[field] = newValue;
//       }
//     }
//     strapi.log.info("PART 2")
//     // No changes → nothing to translate
//     if (Object.keys(changedFields).length === 0) return;

//     const localizations = existing.localizations || [];

//     strapi.log.info("PART 3")
//     // For each locale (es, fr)
//     for (const targetLocale of TARGET_LOCALES) {
//       const targetEntry = localizations.find(
//         (loc) => loc.locale === targetLocale
//       );

//       strapi.log.info(targetEntry)
//       if (!targetEntry) continue;

//       strapi.log.info("PART 4")
//       const updateData: Record<string, any> = {};

//       for (const [field, newValue] of Object.entries(changedFields)) {
//         updateData[field] = await translateText(
//           newValue,
//           SOURCE_LOCALE,
//           targetLocale
//         );
//       }

//       strapi.log.info("PART 5")
//       console.log("UPDATE DATA: ", JSON.stringify(updateData, null, 2))
//       // Now update the translated entry
//       const result = await strapi
//         .documents(model.uid)
//         .update({
//             documentId: targetEntry.documentId,
//             locale: targetLocale,
//             data: updateData,
//         });

//       console.log("RESULT ", JSON.stringify(result, null, 2))
//     }
//   },
// };
