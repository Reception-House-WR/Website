"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

type LanguageToggleProps = {
  currentLang: "en" | "fr"
  onToggle: () => void
  className?: string
}

export default function LanguageToggle({ currentLang, onToggle, className }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={className ?? "flex items-center gap-2"}
      aria-label={`Switch to ${currentLang === "en" ? "French" : "English"}`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{currentLang === "en" ? "FR" : "EN"}</span>
    </Button>
  )
}
