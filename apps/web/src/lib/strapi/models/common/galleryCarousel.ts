import { StrapiImageResponse } from "../strapi/image";

export interface GalleryCarousel {
    __component: "common.gallery-carousel";
    id: number;
    title: string;
    description: string;
    gallery: StrapiImageResponse[];
}