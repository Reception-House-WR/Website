import { fetchApi } from "../../client";
import { PageStructure } from "../../models/strapi/pageStructure";

export async function fetchGetInvolvedVolunteerPageSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "get-involved-volunteer" } },
    populate: {
      sections: {
        on: {
          "common.hero": {
            populate: {backgroundImage: true}, 
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
          "get-involved.benefits-card-section" : {
            populate: {
              benefits: {
                populate: {
                  backgroundImage: true
                }
              }
            }
          }, 
          "get-involved.volunteer-testimonials-carousel": {
            populate: {
              testimonials: {
                populate: {image: true}
              }
          }
        }
      },

      },
        
    },
    pagination: { pageSize: 1 },
  });
}