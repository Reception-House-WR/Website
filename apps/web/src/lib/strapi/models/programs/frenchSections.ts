import { Card } from "../common/card";
import { Hero } from "../common/hero";
import { FrenchOverview } from "./frenchOverview";
import { ProgramCard } from "./programCard";

export interface FrenchSections{
    identifier: string;
    title: string;
    hero: Hero; 
    overvireSection: FrenchOverview;
    servicesSection: {
        cafe: ProgramCard;
        resources: ProgramCard;
    }, 
    bottomCard: Card
}