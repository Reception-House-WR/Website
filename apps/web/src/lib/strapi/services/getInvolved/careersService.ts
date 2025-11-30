import { fetchApi } from "../../client";
import { JobOpening } from "../../models/getInvolved/jobPosting";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchGetInvolvedCareersPageSections(locale: string) {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "get-involved-careers" } },
    populate: {
      sections: {
        on: {
          "common.hero": {
            populate: {backgroundImage: true}, 
          },
        "get-involved.cards-section": {
            populate: {
                cards: true
            }
        },
        "get-involved.benefits-card-section" : {
            populate: {
              benefits: {
                populate: {
                  backgroundImage: true
                }
              }
            }
          },
          "common.section": true, 
        },
      },
    },
    pagination: { pageSize: 1 },
    locale
  });
}

export async function fetchJobOpenings(locale: string) {
  return await fetchApi<{ data: JobOpening[] }>("/api/job-openings", {
    sort: ["createdAt:desc"], 
    pagination: { pageSize: 100 },
    locale
  });
}