import { Campaign } from "../sections/home/Campaign";
import { EventsCalendar } from "../sections/home/EventCalender";
import { Hero } from "../sections/home/Hero";
import { StoriesCarousel } from "../sections/home/StoriesCarousel";
import { Partners } from "../sections/home/Partners";
import { fetchHomePage } from "@/lib/strapi/models/home/services";


export default async function Home() {
  
  const res = await fetchHomePage();
  const page = res?.data?.[0];
  const sections = page?.Sections ?? [];

  console.log(res)
  console.log(page)
  console.log("Home page sections:", sections);

  return (
    <div className="">
      <Hero lang="en" />
      <StoriesCarousel lang="en" />
      <Campaign lang="en" />
      <EventsCalendar lang="en" />
      <Partners lang="en" />
    </div>
  );
}
