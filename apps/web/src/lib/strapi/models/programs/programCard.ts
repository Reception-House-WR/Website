import { StrapiImageResponse } from "../strapi/image";

export interface ProgramCard {
    time: string;
    title: string;
    description: string;
    steps: {
        key: string;
        value: string;
    }[];
    image: StrapiImageResponse
    
}