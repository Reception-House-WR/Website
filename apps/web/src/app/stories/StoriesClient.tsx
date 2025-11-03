// src/app/stories/StoriesClient.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/ui/PageHero";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { type HeroData, type Story } from "@/lib/strapi";
import type { ReactNode } from "react";

interface StoriesClientProps {
  heroData: HeroData;
  storiesData: Story[];
  heroIcon?: ReactNode;
}

export default function StoriesClient({
  heroData,
  storiesData,
  heroIcon,
}: StoriesClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === storiesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? storiesData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content">
        <PageHero heroData={heroData} icon={heroIcon} />

        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
              Inspiring Journeys of Hope
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Real people, real transformations, real impact in our community
            </p>

            {storiesData.length > 0 ? (
              <div className="relative">
                <Card
                  key={storiesData[currentIndex].id}
                  className="group overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all animate-fade-in py-0"
                >
                  <CardContent className="p-0 md:flex h-full">
                    <div className="relative w-full h-48 md:h-auto md:w-1/3 flex-shrink-0 overflow-hidden bg-muted">
                      {storiesData[currentIndex].image ? (
                        <img
                          src={storiesData[currentIndex].image!}
                          alt={storiesData[currentIndex].imageAlt}
                          className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-6" />
                      )}
                    </div>

                    <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white/80 backdrop-blur-sm">
                      <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-[var(--rh-orange-500)] text-primary-foreground rounded-full text-sm font-semibold">
                          Client Story
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-[var(--rh-orange-500)] mb-4">
                        {storiesData[currentIndex].name}'s Story
                      </h3>
                      <p className="text-base md:text-lg leading-relaxed text-high-contrast mb-6">
                        {storiesData[currentIndex].story}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="group/button w-fit bg-[var(--rh-500)] text-primary-foreground hover:bg-[var(--rh-400)]"
                      >
                        <a
                          href={storiesData[currentIndex].videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Watch ${storiesData[currentIndex].name}'s video interview`}
                        >
                          Watch Video Interview
                          <ExternalLink className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    aria-label="Previous story"
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex gap-2">
                    {storiesData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-[var(--rh-500)] w-8"
                            : "bg-border hover:bg-primary/50"
                        }`}
                        aria-label={`Go to story ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    aria-label="Next story"
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                More client stories are coming soon.
              </p>
            )}
          </div>
        </section>

        <section className="py-16 px-4 bg-[var(--rh-500)] text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Have a Story to Share?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95">
              We'd love to hear from you. Your journey matters and can inspire
              others.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-semibold"
            >
              <a href="mailto:contact@receptionhouse.ca">Share Your Story</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
