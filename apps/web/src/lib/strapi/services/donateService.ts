import { fetchApi } from "../client";
import { PageStructure } from "../models/strapi/pageStructure";

export async function fetchDonatePageSections(locale: string) {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "donate" } },
    populate: {
      sections: {
        on: {
          "common.hero": {
            populate: {backgroundImage: true}, 
          },
          "donate.campaigns": {
            populate: {
                campaigns: {
                    populate: {
                        image: true
                    }
                }
            }
          },
          "get-involved.cards-section": {
            populate: {
                cards: {
                    populate: {
                        button: true
                    }
                }
            }
          },
          "donate.list-cards-section": {
            populate: {
                cards: {
                    populate: {
                        items: true
                    }
                }
            }
          }, 
          "donate.drop-off-card": {
            populate: {
                items: true
            }
          }, 
          "common.button-section": {
            populate: {
                button: true
            }
          }
      },

      },
        
    },
    pagination: { pageSize: 1 },
    locale
  });
}