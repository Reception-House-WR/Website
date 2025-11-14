import { Image } from "../strapi/image";

export interface Story{
    author: string;
    quote: string;
    country: string;
    image: Image
}