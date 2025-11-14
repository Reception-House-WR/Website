import { Image } from "../strapi/image";

export interface Partner {
    name: string;
    logo: Image;
    url: string;
}