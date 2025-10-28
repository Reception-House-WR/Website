import { ServiceHero } from "@/components/common/ServiceHero";
import FrenchServicesSection from "@/sections/programs-and-services/french/FrenchServices";

export default function Home() {
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
