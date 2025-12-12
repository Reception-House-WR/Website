import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchAboutOverview(locale: string) {
    return await fetchApi<{
        data: PageStructure[];
        }>("/api/web-pages", {
        filters: { identifier: { $eq: "about-us-overview" } },
        populate: {
            sections: {
            on: {
                "common.gallery-carousel": {
                populate: {
                    gallery: true
                }, 
                },
                "common.card": {
                populate: {image: true} 
                },
                "common.hero": {
                populate: {backgroundImage: true}, 
                },
                "common.section": true, 
            },
            },
        },
        pagination: { pageSize: 1 },
        locale
    });
}
