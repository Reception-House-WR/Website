import { Image } from "../strapi/image";

export interface Hero{
    __component: "common.hero";
    id: number;
    title: string;
    description: string;
    backgroundImageUrl: string;
}