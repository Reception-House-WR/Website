import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchGetInvolvedCareersPageSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "home" } },
    populate: {
      sections: {
        on: {
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
  });
}