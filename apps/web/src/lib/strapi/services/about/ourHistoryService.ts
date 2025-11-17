import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchAboutOurHistory(){
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
    });
}

export async function fetchTimelineEvents() {
    return await fetchApi<{ data: any[] }>("/api/timeline-events", {
        sort: ["year:asc", "order:asc"],        
        pagination: { pageSize: 1000 }, 
        populate: {
            image: true,
        },
    });
}