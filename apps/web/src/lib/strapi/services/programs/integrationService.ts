import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchProgramsIntegrationSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "programs-integration" } },
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
          "common.gallery-carousel": {
            populate: {gallery: true}, 
          },
          "programs.program-card": {
            populate: {steps: true, image: true}, 
          },
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}