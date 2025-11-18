import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsIntegrationPage } from "@/lib/strapi/helpers/programs/integrationHelper";
import TrainingSection from "@/sections/programs-and-services/skills-training/TrainingSection";

export default async function Home(){

  const res = await fetchProgramsIntegrationPage();
  console.log("Integration and Skills Training Page Data:", res);
  
  return (
    <div>
       <ServiceHero
        title="Integration and Skills Training"
        description="Supporting newcomers with essential skills and knowledge to thrive in their new community."
      />
        <TrainingSection />
    </div>
  );
}