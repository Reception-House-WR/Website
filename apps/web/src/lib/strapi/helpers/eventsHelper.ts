import { Hero } from "../models/common/hero";
import { UpcomingEvent } from "../models/event/event";
import { EventSections } from "../models/event/eventSections";
import { fetcEventPageSections, fetchEvents } from "../services/eventsService";

type RawHeroSection = {
  id?: number;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
};

type RawEvent = {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  isPaid?: boolean;
  eventBriteURL?: string;
  image?: {
    url?: string;
    alternativeText?: string | null;
    caption?: string | null;
  };
};

type RawSection = RawHeroSection & {
  __component?: string;
};

const toHero = (s?: RawHeroSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toEvent = (event: RawEvent): UpcomingEvent => {
  const dateStr = event?.date;
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
    image: {
      url: event.image?.url ?? "",
      alternativeText: event.image?.alternativeText ?? null,
      caption: event.image?.caption ?? null,
    },
  };
};

export async function fetchEventsPage(locale: string): Promise<EventSections | null> {
  const [pageRes, eventsRes] = await Promise.all([
    fetcEventPageSections(locale),
    fetchEvents(locale),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const hero = toHero(heroRaw);
  const rawEvents = (eventsRes?.data ?? []) as unknown as RawEvent[];

  const events: UpcomingEvent[] = rawEvents.map((e) => toEvent(e));

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    events,
  };
}