import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsEmploymentPage } from "@/lib/strapi/helpers/programs/employmentHelper";
import { EmploymentSection } from "@/sections/programs-and-services/employment/EmploymentSection";

export default async function Home({ params }: { params: { locale: string } }){

  const res = await fetchProgramsEmploymentPage(params.locale);
  // console.log("Employment Page Data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return (
    <div>
      <ServiceHero
          title={res.hero.title}
          description={res.hero.description}
      />
      <EmploymentSection buttonLabel={res.benefitsSection?.buttonLabel || ""} benefitsTitle={res.benefitsSection?.title || ""} benefitsDesc={res.benefitsSection?.description || ""} benefitsBottomDesc={res.benefitsSection?.bottomDescription || ""} benefitsCard={res.benefitsSection?.card || []} title={res.featuresSection?.title || ""} desc={res.featuresSection?.description || ""} cards={res.featuresSection?.cards || []} />
    </div>
  );
}