import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateInfoCardSection } from "./infoCard";

export const OUR_PROGRAMS_UID = "programs.our-programs";

/**
 * Translator for OurPrograms (programs.our-programs)
 * - Translates: title, topDescription, bottomDescription
 * - Translates: cards[] (repeatable InfoCard)
 */
export async function translateOurProgramsSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: OUR_PROGRAMS_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  // toplevel text fields
  result.title = await maybeTranslate(section.title);
  (result as any).topDescription = await maybeTranslate(
    (section as any).topDescription
  );
  (result as any).bottomDescription = await maybeTranslate(
    (section as any).bottomDescription
  );

  // cards (repeatable InfoCard)
  const cardsArray = Array.isArray((section as any).cards)
    ? (section as any).cards
    : [];
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
      key === "topDescription" ||
      key === "bottomDescription" ||
      key === "cards" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
