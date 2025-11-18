import { GalleryCarousel } from "../common/galleryCarousel";
import { Hero } from "../common/hero";
import { ProgramCard } from "./programCard";
import { ServiceOverview } from "./serviceOverview";

export interface IntegrationSections {
    title: string;
    identifier: string;
    hero: Hero; 
    barriersSection: ServiceOverview;
    gallerySection: GalleryCarousel;
    programsSection: {
        rap: ProgramCard;
        css: ProgramCard;
    }
}