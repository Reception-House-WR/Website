"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PartnerDialog } from '../../../components/common/PartnerDialog';
import { StatCounter } from './StatCounter'
import { ProgramCard } from '../../../components/common/ProgramCard';
import { Card } from '@/components/ui/card';

const programs = [
    {
      title: "Housing Search Support",
      description: "We help newcomers find safe, affordable housing in Waterloo Region through partnerships with local landlords and property managers.",
      imageSrc: "/assets/stories/story-1.jpg",
      imageAlt: "Family moving into new apartment with support"
    },
    {
      title: "Tenant Education",
      description: "Learn about tenant rights, responsibilities, and how to maintain a positive relationship with landlords in your new community.",
      imageSrc: "/assets/stories/story-2.jpg",
      imageAlt: "Education session about tenant rights"
    },
    {
      title: "Emergency Housing",
      description: "Temporary accommodation services for newcomers who need immediate housing support while transitioning to permanent residences.",
      imageSrc: "/assets/stories/story-3.jpg",
      imageAlt: "Temporary accommodation facility"
    },
    {
      title: "Emergency Housing",
      description: "Temporary accommodation services for newcomers who need immediate housing support while transitioning to permanent residences.",
      imageSrc: "/assets/stories/story-3.jpg",
      imageAlt: "Temporary accommodation facility"
    }
  ];

export const HousingSection = () => {
  return (
    <>
    <section className="py-10 bg-gradient-warm" id="temporary-accommodation">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Housing in Waterloo Region
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <StatCounter end={1250} label="Families Housed" suffix="+" />
            <StatCounter end={87} label="Rental Units Available" />
            <StatCounter end={45} label="Partner Landlords" suffix="+" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              Finding housing is one of the most critical challenges newcomers face. Reception House works 
              closely with landlords and property managers throughout Waterloo Region to ensure refugees 
              and immigrants have access to safe, affordable housing as they build their new lives in Canada.
            </p>
          </div>
        </div>
    </section>
      
    <section className="py-10">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            Our Housing Programs
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Comprehensive support services to help newcomers find and maintain stable housing
            </p>

            <Carousel
            aria-label="Housing programs carousel"
            className="relative w-full"
            >
            <CarouselContent>
                {programs.map((program, index) => (
                <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3" 
                >
                    <Card className='p-0 min-h-110'>
                        <ProgramCard {...program} />
                    </Card>
                </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="!absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="!absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    </section>

    <section className="py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-card-foreground">
                Rent With Reception House
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                Landlords who partner with Reception House gain reliable, supported tenants and contribute 
                to building a more inclusive community. Our team provides ongoing support to both tenants 
                and landlords, ensuring successful, long-term rental relationships.
              </p>
            </div>
            
            <div className="bg-teal-600/20 border-2 border-teal-800/20 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-accent-foreground">
                Benefits of Partnering With Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Reliable Tenants:</strong> Our clients are committed to building stable lives and maintaining positive rental relationships
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Ongoing Support:</strong> Reception House staff provide continued assistance to ensure smooth tenancies
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Community Impact:</strong> Help newcomers integrate and contribute to our diverse, vibrant region
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Mediation Services:</strong> Access to professional support if any issues arise during tenancy
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <PartnerDialog
                type="landlord"
                buttonText="Collaborate With Us"
                title="Partner as a Landlord"
                description="Fill out this form and we'll contact you to discuss available rental opportunities and partnership details."
              />
              
              <p className="mt-6 text-muted-foreground">
                Or email us directly at:{" "}
                <a 
                  href="mailto:housing@receptionhouse.ca" 
                  className="text-primary hover:underline font-medium"
                >
                  housing@receptionhouse.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      </>
  )
}
