import { Hero } from "../common/hero";
import { AnalyticsSection } from "./analyticsSection";
import { BenefitsSection } from "./benefitsSection";
import { CardsCarousel } from "./cardsCarousel";

export interface HousingSection {
    identifier: string;
    title: string;
    hero: Hero;
    analyticsSection: AnalyticsSection;
    featuresSection: CardsCarousel;
    benefitsSection: BenefitsSection
}