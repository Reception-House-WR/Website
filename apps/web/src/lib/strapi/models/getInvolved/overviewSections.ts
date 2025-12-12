import { ButtonSection } from "../common/buttonSection";
import { Hero } from "../common/hero";
import { CardsSection } from "./cardsSection";

export interface overviewSections{
    identifier: string;
    title: string;
    hero: Hero;
    impactSection: ButtonSection;
    waysSection: CardsSection;
}