import { Hero } from "../common/hero";
import { Section } from "../common/section";
import { Story } from "./story";

export interface StoriesSections{
    title: string;
    identifier: string; 
    hero: Hero;
    body: {
        section: Section;
        stories: Story[]
    }
}