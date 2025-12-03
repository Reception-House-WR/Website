// src/utils/autoTranslate/webPage/currentCampaign.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";


export const CURRENT_CAMPAIGN_UID = "donate.current-campaign";
const CAMPAIGN_MODEL_UID = "api::campaign.campaign";


//Helper: find the localized Campaign for a given documentId + targetLocale.
type StrapiId = string | number;
async function findLocalizedCampaignId(
  campaign: any,
  targetLocale: string
): Promise<StrapiId | null> {
  if (!campaign) return null;

  //Campaign can be an object (populated) or just an id
  const documentId = campaign.documentId;

  if (!documentId) {
    //If no documentId, we cannot safely map locales; return original id
    return typeof campaign.id === "number" ? campaign.id : null;
  }

  const [target] = await strapi.entityService.findMany(CAMPAIGN_MODEL_UID, {
    filters: {
      documentId,
      locale: targetLocale,
    },
    limit: 1,
  });

  if (!target) return null;
  return target.id;
}

/**
 * Translator for currentCampaign section.
 * - Translates "title"
 * - Links the "campaign" relation to the same documentId in the target locale.
 */
export async function translateCurrentCampaignSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: CURRENT_CAMPAIGN_UID,
  };

  // 1) Translate "title"
  const title = section.title;
  if (typeof title === "string" && title.trim().length > 0) {
    result.title = await translateText(title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = title ?? "";
  }

  // 2) Sync campaign relation using same documentId in target locale
  const campaign = section.campaign;
  const targetCampaignId = await findLocalizedCampaignId(
    campaign,
    targetLocale
  );

  if (targetCampaignId !== null) {
    //When sending data to Strapi, a relation usually expects an id or array of ids
    result.campaign = targetCampaignId;
  } else {
    //Fallback: keep original relation as-is (just in case)
    result.campaign = campaign;
  }

  // 3) Copy any other fields that might exist, just in case
  for (const key of Object.keys(section)) {
    if (key === "__component" || key === "title" || key === "campaign") {
      continue;
    }
    result[key] = (section as any)[key];
  }

  return result;
}
