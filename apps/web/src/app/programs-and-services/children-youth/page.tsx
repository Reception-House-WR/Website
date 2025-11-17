import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsChildrenPage } from "@/lib/strapi/helpers/programs/childrenHelper";
import YouthSection from "@/sections/programs-and-services/children/YouthSection";

export default async function Home(){

  const res = await fetchProgramsChildrenPage();
  console.log("Children and Youth Page Data:", res);
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