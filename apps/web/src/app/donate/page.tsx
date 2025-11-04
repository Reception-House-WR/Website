// src/app/donate/page.tsx

import {
  fetchPageHero,
  fetchCampaigns,
  fetchDonationCategories,
  fetchDonatePage,
  fetchDonationPrograms,
  type HeroData,
  type Campaign,
  type DonationCategory,
  type DonationProgram,
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
  const [
    heroResult,
    campaignsResult,
    donationCategoriesResult,
    donatePageResult,
    programsResult,
  ] = await Promise.all([
    fetchPageHero("donate-hero"),
    fetchCampaigns(),
    fetchDonationCategories(),
    fetchDonatePage(),
    fetchDonationPrograms(),
  ]);

  return {
    heroData: heroResult || defaultHeroData,
    campaignsData: campaignsResult || [],
    donationCategoriesData: donationCategoriesResult || [],
    donatePageData: donatePageResult,
    programsData: programsResult || [],
  };
}

export default async function DonatePage() {
  const {
    heroData,
    campaignsData,
    donationCategoriesData,
    donatePageData,
    programsData,
  } = await getData();

  return (
    <DonateClient
      heroData={heroData}
      campaignsData={campaignsData}
      donationCategoriesData={donationCategoriesData}
      donatePageData={donatePageData}
      programsData={programsData}
    />
  );
}
