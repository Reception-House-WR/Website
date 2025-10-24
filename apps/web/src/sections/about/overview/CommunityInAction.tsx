import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const carouselImages = [
  { src: "assets/about-carousel/1.png", alt: "Community members working together" },
  { src: "assets/about-carousel/2.png", alt: "Board of Directors meeting" },
  { src: "assets/about-carousel/3.png", alt: "Staff and clients collaboration" },
];


export default function CommunityInAction() {
    return (

        <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Our Community in Action</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-[400px] object-cover rounded-xl shadow-card"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          
    );
}