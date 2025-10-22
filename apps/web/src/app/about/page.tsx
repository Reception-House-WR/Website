import BoardOfDirectors from "@/sections/about/overview/BoardOfDirectors";
import CommunityInAction from "@/sections/about/overview/CommunityInAction";
import HeroAboutUs from "@/sections/about/overview/HeroAboutUs";
import LinksToPages from "@/sections/about/overview/LinksToPages";
import WhoWeAre from "@/sections/about/overview/WhoWeAre";

export default function Home() {
  
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
