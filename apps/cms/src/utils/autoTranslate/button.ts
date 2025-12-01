import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";

export const BUTTON_UID = "common.button";

/**
 * Reusable translator for Button (common.button)
 * - Translates: label
 * - Syncs: url
 */
export async function translateButton(
  button: any,
  targetLocale: string
): Promise<any> {
  if (!button) return null;

  const result: any = {};

  if (button.__component) {
    result.__component = button.__component;
  }

  // label => translate
  if (typeof button.label === "string" && button.label.trim().length > 0) {
    result.label = await translateText(
      button.label,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.label = button.label ?? "";
  }

  // url => sync
  result.url = button.url;

  // copy others
  for (const key of Object.keys(button)) {
    if (key === "label" || key === "url" || key === "id" || key === "__component") {
      continue;
    }
    result[key] = button[key];
  }

  return result;
}
