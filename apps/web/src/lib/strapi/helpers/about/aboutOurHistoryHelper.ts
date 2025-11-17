
import { OurHistorySections } from "../../models/about/ourHistorySections";
import { TimelineEvent } from "../../models/about/timelineEvent";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { StrapiImageResponse } from "../../models/strapi/image";
import {
  fetchAboutOurHistory,
  fetchTimelineEvents,
} from "../../services/about/ourHistoryService";

const toSection = (s: any): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toTimelineEvent = (e: any): TimelineEvent => ({
  year: e?.year ?? 0,
  title: e?.title ?? "",
  description: e?.description ?? "",
  order: e?.order ?? 0,
  image: e?.image as StrapiImageResponse,
});

export async function fetchAboutOurHistoryPage(): Promise<OurHistorySections | null> {
  const [pageRes, timelineRes] = await Promise.all([
    fetchAboutOurHistory(),
    fetchTimelineEvents(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  // --- localizing sections  ---
  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const commonSections = sections.filter(
    (s: any) => s.__component === "common.section"
  ) as any[];

  
  // [0] → timeline
  // [1] → note
  const timelineSectionRaw = commonSections[0];
  const noteSectionRaw = commonSections[1];

  const hero = toHero(heroRaw ?? {});
  const timelineSection = toSection(timelineSectionRaw ?? {});
  const noteSection = toSection(noteSectionRaw ?? {});

  const events: TimelineEvent[] = (timelineRes?.data ?? []).map((e: any) =>
    toTimelineEvent(e)
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
