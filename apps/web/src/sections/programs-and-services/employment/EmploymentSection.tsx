import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ProgramCard } from "../../../components/common/ProgramCard"
import { PartnerDialog } from "../../../components/common/PartnerDialog";
import { SimpleCard } from "@/lib/strapi/models/common/simpleCard";
import { ListCard } from "@/lib/strapi/models/common/listCard";

export const EmploymentSection = ({
  title,
  desc,
  cards,
  benefitsTitle,
  benefitsDesc,
  benefitsBottomDesc,
  benefitsCard,
  buttonLabel
}: {
  title: string;
  desc: string;
  cards: SimpleCard[];
  benefitsTitle: string;
  benefitsDesc: string;
  benefitsBottomDesc: string;
  benefitsCard: ListCard;
  buttonLabel: string;
}) => {
  return (
    <div>
        <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {desc}
          </p>

          <Carousel
            aria-label="Housing programs carousel"
            className="relative w-full"
          >
            <CarouselContent>
                {cards.map((card, index) => (
                <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3" 
                >
                    <Card className='p-0 min-h-110'>
                        <ProgramCard title={card.title} description={card.description} imageSrc={card.image.url} imageAlt={card.image.alternativeText || card.title} />
                    </Card>
                </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="!absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="!absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </section>
      
      <section className="py-10 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                {benefitsTitle}
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                {benefitsDesc}
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 mb-4 shadow-soft">
              <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                {benefitsCard.title}
              </h3>
              <ul className="space-y-4">
                {benefitsCard.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-card-foreground">
                        {item.key}{" "}
                      </strong>
                      {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <PartnerDialog
                type="employer"
                buttonText={buttonLabel}
                title="Hire Through Reception House"
                description="Connect with talented newcomers ready to contribute to your team. Fill out this form to explore hiring opportunities."
              />
              
              <p className="mt-6 text-muted-foreground">
                {benefitsBottomDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
