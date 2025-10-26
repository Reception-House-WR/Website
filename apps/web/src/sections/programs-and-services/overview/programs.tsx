import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users } from "lucide-react";
const programs = [
    {
      icon: Home,
      title: "RAP - Resettlement Assistance Program",
      duration: "First 4-6 Weeks",
      description: "Immediate support when newcomers first arrive in Canada, ensuring a stable foundation for their new life.",
      services: [
        "Temporary accommodation and essential household items",
        "Airport reception and orientation to Canadian life",
        "Healthcare enrollment and medical appointments",
        "Social insurance number and banking support",
        "Food assistance and essential needs provision"
      ],
      color: "primary"
    },
    {
      icon: Users,
      title: "CSS - Community Support Services",
      duration: "First Year in Canada",
      description: "Long-term integration support helping newcomers build independent, fulfilling lives in their new community.",
      services: [
        "Employment counseling and job search assistance",
        "Youth programs and educational support",
        "Skills training and credential recognition",
        "Health and wellbeing services",
        "Community connections and social integration"
      ],
      color: "secondary"
    }
  ];

export default function Programs(){
    return (
        <section className=" bg-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive support through two main programs, each designed to meet 
            newcomers at their specific stage of settlement and help them thrive.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <Card 
              key={index}
              className="shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  program.color === 'primary' ? 'bg-[var(--rh-500)]/80' : 'bg-[var(--rh-yellow-500)]/80'
                }`}>
                  <program.icon className="w-8 h-8 text-white " />
                </div>
                <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                <CardDescription className="text-[var(--rh-red-500)] font-semibold">{program.duration}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Key Services:</h4>
                  <ul className="space-y-2">
                    {program.services.map((service, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-[var(--rh-red-500)] mt-1">•</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed">
            These programs go beyond meeting basic needs they restore dignity, build confidence, and 
            create pathways to independence. Every person who walks through our doors deserves a chance 
            to rebuild their life with support, respect, and hope for the future.
          </p>
        </div>
      </div>
    </section>
    );
}