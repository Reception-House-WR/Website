export const PARTNER_UID = "programs.partner";

/**
 * Helper for Partner (programs.partner)
 * - Syncs: name, logo, url
 * - No translation.
 */
export async function syncPartner(
  partner: any,
  _targetLocale: string
): Promise<any> {
  const result: any = {};

  if (partner.__component) {
    result.__component = partner.__component;
  }

  result.name = partner.name;
  result.logo = partner.logo;
  result.url = partner.url;

  // copy otros campos excepto id
  for (const key of Object.keys(partner)) {
    if (
      key === "name" ||
      key === "logo" ||
      key === "url" ||
      key === "id" ||
      key === "__component"
    ) {
      continue;
    }
    result[key] = partner[key];
  }

  return result;
}
