import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchProgramsFrenchections(locale: string) {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "programs-french" } },
    populate: {
      sections: {
        on: {
        "common.hero": {
            populate: {backgroundImage: true}, 
        }, 
        "programs.french-overview": {
            populate: {
                cards: {
                    populate: {
                        items: true
                    }
                }
            }
        },
          "programs.program-card": {
            populate: {
              steps: true, 
              button: true
            }, 
          },
          "common.card": {
            populate: true
          },
        },
      },
    },
    pagination: { pageSize: 1 },
    locale
  });
}