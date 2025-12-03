import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateListCardSection } from "./listCard";

export const BENEFITS_SECTION_UID = "programs.benefits-section";

/**
 * Translator for BenefitsSection (programs.benefits-section)
 * - Translates: title, description, buttonLabel, bottomDescription
 * - Translates nested card (ListCard)
 */
export async function translateBenefitsSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: BENEFITS_SECTION_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);
  (result as any).buttonLabel = await maybeTranslate(section.buttonLabel);
  (result as any).bottomDescription = await maybeTranslate(
    section.bottomDescription
  );

  // card: ListCard (no repeatable)
  if (section.card) {
    const translatedCard = await translateListCardSection(
      section.card as any,
      targetLocale
    );
    (result as any).card = translatedCard;
  } else {
    (result as any).card = null;
  }

  // copy any other fields
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "card" ||
      key === "buttonLabel" ||
      key === "bottomDescription" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
