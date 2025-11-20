// app/stories/page.tsx

import {
  fetchPageHero,
  type HeroData,
  fetchStories,
  type Story,
} from "@/lib/strapi";
import StoriesClient from "../../sections/stories/StoriesClient";
import { Users } from "lucide-react";
import { fetchStoriesPage } from "@/lib/strapi/helpers/storiesHelper";

export const revalidate = 60;

const defaultHeroData: HeroData = {
  title: "Real Stories. Real Journeys. Real Impact.",
  description:
    "Every person who walks through our doors carries a unique story of courage, resilience, and hope.",
  imageUrl: "/assets/default-hero.jpg",
};

const defaultStories: Story[] = [];

async function getData() {
  const [heroResult, storiesResult] = await Promise.all([
    fetchPageHero("stories-hero"),
    fetchStories(),
  ]);

  return {
    heroData: heroResult || defaultHeroData,
    storiesData: storiesResult || defaultStories,
  };
}

export default async function StoriesPage() {
  const { heroData, storiesData } = await getData();


  //NEW FUNCTIONS USING NEW BACKEND ---
  //CREATED BY camila
  const res = await fetchStoriesPage();
  console.log("STORIES: ", res); 
  //-----------------------------------

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return (
    <StoriesClient
      heroTitle={res.hero.title}
      heroDesc={res.hero.description}
      heroImage={res.hero.backgroundImageUrl}
      bodyTitle={res.body.section.title}
      bodyDesc={res.body.section.description}
      stories={res.body.stories}
    />
  );
}
