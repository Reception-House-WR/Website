import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsHousingPage } from "@/lib/strapi/helpers/programs/housingHelper";
import { HousingSection } from "@/sections/programs-and-services/housing/HousingSection";

export default async function Home(){
  const res = await fetchProgramsHousingPage();
  console.log("Housing Page Data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return (
    <div>
      <ServiceHero
        title={res.hero.title}
        description={res.hero.description}
      />
      <HousingSection buttonLabel={res.benefitsSection.buttonLabel} bottomDesc={res.benefitsSection.bottomDescription} benefitsCard={res.benefitsSection.card} benefitsTitle={res.benefitsSection.title} benefitsDesc={res.benefitsSection.description} featuresTitle={res.featuresSection.title} featuresDesc={res.featuresSection.description} features={res.featuresSection.cards} analytics={res.analyticsSection.analytics} analyticsTitle={res.analyticsSection.title} analyticsDesc={res.analyticsSection.description} />
    </div>
  );
}