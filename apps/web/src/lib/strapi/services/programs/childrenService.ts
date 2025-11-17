import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchProgramsChildrenSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "programs-children" } },
    populate: {
      sections: {
        on: {
        
        "common.hero": {
            populate: {backgroundImage: true}, 
          }, 
        "programs.analytics-section": {
            populate: {
              analytics: true
            }
          },
          "common.cards-carousel": {
            populate: {
              cards: {
                populate: {
                    image: true
                }
              }
            }, 
          },
          "programs.info-card": {
            populate: {
                items: true
            }
          },
          "programs.partner-section": {
            populate: {
              partners: {
                populate: {
                  logo: true,
                }
              } 
            }, 
          },
          "common.gallery-carousel": {
            populate: {
                gallery: true
            }
          }, 
          "common.list-card": { 
                populate: {
                    items: true
                }
            }
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}