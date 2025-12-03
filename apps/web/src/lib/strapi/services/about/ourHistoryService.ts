import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchAboutOurHistory(locale: string){
    return await fetchApi<{
        data: PageStructure[];
        }>("/api/web-pages", {
        filters: { identifier: { $eq: "about-us-our-history" } },
        populate: {
            sections: {
            on: {
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

export async function fetchTimelineEvents(locale: string) {
    return await fetchApi<{ data: any[] }>("/api/timeline-events", {
        sort: ["year:asc", "order:asc"],        
        pagination: { pageSize: 100 }, 
        populate: {
            image: true,
        },
        locale
    });
}