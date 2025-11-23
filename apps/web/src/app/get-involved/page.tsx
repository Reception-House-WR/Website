import { fetchGetInvolvedOverviewPage } from "@/lib/strapi/helpers/getInvolved/overviewHelper";
import HeroGetInvolved from "@/sections/get-involved/overview/HeroGetInvolved";
import MakeImpact from "@/sections/get-involved/overview/MakeImpact";
import WaysToGetInvolved from "@/sections/get-involved/overview/WaysToGetInvolved";

export default async function Home() {
    const res = await fetchGetInvolvedOverviewPage();
    // console.log("OVERVIEW: ", res)

    if (!res) {
        return <div>Failed to load data</div>;
    }
    return (
    <div>
        <HeroGetInvolved title={res.hero.title} desc={res.hero.description} url={res.hero.backgroundImageUrl} />
        <MakeImpact title={res.impactSection.title} desc={res.impactSection.description} buttonText={res.impactSection.button.label} buttonLink={res.impactSection.button.url} />
        <WaysToGetInvolved title={res.waysSection.title} volunteerCard={res.waysSection.cards[0]} rentCard={res.waysSection.cards[1]} />
    </div> 
    );
}