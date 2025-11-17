import { StrapiImageResponse } from "../strapi/image";

export interface Partner{
    name: string;
    logo: StrapiImageResponse;
    url: string;
}