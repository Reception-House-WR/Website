import qs from "qs";

/**
 * Central helper function to fetch data from the Strapi API.
 * Handles base URL, authorization token, headers, error checking, and JSON parsing.
 * Uses Next.js default caching in production, 'no-store' in development.
 * @param path The API endpoint path (e.g., '/api/employees').
 * @param queryObject Query parameters object for qs.
 * @param fetchOptions Optional additional `fetch` options.
 * @returns The parsed JSON response data or null on error.
 */
export async function fetchApi<T>(
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
