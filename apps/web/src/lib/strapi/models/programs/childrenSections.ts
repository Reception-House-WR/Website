import { GalleryCarousel } from "../common/galleryCarousel";
import { Hero } from "../common/hero";
import { ListCard } from "../common/listCard";
import { AnalyticsSection } from "./analyticsSection";
import { CardsCarousel } from "./cardsCarousel";
import { InfoCard } from "./infoCard";

export interface ChildrenSection {
    identifier: string;
    title: string;
    hero: Hero; 
    analyticsSection: AnalyticsSection;
    featuresSection: CardsCarousel;
    youthAdvisorySection: InfoCard;
    gallerySection: GalleryCarousel;
    barriersSection: ListCard;
    
}