"use client"

import { useCallback } from "react"
import Logo from "./Logo"
import Search from "./Search"
import LanguageToggle from "./LanguageToggle"
import { MenuDesktop, MenuMobile } from "./Menu"

type ToolbarProps = {
  currentLang: "en" | "fr"
  onLanguageToggle: () => void
}

export const Toolbar = ({ currentLang, onLanguageToggle }: ToolbarProps) => {
  const handleSearch = useCallback((q: string) => {
    console.log("Searching for:", q)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MenuMobile />
            <Logo />
          </div>

          <Search onSearch={handleSearch} />

          <div className="hidden md:flex items-center gap-3">
            <MenuDesktop />
            <LanguageToggle currentLang={currentLang} onToggle={onLanguageToggle} />
          </div>
        </div>
      </div>
    </header>
  )
}
