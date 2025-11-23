
import { OurHistorySections } from "../../models/about/ourHistorySections";
import { TimelineEvent } from "../../models/about/timelineEvent";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { StrapiImageResponse } from "../../models/strapi/image";
import {
  fetchAboutOurHistory,
  fetchTimelineEvents,
} from "../../services/about/ourHistoryService";

type RawStrapiComponent = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
};

type RawTimelineEvent = {
  year?: number;
  title?: string;
  description?: string;
  order?: number;
  image: StrapiImageResponse;
};

const toSection = (s?: RawStrapiComponent): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toHero = (s?: RawStrapiComponent): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toTimelineEvent = (e: RawTimelineEvent): TimelineEvent => ({
  year: e.year ?? 0,
  title: e.title ?? "",
  description: e.description ?? "",
  order: e.order ?? 0,
  image: e.image,
});

export async function fetchAboutOurHistoryPage(): Promise<OurHistorySections | null> {
  const [pageRes, timelineRes] = await Promise.all([
    fetchAboutOurHistory(),
    fetchTimelineEvents(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiComponent[];

  //localizing sections  
  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const commonSections = sections.filter(
    (s) => s.__component === "common.section"
  );

  //0: timeline
  //1: note
  const timelineSectionRaw = commonSections[0];
  const noteSectionRaw = commonSections[1];

  const hero = toHero(heroRaw);
  const timelineSection = toSection(timelineSectionRaw);
  const noteSection = toSection(noteSectionRaw);

  const events: TimelineEvent[] = (timelineRes?.data ?? []).map((e) =>
    toTimelineEvent(e as RawTimelineEvent)
  );

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    timelineSection: {
      section: timelineSection,
      events,
    },
    noteSection,
  };
}