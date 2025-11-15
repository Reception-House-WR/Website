import { StrapiImageResponse } from "../strapi/image";

export interface Card {
    __component: "common.card";
    id: number;
    title: string;
    description: string;
    image: StrapiImageResponse;
    buttonLabel: string;
    buttonUrl: string;
}