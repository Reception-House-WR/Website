import { Hero } from "../common/hero";
import { UpcomingEvent } from "./event";

export interface EventSections{
    identifier: string;
    title: string;
    hero: Hero;
    events: UpcomingEvent[];
}