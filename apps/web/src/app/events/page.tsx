// app/events/page.tsx
export const dynamic = "force-dynamic";

import {
  fetchPageHero,
  type HeroData,
  fetchEvents,
  type Event,
} from "@/lib/strapi";
import EventsPageClient from "@/sections/events/EventsPageClient";

// --- Default fallback data (used if Strapi fails) ---
const defaultHeroData: HeroData = {
  title: "Community Events",
  description:
    "Join us in our upcoming events and community activities. Your participation helps us build a more welcoming community for newcomers.",
  imageUrl: "/assets/timeline/timeline5.jpg",
};

const defaultEvents: Event[] = [];

// --- Fetch data on the server ---
async function getData() {
  const [heroResult, eventsResult] = await Promise.all([
    fetchPageHero("events-hero"),
    fetchEvents(),
  ]);

  return {
    heroData: heroResult || defaultHeroData,
    allEventsData: eventsResult || defaultEvents,
  };
}

// --- Events Page (Server Component) ---
export default async function EventsPage() {
  const { heroData, allEventsData } = await getData();

  return <EventsPageClient heroData={heroData} allEventsData={allEventsData} />;
}
