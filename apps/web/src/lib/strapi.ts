// src/lib/strapi.ts
import qs from "qs"; // Ensure installed: pnpm add qs @types/qs

// --- Types matching your ACTUAL Strapi API response ---

// Represents image format details (like thumbnail, small, etc.)
interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  // Add other format properties if needed (ext, mime, size, etc.)
}

// Represents the full image object as returned directly in your JSON
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

// Represents the fields directly under data[0] in your JSON response for Page Hero
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

// --- ADDED: Represents the fields directly under data[x] for an Employee ---
interface EmployeeDirectAttributes {
  id: number;
  name: string;
  role: string;
  department: string; // Assuming 'department' is a simple text field in Strapi
  email: string;
  // imageUrl is the image object directly, or null
  imageUrl: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
  // Add any other direct fields for employees here
}
// --- END ADDED ---

// Represents one item in the main "data" array (NO attributes nesting)
interface StrapiDataItem<T> {
  id: number;
  documentId?: string;
  [key: string]: any; // Allow other properties implicitly defined by T
}

// Defines the overall Strapi API response structure
interface StrapiResponse<T> {
  data: (StrapiDataItem<T> & T)[] | null; // Data is an array of items merging StrapiDataItem and T
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

// Defines the clean data structure your frontend component will use for Hero
export interface HeroData {
  title: string;
  description: string;
  imageUrl: string;
}

// --- ADDED: Defines the clean data structure for Employee ---
export interface Employee {
  id: number; // Good practice to include ID
  name: string;
  role: string;
  department: string;
  email: string;
  imageUrl: string | null; // Use null for missing images
}
// --- END ADDED ---

// Helper to get the full image URL from the direct image object
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

// --- Main Fetching Function for Hero ---
export async function fetchPageHero(
  identifier: string
): Promise<HeroData | null> {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const strapiToken = process.env.STRAPI_API_TOKEN;

  const query = qs.stringify(
    {
      filters: { pageIdentifier: { $eq: identifier } },
      populate: { backgroundImage: true },
    },
    { encodeValuesOnly: true }
  );

  // --- ADD THIS try...catch BLOCK BACK ---
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (strapiToken) {
    headers["Authorization"] = `Bearer ${strapiToken}`;
  }

  try {
    const apiUrl = `${strapiUrl}/api/our-people-heroes?${query}`;
    console.log("Fetching Strapi Hero:", apiUrl);
    const res = await fetch(apiUrl, { headers, cache: "no-store" });

    if (!res.ok) {
      console.error("Strapi Hero fetch error:", res.status, await res.text());
      return null; // Return null on error
    }

    const json: StrapiResponse<PageHeroDirectAttributes> = await res.json();
    console.log("Strapi Hero Response JSON:", JSON.stringify(json, null, 2));

    if (!json.data || json.data.length === 0) {
      console.warn(`No page hero found for identifier: ${identifier}`);
      return null; // Return null if not found
    }

    const heroAttributes = json.data[0];
    console.log("Extracted Hero Attributes (Direct):", heroAttributes);

    if (!heroAttributes.backgroundImage) {
      console.warn("Hero backgroundImage missing:", heroAttributes);
      // Return data with fallback image if image is missing
      return {
        title: heroAttributes.title || "Default Title",
        description: heroAttributes.description || "Default description.",
        imageUrl: "/assets/default-hero.jpg",
      };
    }

    const imageUrl = getStrapiMedia(heroAttributes.backgroundImage);

    // Return the successfully fetched and processed data
    return {
      title: heroAttributes.title || "Default Title",
      description: heroAttributes.description || "Default description.",
      imageUrl: imageUrl || "/assets/default-hero.jpg",
    };
  } catch (error) {
    console.error(`Error fetching page hero (${identifier}):`, error);
    return null; // Return null on any other error
  }
  // --- END ADDED BLOCK ---
} // <-- Closing brace for fetchPageHero
// --- ADDED: Fetching Function for Departments ---
export async function fetchDepartments(): Promise<string[]> {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const strapiToken = process.env.STRAPI_API_TOKEN;

  // Query to fetch only the 'department' field from all employees
  const query = qs.stringify(
    {
      fields: ["department"], // Only request the department field
      pagination: {
        pageSize: 100, // Get all employees
      },
    },
    { encodeValuesOnly: true }
  );

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (strapiToken) {
    headers["Authorization"] = `Bearer ${strapiToken}`;
  }

  try {
    // Use the same employees endpoint
    const apiUrl = `${strapiUrl}/api/employees?${query}`;
    console.log("Fetching Strapi Departments:", apiUrl);

    const res = await fetch(apiUrl, { headers, cache: "no-store" });

    if (!res.ok) {
      console.error(
        "Strapi Departments fetch error:",
        res.status,
        await res.text()
      );
      return ["All"]; // Return default on error
    }

    // We only care about the 'department' field, adjust type slightly
    const json: StrapiResponse<{ department: string }> = await res.json();
    console.log(
      "Strapi Departments Response JSON:",
      JSON.stringify(json, null, 2)
    );

    if (!json.data) {
      return ["All"]; // Return default if no data
    }

    // Extract department names, make them unique, and sort
    const departmentNames = json.data
      .map((item) => item.department) // Get department string from each item
      .filter((dept): dept is string => !!dept); // Filter out any null/undefined departments

    // Create a unique set of names and convert back to an array
    const uniqueDepartments = Array.from(new Set(departmentNames)).sort();

    // Add "All" to the beginning
    const finalDepartments = ["All", ...uniqueDepartments];

    console.log("Fetched Departments:", finalDepartments);
    return finalDepartments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return ["All"]; // Return default on error
  }
}
// --- END ADDED ---
// --- Fetching Function for Employees ---
export async function fetchEmployees(): Promise<Employee[] | null> {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const strapiToken = process.env.STRAPI_API_TOKEN;

  const query = qs.stringify(
    {
      populate: { imageUrl: true },
      sort: ["name:asc"],
      pagination: {
        pageSize: 100, // Fetch up to 100 employees
        // limit: -1, // Or try limit: -1 again
      },
    },
    { encodeValuesOnly: true }
  );

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (strapiToken) {
    headers["Authorization"] = `Bearer ${strapiToken}`;
  }

  try {
    const apiUrl = `${strapiUrl}/api/employees?${query}`;
    console.log("Fetching Strapi Employees:", apiUrl);
    const res = await fetch(apiUrl, { headers, cache: "no-store" });

    if (!res.ok) {
      console.error(
        "Strapi Employees fetch error:",
        res.status,
        await res.text()
      );
      return null;
    }

    const json: StrapiResponse<EmployeeDirectAttributes> = await res.json();
    console.log(
      "Strapi Employees Response JSON:",
      JSON.stringify(json, null, 2)
    );

    if (!json.data) {
      console.warn("No employee data returned from Strapi.");
      return [];
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

    console.log("Mapped Employees:", employees);
    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return null;
  }
} // <-- Closing brace for fetchEmployees
