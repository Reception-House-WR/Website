import { Hero } from "../common/hero";
import { Section } from "../common/section";
import { TimelineEvent } from "./timelineEvent";

export interface OurHistorySections {
    title: string;
    identifier: string;
    hero: Hero; 
    timelineSection: {
        section: Section; 
        events: TimelineEvent[];
    }, 
    noteSection: Section;
}