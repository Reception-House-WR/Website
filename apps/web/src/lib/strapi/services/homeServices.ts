import { fetchApi } from "@/lib/strapi/client"; 
import { HomeStructure } from "../models/strapi/homeStructure";
import { Partner } from "../models/home/partner";
import { UpcomingEvent } from "../models/event/event";

export async function fetchHomePageSections() {
  return await fetchApi<{
    data: HomeStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "home" } },
    populate: {
      sections: {
        on: {
          "stories.stories-carousel": {
            populate: {
              stories: {
                populate: {
                  image: true,       // 👈 populate the media field here
                },
              },
            }, 
          },
          "donate.current-campaign": {
            populate: {
              campaign: {
                populate: {
                  image: true,       // 👈 populate the media field here
                },
              },
            }, 
          },
          "common.hero": {
            populate: {backgroundImage: true}, 
          },
          "common.section": true, 
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}

export async function fetchUpcomingEvents(limit = 4) {
  const today = new Date().toISOString().slice(0, 10);

  return await fetchApi<{ data: UpcomingEvent[] }>("/api/events", {
    filters: {
      date: {
        $gte: today, 
      },
    },
    sort: ["date:asc"], 
    pagination: {
      pageSize: limit,
    },
    populate: {
      image: true, 
    },
  });
}

export async function fetchAllPartners() {
  return await fetchApi<{ data: Partner[] }>("/api/partners", {
    sort: ["name:asc"],        
    pagination: { pageSize: 100 }, 
    populate: {
      logo: true
    },
  });
}