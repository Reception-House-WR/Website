import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsHealthPage } from "@/lib/strapi/helpers/programs/healthHelpet";
import HealthcareSection from "@/sections/programs-and-services/health/Healthcare";

export default async function Home(){

  const res = await fetchProgramsHealthPage();
  console.log("HEALTH PAGE DATA:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }
  return (
    <div>
      <ServiceHero 
        title={res.hero.title}
        description={res.hero.description}
      />
      <HealthcareSection />
    </div>
  );
}