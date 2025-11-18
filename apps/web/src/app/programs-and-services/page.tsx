import { fetchProgramsOverviewPage } from "@/lib/strapi/helpers/programs/overviewHelper";
import Programs from "@/sections/programs-and-services/overview/programs";
import Services from "@/sections/programs-and-services/overview/Services";
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero";


export default async function Page() {

  const res = await fetchProgramsOverviewPage();
  console.log("Programs Overview Page Data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }
  
  return (
    <div>
      <ServicesHero title={res?.hero.title} desc={res?.hero.description} url={res?.hero.backgroundImageUrl} />
      <Services services={res?.servicesSection} />
      <Programs title={res?.ourProgramsSection.title} desc={res?.ourProgramsSection.topDescription} bottomDesc={res?.ourProgramsSection.bottomDescription} cards={res?.ourProgramsSection.cards} />
    </div>
  );
}
