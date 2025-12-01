import type { WebPageSection } from "./index";
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import { translateDonateList } from "./donateList";

export const LIST_CARDS_SECTION_UID = "donate.list-cards-section";

/**
 * Translator for ListCardsSection (donate.list-cards-section)
 * - Translates: title, description
 * - Translates: cards[] 
 */
export async function translateListCardsSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: LIST_CARDS_SECTION_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  const cardsArray = Array.isArray((section as any).cards)
    ? (section as any).cards
    : [];
  const translatedCards: any[] = [];

  for (const card of cardsArray) {
    translatedCards.push(await translateDonateList(card, targetLocale));
  }

  (result as any).cards = translatedCards;

  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "cards" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
