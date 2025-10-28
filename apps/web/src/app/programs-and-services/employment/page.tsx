import { ServiceHero } from "@/components/common/ServiceHero";
import { EmploymentSection } from "@/sections/programs-and-services/employment/EmploymentSection";

export default function Home(){
  return (
    <div>
      <ServiceHero
          title="Employment Services"
          description="Empowering newcomers to achieve meaningful employment and build successful careers in Waterloo Region."
      />
      <EmploymentSection />
    </div>
  );
}