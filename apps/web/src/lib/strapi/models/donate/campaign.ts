import { Image } from "../strapi/image";

export interface Campaign {
    name: string;
    description: string;
    raised: number;
    goal: number;
    image: Image;
    buttonURL: string;
    buttonLabel: string;
}