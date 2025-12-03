import { strapiDocument } from "../strapi/document";


export interface AboutReport {
    name: string;
    description: string;
    document: strapiDocument
}