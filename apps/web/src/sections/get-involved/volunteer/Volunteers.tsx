import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { VolunteerTestimonial } from '@/lib/strapi/models/getInvolved/volunteerTestimonial';
import Image from 'next/image';

export const Volunteers = ({
  title,
  desc,
  cards
}: {
  title: string;
  desc: string; 
  cards: VolunteerTestimonial[];
}) => {
  return (
    <div>
        <section className="py-16 bg-muted/50" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {title}
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            {desc}
          </p>
          <div className="max-w-6xl mx-auto">
            <Carousel 
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {cards.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                        <Card className="shadow-medium h-full flex flex-col pt-0">
                            <CardContent className="p-0 flex flex-col flex-1">
                            <div className="relative h-64 overflow-hidden rounded-t-lg flex-shrink-0">
                                <Image 
                                    src={testimonial.imageUrl} 
                                    alt={`${testimonial.name}, ${testimonial.role}`}
                                    className="w-full h-full object-cover"
                                    fill
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <blockquote className="flex-1">
                                <p className="text-muted-foreground italic mb-4 leading-relaxed text-base">
                                    "{testimonial.quote}"
                                </p>
                                </blockquote>
                            </div>
                            </CardContent>
                            <CardFooter className="border-t border-border pt-4 flex-shrink-0">
                                <div>
                                    <div className="font-bold text-lg">{testimonial.name}</div>
                                    <div className="text-sm text-primary font-medium">{testimonial.role}</div>
                                </div>
                            </CardFooter>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  )
}
