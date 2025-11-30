import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate"; 

import { translateCurrentCampaignSection, CURRENT_CAMPAIGN_UID } from "./currentCampaign";
import { translateSectionSection, SECTION_UID } from "./section";
import { translateHeroSection, HERO_UID } from "./hero";
import { translateStoriesCarouselSection, STORIES_CAROUSEL_UID } from "./storiesCarousel";

/**
 * Base type for a WebPage dynamic zone section.
 * Each section always has "__component" plus other fields.
 */
export type WebPageSection = {
  __component: string;
  [key: string]: any;
};

/**
 * Translator function type for each component in the dynamic zone.
 */
export type SectionTranslator = (
  section: WebPageSection,
  targetLocale: string
) => Promise<WebPageSection>;

 //Registry with all section translators, keyed by component UID
export const SECTION_TRANSLATORS: Record<string, SectionTranslator> = {
  [CURRENT_CAMPAIGN_UID]: translateCurrentCampaignSection,
  [SECTION_UID]: translateSectionSection,
  [HERO_UID]: translateHeroSection,
  [STORIES_CAROUSEL_UID]: translateStoriesCarouselSection,
};

/**
 * Fallback translator if a section has no specific translator:
 * just return the section as-is.
 */
async function defaultTranslator(
  section: WebPageSection,
  _targetLocale: string
): Promise<WebPageSection> {
  const {id, ...res} = section as any;
  return section;
}

//Translate a section based on its "__component".
export async function translateSectionByComponent(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const translator =
    SECTION_TRANSLATORS[section.__component] ?? defaultTranslator;

    const translated = await translator(section, targetLocale);
    const {id, ...withoutId} = translated as any
  return withoutId;
}

 //Translate an array of sections (full dynamic zone).

export async function translateSectionsArray(
  sections: WebPageSection[] | undefined,
  targetLocale: string
): Promise<WebPageSection[]> {
  if (!Array.isArray(sections)) return [];
  const result: WebPageSection[] = [];

  for (const section of sections) {
    if (!section || !section.__component) continue;
    const translatedSection = await translateSectionByComponent(
      section,
      targetLocale
    );
    result.push(translatedSection);
  }

  return result;
}
