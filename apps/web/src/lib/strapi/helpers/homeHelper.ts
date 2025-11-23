import { Hero } from "../models/common/hero";
import { Section } from "../models/common/section";
import { Campaign } from "../models/donate/campaign";
import { UpcomingEvent } from "../models/event/event";
import { HomeSections } from "../models/home/homeSections";
import { Partner } from "../models/home/partner";
import { Story } from "../models/stories/story";
import { StrapiImageResponse } from "../models/strapi/image";
import {
  fetchHomePageSections,
  fetchUpcomingEvents,
  fetchAllPartners,
} from "../services/homeServices";

type RawImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
};

type RawStory = {
  author?: string;
  quote?: string;
  country?: string;
  videoUrl?: string;
  image?: RawImage | RawImage[];
};

type RawHeroSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
};

type RawStoriesSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  stories?: RawStory[];
};

type RawCampaignSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  campaign?: {
    name?: string;
    description?: string;
    raised?: number;
    goal?: number;
    image?: RawImage | RawImage[];
    buttonURL?: string;
    buttonLabel?: string;
  };
};

type RawCommonSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
};

type RawHomeSection =
  | RawHeroSection
  | RawStoriesSection
  | RawCampaignSection
  | RawCommonSection;

type RawPartner = {
  name?: string;
  url?: string;
  logo?: RawImage;
};

type RawEvent = {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  isPaid?: boolean;
  eventBriteURL?: string;
  image?: RawImage;
};

const getImageUrl = (img?: RawImage | RawImage[]): string => {
  if (!img) return "";

  return Array.isArray(img)
    ? img[0]?.url ?? ""
    : img.url ?? "";
};

//helpers 

const getBackgroundImageUrl = (
  images?: { url?: string }[],
): string | undefined => images?.[0]?.url;

const toStrapiImage = (img?: RawImage | RawImage[]): StrapiImageResponse => {
  const raw = Array.isArray(img) ? img[0] : img;

  return {
    url: raw?.url ?? "",
    alternativeText: raw?.alternativeText ?? null,
    caption: raw?.caption ?? null,
  };
};

const toSection = (s?: RawCommonSection): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toHero = (s?: RawHeroSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: getBackgroundImageUrl(s?.backgroundImage),
});

const toStory = (story: RawStory): Story => ({
  author: story.author ?? "",
  quote: story.quote ?? "",
  country: story.country ?? "",
  videoUrl: story.videoUrl ?? "",
  image: getImageUrl(story.image),
});

const toCampaign = (section?: RawCampaignSection): Campaign => {
  const c = section?.campaign ?? {};
  return {
    name: c.name ?? "",
    description: c.description ?? "",
    goal: c.goal ?? 0,
    raised: c.raised ?? 0,
    image:getImageUrl(c.image),
    buttonLabel: c.buttonLabel ?? "",
    buttonURL: c.buttonURL ?? "",
  };
};

const toPartner = (p: RawPartner): Partner => ({
  name: p.name ?? "",
  url: p.url ?? "",
  logo: toStrapiImage(p.logo),
});

const toEvent = (event: RawEvent): UpcomingEvent => {
  const dateStr = event.date;
  let parsedDate: Date | null = null;

  if (typeof dateStr === "string") {
    const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) {
      const year = Number(m[1]);
      const month = Number(m[2]) - 1;
      const day = Number(m[3]);
      parsedDate = new Date(year, month, day);
    } else {
      const ts = Date.parse(dateStr);
      parsedDate = isNaN(ts) ? null : new Date(ts);
    }
  }

  return {
    title: event.title ?? "",
    description: event.description ?? "",
    date: parsedDate,
    time: event.time ?? "",
    location: event.location ?? "",
    isPaid: event.isPaid ?? false,
    eventBriteURL: event.eventBriteURL ?? "",
    image: toStrapiImage(event.image),
  };
};


export async function fetchHomePage(): Promise<HomeSections | null> {
  const [pageRes, eventsRes, partnersRes] = await Promise.all([
    fetchHomePageSections(),
    fetchUpcomingEvents(4),
    fetchAllPartners(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawHomeSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero",
  ) as RawHeroSection | undefined;

  const storiesRaw = sections.find(
    (s) => s.__component === "stories.stories-carousel",
  ) as RawStoriesSection | undefined;

  const campaignRaw = sections.find(
    (s) => s.__component === "donate.current-campaign",
  ) as RawCampaignSection | undefined;

  const commonSections = sections.filter(
    (s) => s.__component === "common.section",
  ) as RawCommonSection[];

  const upcomingRaw = commonSections[0];
  const partnersSectionRaw = commonSections[1];

  const hero = toHero(heroRaw);

  const stories: Story[] = (storiesRaw?.stories ?? []).map(toStory);

  const campaign: Campaign = toCampaign(campaignRaw);

  const partners: Partner[] = (partnersRes?.data ?? []).map((p) =>
    toPartner(p as RawPartner),
  );

  const rawEvents = (eventsRes?.data ?? []) as unknown as RawEvent[];

  const events: UpcomingEvent[] = rawEvents.map((e) => toEvent(e));

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
      events,
    },

    partnersSection: {
      section: toSection(partnersSectionRaw),
      partners,
    },
  };
}