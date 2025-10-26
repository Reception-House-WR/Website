"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookOpen, Heart, Lightbulb } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "Educational Support",
    description: "Tutoring, homework help, and school navigation to ensure academic success",
    details:
      "One-on-one tutoring sessions, homework clubs, and support navigating the Canadian education system help youth overcome language barriers and academic challenges.",
    image: "assets/services/youth-programs/youth-committee.jpg",
  },
  {
    icon: Heart,
    title: "Social Integration",
    description: "Recreation programs, cultural events, and peer connections to build belonging",
    details:
      "Sports, arts, cultural celebrations, and social gatherings create safe spaces for youth to make friends, express themselves, and feel connected to their new community.",
    image: "/assets/services/youth-programs/youth-recreation.jpg",
  },
  {
    icon: Lightbulb,
    title: "Skills Development",
    description: "Leadership training, life skills workshops, and career exploration opportunities",
    details:
      "Workshops on resume writing, job readiness, financial literacy, and leadership development prepare youth for future success and empower them to reach their goals.",
    image: "/assets/services/youth-programs/youth-leadership.jpg",
  },
  {
    icon: BookOpen,
    title: "Educational Support",
    description: "Tutoring, homework help, and school navigation to ensure academic success",
    details:
      "One-on-one tutoring sessions, homework clubs, and support navigating the Canadian education system help youth overcome language barriers and academic challenges.",
    image: "assets/services/youth-programs/youth-committee.jpg",
  },
  {
    icon: Heart,
    title: "Social Integration",
    description: "Recreation programs, cultural events, and peer connections to build belonging",
    details:
      "Sports, arts, cultural celebrations, and social gatherings create safe spaces for youth to make friends, express themselves, and feel connected to their new community.",
    image: "/assets/services/youth-programs/youth-recreation.jpg",
  },
  {
    icon: Lightbulb,
    title: "Skills Development",
    description: "Leadership training, life skills workshops, and career exploration opportunities",
    details:
      "Workshops on resume writing, job readiness, financial literacy, and leadership development prepare youth for future success and empower them to reach their goals.",
    image: "/assets/services/youth-programs/youth-leadership.jpg",
  },
];

export default function Prorams() {
  return (
    <Carousel aria-label="Housing programs carousel" className="relative w-full">
      <CarouselContent>
        {programs.map((program, index) => (
          <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <Card
              className="group overflow-hidden shadow-medium hover:shadow-hover transition-all duration-500 animate-fade-in-up hover:scale-105 p-0 min-h-110"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--rh-500)]/90 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-2xl">
                    {program.title}
                  </h3>
                </div>
              </div>
              <CardContent className="p-6 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{program.details}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="!absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="!absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
