"use client"

import { SearchSection } from "@/lib/search/types"
import { Toolbar } from "./Toolbar"

export default function ClientToolbar({items}: {items: SearchSection[]}) {
  const handleToggle = () => {
    console.log("Language toggled")
  }

  return (
    <Toolbar 
      items={items}
      currentLang="en" 
      onLanguageToggle={handleToggle} 
    />
  )
}