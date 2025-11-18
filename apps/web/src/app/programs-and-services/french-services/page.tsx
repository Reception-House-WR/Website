import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsFrenchPage } from "@/lib/strapi/helpers/programs/frenchHelper";
import FrenchServicesSection from "@/sections/programs-and-services/french/FrenchServices";

export default async function Home() {

  const res = await fetchProgramsFrenchPage();
  console.log("French Services Page Data:", res);
  return (
    <div>
      <ServiceHero
        title="French Services"
        description="See all our French Services."
      />
      <FrenchServicesSection />
    </div>
  );
}
