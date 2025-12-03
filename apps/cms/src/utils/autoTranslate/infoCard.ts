// src/utils/autoTranslate/webPage/infoCard.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";

export const INFO_CARD_UID = "programs.info-card";

/**
 * Helper to translate Item (programs.item)
 * - Translates: value
 */
async function translateItem(
  item: any,
  targetLocale: string
): Promise<any> {
  const result: any = {};

  // keep __component if present
  if (item.__component) {
    result.__component = item.__component;
  }

  if (typeof item.value === "string" && item.value.trim().length > 0) {
    result.value = await translateText(item.value, SOURCE_LOCALE, targetLocale);
  } else {
    result.value = item.value ?? "";
  }

  //copy any other fields except id / value
  for (const key of Object.keys(item)) {
    if (key === "value" || key === "id" || key === "__component") continue;
    (result as any)[key] = (item as any)[key];
  }

  return result;
}

/**
 * Translator for InfoCard (programs.info-card)
 * - Translates: title, subtitle, description, subtitle2, description2
 * - Translates each items entry (Item)
 */
export async function translateInfoCardSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: INFO_CARD_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.subtitle = await maybeTranslate(section.subtitle);
  result.description = await maybeTranslate(section.description);
  result.subtitle2 = await maybeTranslate(section.subtitle2);
  result.description2 = await maybeTranslate(section.description2);

  // items (repeatable Item)
  const itemsArray = Array.isArray(section.items) ? section.items : [];
  const translatedItems: any[] = [];

  for (const item of itemsArray) {
    const translated = await translateItem(item, targetLocale);
    translatedItems.push(translated);
  }

  (result as any).items = translatedItems;

  //Copying other fields
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "subtitle" ||
      key === "description" ||
      key === "subtitle2" ||
      key === "description2" ||
      key === "items" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
