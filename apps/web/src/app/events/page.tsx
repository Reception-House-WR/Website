import {
  fetchPageHero,
  type HeroData,
  fetchEvents,
  type Event,
} from "@/lib/strapi";
import { fetchEventsPage } from "@/lib/strapi/helpers/eventsHelper";
import EventsPageClient from "@/sections/events/EventsPageClient";

// --- Events Page (Server Component) ---
export default async function Page() {
  const res = await fetchEventsPage();
  console.log(res)

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return <EventsPageClient allEventsData={res.events} heroTitle={res.hero.title} heroImage={res.hero.backgroundImageUrl} heroDesc={res.hero.description} />;
}
