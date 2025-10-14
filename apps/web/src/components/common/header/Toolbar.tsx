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
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* Mobile (<640) */}
        <div className="flex items-center h-16 sm:hidden">
          <div className="flex items-center gap-2 shrink-0">
            <MenuMobile />
            <div className="shrink-0">
              <Logo />
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 shrink-0">
            <Search onSearch={handleSearch} />
            <LanguageToggle currentLang={currentLang} onToggle={onLanguageToggle} />
          </div>
        </div>


        {/* Tablet+Desktop (≥640) */}
        <div className="hidden sm:flex h-16 items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="block lg:hidden">
              <MenuMobile />
            </div>

            <Logo />

            <div className="hidden lg:block">
              <MenuDesktop />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <div className="flex-1 min-w-0">
              <Search onSearch={handleSearch} />
            </div>
            <LanguageToggle currentLang={currentLang} onToggle={onLanguageToggle} />
          </div>
        </div>
      </div>
    </header>
  )
}
