import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";

export const LIST_ITEM_UID = "programs.list-item";

/**
 * Translator for ListItem (programs.list-item)
 * - Translates: key, value
 * - This is a helper used by ListCard and ProgramCard (no direct section).
 */
export async function translateListItem(
  item: any,
  targetLocale: string
): Promise<any> {
  const result: any = {};

  if (item.__component) {
    result.__component = item.__component;
  }

  if (typeof item.key === "string" && item.key.trim().length > 0) {
    result.key = await translateText(item.key, SOURCE_LOCALE, targetLocale);
  } else {
    result.key = item.key ?? "";
  }

  if (typeof item.value === "string" && item.value.trim().length > 0) {
    result.value = await translateText(item.value, SOURCE_LOCALE, targetLocale);
  } else {
    result.value = item.value ?? "";
  }

  // copying other fields except id / key / value
  for (const key of Object.keys(item)) {
    if (key === "key" || key === "value" || key === "id" || key === "__component") {
      continue;
    }
    result[key] = item[key];
  }

  return result;
}
