import { fetchApi } from "@/lib/strapi/client"; // your helper

export async function fetchHomePage() {
  return await fetchApi<{
    data: Array<{
      id: number;
      Sections: any[];
      Title: string;
    }>;
  }>("/api/web-pages", {
    filters: { Identifier: { $eq: "home" } },
    populate: { Sections: true },
    pagination: { pageSize: 1 },
  });
}