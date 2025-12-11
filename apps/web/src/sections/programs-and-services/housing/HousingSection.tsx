"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PartnerDialog } from "@/components/common/PartnerDialog";
import { StatCounter } from "./StatCounter";
import { ProgramCard } from "@/components/common/ProgramCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Analytic } from "@/lib/strapi/models/programs/analytic";
import { SimpleCard } from "@/lib/strapi/models/common/simpleCard";
import { ListCard } from "@/lib/strapi/models/common/listCard";

const parseNumberWithSuffix = (input: string) => {
  const match = input.match(/^(\d+)(\D*)$/);
  if (match) {
    return {
      number: parseInt(match[1], 10),
      suffix: match[2] || "",
    };
  }
  return {
    number: 0,
    suffix: "",
  };
};

export const HousingSection = ({
  siteKey,
  analyticsTitle,
  analyticsDesc,
  analytics,
  featuresTitle,
  featuresDesc,
  features,
  benefitsTitle,
  benefitsDesc,
  benefitsCard,
  buttonLabel,
  bottomDesc
}: {
  siteKey: string | null;
  analyticsTitle: string;
  analyticsDesc: string;
  analytics: Analytic[];
  featuresTitle: string;
  featuresDesc: string;
  features: SimpleCard[];
  benefitsTitle: string;
  benefitsDesc: string;
  benefitsCard: ListCard;
  buttonLabel: string;
  bottomDesc: string;
}) => {

  return (
    <>
      <section className="py-10 bg-gradient-warm" id="temporary-accommodation">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            {analyticsTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {analytics.map((analytic, index) => {
              const { number, suffix } = parseNumberWithSuffix(analytic.metric);
              return (
                <StatCounter
                  key={index}
                  end={number}
                  label={analytic.description}
                  suffix={suffix}
                />
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              {analyticsDesc}
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            {featuresTitle}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {featuresDesc}
          </p>

          <Carousel
            aria-label="Housing programs carousel"
            className="relative w-full"
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="p-0 min-h-110">
                    <ProgramCard
                      title={feature.title}
                      description={feature.description}
                      imageSrc={feature.image.url}
                      imageAlt={feature.image.alternativeText ?? undefined}
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="!absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="!absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </section>

      <section className="py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-card-foreground">
                {benefitsTitle}
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                {benefitsDesc}
              </p>
            </div>

            <div className="bg-teal-600/20 border-2 border-teal-800/20 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-accent-foreground">
                {benefitsCard.title}
              </h3>
              <ul className="space-y-4">
                {benefitsCard.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--rh-500)] text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </div>
                    <p className="text-foreground">
                      <strong className="text-foreground">
                      {item.key}
                    </strong>{" "}
                    {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              {siteKey ? (
                <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
                  <PartnerDialog
                    type="landlord"
                    buttonText="Collaborate With Us"
                    title="Partner as a Landlord"
                    description="Fill out this form and we'll contact you to discuss available rental opportunities and partnership details."
                  />
                </GoogleReCaptchaProvider>
              ) : (
                <Button size="lg" disabled>
                  {buttonLabel}
                </Button>
              )}

              <p className="mt-6 text-muted-foreground">
                {bottomDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
