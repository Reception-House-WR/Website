import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";

/**
 * Generic translator for Item with a value field
 * (used in ListCardsSection y DropOffCard)
 */
export async function translateDonateItem(
  item: any,
  targetLocale: string
): Promise<any> {
  if (!item) return null;

  const result: any = {};

  if (item.__component) {
    result.__component = item.__component;
  }

  if (typeof item.value === "string" && item.value.trim().length > 0) {
    result.value = await translateText(item.value, SOURCE_LOCALE, targetLocale);
  } else {
    result.value = item.value ?? "";
  }

  // Copy others
  for (const key of Object.keys(item)) {
    if (key === "value" || key === "id" || key === "__component") continue;
    result[key] = item[key];
  }

  return result;
}
