import { StrapiImageResponse } from "../strapi/image";

export interface SimpleCard {
    __component: "common.simple-card";
    title: string;
    description: string;
    image: StrapiImageResponse
}