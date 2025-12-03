import { Card } from "../common/card";
import { Hero } from "../common/hero";
import { contactInfo } from "./contactInfo";

export interface ContactUsSections {
    title: string;
    identifier: string;
    hero: Hero;
    contactUsInfoSection: {
        title: string;
        description: string;
        contactInfo: contactInfo[]
    }, 
    parkingSection: Card;
}