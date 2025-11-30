import { fetchApi } from "@/lib/strapi/client";
import { SearchSection } from "./types";

export async function loadSectionsIndex(locale?: string): Promise<SearchSection[]> {
  const res = await fetchApi<{
    data: Array<{
      id: string;
      identifier: string;
      pageLabel: string;
      sectionLabel: string;
      description: string;
      href: string;
      tags: string; 
    }>;
  }>("/api/tags", {
    pagination: { pageSize: 200 },
  });

  if (!res || !res.data) return [];

  const items: SearchSection[] = res.data.map((entry) => {
    const rawTags = (entry.tags ?? "").trim();
    const tags = rawTags === "" ? [] : rawTags.split(/\s+/).map((t) => t.trim()).filter(Boolean);

    return {
      id: entry.id,
      identifier: entry.identifier,
      pageLabel: entry.pageLabel,
      sectionLabel: entry.sectionLabel,
      description: entry.description,
      tags,
      href: entry.href,
    };
  });

  return items;
}
