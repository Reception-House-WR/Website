"use client";

import { SearchSection } from "@/lib/search/types"
import { Toolbar } from "./Toolbar"
import { StrapiLocale } from "@/lib/strapi/helpers/localesHelper";
import { NavItem } from "@/lib/strapi/helpers/navHelper";

export default function ClientToolbar({items, locales, nav, currentLocale}: {items: SearchSection[], locales: StrapiLocale[], nav: NavItem[], currentLocale: string}) {

  return (
    <Toolbar 
      items={items}
      currentLocale={currentLocale} 
      locales={locales}
      nav={nav}
    />
  )
}