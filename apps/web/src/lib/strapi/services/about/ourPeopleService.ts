import { fetchApi } from "../../client";
import { Employee } from "../../models/about/employee";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchAboutOurPeople(){
    return await fetchApi<{
        data: PageStructure[];
        }>("/api/web-pages", {
        filters: { identifier: { $eq: "about-us-overview" } },
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

export async function fetchAllEmployees() {
    return await fetchApi<{ data: Employee[] }>("/api/employees", {
        sort: ["name:asc"],        
        pagination: { pageSize: 1000 }, 
        populate: {
            image: true,
        },
    });
}
