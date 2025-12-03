import { GalleryCarousel } from "../common/galleryCarousel";
import { Hero } from "../common/hero";
import { AnalyticsOverview } from "./analyticOverview";
import { PartnerSection } from "./partnerSection";
import { ServiceOverview } from "./serviceOverview";

export interface HealthSections{
    title: string;
    identifier: string;
    hero: Hero;
    serviceSection: ServiceOverview;
    partnerSection: PartnerSection;
    gallerySection: GalleryCarousel;
    analyticsSection: AnalyticsOverview;
}