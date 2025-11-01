import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image';

export const Volunteers = () => {
    const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Language Support Volunteer",
      quote: "Helping newcomers learn English has been one of the most rewarding experiences of my life.",
      image: '/assets/stories/story-1.jpg',
    },
    {
      name: "Michael Chen",
      role: "Settlement Support Volunteer",
      quote: "I've learned as much from the families I've helped as they've learned from me. It's amazing to be part of someone's journey to a new home.",
      image: '/assets/stories/story-1.jpg',
    },
    {
      name: "Aisha Mohammed",
      role: "Community Events Coordinator",
      quote: "Organizing cultural events that bring our community together has shown me the power of inclusion and celebration of diversity.",
      image: '/assets/stories/story-1.jpg',
    },
  ];
  return (
    <div>
        <section className="py-16 bg-muted/50" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
            Hear From Our Volunteers
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Real stories from real people making a difference in their community.
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
                    {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                        <Card className="shadow-medium h-full flex flex-col pt-0">
                            <CardContent className="p-0 flex flex-col flex-1">
                            <div className="relative h-64 overflow-hidden rounded-t-lg flex-shrink-0">
                                <Image 
                                    src={testimonial.image} 
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
