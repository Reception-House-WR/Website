import { StrapiImageResponse } from "../strapi/image";

export interface PressRelease{
    date: Date;
    title: string; 
    shortDesc: string; 
    longDesc: string;
    image: StrapiImageResponse
}