import { Card } from "@/components/ui/card";
import { History } from "lucide-react";
import {
  fetchPageHero,
  type HeroData,
  fetchTextSection,
  type TextSectionData,
  fetchTimelineEvents,
  type TimelineEvent,
} from "@/lib/strapi";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import { fetchAboutOurHistoryPage } from "@/lib/strapi/helpers/about/aboutOurHistoryHelper";

const defaultHistoryHeroData: HeroData = {
  title: "Our History",
  description:
    "Three decades of growth, resilience, and unwavering commitment to our community.",
  imageUrl: "/assets/history-timeline.jpg",
};

const defaultIntroText: TextSectionData = {
  title: "A Journey of Welcome and Support",
  description: "",
};

const defaultClosingText: TextSectionData = {
  title: "Building a Future of Belonging",
  description:
    "As we look ahead, Reception House remains dedicated to guiding and supporting newcomers with the resources, connections, and opportunities they need to build independent, successful lives. Our history informs our path, grounded in values of integrity, inclusivity, and empowerment. Inspired by the resilience of those we serve, we continue to innovate and collaborate, working towards a future where every newcomer finds belonging, security, and the chance to build a fulfilling life in Waterloo Region.",
};

const defaultTimelineEvents: TimelineEvent[] = [];

async function getHistoryPageData() {
  const [heroResult, introResult, closingResult, timelineEventsResult] =
    await Promise.all([
      fetchPageHero("our-history-hero"),
      fetchTextSection("history-introduction"),
      fetchTextSection("history-closing"),
      fetchTimelineEvents(),
    ]);

  return {
    heroData: heroResult || defaultHistoryHeroData,
    introText: introResult || defaultIntroText,
    closingText: closingResult || defaultClosingText,
    timelineEvents: timelineEventsResult || defaultTimelineEvents,
  };
}

export default async function OurHistory() {

  //NEW FUNCTION WITH NEW BACKEND -----------------------
  const res = await fetchAboutOurHistoryPage();
  console.log("Our History Page Data:", res);
  //-----------------------------------------------------


  const { heroData, introText, closingText, timelineEvents } =
    await getHistoryPageData();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
        role="banner"
      >
        {heroData.imageUrl && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroData.imageUrl})` }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "var(--hero-gradient)" }}
            />
          </div>
        )}

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <History className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {heroData.title}
            </h1>
            <p className="text-xl text-white/90">{heroData.description}</p>
          </div>
        </div>
      </section>

      {/* Introduction & Timeline Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {introText.title}
            </h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-center mx-auto markdown">
              <MarkdownRenderer content={introText.description} />
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
                style={{ background: "var(--timeline-gradient)" }}
              />
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={`${event.year}-${index}`}
                    className="relative flex flex-col md:flex-row gap-8 items-center md:items-stretch animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-full md:w-1/2 flex flex-col items-center ${
                        index % 2 === 0
                          ? "md:items-end md:pr-12"
                          : "md:items-start md:pl-12 md:order-2"
                      }`}
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

                    <div className="hidden md:flex absolute left-1/2 w-6 h-6 bg-[var(--rh-500)] rounded-full border-4 border-background shadow-[var(--shadow-soft)] -translate-x-1/2 z-10" />

                    <div
                      className={`w-full md:w-1/2 flex flex-col items-center ${
                        index % 2 !== 0
                          ? "md:items-end md:pr-12 md:order-1"
                          : "md:items-start md:pl-12"
                      }`}
                    >
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full max-w-[400px] object-cover rounded-lg shadow-lg border border-gray-200 hover:border-primary transition-colors duration-300"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="max-w-4xl mx-auto mt-20 text-center animate-fade-in">
            <Card className="p-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 shadow-[var(--shadow-card)]">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                {closingText.title}
              </h3>
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-center mx-auto markdown">
                <MarkdownRenderer content={closingText.description} />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
