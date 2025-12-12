import { fetchApi } from "../../client";
import { Priority } from "../../models/about/priority";
import { AboutReport } from "../../models/about/report";
import { Value } from "../../models/about/value";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchAboutOurPurpose(locale: string) {
    return await fetchApi<{
        data: PageStructure[];
        }>("/api/web-pages", {
        filters: { identifier: { $eq: "about-us-our-purpose" } },
        populate: {
            sections: {
            on: {
                "about.impact": {
                  populate: { image: true },
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

export async function fetchValues(locale: string) {
  return await fetchApi<{
    data: Value[];
  }>("/api/values", {
    pagination: { pageSize: 100 },
    locale
  });
}

export async function fetchPriorities(locale: string) {
  return await fetchApi<{
    data: Priority[];
  }>("/api/strategic-priorities", {
    pagination: { pageSize: 100 },
    locale
  });
}

export async function fetchReports(locale: string) {
  return await fetchApi<{
    data: AboutReport[];
  }>("/api/reports", {
    populate: {
      document: true,     
    },
    pagination: { pageSize: 50 },
    locale
  });
}
