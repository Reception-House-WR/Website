"use client"; 

import { Card } from "@/components/ui/card";
import { History } from "lucide-react";


const historyImageUrl = "/assets/history-timeline.jpg"; 


const timelineEvents = [
  {
    year: "1987",
    title: "Reception House Founded",
    description: "Established as a community-based response to assist Government-Assisted Refugees (GARs) arriving in the Waterloo Region, providing essential initial settlement support.",
  },
  {
    year: "~1990s", 
    title: "Establishing Core Services",
    description: "Developed and refined core services focusing on temporary accommodation, housing support, and initial integration needs for newcomers rebuilding their lives in Canada.",
  },
  {
    year: "~2000s", 
    title: "Growth and Partnerships",
    description: "Expanded program offerings to include health support, employment services, and skills training, forming key partnerships within the community to better serve refugee families.",
  },
  {
    year: "2015-2016", 
    title: "Responding to Syrian Arrivals",
    description: "Played a vital role in welcoming and settling a large number of Syrian refugees arriving in Waterloo Region, demonstrating adaptability and community collaboration during a time of urgent need.",
  },
  {
    year: "~2021", 
    title: "New Location & Continued Response",
    description: "Relocated to 101 Frederick Street in Kitchener to better accommodate services. Continued to respond to emerging needs, including arrivals from Afghanistan and Ukraine.",
  },
  {
    year: "Present", 
    title: "Ongoing Impact & Future Focus",
    description: "Having assisted over 11,000 refugees since 1987, Reception House continues its commitment to providing quality settlement services and fostering a welcoming community for all newcomers.",
  },
];

export default function OurHistory() {
  return (
    
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden" role="banner">
        <div className="absolute inset-0 z-0 bg-[url('/assets/history-timeline.jpg')] bg-cover bg-center">
           <div
            className="absolute inset-0 "
            style={{ background: 'var(--hero-gradient)' }}
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <History className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our History
            </h1>
            <p className="text-xl text-white/90">
              Three decades of growth, resilience, and unwavering commitment to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              A Journey of Welcome and Support
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              What began in 1987 as a community-based effort to support Government-Assisted Refugees (GARs) arriving in Waterloo Region has evolved into a vital settlement organization. Our history is one of adapting to meet the unique needs of newcomers, providing not just temporary accommodation but comprehensive support for health, employment, and integration.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              From assisting thousands rebuild their lives to fostering partnerships across the region, our story reflects the power of a welcoming community and our unwavering commitment to helping refugees thrive in Canada.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2" 
              style={{ background: 'var(--timeline-gradient)' }}
              />

              {/* Timeline Events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.year}
                    className={`relative flex flex-col md:flex-row gap-8 items-center animate-fade-in-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Left/Right Content Card */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}`}>
                      
                      <Card className="relative p-6 pt-12 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-2 hover:border-primary">
                        
                        <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--rh-500)] text-white rounded-full text-sm font-bold">
  {event.year}
</div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">{event.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                      </Card>
                    </div>

                    
                    <div className="hidden md:flex absolute left-1/2 w-6 h-6 bg-[var(--rh-500)] rounded-full border-4 border-background shadow-[var(--shadow-soft)] -translate-x-1/2 z-10" />

                    {/* Spacer */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="max-w-4xl mx-auto mt-20 text-center animate-fade-in">
             
            <Card className="p-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 shadow-[var(--shadow-card)]">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Building a Future of Belonging
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                As we look ahead, Reception House remains dedicated to guiding and supporting newcomers with the resources, connections, and opportunities they need to build independent, successful lives. Our history informs our path, grounded in values of integrity, inclusivity, and empowerment.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Inspired by the resilience of those we serve, we continue to innovate and collaborate, working towards a future where every newcomer finds belonging, security, and the chance to build a fulfilling life in Waterloo Region.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}