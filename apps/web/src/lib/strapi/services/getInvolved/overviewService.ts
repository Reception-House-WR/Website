import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchGetInvolvedOverviewPageSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "get-involved-overview" } },
    populate: {
      sections: {
        on: {
          "common.hero": {
            populate: {backgroundImage: true}, 
          },
          "common.button-section" : {
            populate: {buttons: true}
          }, 
          "get-involved.cards-section": {
            populate: {
                cards: {
                    populate: {
                        buttons: true
                    }
                }
            }
          }
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}