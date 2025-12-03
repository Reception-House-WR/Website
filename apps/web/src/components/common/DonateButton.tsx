import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { translateWithCache } from "@/lib/translation/service";

interface DonateButtonProps {
  lang: string;
}

export async function DonateButton({ lang }: DonateButtonProps) {
  const baseText = "Donate Now";

  let text = baseText;

  if (lang !== "en") {
    const [translated] = await translateWithCache([baseText], "en", lang);
    text = translated;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-in-right">
      <Button
        asChild
        size="lg"
        className="group rounded-full shadow-lg shadow-black/15 bg-[var(--rh-green-500)] text-black hover:bg-[var(--rh-green-400)]"
        aria-label={text}
      >
        <Link
          href="https://wl.donorperfect.net/weblink/weblink.aspx?name=E334923QE&id=3"
          aria-label={text}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heart
            className="h-5 w-5 mr-2 transition-transform group-hover:scale-110"
            fill="currentColor"
          />
          {text}
        </Link>
      </Button>
    </div>
  );
}
