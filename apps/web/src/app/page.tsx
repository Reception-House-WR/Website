import { Campaign } from "../sections/home/Campaign";
import { EventsCalendar } from "../sections/home/EventCalender";
import { Hero } from "../sections/home/Hero";
import { StoriesCarousel } from "../sections/home/StoriesCarousel";
import { Partners } from "../sections/home/Partners";
import { fetchHomePage } from "@/lib/strapi/helpers/homeHelper";


export default async function Home() {
  
  const res = await fetchHomePage();
  console.log("Home page data:", res);


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
