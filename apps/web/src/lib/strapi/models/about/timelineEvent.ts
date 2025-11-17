import { StrapiImageResponse } from "../strapi/image";

export interface TimelineEvent {
    year: number; 
    title: string;
    description: string;
    order: number;
    image: StrapiImageResponse;
}