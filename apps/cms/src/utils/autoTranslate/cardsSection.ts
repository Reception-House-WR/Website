import type { WebPageSection } from "./index";
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import { translateIconCard } from "./iconCard";

export const CARDS_SECTION_GET_INVOLVED_UID = "get-involved.cards-section";

/**
 * Translator for CardsSection (get-involved.cards-section)
 * - Translates: title, description
 * - Translates: cards[] (IconCard)
 */
export async function translateCardsSectionGetInvolved(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: CARDS_SECTION_GET_INVOLVED_UID,
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
    translatedCards.push(await translateIconCard(card, targetLocale));
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
