import { loadSectionsIndex } from "@/lib/search/loadSectionsIndex";
import ClientToolbar from "./ClientToolbar";
import { StrapiLocale } from "@/lib/strapi/helpers/localesHelper";
import { NavItem } from "@/lib/strapi/helpers/navHelper";

export default async function ToolbarServer({
  locales,
  nav,
  currentLocale
}: {
  locales: StrapiLocale[];
  nav: NavItem[];
  currentLocale: string;
}) {
  const SECTIONS_INDEX = await loadSectionsIndex();

  console.log("Section Index", SECTIONS_INDEX);

  return <ClientToolbar locales={locales} nav={nav} items={SECTIONS_INDEX} currentLocale={currentLocale} />;
}