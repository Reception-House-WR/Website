import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface DonateButtonProps {
  lang: string;
}

const translations = {
  en: "Donate Now",
  fr: "Faire un don",
};

export const DonateButton = ({ lang }: DonateButtonProps) => {
  const text = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-in-right">
      <Button
        size="lg"
        className="group rounded-full shadow-2xl bg-[var(--rh-yellow-500)] text-black hover:bg-[var(--rh-green-400)]"
        aria-label={text}
      >
        <Heart className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" fill="currentColor" />
        {text}
      </Button>
    </div>
  );
};