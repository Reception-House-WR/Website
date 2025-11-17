import { fetchProgramsOverviewPage } from "@/lib/strapi/helpers/programs/overviewHelper";
import Programs from "@/sections/programs-and-services/overview/programs";
import Services from "@/sections/programs-and-services/overview/Services";
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero";


export default async function Home() {

  const res = await fetchProgramsOverviewPage();
  console.log("Programs Overview Page Data:", res);
  
  return (
    <div>
      <ServicesHero />
      <Services />
      <Programs />
    </div>
  );
}
