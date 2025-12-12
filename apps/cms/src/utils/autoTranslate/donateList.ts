import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import { translateDonateItem } from "./donateItem";

/**
 * Translator for List component (title + items[])
 */
export async function translateDonateList(
  list: any,
  targetLocale: string
): Promise<any> {
  if (!list) return null;

  const result: any = {};

  if (list.__component) {
    result.__component = list.__component;
  }

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(list.title);

  const itemsArray = Array.isArray(list.items) ? list.items : [];
  const translatedItems: any[] = [];

  for (const item of itemsArray) {
    translatedItems.push(await translateDonateItem(item, targetLocale));
  }

  result.items = translatedItems;

  // copying others
  for (const key of Object.keys(list)) {
    if (
      key === "title" ||
      key === "items" ||
      key === "id" ||
      key === "__component"
    ) {
      continue;
    }
    result[key] = list[key];
  }

  return result;
}
