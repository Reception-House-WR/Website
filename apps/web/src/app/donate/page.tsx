// src/app/donate/page.tsx

import {
  fetchPageHero,
  fetchCampaigns,
  fetchDonationCategories,
  fetchDonatePage,
  fetchDonationPrograms,
  type HeroData,
} from "@/lib/strapi";
import { fetchDonationPage } from "@/lib/strapi/helpers/donateHelper";
import DonateClient from "@/sections/donate/DonateClient";

export const revalidate = 60; // Revalidate every 60 seconds

const defaultHeroData: HeroData = {
  title: "Support Newcomers. Transform Lives.",
  description:
    "Your generosity creates opportunities, builds community, and provides hope.",
  imageUrl: "/assets/default-hero.jpg",
};

async function getData() {
  // --- FIX 1: Capture all 5 results from the promise ---
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

  // --- FIX 2: Return all data ---
  return {
    heroData: heroResult || defaultHeroData,
    campaignsData: campaignsResult || [],
    donationCategoriesData: donationCategoriesResult || [],
    donatePageData: donatePageResult,
    programsData: programsResult || [],
  };
}

export default async function DonatePage() {
  // --- FIX 3: Destructure all data from getData() ---
  const {
    heroData,
    campaignsData,
    donationCategoriesData,
    donatePageData,
    programsData,
  } = await getData();


  //NEW BACKEND STRUCTURE FUNCTION----------------------
  //Created by Camila 
  const res = await fetchDonationPage();
  console.log("DONATE PAGE", res)
  //------------------------------------------------------

  // --- FIX 4: Pass all props to the client component ---
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
