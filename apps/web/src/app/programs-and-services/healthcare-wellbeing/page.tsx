import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsHealthPage } from "@/lib/strapi/helpers/programs/healthHelpet";
import HealthcareSection from "@/sections/programs-and-services/health/Healthcare";

export default async function Home(){

  const res = await fetchProgramsHealthPage();
  console.log("HEALTH PAGE DATA:", res);
  return (
    <div>
      <ServiceHero 
        title="Healthcare and Wellbeing"
            description="Our healthcare navigation services ensure newcomers receive the care they need while overcoming language barriers, cultural differences, and unfamiliarity with the Canadian healthcare system."
            />
        <HealthcareSection />
    </div>
  );
}