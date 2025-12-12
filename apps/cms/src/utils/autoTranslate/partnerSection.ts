import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";
import { syncPartner } from "./partner";

export const PARTNER_SECTION_UID = "programs.partner-section";

/**
 * Translator for PartnerSection (programs.partner-section)
 * - Translates: title, description
 * - Syncs: partners[] via syncPartner
 */
export async function translatePartnerSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: PARTNER_SECTION_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  // partners (repeatable Partner, sync)
  const partnersArr = Array.isArray((section as any).partners)
    ? (section as any).partners
    : [];
  const syncedPartners: any[] = [];

  for (const partner of partnersArr) {
    const synced = await syncPartner(partner, targetLocale);
    syncedPartners.push(synced);
  }

  (result as any).partners = syncedPartners;

  // copy otros campos
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "partners" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
