import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/strapi/internationalization/i18n";
import { fetchHomePage } from "@/lib/strapi/helpers/homeHelper";
import { Hero } from "@/sections/home/Hero";
import { StoriesCarousel } from "@/sections/home/StoriesCarousel";
import { CampaignSection } from "@/sections/home/CampaignSection";
import { EventsCalendar } from "@/sections/home/EventCalender";
import { Partners } from "@/sections/home/Partners";

export default async function Home() {
  const res = await fetchHomePage(DEFAULT_LOCALE);
  // console.log("Home page data:", res);

  if (!res) {
    return (
      <div className="flex items-center justify-center py-5">
        Error loading home page data.
      </div>
    );
  }

  return (
    <div className="">
      <Hero
        title={res.hero.title}
        description={res.hero.description}
        imageUrl={res.hero.backgroundImageUrl ?? ""}
      />
      <StoriesCarousel
        title={res.storiesSection.section.title}
        desc={res.storiesSection.section.description}
        stories={res.storiesSection.stories}
      />
      <CampaignSection
        title={res.currentCampaignSection.section.title}
        campaign={res.currentCampaignSection.campaign}
      />
      <EventsCalendar
        title={res.upcomingEventsSection?.section?.title || ""}
        desc={res.upcomingEventsSection?.section?.description || ""}
        events={res.upcomingEventsSection?.events || []}
      />
      <Partners
        title={res.partnersSection?.section?.title || ""}
        desc={res.partnersSection?.section?.description || ""}
        partners={res.partnersSection?.partners || []}
      />
    </div>
  );
}
