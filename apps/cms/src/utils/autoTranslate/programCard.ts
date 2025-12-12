// src/utils/autoTranslate/webPage/programCard.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { translateListItem } from "./listItem";

export const PROGRAM_CARD_UID = "programs.program-card";

/**
 * Translator for ProgramCard (programs.program-card)
 * - Translates: title, description
 * - steps: repeatable ListItem (key, value translated)
 * - button: translate label, sync url
 * - image: sync
 */
export async function translateProgramCardSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: PROGRAM_CARD_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  // top-level text
  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  // steps: repeatable ListItem
  const stepsArray = Array.isArray((section as any).steps)
    ? (section as any).steps
    : [];
  const translatedSteps: any[] = [];

  for (const step of stepsArray) {
    const translatedStep = await translateListItem(step, targetLocale);
    translatedSteps.push(translatedStep);
  }

  (result as any).steps = translatedSteps;

  // button: object with label (translate) and url (sync)
  const button = (section as any).button;
  if (button) {
    const translatedButton: any = {};

    if (typeof button.label === "string" && button.label.trim().length > 0) {
      translatedButton.label = await translateText(
        button.label,
        SOURCE_LOCALE,
        targetLocale
      );
    } else {
      translatedButton.label = button.label ?? "";
    }

    // url sync
    translatedButton.url = button.url;

    // copy other button props
    for (const key of Object.keys(button)) {
      if (key === "label" || key === "url") continue;
      translatedButton[key] = button[key];
    }

    (result as any).button = translatedButton;
  } else {
    (result as any).button = null;
  }

  // image sync
  (result as any).image = (section as any).image ?? null;

  // copy other fields
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "steps" ||
      key === "button" ||
      key === "image" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
