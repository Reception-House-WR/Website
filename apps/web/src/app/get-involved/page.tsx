import { fetchGetInvolvedOverviewPage } from "@/lib/strapi/helpers/getInvolved/overviewHelper";
import MakeImpact from "@/sections/get-involved/overview/MakeImpact";
import WaysToGetInvolved from "@/sections/get-involved/overview/WaysToGetInvolved";

export default async function Home() {
    const res = await fetchGetInvolvedOverviewPage();
    console.log("OVERVIEW: ", res)
    return (
        <div>
            <MakeImpact/>
            <WaysToGetInvolved/>
        </div>
    );
}