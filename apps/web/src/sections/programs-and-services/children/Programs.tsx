"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SimpleCard } from "@/lib/strapi/models/common/simpleCard";
import { BookOpen, Heart, Lightbulb } from "lucide-react";
import Image from "next/image";

const icons = [
  BookOpen,
  Heart,
  Lightbulb,
  BookOpen,
  Heart,
  Lightbulb,
  ];

export default function Programs({
  programs
}: {
  programs: SimpleCard[]
}) {
  return (
    <Carousel aria-label="Housing programs carousel" className="relative w-full">
      <CarouselContent>
        {programs.map((program, index) => {
          const Icon = icons[index % icons.length];
          return (
          <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <Card
              className="group overflow-hidden shadow-medium hover:shadow-hover transition-all duration-500 animate-fade-in-up hover:scale-105 p-0 min-h-110"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                
                {program.image?.url && (
                  <Image
                    src={program.image.url}
                    alt={program.image.alternativeText ?? program.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-2xl">
                    {program.title}
                  </h3>
                </div>
              </div>
              <CardContent className="p-6 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        )})}
      </CarouselContent>

      <CarouselPrevious className="!absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="!absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
