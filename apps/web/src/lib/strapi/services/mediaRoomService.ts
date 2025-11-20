import { fetchApi } from "../client";
import { PageStructure } from "../models/strapi/pageStructure";

export async function fetchMediaRoomPageSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "media-room" } },
    populate: {
      sections: {
        on: {
          "common.hero": {
            populate: {backgroundImage: true}, 
          },
          "media-room.media-kit-section": {
            populate: {
              kits: {
                populate: {
                  kit: true,       
                },
              },
            }, 
          },
          "media-room.releases-section": {
            populate: {
              pressReleases: {
                populate: {
                  image: true,       
                },
              },
            }, 
          },
          
          "common.section": true, 
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}

export async function fetchGalleryItems() {
  return await fetchApi<{
    data: any[];
  }>("/api/galleries", {
    populate: {
      image: true,    
    },
    sort: ["createdAt:desc"], 
    pagination: {
      pageSize: 100,  
    },
  });
}