// src/utils/autoTranslate/webPage/analyticsSection.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateAnalyticItem } from "./analytic";

export const ANALYTICS_SECTION_UID = "programs.analytics-section";

/**
 * Translator for AnalyticsSection (programs.analytics-section)
 * - Translates: title, description
 * - Translates each item inside "analytics" (repeatable component)
 */
export async function translateAnalyticsSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: ANALYTICS_SECTION_UID,
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

  // analytics (repeatable component)
  const analyticsArray = Array.isArray(section.analytics)
    ? section.analytics
    : [];

  const translatedAnalytics: any[] = [];
  for (const analytic of analyticsArray) {
    const translated = await translateAnalyticItem(analytic, targetLocale);
    translatedAnalytics.push(translated);
  }
  (result as any).analytics = translatedAnalytics;

  //Other fields
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "analytics" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
