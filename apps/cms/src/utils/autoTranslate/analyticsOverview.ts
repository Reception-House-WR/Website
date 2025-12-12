// src/utils/autoTranslate/webPage/analyticsOverview.ts
import type { WebPageSection } from "./index";
import { translateAnalyticItem } from "./analytic"; 

export const ANALYTICS_OVERVIEW_UID = "programs.analytics-overview";

/**
 * Translator for AnalyticsOverview (programs.analytics-overview)
 * - Translates: analytics[] using translateAnalyticItem
 * - (No top-level title/description en este componente)
 */
export async function translateAnalyticsOverviewSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: ANALYTICS_OVERVIEW_UID,
  };

  const analyticsArr = Array.isArray((section as any).analytics)
    ? (section as any).analytics
    : [];
  const translatedAnalytics: any[] = [];

  for (const analytic of analyticsArr) {
    const translated = await translateAnalyticItem(analytic, targetLocale);
    translatedAnalytics.push(translated);
  }

  (result as any).analytics = translatedAnalytics;

  // copy others
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "analytics" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
