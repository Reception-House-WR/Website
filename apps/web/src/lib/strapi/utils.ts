import { type StrapiImageData } from "./types";

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
    process.env["STRAPI_URL"] || "http://localhost:1337";
  return url.startsWith("/") ? `${strapiUrl}${url}` : url;
}
