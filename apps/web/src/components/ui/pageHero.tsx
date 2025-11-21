// src/components/ui/PageHero.tsx
"use client";
import { Users } from "lucide-react";

interface PageHeroProps {
  heroTitle: string;
  heroDesc: string;
  heroImage?: string;
}

export const PageHero = ({ heroTitle, heroDesc, heroImage }: PageHeroProps) => {
  return (
    <section
      className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
      role="banner"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-gradient)" }}
        />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {heroTitle}
          </h1>
          <p className="text-xl text-white/90">{heroDesc}</p>
        </div>
      </div>
    </section>
  );
};
