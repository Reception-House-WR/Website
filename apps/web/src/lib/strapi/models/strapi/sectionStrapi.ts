import { StoriesCarousel } from "../stories/stories-carousel";
import { Hero } from "../common/hero";
import { CurrentCampaign } from "../donate/currentCampaign";
import { Section } from "../common/section";
import { GalleryCarousel } from "../common/galleryCarousel";
import { Card } from "../common/card";
import { Cards } from "../programs/cards";
import { InfoCard } from "../programs/infoCard";
import { OurPrograms } from "../programs/ourPrograms";
import { ServiceOverview } from "../programs/serviceOverview";
import { AnalyticsOverview } from "../programs/analyticOverview";

export type SectionStrapi =
  | Hero
  | StoriesCarousel
  | CurrentCampaign
  | Section
  | GalleryCarousel
  | Card
  | Cards
  | InfoCard
  | OurPrograms
  | AnalyticsOverview
  | ServiceOverview
  ;