import { Item } from "../programs/item";

export interface DropOffCard{
    title: string;
    note: string; 
    subtitle: string; 
    items: Item[];
    bottomText: string;
}