import { Campaign } from "./campaign";

export interface CurrentCampaign {
    __component: "donate.current-campaign";
    id: number;
    title: string;
    campaign: Campaign;
}