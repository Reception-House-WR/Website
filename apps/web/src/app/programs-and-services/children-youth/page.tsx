import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsChildrenPage } from "@/lib/strapi/helpers/programs/childrenHelper";
import YouthSection from "@/sections/programs-and-services/children/YouthSection";

export default async function Home(){

  const res = await fetchProgramsChildrenPage();
  console.log("Children and Youth Page Data:", res);
  if (!res) {
    return <div>Failed to load data</div>;
  }
  return (
    <div>
      <ServiceHero 
        title={res.hero.title}
        description={res.hero.description}
      />
      <YouthSection 
        committeeImages={res.gallerySection.gallery}
        programs={res.featuresSection.cards}
        analyticsStats={res.analyticsSection.analytics}
        analyticsTitle={res.analyticsSection.title}
        analyticsDesc={res.analyticsSection.description}
        youthTitle={res.youthAdvisorySection.title}
        youthSubtitle={res.youthAdvisorySection.subtitle}
        youthSubtitle2={res.youthAdvisorySection.subtitle2 as string}
        youthDesc={res.youthAdvisorySection.description}
        youthDesc2={res.youthAdvisorySection.description2 as string}
        youthBenefits={res.youthAdvisorySection.items}
        barriersTitle={res.barriersSection.title}
        barriersDesc={res.barriersSection.description}
        barriers={res.barriersSection.items}
      />
    </div>
  );
}