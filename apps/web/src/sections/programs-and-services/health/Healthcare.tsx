
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Feature } from "@/lib/strapi/models/programs/feature";
import DynamicIcon from "@/components/common/DynamicIcon";
import { StrapiImageResponse } from "@/lib/strapi/models/strapi/image";
import { Partner } from "@/lib/strapi/models/programs/partner";
import Link from "next/link";

const HealthcareSection = ({
  serviceTitle,
  serviceDesc,
  services,
  gallery,
  partnerTitle,
  partnerDesc,
  partners,
  analyticsDesc,
  analyticsMetric
}: {
  serviceTitle: string;
  serviceDesc: string;
  services: Feature[];
  gallery: StrapiImageResponse[];
  partnerTitle: string;
  partnerDesc: string;
  partners: Partner[];
  analyticsDesc: string;
  analyticsMetric: string;
}) => {


  return (
    <section className="py-20 bg-background" id="health-and-wellbeing">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {serviceTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {serviceDesc}
            </p>

            {/* Service Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {services.map((service, index) => (
                <Card 
                  key={index}
                  className="border-border hover:shadow-hover transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[var(--rh-500)]/15 flex items-center justify-center mb-4">
                      <DynamicIcon name={service.icon} className="w-6 h-6 text-[var(--rh-500)]" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Healthcare Partners */}
            <div className="pt-6">
              <h3 className="font-semibold text-foreground mb-4">{partnerTitle}</h3>
              <p className="text-muted-foreground mb-4">
                {partnerDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                {partners.map((partner, index) => (
                  <Link key={index} href={partner.url} target="_blank" rel="noopener noreferrer">
                    <div 
                      className="flex items-center gap-3 px-3 py-2 bg-muted rounded-full hover:shadow-soft transition-all duration-300"
                    >
                        <Image 
                          src={partner.logo.url} 
                          alt={`${partner.name} logo`}
                          className="w-6 h-6 rounded-full object-cover"
                          width={24}  
                          height={24}
                        />
                        <span className="text-sm text-muted-foreground font-medium">{partner.name}</span>
                    </div>
                  </Link>
                  
                ))}
              </div>
            </div>
          </div>

          {/* Image Carousel */}
        <div className="relative animate-scale-in lg:sticky lg:top-8">
          <div className="rounded-2xl overflow-hidden shadow-medium">
              <Carousel className="relative w-full">
                  {/* allow slides to extend without clipping the rounded wrapper */}
                  <CarouselContent className="overflow-visible">
                  {gallery.map((image, index) => (
                      <CarouselItem key={index} className="p-0">
                      <div className="relative w-full h-[500px]">
                          <Image
                            src={image.url}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority={index === 0}
                          />
                      </div>
                      </CarouselItem>
                  ))}
                  </CarouselContent>

                  {/* arrows aligned to the image edges */}
                  <CarouselPrevious className="!absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                  <CarouselNext className="!absolute right-4 top-1/2 -translate-y-1/2 z-10" />
              </Carousel>
          </div>


            <div className="mt-6 bg-card p-6 rounded-xl shadow-medium border border-border">
              <p className="text-4xl font-bold text-[var(--rh-500)] mb-1">{analyticsMetric}</p>
              <p className="text-sm text-muted-foreground">
                {analyticsDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSection;