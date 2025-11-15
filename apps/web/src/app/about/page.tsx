import { fetchAboutOverviewPage } from "@/lib/strapi/helpers/about/aboutOverviewHelper";
import BoardOfDirectors from "@/sections/about/overview/BoardOfDirectors";
import CommunityInAction from "@/sections/about/overview/CommunityInAction";
import HeroAboutUs from "@/sections/about/overview/HeroAboutUs";
import LinksToPages from "@/sections/about/overview/LinksToPages";
import WhoWeAre from "@/sections/about/overview/WhoWeAre";

export default async function Home() {
  
  const res = await fetchAboutOverviewPage();
  console.log("About overview page data:", res);

  return (
    <div className="">
      <HeroAboutUs />
      <WhoWeAre />
      <CommunityInAction />
      <LinksToPages />
      <BoardOfDirectors />
    </div>
  );
}
