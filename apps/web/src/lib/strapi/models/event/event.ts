import { Image } from "../strapi/image";

export interface AppEvent {
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    isPaid: boolean;
    eventBriteURL?: string;
    image: Image

}