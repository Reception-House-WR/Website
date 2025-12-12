import type { WebPageSection } from "./index";
import { translateCardSection } from "./card";

export const CARDS_SECTION_UID = "programs.cards";

/**
 * Translator for Cards section (programs.cards)
 * - Field: cards (repeatable common.card)
 * - Uses translateCardSection for each card.
 * - No own text fields.
 */
export async function translateCardsSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: CARDS_SECTION_UID,
  };

  const cardsArray = Array.isArray((section as any).cards)
    ? (section as any).cards
    : [];

  const translatedCards: any[] = [];

  for (const card of cardsArray) {
    const translated = await translateCardSection(card as any, targetLocale);
    translatedCards.push(translated);
  }

  (result as any).cards = translatedCards;

  // Copy any other fields except special ones
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "cards" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
