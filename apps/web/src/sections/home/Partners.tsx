import { ProgramCard } from "@/components/common/ProgramCard";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import programs from "../programs-and-services/overview/programs";
import Link from "next/link";
import { link } from "fs";

interface PartnersSectionProps {
  lang: string;
}

const translations = {
  en: {
    title: "Our Funding Partners",
    subtitle: "We're grateful for the support of these organizations",
  },
  fr: {
    title: "Nos partenaires financiers",
    subtitle: "Nous sommes reconnaissants du soutien de ces organisations",
  },
};

const partners = [
  { id: 1, name: "Immigration Partnership", link: "https://www.immigrationwaterlooregion.ca/en/immigration-partnership.aspx"},
  { id: 2, name: "Waterloo Region Community Foundation", link: "https://www.wrcf.ca/" },
  { id: 3, name: "Toasty Toes Waterloo Region Fund", link: "https://www.wrcf.ca/toastytoes" },
  { id: 4, name: "Government of Canada", link: "https://www.canada.ca/en.html" },
  { id: 5, name: "Ontario Trillium Foundation", link: "https://otf.ca/" },
  { id: 6, name: "Fairmount Foundation", link: "https://fairmountfoundation.org/" },
  { id: 7, name: "Lyle S. Hallman Foundation", link: "https://www.lshallmanfdn.org/" },
];

export const Partners = ({ lang }: PartnersSectionProps) => {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

      
           <Carousel
            aria-label="Housing programs carousel"
            className="relative w-full py-4"
            >
            <CarouselContent className="py-6">
                {partners.map((partner, index) => (
            <Card
              key={partner.id}
              className="w-50 mx-5 flex items-center justify-center p-6 h-32 shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link href={partner.link} target="_blank">
              <div className="text-center">
                <div className="w-24 h-16 mx-auto mb-2 flex items-center justify-center">
                  <img
                    src={`/assets/partners/${partner.id}.png`}
                    alt={partner.name}
                    className="max-h-14 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-medium text-muted-foreground line-clamp-2">
                  {partner.name}
                </p>
              </div>
              </Link>
            </Card>
          ))}
            </CarouselContent>

            <CarouselPrevious className="!absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="!absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
      </div>
    </section>
  );
};
