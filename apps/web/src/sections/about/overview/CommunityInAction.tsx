import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function CommunityInAction({title, gallery}: {
  title: string; 
  gallery: {
    url: string;
  }[]
}) {
    return (

        <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">{title}</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {gallery.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                                  
                     {(image.url && <img 
                        src={image.url}
                        alt={'Community in action image ' + (index + 1)}
                        className="w-full h-[400px] object-cover rounded-xl shadow-card"
                      />)}
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