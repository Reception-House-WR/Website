import { Volunteers } from "@/sections/get-involved/volunteer/Volunteers";

import VolunteerButtons from "@/sections/get-involved/volunteer/VolunteerButtons";
import WhyVolunteer from "@/sections/get-involved/volunteer/WhyVolunteer";
import Opportunities from "@/sections/get-involved/volunteer/Opportunities";
import { fetchGetInvolvedVolunteerPage } from "@/lib/strapi/helpers/getInvolved/volunteerHelper";
import HeroGetInvolved from "@/sections/get-involved/overview/HeroGetInvolved";

export default async function Home({ params }: { params: { locale: string } }) {
    const res = await fetchGetInvolvedVolunteerPage(params.locale);
    // console.log("volunteer: ", res)

    if (!res) {
        return <div>Failed to load data</div>;
    }
    return (
        <div>
            <HeroGetInvolved title={res.hero.title} desc={res.hero.description} url={res.hero.backgroundImageUrl} />
            <VolunteerButtons title={res.vomeSection.title} card1={res.vomeSection.cards[0]} card2={res.vomeSection.cards[1]} card3={res.vomeSection.cards[2]} />
            <WhyVolunteer title={res.whyVolunteerSection.title} benefits={res.whyVolunteerSection.benefits} />
            <Opportunities title={res.opportunitiesSection.title} desc={res.opportunitiesSection.description} cards={res.opportunitiesSection.cards} />
            <Volunteers title={res.testimonialsSection.title} desc={res.testimonialsSection.description} cards={res.testimonialsSection.testimonials} />
        </div>
            
    );
}