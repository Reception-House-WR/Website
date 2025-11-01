import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe } from "lucide-react";

const reasons = [
    {
      icon: Heart,
      title: "Make a Real Impact",
      description: "Your time and skills directly help refugees and newcomers build their new lives with confidence and dignity.",
      image: "/assets/volunteer/reasons/1.jpg",
    },
    {
      icon: Users,
      title: "Build Connections",
      description: "Create meaningful relationships with people from diverse backgrounds and become part of a welcoming community.",
      image: "/assets/volunteer/reasons/2.jpg",
    },
    {
      icon: Globe,
      title: "Gain New Perspectives",
      description: "Learn about different cultures, languages, and experiences while developing valuable intercultural skills.",
      image: "/assets/volunteer/reasons/3.jpg",
    },
  ];
  
export default function WhyVolunteer() {
    return (
        <section className="py-16 bg-muted/30" aria-labelledby="why-heading">
        <div className="container mx-auto px-4">
          <h2 id="why-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Volunteer With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {reasons.map((reason, index) => (
            <Card
                key={index}
                className="relative overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 group animate-fade-in min-h-[400px]"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                <CardContent className="p-0 absolute inset-0">
                    <div className="relative h-full">
                    <img
                        src={reason.image}
                        alt={reason.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 transition-all duration-300" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                        <div className="bg-[var(--rh-500)]/90 w-14 h-14 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        <reason.icon className="h-7 w-7 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{reason.title}</h3>
                        <p className="text-white/90 leading-relaxed text-base">{reason.description}</p>
                    </div>
                    </div>
                </CardContent>
            </Card>

            ))}
          </div>
        </div>
      </section>
    );
}