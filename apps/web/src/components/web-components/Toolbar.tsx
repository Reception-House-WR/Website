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
        <div className="flex h-16 items-center gap-4">
          {/* IZQUIERDA: menú + logo */}
          <div className="flex items-center gap-2 shrink-0">
            {/* botón hamburguesa solo mobile */}
            <div className="block min-[1000px]:hidden">
              <MenuMobile />
            </div>

            <Logo />

            {/* menú desktop a la izquierda */}
            <div className="hidden min-[1000px]:block">
              <MenuDesktop />
            </div>
          </div>

          {/* DERECHA: empujado con ml-auto */}
          <div className="ml-auto flex items-center gap-3 shrink-0">
            <Search onSearch={handleSearch} />
            <LanguageToggle currentLang={currentLang} onToggle={onLanguageToggle} />
          </div>
        </div>
      </div>
    </header>
  )
}
