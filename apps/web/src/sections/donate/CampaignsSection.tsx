// src/app/donate/components/CampaignsSection.tsx
"use client"; // This component needs state, so it must be a client component

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Campaign } from "@/lib/strapi";

// --- Component ---
interface CampaignsSectionProps {
  campaignsData: Campaign[];
}

export default function CampaignsSection({
  campaignsData,
}: CampaignsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === campaignsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? campaignsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
          Current Campaigns
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join our active campaigns making a difference right now
        </p>
        {campaignsData.length > 0 ? (
          <div className="relative">
            <Card
              key={campaignsData[currentIndex].id}
              className="group overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all animate-fade-in py-0"
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={
                    campaignsData[currentIndex].image ||
                    "/assets/default-placeholder.jpg"
                  }
                  alt={campaignsData[currentIndex].imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">
                    {campaignsData[currentIndex].name}
                  </h3>
                </div>
              </div>
              <CardContent className="p-8 md:p-12 bg-white">
                <p className="text-lg leading-relaxed text-high-contrast mb-6">
                  {campaignsData[currentIndex].description}
                </p>
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-[var(--rh-orange-500)] text-primary-foreground hover:bg-[var(--rh-orange-400)]"
                >
                  Support This Campaign
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                aria-label="Previous campaign"
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {campaignsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-[var(--rh-orange-500)] w-8"
                        : "bg-border hover:bg-primary/50"
                    }`}
                    aria-label={`Go to campaign ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                aria-label="Next campaign"
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No active campaigns at this time. Please check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
