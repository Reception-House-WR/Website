import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchProgramsHealthSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "programs-health" } },
    populate: {
      sections: {
        on: {
        
        "common.hero": {
            populate: {backgroundImage: true}, 
          }, 
          "programs.service-overview": {
            populate: {
              features: true
            }, 
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
          "programs.analytics-overview": {
            populate: {
              analytics: true
            }
          }
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}