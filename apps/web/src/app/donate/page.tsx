// src/app/donate/page.tsx

import {
  fetchPageHero,
  fetchCampaigns,
  fetchInKindItems,
  fetchDonatePage,
  type HeroData,
  type Campaign,
  type InKindItem,
  type DonatePageData,
} from "@/lib/strapi";
import DonateClient from "./DonateClient";

export const revalidate = 60; // Revalidate every 60 seconds

const defaultHeroData: HeroData = {
  title: "Support Newcomers. Transform Lives.",
  description:
    "Your generosity creates opportunities, builds community, and provides hope.",
  imageUrl: "/assets/default-hero.jpg",
};

async function getData() {
  const [heroResult, campaignsResult, inKindItemsResult, donatePageResult] =
    await Promise.all([
      fetchPageHero("donate-hero"),
      fetchCampaigns(),
      fetchInKindItems(),
      fetchDonatePage(),
    ]);

  return {
    heroData: heroResult || defaultHeroData,
    campaignsData: campaignsResult || [],
    inKindItemsData: inKindItemsResult || [],
    donatePageData: donatePageResult,
  };
}

export default async function DonatePage() {
  const { heroData, campaignsData, inKindItemsData, donatePageData } =
    await getData();

  return (
    <DonateClient
      heroData={heroData}
      campaignsData={campaignsData}
      inKindItemsData={inKindItemsData}
      donatePageData={donatePageData}
    />
  );
}
