import { Volunteers } from "@/sections/get-involved/volunteer/Volunteers";

import VolunteerButtons from "@/sections/get-involved/volunteer/VolunteerButtons";
import WhyVolunteer from "@/sections/get-involved/volunteer/WhyVolunteer";
import Opportunities from "@/sections/get-involved/volunteer/Opportunities";
import { fetchGetInvolvedVolunteerPage } from "@/lib/strapi/helpers/getInvolved/volunteerHelper";

export default async function Home() {
    const res = await fetchGetInvolvedVolunteerPage();
    console.log("volunteer: ", res)
    return (
        <div>
            <VolunteerButtons />
            <WhyVolunteer />
            <Opportunities />
            <Volunteers />
        </div>
            
    );
}