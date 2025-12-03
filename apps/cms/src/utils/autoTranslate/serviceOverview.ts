import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateFeature } from "./feature";

export const SERVICE_OVERVIEW_UID = "programs.service-overview";

/**
 * Translator for ServiceOverview (programs.service-overview)
 * - Translates: title, description
 * - Translates: features[] (Feature)
 */
export async function translateServiceOverviewSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: SERVICE_OVERVIEW_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  // features (repeatable Feature)
  const features = Array.isArray((section as any).features)
    ? (section as any).features
    : [];
  const translatedFeatures: any[] = [];

  for (const feature of features) {
    const translated = await translateFeature(feature, targetLocale);
    translatedFeatures.push(translated);
  }

  (result as any).features = translatedFeatures;

  // copy otros campos
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "features" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
