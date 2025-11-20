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

  return (
    <StoriesClient
      heroData={heroData}
      storiesData={storiesData}
      heroIcon={<Users className="w-8 h-8 text-white" />}
    />
  );
}
