import { ServiceHero } from "@/components/common/ServiceHero";
import { HousingSection } from "@/sections/programs-and-services/housing/HousingSection";

export default function Home(){
  return (
    <div>
      <ServiceHero
        title="Temporary Accommodation and Housing"
        description="Building communities by connecting newcomers with safe, welcoming homes in Waterloo Region."
      />
        <HousingSection />
    </div>
  );
}