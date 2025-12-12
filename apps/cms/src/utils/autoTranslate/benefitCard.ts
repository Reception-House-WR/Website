import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";

export const BENEFIT_CARD_UID = "get-involved.benefit-card";

/**
 * Translator for BenefitCard (get-involved.benefit-card)
 * - Translates: title, description
 * - Syncs: icon, backgroundImage
 */
export async function translateBenefitCard(
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

  // sync medias/texts
  result.icon = card.icon;
  result.backgroundImage = card.backgroundImage;

  for (const key of Object.keys(card)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "icon" ||
      key === "backgroundImage" ||
      key === "id"
    ) {
      continue;
    }
    result[key] = card[key];
  }

  return result;
}
