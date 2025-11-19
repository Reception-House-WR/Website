import { Hero } from "../common/hero";
import { Section } from "../common/section";
import { BenefitCardSection } from "./benefitCardSection";
import { CardsSection } from "./cardsSection";
import { JobOpening } from "./jobPosting";

export interface CareersSections{
    title: string;
    identifier: string; 
    hero: Hero;
    workingHereSection: CardsSection;
    benefitsSection: BenefitCardSection;
    openingsSection: {
        section: Section;
        jobs: JobOpening[];
    }

}