import { fetchApi } from "../client";
import { Story } from "../models/stories/story";
import { PageStructure } from "../models/strapi/pageStructure";

export async function fetchStoriesPageSections(locale: string) {
  return await fetchApi<{
    data: PageStructure[];
  }>("/api/web-pages", {
    filters: { identifier: { $eq: "get-involved-careers" } },
    populate: {
      sections: {
        on: {
          "common.hero": {
            populate: {backgroundImage: true}, 
          },
          "common.section": true, 
        },
      },
    },
    pagination: { pageSize: 1 },
    locale,
  });
}
export async function fetchStories(locale: string) {
  return await fetchApi<{ data: Story[] }>("/api/stories", {
    sort: ["createdAt:desc"], 
    populate: {
        image: true
    },
    pagination: { pageSize: 100 },
    locale,
  });
}