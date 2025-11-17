import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsHousingPage } from "@/lib/strapi/helpers/programs/housingHelper";
import { HousingSection } from "@/sections/programs-and-services/housing/HousingSection";

export default async function Home(){
  const res = await fetchProgramsHousingPage();
  console.log("Housing Page Data:", res);
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