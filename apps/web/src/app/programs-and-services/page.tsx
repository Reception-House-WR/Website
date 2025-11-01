import Programs from "@/sections/programs-and-services/overview/programs";
import Services from "@/sections/programs-and-services/overview/Services";
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero";


export default function Home() {
  return (
    <div>
      <ServicesHero />
      <Services />
      <Programs />
    </div>
  );
}
