// src/lib/strapi.ts
import qs from "qs";

// --- Strapi API Response Type Definitions ---

// Represents image format details (e.g., thumbnail, small)
interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  // Add other format properties if needed
}

// Represents the main Strapi media object structure
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
  url: string; // The main relative URL
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
}

// Represents the expected fields for the 'Page Hero' content type
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

// Represents the expected fields for the 'Employee' content type
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

// Represents a single item in the 'data' array (without 'attributes' nesting)
interface StrapiDataItem<T> {
  id: number;
  documentId?: string;
  [key: string]: any;
}

// Represents the overall Strapi API response structure
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

// Clean data structure for Hero components
export interface HeroData {
  title: string;
  description: string;
  imageUrl: string;
}

// Clean data structure for Employee components
export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  imageUrl: string | null;
}
// --- End Frontend Data Shapes ---

// --- Utility Functions ---

/**
 * Constructs the full URL for Strapi media assets.
 * @param mediaData - The Strapi media object.
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
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"; // Fallback for safety
  // Prepend base URL if URL is relative
  return url.startsWith("/") ? `${strapiUrl}${url}` : url;
}

/**
 * Central helper function to fetch data from the Strapi API.
 * Handles base URL, authorization token, headers, error checking, and JSON parsing.
 * Uses Next.js default caching in production, 'no-store' in development.
 * @param path - The API endpoint path (e.g., '/api/employees').
 * @param queryObject - Query parameters object for qs.
 * @param fetchOptions - Optional additional `fetch` options.
 * @returns The parsed JSON response data or null on error.
 */
async function fetchApi<T>(
  path: string,
  queryObject: Record<string, any> = {},
  fetchOptions: RequestInit = {}
): Promise<T | null> {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const strapiToken = process.env.STRAPI_API_TOKEN;

  // Build query string
  const query = qs.stringify(queryObject, { encodeValuesOnly: true });
  const apiUrl = `${strapiUrl}${path}${query ? `?${query}` : ""}`;

  // Set up headers
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  });
  if (strapiToken) {
    headers.set("Authorization", `Bearer ${strapiToken}`);
  }

  // Set cache options based on environment
  const cacheOption =
    process.env.NODE_ENV === "development" ? "no-store" : "default"; // 'default' allows Next.js caching

  const options: RequestInit = {
    headers,
    cache: fetchOptions.cache ?? cacheOption, // Allow overriding cache via fetchOptions
    ...fetchOptions, // Merge other fetch options
  };

  try {
    // Make the API request
    // console.log(`Fetching Strapi (${path}):`, apiUrl); // Keep for debugging if needed, remove for production
    const res = await fetch(apiUrl, options);

    // Handle HTTP errors
    if (!res.ok) {
      console.error(
        `Strapi fetch error (${path}):`,
        res.status,
        await res.text() // Log error response body
      );
      return null;
    }

    // Parse and return successful response
    const json: T = await res.json();
    return json;
  } catch (error) {
    // Handle network or other fetch errors
    console.error(`Error fetching Strapi (${path}):`, error);
    return null;
  }
}

// --- Specific Data Fetching Functions ---

/**
 * Fetches hero content for a specific page identifier.
 * @param identifier - The unique identifier for the page hero entry.
 * @returns HeroData object or null.
 */
export async function fetchPageHero(
  identifier: string
): Promise<HeroData | null> {
  const path = "/api/our-people-heroes"; // Specific endpoint for heroes
  const params = {
    filters: { pageIdentifier: { $eq: identifier } },
    populate: { backgroundImage: true },
  };

  const json = await fetchApi<StrapiResponse<PageHeroDirectAttributes>>(
    path,
    params
  );

  if (!json || !json.data || json.data.length === 0) {
    console.warn(`No page hero found in Strapi for identifier: ${identifier}`);
    return null;
  }

  const heroAttributes = json.data[0];

  // Handle potentially missing image gracefully
  const imageUrl = getStrapiMedia(heroAttributes.backgroundImage);

  return {
    title: heroAttributes.title || "Default Title", // Provide fallbacks
    description: heroAttributes.description || "Default description.",
    imageUrl: imageUrl || "/assets/default-hero.jpg", // Use fallback image
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
    fields: ["department"], // Only fetch the department field
    pagination: { pageSize: 1000 }, // Fetch a large number to likely get all unique departments
  };

  const json = await fetchApi<StrapiResponse<{ department: string }>>(
    path,
    params
  );

  if (!json || !json.data) {
    console.warn(
      "No department data returned from Strapi for fetchDepartments."
    );
    return ["All"]; // Return default on failure
  }

  // Process the department names
  const departmentNames = json.data
    .map((item) => item.department)
    .filter((dept): dept is string => !!dept); // Remove null/undefined

  const uniqueDepartments = Array.from(new Set(departmentNames)).sort();

  return ["All", ...uniqueDepartments]; // Prepend "All"
}

/**
 * Fetches the list of all published employees, sorted by name.
 * @returns Array of Employee objects or null on error.
 */
export async function fetchEmployees(): Promise<Employee[] | null> {
  const path = "/api/employees";
  const params = {
    populate: { imageUrl: true }, // Populate the image field
    sort: ["name:asc"], // Sort by name
    pagination: { pageSize: 100 }, // Adjust pageSize if more than 100 employees expected
  };

  const json = await fetchApi<StrapiResponse<EmployeeDirectAttributes>>(
    path,
    params
  );

  if (!json || !json.data) {
    console.warn("No employee data returned from Strapi.");
    return []; // Return empty array if fetch fails or no data
  }

  // Map Strapi data to the clean Employee type
  const employees: Employee[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.imageUrl);
    return {
      id: item.id,
      name: item.name || "Unknown", // Provide fallbacks
      role: item.role || "Unknown",
      department: item.department || "Unknown",
      email: item.email || "Unknown",
      imageUrl: imageUrl, // Will be null if image missing or getStrapiMedia fails
    };
  });

  return employees; // Return the mapped array
}
