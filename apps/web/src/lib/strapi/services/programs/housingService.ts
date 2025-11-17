import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchProgramsHousingSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "programs-housing" } },
    populate: {
      sections: {
        on: {
        
        "common.hero": {
            populate: {backgroundImage: true}, 
          }, 
          "programs.analytics-section": {
            populate: {
              analytics: true
            }, 
          },
          "common.cards-carousel": {
            populate: {
              cards: {
                populate: {
                  image: true,
                }
              } 
            }, 
          },
          "programs.benefits-section": {
            populate: {
              card: {
                populate: {
                  items: true
                }
              }
            }, 
          },
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}