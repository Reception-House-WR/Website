import { Hero } from "../common/hero";
import { Section } from "../common/section";
import { Employee } from "./employee";

export interface AboutOurPeopleSections {
    title: string;
    identifier: string;
    hero: Hero;
    notFound: Section;
    people: Employee[];
    departments: string[];
}