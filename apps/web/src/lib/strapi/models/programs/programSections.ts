import { Hero } from "../common/hero";
import { Cards } from "./cards";
import { OurPrograms } from "./ourPrograms";

export interface ProgramSections {
    title: string;
    identifier: string;
    hero: Hero;
    servicesSection: Cards,
    ourProgramsSection: OurPrograms
}