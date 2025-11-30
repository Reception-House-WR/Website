import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsIntegrationPage } from "@/lib/strapi/helpers/programs/integrationHelper";
import Barriers from "@/sections/programs-and-services/skills-training/Barriers";
import Images from "@/sections/programs-and-services/skills-training/Images";
import RapAndCss from "@/sections/programs-and-services/skills-training/RapAndCss";

export default async function Home({ params }: { params: { locale: string } }){

  const res = await fetchProgramsIntegrationPage(params.locale);
  // console.log("Integration and Skills Training Page Data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }
  
  return (
    <div>
       <ServiceHero
        title={res.hero.title}
        description={res.hero.description}
      />
      <div className="bg-[var(--rh-yellow-500)]/10 py-20">
        <Barriers galleryTitle={res?.gallerySection?.title || ""} galleryDesc={res?.gallerySection?.description || ""} title={res?.barriersSection?.title || ""} desc={res?.barriersSection?.description || ""} features={res?.barriersSection?.features || []} />
        <Images images={res?.gallerySection?.gallery || []}/>
        <RapAndCss rapSection={res?.programsSection?.rap || {}} cssSection={res?.programsSection?.css || {}} />  
      </div>
    </div>
  );
}