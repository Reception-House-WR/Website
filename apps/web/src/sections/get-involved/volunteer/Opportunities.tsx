import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HandHeart, Languages, Calendar, FileText, ExternalLink } from "lucide-react";

const opportunities = [
    {
      icon: BookOpen,
      title: "Language & Literacy Support",
      description: "Help newcomers improve their English skills through conversation practice and literacy support.",
    },
    {
      icon: HandHeart,
      title: "Settlement Assistance",
      description: "Guide families through accessing services, navigating systems, and adjusting to their new community.",
    },
    {
      icon: Languages,
      title: "Cultural Orientation",
      description: "Share knowledge about local customs, services, and community resources to help ease the transition.",
    },
    {
      icon: Calendar,
      title: "Event Support",
      description: "Help organize and run community events that celebrate diversity and build connections.",
    },
    {
      icon: FileText,
      title: "Administrative Support",
      description: "Assist with office tasks, data entry, and organizational projects that keep our programs running smoothly.",
    },
  ];
  
export default function Opportunities() {
    return (
        <section className="py-16 bg-gradient-card" aria-labelledby="opportunities-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="opportunities-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
              We have specific volunteer opportunities that work with children, youth and adults, as well as board and committee volunteer opportunities.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {opportunities.map((opportunity, index) => (
                <Card 
                  key={index} 
                  className="shadow-soft hover:shadow-medium transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--rh-500)]/90 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <opportunity.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{opportunity.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{opportunity.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
}