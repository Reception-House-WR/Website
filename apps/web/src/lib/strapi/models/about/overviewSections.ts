import { Card } from "../common/card";
import { GalleryCarousel } from "../common/galleryCarousel";
import { Hero } from "../common/hero";
import { Section } from "../common/section";

export interface AboutOverviewSections {
    title: string;
    identifier: string;
    hero: Hero;
    whoWeAreSection: Section,
    communitySection: GalleryCarousel, 
    boardOfDirectorsSection: Card
    
}