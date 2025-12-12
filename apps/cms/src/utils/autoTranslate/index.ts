import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate"; 

import { translateCurrentCampaignSection, CURRENT_CAMPAIGN_UID } from "./currentCampaign";
import { translateSectionSection, SECTION_UID } from "./section";
import { translateHeroSection, HERO_UID } from "./hero";
import { translateStoriesCarouselSection, STORIES_CAROUSEL_UID } from "./storiesCarousel";
import { CARD_UID, translateCardSection } from "./card";
import { IMPACT_UID, translateImpactSection } from "./impact";
import { ANALYTICS_SECTION_UID, translateAnalyticsSection } from "./analyticsSection";
import { CARDS_CAROUSEL_UID, translateCardsCarouselSection } from "./cardsCarousel";
import { GALLERY_CAROUSEL_UID, translateGalleryCarouselSection } from "./galleryCarousel";
import { INFO_CARD_UID, translateInfoCardSection } from "./infoCard";
import { BENEFITS_SECTION_UID, translateBenefitsSection } from "./benefitsSection";
import { FRENCH_OVERVIEW_UID, translateFrenchOverviewSection } from "./frenchOverview";
import { LIST_CARD_UID, translateListCardSection } from "./listCard";
import { PROGRAM_CARD_UID, translateProgramCardSection } from "./programCard";
import { ANALYTICS_OVERVIEW_UID, translateAnalyticsOverviewSection } from "./analyticsOverview";
import { PARTNER_SECTION_UID, translatePartnerSection } from "./partnerSection";
import { SERVICE_OVERVIEW_UID, translateServiceOverviewSection } from "./serviceOverview";
import { CARDS_SECTION_UID, translateCardsSection } from "./cards";
import { OUR_PROGRAMS_UID, translateOurProgramsSection } from "./ourPrograms";
import { BENEFITS_CARD_SECTION_UID, translateBenefitsCardSection } from "./benefitsCardSection";
import { BUTTON_SECTION_UID, translateButtonSection } from "./buttonSection";
import { CARDS_SECTION_GET_INVOLVED_UID, translateCardsSectionGetInvolved } from "./cardsSection";
import { VOLUNTEER_TESTIMONIALS_CAROUSEL_UID, translateVolunteerTestimonialsCarouselSection } from "./volunteerTestimonialsCarousel";
import { CAMPAIGNS_SECTION_UID, translateCampaignsSection } from "./campaigns";
import { DROP_OFF_CARD_UID, translateDropOffCardSection } from "./dropOffCard";
import { LIST_CARDS_SECTION_UID, translateListCardsSection } from "./listCardsSection";
import { MEDIA_KIT_SECTION_UID, translateMediaKitSection } from "./mediaKitSection";
import { RELEASES_SECTION_UID, translateReleasesSection } from "./releasesSection";

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
  [CARD_UID]: translateCardSection,
  [IMPACT_UID]: translateImpactSection,
  [ANALYTICS_SECTION_UID]: translateAnalyticsSection,
  [CARDS_CAROUSEL_UID]: translateCardsCarouselSection,
  [INFO_CARD_UID]: translateInfoCardSection,
  [GALLERY_CAROUSEL_UID]: translateGalleryCarouselSection,
  [LIST_CARD_UID]: translateListCardSection,
  [BENEFITS_SECTION_UID]: translateBenefitsSection,
  [FRENCH_OVERVIEW_UID]: translateFrenchOverviewSection,
  [PROGRAM_CARD_UID]: translateProgramCardSection,
  [SERVICE_OVERVIEW_UID]: translateServiceOverviewSection,
  [PARTNER_SECTION_UID]: translatePartnerSection,
  [ANALYTICS_OVERVIEW_UID]: translateAnalyticsOverviewSection,
   [CARDS_SECTION_UID]: translateCardsSection,
  [OUR_PROGRAMS_UID]: translateOurProgramsSection,
  [BUTTON_SECTION_UID]: translateButtonSection,
  [CARDS_SECTION_GET_INVOLVED_UID]: translateCardsSectionGetInvolved,
  [BENEFITS_CARD_SECTION_UID]: translateBenefitsCardSection,
  [VOLUNTEER_TESTIMONIALS_CAROUSEL_UID]: translateVolunteerTestimonialsCarouselSection,
  [CAMPAIGNS_SECTION_UID]: translateCampaignsSection,
  [LIST_CARDS_SECTION_UID]: translateListCardsSection,
  [DROP_OFF_CARD_UID]: translateDropOffCardSection,
  [MEDIA_KIT_SECTION_UID]: translateMediaKitSection,
  [RELEASES_SECTION_UID]: translateReleasesSection,
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
