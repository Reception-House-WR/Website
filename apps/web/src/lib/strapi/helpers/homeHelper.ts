import { Hero } from "../models/common/hero";
import { Section } from "../models/common/section";
import { Campaign } from "../models/donate/campaign";
import { UpcomingEvent } from "../models/event/event";
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
    backgroundImageUrl: heroRaw?.backgroundImage[0].url ?? null,
  };

  const stories: Story[] = (storiesRaw?.stories ?? []).map((story: any) => ({
    author: story.author,
    country: story.country,
    image: story.image?.[0]?.url ?? null,
    quote: story.quote,
  }));

  const campaign: Campaign = {
    name: campaignRaw?.campaign?.name ?? "",
    description: campaignRaw?.campaign?.description ?? "",
    goal: campaignRaw?.campaign?.goal ?? 0,
    raised: campaignRaw?.campaign?.raised ?? 0,
    image: campaignRaw?.campaign?.image?.[0]?.url ?? null,
    buttonLabel: campaignRaw?.campaign?.buttonLabel ?? "",
    buttonURL: campaignRaw?.campaign?.buttonURL ?? "",
  }

  const partners : Partner[] = (partnersRes?.data ?? []).map((partner: any) => ({
    name: partner.name,
    url: partner.url,
    logo: partner.logo?.url ?? null,
  }));

  // console.log("events raw:", eventsRes);

  const events: UpcomingEvent[] = (eventsRes?.data ?? []).map((event: any) => {
    const dateStr = event?.date;
    let parsedDate: Date | null = null;

    if (typeof dateStr === "string") {
      const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) {
        const year = Number(m[1]);
        const month = Number(m[2]) - 1; // JS months are 0-based
        const day = Number(m[3]);
        parsedDate = new Date(year, month, day);
      } else {
        const ts = Date.parse(dateStr);
        parsedDate = isNaN(ts) ? null : new Date(ts);
      }
    }

    return {
      title: event.title,
      description: event.description,
      date: parsedDate,
      time: event.time,
      location: event.location,
      isPaid: event.isPaid,
      eventBriteURL: event.eventBriteURL,
      image: event.image?.url ?? null,
    } as UpcomingEvent;
  });

  // console.log("events:", events);

  return {
    title: page.title,
    identifier: page.identifier,

    hero,

    storiesSection: {
      section: toSection(storiesRaw),
      stories,
    },

    currentCampaignSection: {
      section: toSection(campaignRaw),
      campaign,
    },

    upcomingEventsSection: {
      section: toSection(upcomingRaw),
      events
    },

    partnersSection: {
      section: toSection(partnersRaw),
      partners
    },
  };
}