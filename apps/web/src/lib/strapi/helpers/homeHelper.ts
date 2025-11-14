import { Hero } from "../models/common/hero";
import { Section } from "../models/common/section";
import { Campaign } from "../models/donate/campaign";
import { AppEvent } from "../models/event/event";
import { HomeSections } from "../models/home/homeSections";
import { Partner } from "../models/home/partner";
import { Story } from "../models/stories/story";
import { fetchHomePageSections, fetchUpcomingEvents, fetchAllPartners } from "../services/homeServices";

export async function fetchHomePage(): Promise<HomeSections | null> {
  // Run all three requests in parallel for better performance
  const [pageRes, eventsRes, partnersRes] = await Promise.all([
    fetchHomePageSections(),
    fetchUpcomingEvents(4),
    fetchAllPartners(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  // Find each section by its Strapi component key
  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero",
  ) as any;

  const storiesRaw = sections.find(
    (s: any) => s.__component === "stories.stories-carousel",
  ) as any;

  const campaignRaw = sections.find(
    (s: any) => s.__component === "donate.current-campaign",
  ) as any;

  const commonSections = sections.filter(
    (s: any) => s.__component === "common.section",
  ) as any[];

  // For now: first common.section → Upcoming Events, second → Partners
  const upcomingRaw = commonSections[0];
  const partnersRaw = commonSections[1];

  // Helper to convert a Strapi "common.section" component into our Section view model
  const toSection = (s: any): Section => ({
    id: s?.id ?? 0,
    __component: "common.section",
    title: s?.title ?? "",
    description: s?.description ?? "",
  });

  // Build the Hero view model from the Strapi hero component
  const hero: Hero = {
    id: heroRaw?.id ?? 0,
    __component: "common.hero",
    title: heroRaw?.title ?? "",
    description: heroRaw?.description ?? "",
    backgroundImage: heroRaw?.backgroundImage ?? null,
  };

  return {
    title: page.title,
    identifier: page.identifier,

    hero,

    storiesSection: {
      section: toSection(storiesRaw),
      stories: (storiesRaw?.stories ?? []) as Story[],
    },

    currentCampaignSection: {
      section: toSection(campaignRaw),
      campaign: (campaignRaw?.campaign ?? null) as Campaign,
    },

    upcomingEventsSection: {
      section: toSection(upcomingRaw),
      events: (eventsRes?.data ?? []) as AppEvent[],
    },

    partnersSection: {
      section: toSection(partnersRaw),
      partners: (partnersRes?.data ?? []) as Partner[],
    },
  };
}