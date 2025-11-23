import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Item } from "@/lib/strapi/models/programs/item";
import { StrapiImageResponse } from "@/lib/strapi/models/strapi/image";
import { Users } from "lucide-react";


export function YouthCommittee({
  committeeImages,
  title,
  subtitle,
  subtitle2,
  desc,
  desc2,
  benefits
}: {
  committeeImages: StrapiImageResponse[];
  title: string;
  subtitle: string;
  subtitle2: string;
  desc: string;
  desc2: string;
  benefits: Item[];
}){
    return(
        <div className="grid lg:grid-cols-2 gap-12 mb-12 my-8">
            <div className="relative animate-scale-in">
              <Carousel className="w-full">
                <CarouselContent>
                  {committeeImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image.url}
                        alt={image.alternativeText ?? "Youth Advisory Committee Image"}
                        className="rounded-2xl shadow-medium w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            <div className="space-y-6 animate-fade-in">
              <div className="flex items-start gap-4 animate-fade-in-up">
                <div className="w-14 h-14 rounded-lg bg-[var(--rh-red-500)]/80 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <Users className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-black-foreground">{subtitle}</p>
                </div>
              </div>

              <p className="text-black-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {desc}
              </p>

              <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-semibold text-foreground">{subtitle2}</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                     <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-black-foreground transition-transform duration-200 hover:translate-x-2"
                    >
                      <span className="text-[var(--rh-red-500)] mt-1">•</span>
                      <span>{benefit.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[var(--rh-green-500)]/50 rounded-lg animate-fade-in-up transition-all duration-300 hover:bg-secondary/20 hover:shadow-soft" style={{ animationDelay: '0.3s' }}>
                <p className="text-sm text-foreground italic">
                  {desc2}
                </p>
              </div>
            </div>
          </div>
    );
}