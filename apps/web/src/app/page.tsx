"use client";

import { Campaign } from "./(home)/sections/Campaign";
import { Hero } from "./(home)/sections/Hero";
import { StoriesCarousel } from "./(home)/sections/StoriesCarousel";

export default function Home() {
  
  return (
    <div className="">
      <Hero lang="en" />
      <StoriesCarousel lang="en" />
      <Campaign lang="en" />
    </div>
  );
}
