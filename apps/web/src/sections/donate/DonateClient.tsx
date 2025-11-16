// src/app/donate/DonateClient.tsx
"use client";

import { PageHero } from "@/components/ui/pageHero";
import { HeartHandshake } from "lucide-react";
import {
  type HeroData,
  type Campaign,
  type DonationCategory,
  type DonatePageData,
  type DonationProgram,
} from "@/lib/strapi";

// 1. Import your new section components
import DonationProgramsSection from "./DonationProgramsSection";
import CampaignsSection from "./CampaignsSection";
import InKindSection from "./InKindSection";
import CtaSection from "./CtaSection";

// --- Component Props ---
interface DonateClientProps {
  heroData: HeroData;
  campaignsData: Campaign[];
  donationCategoriesData: DonationCategory[];
  donatePageData: DonatePageData | null;
  programsData: DonationProgram[];
}

// 2. Your main component is now clean and easy to read
export default function DonateClient({
  heroData,
  campaignsData,
  donationCategoriesData,
  donatePageData,
  programsData,
}: DonateClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <main id="main-content">
        {/* Hero Section */}
        <PageHero
          heroData={heroData}
          icon={<HeartHandshake className="w-8 h-8 text-white" />}
        />

        {/* --- All sections are now separate components --- */}
        <CampaignsSection campaignsData={campaignsData} />

        <DonationProgramsSection programsData={programsData} />

        <InKindSection
          donationCategoriesData={donationCategoriesData}
          donatePageData={donatePageData}
        />
        <CtaSection />
      </main>
    </div>
  );
}
