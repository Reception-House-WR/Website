import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsEmploymentPage } from "@/lib/strapi/helpers/programs/employmentHelper";
import { EmploymentSection } from "@/sections/programs-and-services/employment/EmploymentSection";

export default async function Home(){

  const res = await fetchProgramsEmploymentPage();
  console.log("Employment Page Data:", res);
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