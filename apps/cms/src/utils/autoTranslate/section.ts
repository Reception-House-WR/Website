// src/utils/autoTranslate/webPage/section.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";


export const SECTION_UID = "common.section";

/**
 * Translator for ssection component.
 * - Translates "title" and "description"
 */
export async function translateSectionSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: SECTION_UID,
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

  //Copy any other fields
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description"
    ) {
      continue;
    }
    result[key] = (section as any)[key];
  }

  return result;
}
