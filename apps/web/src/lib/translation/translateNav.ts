// lib/translation/translateNav.ts
import { NAV, NavItem } from "@/lib/strapi/helpers/navHelper";
import { translateWithCache } from "@/lib/translation/service";

/**
 * Recursively translate the NAV items (label + description) using Azure translator + cache.
 */
export async function getTranslatedNav(locale: string): Promise<NavItem[]> {
  // English stays the same
  if (locale === "en") return NAV;

  // Flatten all label/description strings
  const strings: string[] = [];

  function collect(item: NavItem) {
    if (item.label) strings.push(item.label);
    if (item.description) strings.push(item.description);
    if (item.children) item.children.forEach(collect);
  }

  NAV.forEach(collect);

  // Translate everything in one API call (no HTTP, direct service call)
  const translated = await translateWithCache(strings, "en", locale);

  // Rebuild the NAV using translated strings
  let index = 0;
  function rebuild(item: NavItem): NavItem {
    const newItem: NavItem = {
      ...item,
      label: translated[index++],
      href: item.href, // NOT translated
      description: item.description ? translated[index++] : undefined,
      children: item.children ? item.children.map(rebuild) : undefined,
    };

    return newItem;
  }

  const translatedNav = NAV.map(rebuild);
  return translatedNav;
}
