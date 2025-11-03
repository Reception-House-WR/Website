// src/components/AccessibleCarousel.tsx
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Make sure you've installed this

interface AccessibleCarouselProps {
  children: React.ReactNode;
  ariaLabel: string;
}

/**
 * A wrapper for the shadcn/ui Carousel that adds an accessible
 * sr-only heading to describe the carousel's purpose.
 */
export default function AccessibleCarousel({
  children,
  ariaLabel,
}: AccessibleCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <h2 id="carousel-heading" className="sr-only">
        {ariaLabel}
      </h2>
      <CarouselContent aria-labelledby="carousel-heading">
        {React.Children.map(children, (child, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/1 lg:basis-1/1" // Show one slide at a time
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-14 hidden md:flex" />
      <CarouselNext className="mr-14 hidden md:flex" />
    </Carousel>
  );
}
