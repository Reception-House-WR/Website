import { Campaign } from "../sections/home/Campaign";
import { EventsCalendar } from "../sections/home/EventCalender";
import { Hero } from "../sections/home/Hero";
import { StoriesCarousel } from "../sections/home/StoriesCarousel";
import { Partners } from "../sections/home/Partners";


export default function Home() {
  
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
