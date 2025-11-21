// src/app/donate/DonateClient.tsx
"use client";

import { PageHero } from "@/components/ui/pageHero";
import {
  type HeroData,
  type DonationCategory,
  type DonatePageData,
  type DonationProgram,
} from "@/lib/strapi";
import CampaignsSection from "./CampaignsSection";
import CtaSection from "./CtaSection";
import DonationProgramsSection from "./DonationProgramsSection";
import InKindSection from "./InKindSection";
import { Campaign } from "@/lib/strapi/models/donate/campaign";
import { IconCard } from "@/lib/strapi/models/common/iconCard";
import { List } from "@/lib/strapi/models/donate/list";
import { DropOffCard } from "@/lib/strapi/models/donate/dropOffCard";

// 1. Import your new section components


// --- Component Props ---
interface DonateClientProps {
  heroTitle: string;
  heroDesc: string;
  heroImage?: string;
  campaignTitle: string;
  campaignDesc: string;
  campaignsData: Campaign[];
  programsTitle: string;
  programsDesc: string;
  programsCards: IconCard[];
  inKindTitle: string;
  inKindDesc: string;
  inKindCards: List[];
  dropOff: DropOffCard;
  ctaTitle: string;
  ctaDesc: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

// 2. Your main component is now clean and easy to read
export default function DonateClient({
  heroTitle,
  heroDesc,
  heroImage,
  campaignsData,
  campaignTitle,
  campaignDesc,
  programsTitle,
  programsDesc,
  programsCards,
  inKindTitle,
  inKindDesc,
  inKindCards,
  dropOff,
  ctaTitle,
  ctaDesc,
  ctaButtonText,
  ctaButtonUrl,
}: DonateClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <main id="main-content">
        {/* Hero Section */}
        <PageHero
          heroTitle={heroTitle}
          heroDesc={heroDesc}
          heroImage={heroImage}
        />

        {/* --- All sections are now separate components --- */}
        <CampaignsSection campaignTitle={campaignTitle} campaignDesc={campaignDesc} campaignsData={campaignsData} />

        <DonationProgramsSection title={programsTitle} desc={programsDesc} programsData={programsCards} />
    
        <InKindSection
          title={inKindTitle}
          desc={inKindDesc}
          donationCards={inKindCards}
          dropOff={dropOff}
        />

        <CtaSection title={ctaTitle} desc={ctaDesc} buttonText={ctaButtonText} buttonUrl={ctaButtonUrl} />
      </main>
    </div>
  );
}
