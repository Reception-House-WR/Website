// src/utils/autoTranslate/webPage/cardsCarousel.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";

export const CARDS_CAROUSEL_UID = "common.cards-carousel";

/**
 * Helper to translate a SimpleCard (common.simple-card)
 * - Translates: title, description
 * - Syncs: image
 */
async function translateSimpleCard(
  card: any,
  targetLocale: string
): Promise<any> {
  const result: any = {};

  // keep __component if present
  if (card.__component) {
    result.__component = card.__component;
  }

  // title
  if (typeof card.title === "string" && card.title.trim().length > 0) {
    result.title = await translateText(card.title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = card.title ?? "";
  }

  // description
  if (
    typeof card.description === "string" &&
    card.description.trim().length > 0
  ) {
    result.description = await translateText(
      card.description,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.description = card.description ?? "";
  }

  // image (sync)
  result.image = card.image;

  // copy any other fields except id / translated already
  for (const key of Object.keys(card)) {
    if (
      key === "title" ||
      key === "description" ||
      key === "image" ||
      key === "id" ||
      key === "__component"
    ) {
      continue;
    }
    (result as any)[key] = (card as any)[key];
  }

  return result;
}

/**
 * Translator for CardsCarousel (common.cards-carousel)
 * - Translates: title, description
 * - Translates each SimpleCard in cards
 */
export async function translateCardsCarouselSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: CARDS_CAROUSEL_UID,
  };

  // title
  if (typeof section.title === "string" && section.title.trim().length > 0) {
    result.title = await translateText(section.title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = section.title ?? "";
  }

  // description
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

  // cards (repeatable component)
  const cardsArray = Array.isArray(section.cards) ? section.cards : [];
  const translatedCards: any[] = [];

  for (const card of cardsArray) {
    const translated = await translateSimpleCard(card, targetLocale);
    translatedCards.push(translated);
  }

  (result as any).cards = translatedCards;

  //copy other fields
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
