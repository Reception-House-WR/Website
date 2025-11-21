// src/app/donate/page.tsx
import { fetchDonationPage } from "@/lib/strapi/helpers/donateHelper";
import DonateClient from "@/sections/donate/DonateClient";

export default async function DonatePage() {
  const res = await fetchDonationPage();
  console.log("DONATE PAGE", res)
  
  if (!res) {
    return <div className="flex items-center justify-center py-5">Error loading donate page data.</div>;
  }

  return (
    <DonateClient
      heroTitle={res.hero.title}
      heroDesc={res.hero.description}
      heroImage={res.hero.backgroundImageUrl}
      campaignsData={res.campaignsSection.cammpaigns}
      campaignTitle={res.campaignsSection.title}
      campaignDesc={res.campaignsSection.description}
      programsTitle={res.whereHelpsSection.title}
      programsDesc={res.whereHelpsSection.description}
      programsCards={res.whereHelpsSection.cards}
      inKindTitle={res.inKindDonationsSection.title}
      inKindDesc={res.inKindDonationsSection.description}
      inKindCards={res.inKindDonationsSection.cards}
      dropOff={res.dropOffSection}
      ctaTitle={res.bottomGeneralSection.title}
      ctaDesc={res.bottomGeneralSection.description}
      ctaButtonText={res.bottomGeneralSection.button.label}
      ctaButtonUrl={res.bottomGeneralSection.button.url}
    />
  );
}
