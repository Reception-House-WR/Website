import { ServiceHero } from "@/components/common/ServiceHero";
import { fetchProgramsFrenchPage } from "@/lib/strapi/helpers/programs/frenchHelper";
import FrenchServicesSection from "@/sections/programs-and-services/french/FrenchServices";

export default async function Home({ params }: { params: { locale: string } }) {

  const res = await fetchProgramsFrenchPage(params.locale);
  // console.log("French Services Page Data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return (
    <div>
      <ServiceHero
        title={res.hero.title}
        description={res.hero.description}
      />
      <FrenchServicesSection redirectLink={res.bottomCard.buttonUrl} buttonLabel={res.bottomCard.buttonLabel} cardTitle={res.bottomCard.title} cardDesc={res.bottomCard.description} resources={res.servicesSection.resources} cafe={res.servicesSection.cafe} cards={res.overvireSection.cards} title={res.overvireSection.title} desc={res.overvireSection.description} />
    </div>
  );
}
