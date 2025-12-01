import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";

/**
 * Translator for KitCard (repeatable component)
 * - Translates: title, description
 * - Syncs: icon, kit (media)
 */
export async function translateKitCard(
  kitCard: any,
  targetLocale: string
): Promise<any> {
  if (!kitCard) return null;

  const result: any = {};

  if (kitCard.__component) {
    result.__component = kitCard.__component;
  }

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(kitCard.title);
  result.description = await maybeTranslate(kitCard.description);

  // sync
  result.icon = kitCard.icon;
  result.kit = kitCard.kit;

  // copiy other fields
  for (const key of Object.keys(kitCard)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "icon" ||
      key === "kit" ||
      key === "id"
    ) {
      continue;
    }
    result[key] = kitCard[key];
  }

  return result;
}
