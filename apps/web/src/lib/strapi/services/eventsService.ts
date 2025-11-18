import { fetchApi } from "../client";
import { UpcomingEvent } from "../models/event/event";
import { PageStructure } from "../models/strapi/pageStructure";

export async function fetcEventPageSections() {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "events" } },
    populate: {
      sections: {
        on: {
          "common.hero": {
            populate: {backgroundImage: true}, 
          },
        },
      },
    },
    pagination: { pageSize: 1 },
  });
}

export async function fetchEvents() {
  return await fetchApi<{ data: UpcomingEvent[] }>("/api/events", {
    sort: ["date:asc"], 
    pagination: {
      pageSize: 100,
    },
    populate: {
      image: true, 
    },
  });
}