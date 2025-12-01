import type { WebPageSection } from "./index";
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import { translateBenefitCard } from "./benefitCard";

export const BENEFITS_CARD_SECTION_UID = "get-involved.benefits-card-section";

/**
 * Translator for BenefitsCardSection (get-involved.benefits-card-section)
 * - Translates: title
 * - Translates: benefits[] (BenefitCard)
 */
export async function translateBenefitsCardSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: BENEFITS_CARD_SECTION_UID,
  };

  if (typeof section.title === "string" && section.title.trim().length > 0) {
    result.title = await translateText(section.title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = section.title ?? "";
  }

  const benefits = Array.isArray((section as any).benefits)
    ? (section as any).benefits
    : [];
  const translatedBenefits: any[] = [];

  for (const benefit of benefits) {
    translatedBenefits.push(await translateBenefitCard(benefit, targetLocale));
  }

  (result as any).benefits = translatedBenefits;

  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "benefits" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
