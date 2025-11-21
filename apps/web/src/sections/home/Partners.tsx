import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Link from "next/link";
import { Partner } from "@/lib/strapi/models/home/partner";

interface PartnersSectionProps {
  title: string;
  desc: string;
  partners: Partner[];
}

export const Partners = ({ title, desc, partners }: PartnersSectionProps) => {
  // const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground">{desc}</p>
        </div>

      
           <Carousel
            aria-label="Housing programs carousel"
            className="relative w-full py-4"
            >
            <CarouselContent className="py-6">
                {partners.map((partner, index) => (
            <Card
              key={index}
              className="w-50 mx-5 flex items-center justify-center p-6 h-32 shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link href={partner.url} target="_blank">
              <div className="text-center">
                <div className="w-24 h-16 mx-auto mb-2 flex items-center justify-center">
                  <img
                    src={partner.logo.url}
                    alt={partner.logo.alternativeText || partner.name}
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
