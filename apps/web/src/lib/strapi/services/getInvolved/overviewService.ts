import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchGetInvolvedOverviewPageSections(locale: string) {
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
            populate: {button: true}
          }, 
          "get-involved.cards-section": {
            populate: {
                cards: {
                    populate: {
                        button: true
                    }
                }
            }
          }
        },
      },
    },
    pagination: { pageSize: 1 },
    locale
  });
}