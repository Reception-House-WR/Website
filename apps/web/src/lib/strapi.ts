// src/lib/strapi.ts
import qs from "qs";
import { unstable_noStore as noStore } from "next/cache";

// --- Strapi API Response Type Definitions ---

interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

interface StrapiImageData {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

interface PageHeroDirectAttributes {
  id: number;
  title: string;
  description: string | null;
  pageIdentifier: string;
  backgroundImage: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
}

interface EmployeeDirectAttributes {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  imageUrl: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
}

interface TextSectionDirectAttributes {
  title: string;
  description: string; // Rich Text content
  sectionIdentifier: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface TimelineEventDirectAttributes {
  year: string;
  title: string;
  description: string; // Rich Text content
  image: StrapiImageData | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Add this interface after TimelineEventDirectAttributes
interface EventDirectAttributes {
  id: number;
  title: string;
  description: string; // Rich Text content
  date: string; // Strapi Date field
  time: string;
  location: string;
  image: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiDataItem<T> {
  id: number;
  documentId?: string;
  [key: string]: unknown;
}

interface StrapiResponse<T> {
  data: (StrapiDataItem<T> & T)[] | null;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
// --- End Strapi Types ---

// --- Frontend Data Shape Definitions ---

export interface HeroData {
  title: string;
  description: string;
  imageUrl: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  imageUrl: string | null;
}

export interface TextSectionData {
  title: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  imageUrl: string | null;
  order: number;
}

// Add this interface after TimelineEvent
export interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string | null;
  category: "upcoming" | "past";
}
// --- End Frontend Data Shapes ---

// --- Utility Functions ---

/**
 * Constructs the full URL for Strapi media assets.
 * @param mediaData The Strapi media object.
 * @returns The full URL or null if invalid.
 */
export function getStrapiMedia(
  mediaData: StrapiImageData | null
): string | null {
  if (!mediaData?.url) {
    return null;
  }
  const url = mediaData.url;
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  return url.startsWith("/") ? `${strapiUrl}${url}` : url;
}

/**
 * Central helper function to fetch data from the Strapi API.
 * Handles base URL, authorization token, headers, error checking, and JSON parsing.
 * Uses Next.js default caching in production, 'no-store' in development.
 * @param path The API endpoint path (e.g., '/api/employees').
 * @param queryObject Query parameters object for qs.
 * @param fetchOptions Optional additional `fetch` options.
 * @returns The parsed JSON response data or null on error.
 */
async function fetchApi<T>(
  path: string,
  queryObject: Record<string, unknown> = {},
  fetchOptions: RequestInit = {}
): Promise<T | null> {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const strapiToken = process.env.STRAPI_API_TOKEN;

  const query = qs.stringify(queryObject, { encodeValuesOnly: true });
  const apiUrl = `${strapiUrl}${path}${query ? `?${query}` : ""}`;

  const headers = new Headers({
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  });
  if (strapiToken) {
    headers.set("Authorization", `Bearer ${strapiToken}`);
  }

  const cacheOption =
    process.env.NODE_ENV === "development" ? "no-store" : "default";

  const options: RequestInit = {
    headers,
    cache: fetchOptions.cache ?? cacheOption,
    ...fetchOptions,
  };

  try {
    const res = await fetch(apiUrl, options);

    if (!res.ok) {
      console.error(
        `Strapi fetch error (${path}):`,
        res.status,
        await res.text()
      );
      return null;
    }

    const json: T = await res.json();
    return json;
  } catch (error) {
    console.error(`Error fetching Strapi (${path}):`, error);
    return null;
  }
}

// --- Specific Data Fetching Functions ---

/**
 * Fetches hero content for a specific page identifier.
 * @param identifier The unique identifier for the page hero entry.
 * @returns HeroData object or null.
 */
export async function fetchPageHero(
  identifier: string
): Promise<HeroData | null> {
  const path = "/api/page-heroes"; // NOTE: Using specific endpoint name from previous steps
  const params = {
    filters: { pageIdentifier: { $eq: identifier } },
    populate: { backgroundImage: true },
  };

  const json = await fetchApi<StrapiResponse<PageHeroDirectAttributes>>(
    path,
    params
  );

  if (!json || !json.data || json.data.length === 0) {
    console.warn(`No page hero found for identifier: ${identifier}`);
    return null;
  }

  const heroAttributes = json.data[0];
  const imageUrl = getStrapiMedia(heroAttributes.backgroundImage);

  return {
    title: heroAttributes.title || "Default Title",
    description: heroAttributes.description || "Default description.",
    imageUrl: imageUrl || "/assets/default-hero.jpg", // Fallback image
  };
}

/**
 * Fetches a unique, sorted list of department names from employee data.
 * Includes "All" as the first item.
 * @returns Array of department strings.
 */
export async function fetchDepartments(): Promise<string[]> {
  const path = "/api/employees";
  const params = {
    fields: ["department"],
    pagination: { pageSize: 1000 }, // Fetch enough employees to get all unique departments
  };

  const json = await fetchApi<StrapiResponse<{ department: string }>>(
    path,
    params
  );

  if (!json || !json.data) {
    console.warn(
      "No department data returned from Strapi for fetchDepartments."
    );
    return ["All"];
  }

  const departmentNames = json.data
    .map((item) => item.department)
    .filter((dept): dept is string => !!dept);

  const uniqueDepartments = Array.from(new Set(departmentNames)).sort();

  return ["All", ...uniqueDepartments];
}

/**
 * Fetches the list of all published employees, sorted by name.
 * @returns Array of Employee objects or null on error (returns empty array if no data found).
 */
export async function fetchEmployees(): Promise<Employee[] | null> {
  const path = "/api/employees";
  const params = {
    populate: { imageUrl: true },
    sort: ["name:asc"],
    pagination: { pageSize: 100 }, // Adjust if expecting more employees
  };

  const json = await fetchApi<StrapiResponse<EmployeeDirectAttributes>>(
    path,
    params
  );

  if (!json) return null; // Fetch error occurred in fetchApi
  if (!json.data) {
    console.warn("No employee data array returned from Strapi.");
    return []; // Return empty array if data field is missing/null
  }

  const employees: Employee[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.imageUrl);
    return {
      id: item.id,
      name: item.name || "Unknown",
      role: item.role || "Unknown",
      department: item.department || "Unknown",
      email: item.email || "Unknown",
      imageUrl: imageUrl,
    };
  });

  return employees;
}

/**
 * Fetches a specific Text Section entry based on its identifier.
 * @param identifier The unique identifier for the text section entry.
 * @returns TextSectionData object or null.
 */
export async function fetchTextSection(
  identifier: string
): Promise<TextSectionData | null> {
  const path = "/api/text-sections";
  const params = {
    filters: { sectionIdentifier: { $eq: identifier } },
  };

  const json = await fetchApi<StrapiResponse<TextSectionDirectAttributes>>(
    path,
    params
  );

  if (!json || !json.data || json.data.length === 0) {
    console.warn(`No text section found for identifier: ${identifier}`);
    return null;
  }

  const sectionAttributes = json.data[0];

  return {
    title: sectionAttributes.title || `Title for ${identifier}`,
    description:
      sectionAttributes.description || `Description for ${identifier}`,
  };
}

/**
 * Fetches all published Timeline Events, sorted by the 'order' field.
 * @returns Array of TimelineEvent objects or null on error (returns empty array if no data found).
 */
export async function fetchTimelineEvents(): Promise<TimelineEvent[] | null> {
  const path = "/api/timeline-events";
  const params = {
    sort: ["order:asc"],
    populate: { image: true },
    pagination: { pageSize: 50 }, // Adjust if expecting more events
  };

  const json = await fetchApi<StrapiResponse<TimelineEventDirectAttributes>>(
    path,
    params
  );

  if (!json) return null; // Fetch error occurred in fetchApi
  if (!json.data) {
    console.warn("No timeline event data array returned from Strapi.");
    return []; // Return empty array if data field is missing/null
  }

  const timelineEvents: TimelineEvent[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.image);
    return {
      year: item.year || "Unknown Year",
      title: item.title || "Untitled Event",
      description: item.description || "",
      imageUrl: imageUrl,
      order: item.order || 0,
    };
  });

