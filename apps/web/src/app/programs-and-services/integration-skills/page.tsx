import { ServiceHero } from "@/components/common/ServiceHero";
import TrainingSection from "@/sections/programs-and-services/skills-training/TrainingSection";

export default function Home(){
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