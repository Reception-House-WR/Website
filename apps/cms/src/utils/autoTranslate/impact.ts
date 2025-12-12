// src/utils/autoTranslate/webPage/impact.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";

export const IMPACT_UID = "about.impact"; 

/**
 * Translator for impact component
 * - Translates: title, description
 * - Syncs: videoUrl, image
 */
export async function translateImpactSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: IMPACT_UID,
  };

  //Translate "title"
  if (typeof section.title === "string" && section.title.trim().length > 0) {
    result.title = await translateText(section.title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = section.title ?? "";
  }

  //Translate "description"
  if (
    typeof section.description === "string" &&
    section.description.trim().length > 0
  ) {
    result.description = await translateText(
      section.description,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.description = section.description ?? "";
  }

  //Sync "videoUrl" (no translation)
  result.videoUrl = section.videoUrl;
  result.image = section.image;

  //Copy any other fields that might exist
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "videoUrl" ||
      key === "image" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
