"use client";

import { Card } from "@/components/ui/card";
import { History } from "lucide-react";

const historyImageUrl = "/assets/history-timeline.jpg";

const timelineEvents = [
  {
    year: "1987",
    title: "Reception House Founded",
    description:
      "Established as a community-based response to assist Government-Assisted Refugees (GARs) arriving in the Waterloo Region, providing essential initial settlement support.",
    imageUrl: "/assets/timeline/timeline1.jpg",
  },
  {
    year: "~1990s",
    title: "Establishing Core Services",
    description:
      "Developed and refined core services focusing on temporary accommodation, housing support, and initial integration needs for newcomers rebuilding their lives in Canada.",
    imageUrl: "/assets/timeline/timeline2.jpg",
  },
  {
    year: "~2000s",
    title: "Growth and Partnerships",
    description:
      "Expanded program offerings to include health support, employment services, and skills training, forming key partnerships within the community to better serve refugee families.",
    imageUrl: "/assets/timeline/timeline3.jpg",
  },
  {
    year: "2015-2016",
    title: "Responding to Syrian Arrivals",
    description:
      "Played a vital role in welcoming and settling a large number of Syrian refugees arriving in Waterloo Region, demonstrating adaptability and community collaboration during a time of urgent need.",
    imageUrl: "/assets/timeline/timeline4.jpg",
  },
  {
    year: "~2021",
    title: "New Location & Continued Response",
    description:
      "Relocated to 101 Frederick Street in Kitchener to better accommodate services. Continued to respond to emerging needs, including arrivals from Afghanistan and Ukraine.",
    imageUrl: "/assets/timeline/timeline5.jpg",
  },
  {
    year: "Present",
    title: "Ongoing Impact & Future Focus",
    description:
      "Having assisted over 11,000 refugees since 1987, Reception House continues its commitment to providing quality settlement services and fostering a welcoming community for all newcomers.",
    imageUrl: "/assets/timeline/timeline6.jpg",
  },
];

export default function OurHistory() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden"
        role="banner"
      >
        <div className="absolute inset-0 z-0 bg-[url('/assets/history-timeline.jpg')] bg-cover bg-center">
          <div
            className="absolute inset-0 "
            style={{ background: "var(--hero-gradient)" }}
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <History className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our History</h1>
            <p className="text-xl text-white/90">
              Three decades of growth, resilience, and unwavering commitment to
              our community.
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
              What began in 1987 as a community-based effort to support
              Government-Assisted Refugees (GARs) arriving in Waterloo Region
              has evolved into a vital settlement organization. Our history is
              one of adapting to meet the unique needs of newcomers, providing
              not just temporary accommodation but comprehensive support for
              health, employment, and integration.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              From assisting thousands rebuild their lives to fostering
              partnerships across the region, our story reflects the power of a
              welcoming community and our unwavering commitment to helping
              refugees thrive in Canada.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
                style={{ background: "var(--timeline-gradient)" }}
              />
              {/* Timeline Events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.year}
                    // Main container: Col on mobile, Row on desktop. Center items on mobile.
                    className={`relative flex flex-col md:flex-row gap-8 items-center md:items-stretch animate-fade-in-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* --- CARD ELEMENT --- */}
                    <div
                      // Mobile: Stacks naturally first.
                      // Desktop: Aligns right (near center) if index is even (left col), aligns left (near center) if index is odd (right col).
                      //          Gets order-2 on desktop if index is odd to swap sides.
                      className={`w-full md:w-1/2 flex flex-col items-center 
                                   ${index % 2 === 0 ? "md:items-end md:pr-12" : "md:items-start md:pl-12 md:order-2"}`}
                    >
                      <Card className="relative p-6 pt-12 w-full max-w-[400px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-2 hover:border-primary h-full">
                        <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--rh-500)] text-white rounded-full text-sm font-bold">
                          {event.year}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground text-center md:text-left">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-center md:text-left">
                          {event.description}
                        </p>
                      </Card>
                    </div>

                    {/* --- Center Dot (Only visible on desktop) --- */}
                    <div className="hidden md:flex absolute left-1/2 w-6 h-6 bg-[var(--rh-500)] rounded-full border-4 border-background shadow-[var(--shadow-soft)] -translate-x-1/2 z-10" />

                    {/* --- IMAGE ELEMENT --- */}
                    <div
                      // Mobile: Stacks naturally second.
                      // Desktop: Aligns right (near center) if index is odd (left col), aligns left (near center) if index is even (right col).
                      //          Gets order-1 on desktop if index is odd to swap sides.
                      className={`w-full md:w-1/2 flex flex-col items-center 
                                   ${index % 2 !== 0 ? "md:items-end md:pr-12 md:order-1" : "md:items-start md:pl-12"}`}
                    >
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full max-w-[400px] object-cover rounded-lg shadow-lg border border-gray-200 hover:border-[var(--shadow-soft)] transition-colors duration-300 "
                        />
                      )}
                    </div>
                  </div>
                ))}{" "}
              </div>{" "}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="max-w-4xl mx-auto mt-20 text-center animate-fade-in">
            <Card className="p-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 shadow-[var(--shadow-card)]">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Building a Future of Belonging
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                As we look ahead, Reception House remains dedicated to guiding
                and supporting newcomers with the resources, connections, and
                opportunities they need to build independent, successful lives.
                Our history informs our path, grounded in values of integrity,
                inclusivity, and empowerment.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Inspired by the resilience of those we serve, we continue to
                innovate and collaborate, working towards a future where every
                newcomer finds belonging, security, and the chance to build a
                fulfilling life in Waterloo Region.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
