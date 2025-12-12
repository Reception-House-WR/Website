// src/utils/autoTranslate/webPage/storiesCarousel.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";


export const STORIES_CAROUSEL_UID = "stories.stories-carousel";
const STORY_MODEL_UID = "api::story.story";

/**
 * Helper: for a single Story relation, find the localized Story id
 * for the given target locale, using the same documentId.
 */
type StrapiId = string | number;
async function findLocalizedStoryId(
  story: any,
  targetLocale: string
): Promise<StrapiId | null> {
  if (!story) return null;

  const documentId = story.documentId;
  if (!documentId) {
    return typeof story.id === "number" ? story.id : null;
  }

  const [target] = await strapi.entityService.findMany(STORY_MODEL_UID, {
    filters: {
      documentId,
      locale: targetLocale,
    },
    limit: 1,
  });

  if (!target) return null;
  return target.id;
}

/**
 * Translator for storiesCarousel component.
 * - Translates title and description
 * - links "stories" relation to the same stories in the target locale.
 */
export async function translateStoriesCarouselSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: STORIES_CAROUSEL_UID,
  };

  // 1) Translate title
  if (typeof section.title === "string" && section.title.trim().length > 0) {
    result.title = await translateText(section.title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = section.title ?? "";
  }

  // 2) Translate description
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

  // 3) Map stories relation (many)
  const stories = Array.isArray(section.stories) ? section.stories : [];

  const localizedStoryIds: number[] = [];
  for (const story of stories) {
    const id = await findLocalizedStoryId(story, targetLocale);
    if (id !== null) {
      localizedStoryIds.push(Number(id));
    }
  }

  // Strapi usually expects an array of ids for many relations
  result.stories = localizedStoryIds;

  // 4) Copy any other fields (if exist)
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "stories" ||
      key === "id" 
    ) {
      continue;
    }
    result[key] = (section as any)[key];
  }

  return result;
}
