import { SOURCE_LOCALE } from "./autoTranslate";

// Content types that already have auto-translate lifecycles
const CONTENT_TYPES_TO_TRANSLATE_ALL = [
  "api::campaign.campaign",
  "api::employee.employee",
  "api::event.event",
  "api::gallery.gallery",
  "api::press-release.press-release",
  "api::report.report",
  "api::story.story",
  "api::strategic-priority.strategic-priority",
  "api::value.value",
  "api::volunteer-testimonial.volunteer-testimonial",
  "api::web-page.web-page",
] as const;

export async function runAutotranslateAll() {
  const logger = strapi.log;

  logger.info("[translateAll] START");

  for (const uid of CONTENT_TYPES_TO_TRANSLATE_ALL) {
    logger.info(`[translateAll] Processing ${uid}`);

    // 1) search all the documents in source_locale 
    const docs: any[] = await strapi
      .documents(uid)
      .findMany({
        locale: SOURCE_LOCALE,
        status: "published",
        limit: 1000,   
      });

    if (!docs || docs.length === 0) {
      logger.info(
        `[translateAll] No entries for ${uid} in ${SOURCE_LOCALE} (published)`
      );
      continue;
    }

    // 2) Make an empty update Document Service
    for (const doc of docs) {
      try {
        await strapi.documents(uid).update({
          documentId: doc.documentId,
          locale: SOURCE_LOCALE,  
          status: "published",
          data: {},               
        });

        logger.info(
          `[translateAll] Document update ${uid} documentId=${doc.documentId} (locale=${SOURCE_LOCALE})`
        );
      } catch (err: any) {
        logger.error(
          `[translateAll] ERROR on ${uid} documentId=${doc.documentId}: ${err?.message}`
        );
      }
    }

    logger.info(
      `[translateAll] Done for ${uid} → ${docs.length} documents`
    );
  }

  logger.info("[translateAll] COMPLETED");
}

