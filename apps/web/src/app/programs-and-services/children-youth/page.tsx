import { ServiceHero } from "@/components/common/ServiceHero";
import YouthSection from "@/sections/programs-and-services/children/YouthSection";

export default function Home(){
  return (
    <div>
      <ServiceHero 
        title="Children and Youth"
        description="See all the services for children and Youth."
      />
      <YouthSection />
    </div>
  );
}