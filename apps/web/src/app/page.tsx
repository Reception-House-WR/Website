"use client";

import { DonateButton } from "@/components/common/DonateButton";
import { Campaign } from "./(home)/sections/Campaign";
import { EventsCalendar } from "./(home)/sections/EventCalender";
import { Hero } from "./(home)/sections/Hero";
import { StoriesCarousel } from "./(home)/sections/StoriesCarousel";

export default function Home() {
  
  return (
    <div className="">
      <Hero lang="en" />
      <StoriesCarousel lang="en" />
      <Campaign lang="en" />
      <EventsCalendar lang="en" />
      <DonateButton lang="en" />
    </div>
  );
}
