import { Hero } from "../common/hero";
import { Section } from "../common/section";
import { Campaign } from "../donate/campaign";
import { UpcomingEvent } from "../event/event";
import { Story } from "../stories/story";
import { Partner } from "./partner";

export interface HomeSections {
    title: string;
    identifier: string;
    hero: Hero;
    storiesSection: {
        section: Section;
        stories: Story[]
    },
    currentCampaignSection: {
        section: Section;
        campaign: Campaign
    }, 
    upcomingEventsSection: {
        section: Section;
        events: UpcomingEvent[]
    }, 
    partnersSection: {
        section: Section;
        partners: Partner[]
    }
}