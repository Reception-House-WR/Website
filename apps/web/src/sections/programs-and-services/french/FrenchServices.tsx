import { Coffee, TvMinimalPlay, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { InfoCard } from "@/lib/strapi/models/programs/infoCard";
import { ProgramCard } from "@/lib/strapi/models/programs/programCard";
import Link from "next/link";

const partnershipIcons = [Globe, Users];

const FrenchServicesSection = ({
  title,
  desc,
  cards,
  cafe,
  resources,
  cardTitle,
  cardDesc,
  buttonLabel,
  redirectLink,
}: {
  title: string;
  desc: string;
  cards: InfoCard[];
  cafe: ProgramCard;
  resources: ProgramCard;
  cardTitle: string;
  cardDesc: string;
  buttonLabel: string;
  redirectLink: string;
}) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {cards.map((program, index) => {
              const Icon = partnershipIcons[index % partnershipIcons.length];
              return (
                <Card
                  key={index}
                  className="shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader className="flex flex-row items-start gap-6 mb-2">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                        index % 2 === 0
                          ? "bg-[var(--rh-500)]/80"
                          : "bg-[var(--rh-yellow-500)]/80"
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white " />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-1">
                        {program.title}
                      </CardTitle>
                      <CardDescription className="text-[var(--rh-500)] font-semibold">
                        {program.subtitle}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">
                        {program.subtitle2}
                      </h4>
                      <ul className="space-y-2">
                        {program.items.map((service, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-[var(--rh-red-500)] mt-1">
                              •
                            </span>
                            <span>{service.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div
              className={`bg-gradient-to-br from-[var(--rh-red-500)] to-[var(--rh-red-300)] p-8 rounded-2xl text-white shadow-medium animate-fade-in`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Coffee className="w-8 h-8" />
                <h3 className="text-2xl font-bold">{cafe.title}</h3>
              </div>
              <p className="text-white/95 mb-6 leading-relaxed">
                {cafe.description}
              </p>
              <div className="space-y-3 mb-6">
                {cafe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 p-4 rounded-lg transition-colors duration-200 hover:bg-white/20"
                  >
                    <p className="font-semibold mb-1">{step.key}</p>
                    <p className="text-sm text-white/90">{step.value}</p>
                  </div>
                ))}
              </div>

              <Button
                variant="secondary"
                size="lg"
                className={`bg-white text-foreground hover:bg-white/80 w-full sm:w-auto h-12 min-w-[120px]`}
                asChild
              >
                <Link href={cafe.button?.url || "#"}>{cafe.button?.label}</Link>
              </Button>
            </div>

            <div
              className={`bg-gradient-to-br from-[var(--rh-400)] to-[var(--rh-200)] p-8 rounded-2xl text-white shadow-medium animate-fade-in`}
            >
              <div className="flex items-center gap-3 mb-4">
                <TvMinimalPlay className="w-8 h-8" />
                <h3 className="text-2xl font-bold">{resources.title}</h3>
              </div>
              <p className="text-white/95 mb-6 leading-relaxed">
                {resources.description}
              </p>
              <div className="space-y-3 mb-6">
                {resources.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 p-4 rounded-lg transition-colors duration-200 hover:bg-white/20"
                  >
                    <p className="font-semibold mb-1">{step.key}</p>
                    <p className="text-sm text-white/90">{step.value}</p>
                  </div>
                ))}
              </div>

              <Button
                variant="secondary"
                size="lg"
                className={`bg-white text-foreground hover:bg-white/80 w-full sm:w-auto h-12 min-w-[120px]`}
                asChild
              >
                <Link href={resources.button?.url || "#"}>
                  {resources.button?.label}
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center bg-muted p-8 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {cardTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {cardDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[var(--rh-500)] text-[var(--primary-foreground)] hover:bg-[var(--rh-400)] h-12"
                asChild
              >
                <Link href={redirectLink}>{buttonLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrenchServicesSection;
