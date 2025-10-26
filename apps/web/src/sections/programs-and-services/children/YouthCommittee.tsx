import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Users } from "lucide-react";

  const committeeImages = [
    {
      src: "/assets/services/youth-programs/committee/youth-committee-meeting.jpg",
      alt: "Youth Advisory Committee members collaborating"
    },
    {
      src: "/assets/services/youth-programs/committee/youth-committee-presentation.jpg",
      alt: "Youth committee meeting and discussion"
    }
  ];

const benefits = [
  "Monthly meetings to discuss youth needs and program improvements",
  "Community advocacy and public speaking opportunities",
  "Event planning and peer mentorship initiatives",
  "Collaboration with local organizations and decision-makers",
];

export function YouthCommittee(){
    return(
        <div className="grid lg:grid-cols-2 gap-12 mb-12 my-8">
            <div className="relative animate-scale-in">
              <Carousel className="w-full">
                <CarouselContent>
                  {committeeImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image.src}
                        alt={image.alt}
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
                  <h3 className="text-2xl font-bold text-foreground mb-2">Youth Advisory Committee</h3>
                  <p className="text-black-foreground">Empowering young voices to shape our programs</p>
                </div>
              </div>

              <p className="text-black-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Our Youth Advisory Committee gives young newcomers a platform to advocate for their peers, 
                share their experiences, and influence the services that impact their lives. Committee members 
                develop leadership skills, build confidence, and create positive change in their community.
              </p>

              <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-semibold text-foreground">Committee Activities:</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                     <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-black-foreground transition-transform duration-200 hover:translate-x-2"
                    >
                      <span className="text-[var(--rh-red-500)] mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[var(--rh-green-500)]/50 rounded-lg animate-fade-in-up transition-all duration-300 hover:bg-secondary/20 hover:shadow-soft" style={{ animationDelay: '0.3s' }}>
                <p className="text-sm text-foreground italic">
                  "Being part of the Youth Committee helped me find my voice and realize I can make 
                  a difference. Now I'm helping other youth like me." — YAC Member
                </p>
              </div>
            </div>
          </div>
    );
}