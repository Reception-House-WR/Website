import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchAboutContactUs(locale: string) {
    return await fetchApi<{
        data: PageStructure[];
        }>("/api/web-pages", {
        filters: { identifier: { $eq: "about-us-contact-us" } },
        populate: {
            sections: {
            on: {
                "common.hero": {
                    populate: {backgroundImage: true}, 
                },
                "common.section": true, 
                "common.card": {
                    populate: {image: true}
                }
            },
            },
        },
        pagination: { pageSize: 1 },
        locale
    });
}