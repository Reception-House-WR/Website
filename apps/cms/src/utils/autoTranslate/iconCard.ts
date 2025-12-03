import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import { translateButton } from "./button";

export const ICON_CARD_UID = "get-involved.icon-card";

/**
 * Translator for IconCard (get-involved.icon-card)
 * - Translates: title, description, button.label
 * - Syncs: icon, button.url
 */
export async function translateIconCard(
  card: any,
  targetLocale: string
): Promise<any> {
  const result: any = {};

  if (card.__component) {
    result.__component = card.__component;
  }

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(card.title);
  result.description = await maybeTranslate(card.description);

  //icon sync
  result.icon = card.icon;

  //button (reuse Button helper)
  if (card.button) {
    result.button = await translateButton(card.button, targetLocale);
  } else {
    result.button = null;
  }

  //copy others
  for (const key of Object.keys(card)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "icon" ||
      key === "button" ||
      key === "id"
    ) {
      continue;
    }
    result[key] = card[key];
  }

  return result;
}
