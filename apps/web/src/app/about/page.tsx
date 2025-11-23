import { fetchAboutOverviewPage } from "@/lib/strapi/helpers/about/aboutOverviewHelper";
import BoardOfDirectors from "@/sections/about/overview/BoardOfDirectors";
import CommunityInAction from "@/sections/about/overview/CommunityInAction";
import HeroAboutUs from "@/sections/about/overview/HeroAboutUs";
import LinksToPages from "@/sections/about/overview/LinksToPages";
import WhoWeAre from "@/sections/about/overview/WhoWeAre";

export default async function Home() {
  
  const res = await fetchAboutOverviewPage();
  // console.log("About overview page data:", res);
  if (!res) {
    return <div className="flex items-center justify-center py-5">Error loading about overview page data.</div>;
  }

  return (
    <div className="">
      <HeroAboutUs url={res.hero.backgroundImageUrl} title={res.hero.title} description={res.hero.description} />
      <WhoWeAre title={res.whoWeAreSection.title} description={res.whoWeAreSection.description} />
      <CommunityInAction title={res.communitySection.title} gallery={res.communitySection.gallery} />
      <LinksToPages />
      <BoardOfDirectors title={res.boardOfDirectorsSection.title} desc={res.boardOfDirectorsSection.description} image={res.boardOfDirectorsSection.image?.url} buttonLabel={res.boardOfDirectorsSection.buttonLabel} />
    </div>
  );
}