import { StrapiImageResponse } from "../strapi/image";

export interface GalleryItem{
    description: string;
    isImage: boolean;
    image?: StrapiImageResponse;
    videoUrl?: string;
}