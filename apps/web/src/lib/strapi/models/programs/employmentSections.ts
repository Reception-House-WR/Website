import { Hero } from "../common/hero";
import { BenefitsSection } from "./benefitsSection";
import { CardsCarousel } from "./cardsCarousel";

export interface EmploymentSections {
    identifier: string;
    title: string;
    hero: Hero;
    featuresSection: CardsCarousel;
    benefitsSection: BenefitsSection;
}