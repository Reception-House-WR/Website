import { Hero } from "../common/hero";
import { Section } from "../common/section";
import { AboutImpact } from "./impact";
import { Priority } from "./priority";
import { AboutReport } from "./report";
import { Value } from "./value";

export interface OurPurposeSections {
    title: string;
    identifier: string;
    hero: Hero;
    missionAndVissionSection: {
        mission: Section;
        vision: Section;
    },
    valuesSection: {
        section: Section;
        values: Value[];
    }, 
    strategicPrioritiesSection: {
        section: Section;
        priorities: Priority[];
    }, 
    ourImpactSection: AboutImpact,
    transparencyAndAccountabilitySection: {
        section: Section;  
        reports: AboutReport[];
    }
}