import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateButton } from "./button";

export const BUTTON_SECTION_UID = "common.button-section";

/**
 * Translator for ButtonSection (common.button-section)
 * - Translates: title, description
 * - Translates nested button.label and syncs button.url
 */
export async function translateButtonSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: BUTTON_SECTION_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  //button
  if ((section as any).button) {
    (result as any).button = await translateButton(
      (section as any).button,
      targetLocale
    );
  } else {
    (result as any).button = null;
  }

  //copy others
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "button" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
