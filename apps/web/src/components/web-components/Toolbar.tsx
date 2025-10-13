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
    <div className="flex h-16 items-center justify-between gap-4">
  <div className="flex items-center gap-2 shrink-0">
    <MenuMobile />
    <Logo />
  </div>

  {/* 👇 El buscador ocupa el espacio restante sin sobresalir */}
  <div className="flex-1 min-w-[180px]">
    <Search onSearch={handleSearch} />
  </div>

  <div className="hidden md:flex items-center gap-3 shrink-0">
    <MenuDesktop />
    <LanguageToggle currentLang={currentLang} onToggle={onLanguageToggle} />
  </div>
</div>
  )
}
