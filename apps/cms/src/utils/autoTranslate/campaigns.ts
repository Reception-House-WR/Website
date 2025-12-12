import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";

export const CAMPAIGNS_SECTION_UID = "donate.campaigns";
const CAMPAIGN_MODEL_UID = "api::campaign.campaign";

type StrapiId = string | number;

async function findLocalizedCampaignId(
  campaign: any,
  targetLocale: string
): Promise<StrapiId | null> {
  if (!campaign) return null;

  const documentId = campaign.documentId;
  if (!documentId) {
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
 * Translator for Campaigns component (donate.campaigns)
 * - Translates: title, description
 * - Maps "campaigns" manyWay relation to same campaigns in target locale
 */
export async function translateCampaignsSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: CAMPAIGNS_SECTION_UID,
  };

  const maybeTranslate = async (value: any): Promise<any> => {
    if (typeof value === "string" && value.trim().length > 0) {
      return translateText(value, SOURCE_LOCALE, targetLocale);
    }
    return value ?? "";
  };

  result.title = await maybeTranslate(section.title);
  result.description = await maybeTranslate(section.description);

  // campaigns relation (manyWay)
  const campaignsArray = Array.isArray((section as any).campaigns)
    ? (section as any).campaigns
    : [];
  const localizedCampaignIds: number[] = [];

  for (const campaign of campaignsArray) {
    const id = await findLocalizedCampaignId(campaign, targetLocale);
    if (id !== null) {
      localizedCampaignIds.push(Number(id));
    }
  }

  (result as any).campaigns = localizedCampaignIds;

  // copy cualquier otro campo
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "campaigns" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
