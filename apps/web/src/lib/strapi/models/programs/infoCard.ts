import { Item } from "./item";

export interface InfoCard{
    title: string;
    subtitle: string;
    description: string;
    subtitle2?: string;
    items: Item[];
    desctiption2?: string;
}