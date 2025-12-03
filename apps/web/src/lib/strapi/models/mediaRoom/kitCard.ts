import { strapiDocument } from "../strapi/document";
import { StrapiImageResponse } from "../strapi/image";

export interface KitCard{
    title: string;
    description: string;
    icon: string;
    kit: StrapiImageResponse | strapiDocument;
}