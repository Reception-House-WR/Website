import { fetchEventsPage } from "@/lib/strapi/helpers/eventsHelper";
import EventsPageClient from "@/sections/events/EventsPageClient";

export default async function Page({ params }: { params: { locale: string } }) {
  const res = await fetchEventsPage(params.locale);
  // console.log(res)
  const siteKey = process.env["RECAPTCHA_SITE_KEY"];

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return <EventsPageClient siteKey={siteKey || null} allEventsData={res?.events || []} heroTitle={res?.hero?.title || ""} heroImage={res?.hero?.backgroundImageUrl || ""} heroDesc={res?.hero?.description || ""} />;
}
