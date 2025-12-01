import type { WebPageSection } from "./index";
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import { translateKitCard } from "./kitCard";

export const MEDIA_KIT_SECTION_UID = "media-room.media-kit-section";

/**
 * Translator for MediaKitSection
 * - Translates: title, description
 * - Translates: kits[] (KitCard)
 */
export async function translateMediaKitSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: MEDIA_KIT_SECTION_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  const kitsArray = Array.isArray((section as any).kits)
    ? (section as any).kits
    : [];
  const translatedKits: any[] = [];

  for (const kit of kitsArray) {
    translatedKits.push(await translateKitCard(kit, targetLocale));
  }

  (result as any).kits = translatedKits;

  // copy others
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "kits" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
