import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const images = [
    { 
        src: "assets/skills/1.png", alt: "Skills Training Image 1"
    }, 
    {
        src: "/assets/skills/2.png", alt: "Skills Training Image 2"
    }, 
    {
        src: "/assets/skills/3.png", alt: "Skills Training Image 2"
    }
    
]
export default function Images(){
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
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-lg object-cover w-[90%] h-[250px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Botones de navegación */}
        <CarouselPrevious className="left-2 sm:left-4" />
        <CarouselNext className="right-2 sm:right-4" />
      </Carousel>
    </div>
  );
}