  return timelineEvents;
}

/**
 * Fetches all published Events, sorted by date (newest first).
 * Automatically calculates the 'category' (upcoming/past).
 * @returns Array of Event objects or null on error (returns empty array if no data found).
 */
export async function fetchEvents(): Promise<Event[] | null> {
  const path = "/api/events";
  const params = {
    sort: ["date:desc"],
    populate: { image: true },
    pagination: { pageSize: 50 }, // Adjust if expecting more events
  };

  const json = await fetchApi<StrapiResponse<EventDirectAttributes>>(
    path,
    params,
    {
      // Ensure events are always fresh, overriding the default cache
      cache: "no-store",
    }
  );

  if (!json) return null; // Fetch error occurred in fetchApi
  if (!json.data) {
    console.warn("No event data array returned from Strapi.");
    return []; // Return empty array if data field is missing/null
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

  const events: Event[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.image);

    // Determine category
    const eventDate = new Date(item.date);
    const category = eventDate < today ? "past" : "upcoming";

    return {
      title: item.title || "Untitled Event",
      description: item.description || "",
      date: item.date, // Pass the "YYYY-MM-DD" string directly
      time: item.time || "TBD",
      location: item.location || "TBD",
      image: imageUrl,
      category: category,
    };
  });

  return events;
}
