"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Story } from "@/lib/strapi/models/stories/story";
interface StoriesCarouselProps {
  title: string;
  desc: string;
  stories: Story[];
}


export const StoriesCarousel = ({ title, desc, stories }: StoriesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
  };

  const currentStory = stories[currentIndex];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>

        <div className="relative mx-auto max-w-4xl">
          <Card className="overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-shadow py-0">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-auto overflow-hidden">
                  
                  {(currentStory.image && <img
                    src={currentStory.image}
                    alt={`${currentStory.image} from ${currentStory.author}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />)}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <Quote className="h-8 w-8 text-teal-500 mb-4" aria-hidden="true" />
                  <blockquote className="mb-6 text-lg text-foreground italic">
                    "{currentStory.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-foreground">{currentStory.author}</p>
                    <p className="text-sm text-muted-foreground">{currentStory.country}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
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


            {/* Dots */}
            <div className="flex gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
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
      </div>
    </section>
  );
};
