import { StoriesCarousel } from "../stories/stories-carousel";
import { Hero } from "../common/hero";
import { CurrentCampaign } from "../donate/currentCampaign";
import { Section } from "../common/section";

export type SectionStrapi =
  | Hero
  | StoriesCarousel
  | CurrentCampaign
  | Section;