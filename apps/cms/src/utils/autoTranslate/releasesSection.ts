import type { WebPageSection } from "./index";
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";

export const RELEASES_SECTION_UID = "media-room.releases-section";
const PRESS_RELEASE_MODEL_UID = "api::press-release.press-release";

type StrapiId = string | number;

async function findLocalizedPressReleaseId(
  pressRelease: any,
  targetLocale: string
): Promise<StrapiId | null> {
  if (!pressRelease) return null;

  const documentId = pressRelease.documentId;
  if (!documentId) {
    return typeof pressRelease.id === "number" ? pressRelease.id : null;
  }

  const [target] = await strapi.entityService.findMany(
    PRESS_RELEASE_MODEL_UID,
    {
      filters: {
        documentId,
        locale: targetLocale,
      },
      limit: 1,
    }
  );

  if (!target) return null;
  return target.id;
}

/**
 * Translator for ReleasesSection (media-room.releases-section)
 * - Translates: title, description
 * - Maps pressReleases[] relation to same ids in target locale
 */
export async function translateReleasesSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: RELEASES_SECTION_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  const prsArray = Array.isArray((section as any).pressReleases)
    ? (section as any).pressReleases
    : [];
  const localizedIds: number[] = [];

  for (const pr of prsArray) {
    const id = await findLocalizedPressReleaseId(pr, targetLocale);
    if (id !== null) {
      localizedIds.push(Number(id));
    }
  }

  (result as any).pressReleases = localizedIds;

  // copy others
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "pressReleases" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
