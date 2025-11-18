import { Hero } from "../models/common/hero";
import { UpcomingEvent } from "../models/event/event";
import { EventSections } from "../models/event/eventSections";
import { StrapiImageResponse } from "../models/strapi/image";
import { fetcEventPageSections, fetchEvents } from "../services/eventsService";

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toEvent = (event: any): UpcomingEvent => {
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
    } as StrapiImageResponse,
  };
};


export async function fetchEventsPage(): Promise<EventSections | null> {
  const [pageRes, eventsRes] = await Promise.all([
    fetcEventPageSections(),
    fetchEvents(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const hero = toHero(heroRaw ?? {});

  const events: UpcomingEvent[] = (eventsRes?.data ?? []).map(toEvent);

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    events,
  };
}