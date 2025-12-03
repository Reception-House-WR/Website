import type { WebPageSection } from "./index";
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import { translateDonateItem } from "./donateItem";

export const DROP_OFF_CARD_UID = "donate.drop-off-card";

/**
 * Translator for DropOffCard (donate.drop-off-card)
 * - Translates: title, note, subtitle, bottomText
 * - Translates: items[] (Item => value)
 */
export async function translateDropOffCardSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: DROP_OFF_CARD_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.note = await maybeTranslate((section as any).note);
  result.subtitle = await maybeTranslate((section as any).subtitle);
  (result as any).bottomText = await maybeTranslate(
    (section as any).bottomText
  );

  const itemsArray = Array.isArray((section as any).items)
    ? (section as any).items
    : [];
  const translatedItems: any[] = [];

  for (const item of itemsArray) {
    translatedItems.push(await translateDonateItem(item, targetLocale));
  }

  (result as any).items = translatedItems;

  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "note" ||
      key === "subtitle" ||
      key === "bottomText" ||
      key === "items" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
