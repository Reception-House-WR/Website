import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";

export const CARD_UID = "common.card"; 

/**
 * Translator for card component
 * - Translates: title, description, buttonLabel
 * - Syncs: buttonURL, image
 */
export async function translateCardSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: CARD_UID,
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

  //Translate "buttonLabel"
  if (
    typeof section.buttonLabel === "string" &&
    section.buttonLabel.trim().length > 0
  ) {
    result.buttonLabel = await translateText(
      section.buttonLabel,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.buttonLabel = section.buttonLabel ?? "";
  }

  //Sync "buttonURL" (no translation)
  result.buttonURL = section.buttonURL;

  //Sync "image" (media relation)
  result.image = section.image;

  //Copy any other fields that might exist
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "buttonLabel" ||
      key === "buttonURL" ||
      key === "image" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
