import { fetchApi } from "../../client";
import { Priority } from "../../models/about/priority";
import { AboutReport } from "../../models/about/report";
import { Value } from "../../models/about/value";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchAboutOurPurpose(){
    return await fetchApi<{
        data: PageStructure[];
        }>("/api/web-pages", {
        filters: { identifier: { $eq: "about-us-our-purpose" } },
        populate: {
            sections: {
            on: {
                "about.impact":true,
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

export async function fetchValues() {
  return await fetchApi<{
    data: Value[];
  }>("/api/values", {
    pagination: { pageSize: 100 },
  });
}

export async function fetchPriorities() {
  return await fetchApi<{
    data: Priority[];
  }>("/api/strategic-priorities", {
    pagination: { pageSize: 100 },
  });
}

export async function fetchReports() {
  return await fetchApi<{
    data: AboutReport[];
  }>("/api/reports", {
    populate: {
      document: true,     
    },
    pagination: { pageSize: 50 },
  });
}
