import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { StrapiImageResponse } from "@/lib/strapi/models/strapi/image";
import Image from "next/image";

export default function Images({
  images
}: {
  images: StrapiImageResponse[]
}){
    return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-1/1 sm:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              
              {image?.url && (
                <div className="relative w-[90%] h-[250px] overflow-hidden rounded-lg">
                  <Image
                    src={image.url}
                    alt={image.alternativeText || `Skills Training Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-cover"
                  />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 sm:left-4" />
        <CarouselNext className="right-2 sm:right-4" />
      </Carousel>
    </div>
  );
}