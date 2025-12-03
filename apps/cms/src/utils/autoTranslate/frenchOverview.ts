// src/utils/autoTranslate/webPage/frenchOverview.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateInfoCardSection } from "./infoCard";

export const FRENCH_OVERVIEW_UID = "programs.french-overview";

/**
 * Translator for FrenchOverview (programs.french-overview)
 * - Translates: title, description
 * - Translates: cards (repeatable InfoCard)
 */
export async function translateFrenchOverviewSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: FRENCH_OVERVIEW_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  // cards: repeatable InfoCard
  const cardsArray = Array.isArray(section.cards) ? section.cards : [];
  const translatedCards: any[] = [];

  for (const card of cardsArray) {
    const translatedCard = await translateInfoCardSection(
      card as any,
      targetLocale
    );
    translatedCards.push(translatedCard);
  }

  (result as any).cards = translatedCards;

  // copy other fields
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
