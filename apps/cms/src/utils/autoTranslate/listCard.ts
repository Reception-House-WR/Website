import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateListItem } from "./listItem";

export const LIST_CARD_UID = "common.list-card";

/**
 * Translator for ListCard (common.list-card)
 * - Translates: title, description
 * - Translates: items (repeatable ListItem)
 */
export async function translateListCardSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: LIST_CARD_UID,
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

  // items (repeatable programs.list-item)
  const itemsArray = Array.isArray(section.items) ? section.items : [];
  const translatedItems: any[] = [];

  for (const item of itemsArray) {
    const translated = await translateListItem(item, targetLocale);
    translatedItems.push(translated);
  }

  (result as any).items = translatedItems;

  // copy any other fields
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "items" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
