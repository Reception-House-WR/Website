import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";

export const FEATURE_UID = "programs.feature";

/**
 * Translator for Feature (programs.feature)
 * - Translates: title, description
 * - Syncs: icon
 */
export async function translateFeature(
  feature: any,
  targetLocale: string
): Promise<any> {
  const result: any = {};

  if (feature.__component) {
    result.__component = feature.__component;
  }

  // title
  if (typeof feature.title === "string" && feature.title.trim().length > 0) {
    result.title = await translateText(
      feature.title,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.title = feature.title ?? "";
  }

  // description
  if (
    typeof feature.description === "string" &&
    feature.description.trim().length > 0
  ) {
    result.description = await translateText(
      feature.description,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.description = feature.description ?? "";
  }

  // icon (sync)
  result.icon = feature.icon;

  // copy others
  for (const key of Object.keys(feature)) {
    if (
      key === "title" ||
      key === "description" ||
      key === "icon" ||
      key === "id" ||
      key === "__component"
    ) {
      continue;
    }
    result[key] = feature[key];
  }

  return result;
}
