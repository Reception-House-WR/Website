import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ProgramCard } from "../../../components/common/ProgramCard"
import { PartnerDialog } from "../../../components/common/PartnerDialog";

const programs = [
    {
      title: "Job Search Support",
      description: "Personalized assistance with resume writing, job search strategies, and interview preparation tailored to the Canadian workplace.",
      imageSrc: '/assets/stories/story-1.jpg',
      imageAlt: "Professional job interview support session"
    },
    {
      title: "Skills Development",
      description: "Training programs to help newcomers develop workplace skills, improve language proficiency, and gain Canadian work experience.",
      imageSrc: '/assets/stories/story-2.jpg',
      imageAlt: "Skills training workshop in progress"
    },
    {
      title: "Career Counseling",
      description: "One-on-one guidance to help navigate career pathways, credential recognition, and professional development opportunities.",
      imageSrc: '/assets/stories/story-3.jpg',
      imageAlt: "Career counseling session"
    },
    {
      title: "Workplace Integration",
      description: "Ongoing support to help newcomers succeed in their new roles and understand Canadian workplace culture and expectations.",
      imageSrc: '/assets/stories/story-1.jpg',
      imageAlt: "Diverse team collaborating in workplace"
    }
  ];


export const EmploymentSection = () => {
  return (
    <div>
        <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            Employment Programs
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Comprehensive employment support designed to help newcomers find meaningful work
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
      
      <section className="py-10 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Work With Reception House
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                Employers who partner with Reception House gain access to a talented, diverse workforce 
                eager to contribute their skills and perspectives. Our newcomers bring resilience, 
                dedication, and unique experiences that strengthen teams and drive innovation.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 mb-4 shadow-soft">
              <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                Benefits of Hiring Newcomers
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-card-foreground">Diverse Talent Pool:</strong> Access skilled professionals from around the world with unique perspectives and experiences
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-card-foreground">Dedicated Employees:</strong> Newcomers are highly motivated, reliable, and committed to building successful careers
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-card-foreground">Employer Support:</strong> Reception House provides ongoing support to ensure successful workplace integration
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-card-foreground">Community Impact:</strong> Contribute to building a more inclusive, diverse Waterloo Region
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-card-foreground">Cultural Competency:</strong> Multilingual employees who can help your business reach diverse markets
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <PartnerDialog
                type="employer"
                buttonText="Partner With Us"
                title="Hire Through Reception House"
                description="Connect with talented newcomers ready to contribute to your team. Fill out this form to explore hiring opportunities."
              />
              
              <p className="mt-6 text-muted-foreground">
                Or contact us at:{" "}
                <a 
                  href="mailto:employment@receptionhouse.ca" 
                  className="text-primary hover:underline font-medium"
                >
                  employment@receptionhouse.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
