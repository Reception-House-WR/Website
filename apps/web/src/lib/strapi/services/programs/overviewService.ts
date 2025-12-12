import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchProgramsOverviewections(locale: string) {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "programs-overview" } },
    populate: {
      sections: {
        on: {
        
        "common.hero": {
            populate: {backgroundImage: true}, 
          }, 
          "programs.cards": {
            populate: {
              cards: {
                populate: {
                  image: true,       
                },
              },
            }, 
          },
          "programs.our-programs": {
            populate: {
              cards: {
                populate: {
                  items: true,
                }
              } 
            }, 
          },
        },
      },
    },
    pagination: { pageSize: 1 },
    locale
  });
}