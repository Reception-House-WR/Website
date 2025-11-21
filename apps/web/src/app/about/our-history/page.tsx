import { Card } from "@/components/ui/card";
import { History } from "lucide-react";
import  Img  from 'next/image';
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import { fetchAboutOurHistoryPage } from "@/lib/strapi/helpers/about/aboutOurHistoryHelper";


export default async function OurHistory() {

  const res = await fetchAboutOurHistoryPage();
  console.log("Our History Page Data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
        role="banner"
      >
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${res.hero.backgroundImageUrl})` }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "var(--hero-gradient)" }}
            />
          </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <History className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {res.hero.title}
            </h1>
            <p className="text-xl text-white/90">{res.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Introduction & Timeline Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {res.title}
            </h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-center mx-auto markdown">
              <MarkdownRenderer content={res.noteSection.description} />
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
                {res.timelineSection.events.map((event, index) => (
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
                      {event.image?.url && (
                        <div className="relative w-full max-w-[400px] h-[250px]">
                          <Img
                            src={event.image.url}
                            alt={event.image.alternativeText || `Image for ${event.title}`}
                            fill
                            className="object-cover rounded-lg shadow-lg border border-gray-200 hover:border-primary transition-colors duration-300"
                          />
                        </div>
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
                {res.noteSection.title}
              </h3>
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-center mx-auto markdown">
                <MarkdownRenderer content={res.noteSection.description} />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
