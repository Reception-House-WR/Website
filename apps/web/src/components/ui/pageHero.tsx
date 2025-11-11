// src/components/ui/PageHero.tsx
"use client";

import type { ReactNode } from "react";
import type { HeroData } from "@/lib/strapi";

interface PageHeroProps {
  heroData: HeroData;
  icon?: ReactNode;
}

export const PageHero = ({ heroData, icon }: PageHeroProps) => {
  return (
    <section
      className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
      role="banner"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroData.imageUrl})` }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-gradient)" }}
        />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white animate-fade-in-up">
          {icon && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              {icon}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {heroData.title}
          </h1>
          <p className="text-xl text-white/90">{heroData.description}</p>
        </div>
      </div>
    </section>
  );
};
