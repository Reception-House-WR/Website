// src/app/donate/components/CtaSection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaSection({
  title,
  desc,
  buttonText,
  buttonUrl
}:{
  title: string;
  desc: string;
  buttonText: string;
  buttonUrl: string;
}) {
  return (
    <section className="py-16 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto max-w-3xl text-center animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-95 text-[var(--muted-foreground)]">
          {desc}
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="font-semibold text-lg bg-[var(--rh-green-500)] text-black hover:bg-[var(--rh-green-400)]"
        >
          <Link href={buttonUrl}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </section>
  );
}
