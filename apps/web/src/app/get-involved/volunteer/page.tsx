import { Volunteers } from "@/sections/get-involved/volunteer/Volunteers";

import VolunteerButtons from "@/sections/get-involved/volunteer/VolunteerButtons";
import WhyVolunteer from "@/sections/get-involved/volunteer/WhyVolunteer";
import Opportunities from "@/sections/get-involved/volunteer/Opportunities";

export default function Home() {
    return (
        <div>
            <VolunteerButtons />
            <WhyVolunteer />
            <Opportunities />
            <Volunteers />
        </div>
            
    );
}