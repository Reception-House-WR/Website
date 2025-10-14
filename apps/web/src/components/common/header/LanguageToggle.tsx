// apps/web/src/components/common/LanguageToggle.tsx

"use client"

import { useState, useEffect } from "react" // 1. Import useState and useEffect
import { useTranslation } from "react-i18next"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'de', name: 'Deutsch' },
];

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  // 2. Create a state to track if the component has mounted on the client
  const [hasMounted, setHasMounted] = useState(false);

  // 3. This effect runs only on the client, after the initial render
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 4. If the component has not mounted yet, render nothing or a placeholder
  // This ensures the server and client render the same thing initially
  if (!hasMounted) {
    return null; 
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {/* Now this code only runs on the client, avoiding the mismatch */}
          <span className="font-medium">{i18n.language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={i18n.language === lang.code ? "font-bold" : ""}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}