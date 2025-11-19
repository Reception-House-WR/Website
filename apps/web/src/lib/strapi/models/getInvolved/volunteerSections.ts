import { Hero } from "../common/hero";
import { BenefitCardSection } from "./benefitCardSection";
import { CardsSection } from "./cardsSection";
import { VolunteerTestimonialCarousel } from "./volunteerTestimonialCarousel";

export interface VolunteerSections{
    title: string;
    identifier: string;
    hero: Hero;
    vomeSection: CardsSection;
    whyVolunteerSection: BenefitCardSection;
    opportunitiesSection: CardsSection;
    testimonialsSection: VolunteerTestimonialCarousel;
}