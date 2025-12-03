// components/LanguageToggle.tsx
"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { set } from "zod";

type LocaleOption = {
  code: string;
  name: string;
  isDefault?: boolean;
};

type LanguageToggleProps = {
  currentLocale: string;
  locales: LocaleOption[];
  className?: string;
};

export default function LanguageToggle({
  currentLocale,
  locales,
  className,
}: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLabel, setCurrentLabel] = useState(
    locales.find((l) => l.code === currentLocale)?.code?.toUpperCase() ??
      currentLocale.toUpperCase()
  );

  const handleSelectLocale = (nextLocale: string) => {
    if (!pathname) return;

    const segments = pathname.split("/");

    // segments: ["", "en", "about", "our-people"]
    // replace the locale segment (index 1)
    if (segments.length > 1) {
      segments[1] = nextLocale;
    } else {
      segments.push(nextLocale);
    }

    const newPath = segments.join("/") || `/${nextLocale}`;
    router.push(newPath);
    setCurrentLabel(nextLocale.toUpperCase());
  };

  console.log("Rendering LanguageToggle with currentLocale:", currentLocale);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={className ?? "flex items-center gap-2"}
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">{currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleSelectLocale(locale.code)}
            className="flex items-center justify-between gap-2"
          >
            <span>{locale.name}</span>
            <span className="text-xs text-muted-foreground uppercase">
              {locale.code}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
