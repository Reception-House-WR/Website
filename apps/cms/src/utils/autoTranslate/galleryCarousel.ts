import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";

export const GALLERY_CAROUSEL_UID = "common.gallery-carousel";

/**
 * Translator for GalleryCarousel
 * - Translates: title, description
 * - Syncs: gallery (array of media)
 */
export async function translateGalleryCarouselSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: GALLERY_CAROUSEL_UID,
  };

  // title
  if (typeof section.title === "string" && section.title.trim().length > 0) {
    result.title = await translateText(section.title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = section.title ?? "";
  }

  // description
  if (
    typeof section.description === "string" &&
    section.description.trim().length > 0
  ) {
    result.description = await translateText(
      section.description,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.description = section.description ?? "";
  }

  // gallery (multiple media) => sync
  (result as any).gallery = section.gallery;

  // copy otros campos
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "gallery" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
