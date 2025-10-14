
"use client"

import { Toolbar } from "./Toolbar"

export default function ClientToolbar() {
  const handleToggle = () => {
    console.log("Language toggled")
  }

  return <Toolbar currentLang="en" onLanguageToggle={handleToggle} />
}
