import { Coffee, TvMinimalPlay, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react"; // Added for React.ElementType

const partnershipPrograms = [
  {
    icon: Globe,
    title: "Collège Boréal Partnership",
    subtitle: "Francophone Settlement Services",
    description:
      "Through our collaboration with Collège Boréal, we provide comprehensive settlement support in French, including employment services, community orientation, and integration assistance specifically tailored for francophone newcomers.",
    services: [
      "Orientation et intégration communautaire en français",
      "Services d'emploi et développement de carrière",
      "Soutien à la navigation des services gouvernementaux",
      "Connexions avec la communauté francophone locale",
    ],
    servicesTitle: "Services Offerts:",
    color: "primary",
  },
  {
    icon: Users,
    title: "Projet Bienvenue",
    subtitle: "Community Building & Support",
    description:
      "The Bienvenue Project creates welcoming spaces for French-speaking newcomers to connect, share experiences, and build supportive networks. We facilitate cultural events, peer support groups, and community integration activities.",
    services: [
      "Groupes de soutien par les pairs francophones",
      "Événements culturels et célébrations communautaires",
      "Ateliers d'intégration et de développement des compétences",
      "Mentorat et accompagnement personnalisé",
    ],
    servicesTitle: "Program Highlights:",
    color: "secondary",
  },
];

type DetailVideo = { type: "video"; label: string; value: string };
type DetailSession = {
  type: "session";
  icon: string;
  label: string;
  value: string;
};
type DetailLocation = {
  type: "location";
  icon: string;
  label: string;
  value: string;
};
type Detail = DetailVideo | DetailSession | DetailLocation;
interface AdditionalService {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: Detail[];
  buttonText: string;
  backgroundClasses: string;
  buttonTextColor: string;
}

const additionalServices: AdditionalService[] = [
  {
    id: "cafe",
    icon: Coffee,
    title: "Café Français",
    description:
      "Join us for informal French conversation sessions where newcomers can practice their French, meet other francophone community members, and enjoy coffee and connection in a relaxed setting.",
    details: [
      {
        type: "session",
        icon: "📅",
        label: "Upcoming Sessions",
        value: "Third Friday of each month, 2:00 PM - 4:00 PM",
      },
      {
        type: "location",
        icon: "📍",
        label: "Location",
        value: "Reception House, 97 Glasgow Street, Kitchener",
      },
    ],
    buttonText: "Register for French Café",
    backgroundClasses:
      "bg-gradient-to-br from-[var(--rh-red-500)] to-[var(--rh-red-300)]",
    buttonTextColor: "text-[var(--rh-red-500)]",
  },
  {
    id: "video",
    icon: TvMinimalPlay,
    title: "Ressources Vidéo",
    description:
      "Access helpful video resources in French covering settlement topics, community information, and success stories from francophone newcomers who have built their lives in Waterloo Region.",
    details: [
      {
        type: "video",
        label: "Getting Started in Canada",
        value: "Essential orientation for new arrivals",
      },
      {
        type: "video",
        label: "Employment Resources",
        value: "Job search tips and workplace integration",
      },
      {
        type: "video",
        label: "Community Stories",
        value: "Success stories from francophone newcomers",
      },
    ],
    buttonText: "Watch French Videos",
    backgroundClasses:
      "bg-gradient-to-br from-[var(--rh-400)] to-[var(--rh-200)]",
    buttonTextColor: "text-[var(--rh-500)]",
  },
];

const FrenchServicesSection = () => {
  return (
    <section className="py-20 bg-[var(--rh-yellow-50)]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Services en Français
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nous offrons des services en français pour soutenir les nouveaux
              arrivants francophones dans leur intégration à la région de
              Waterloo. Through our partnership with Collège Boréal and the
              Bienvenue Project, we ensure French-speaking newcomers feel
              welcomed and supported.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {partnershipPrograms.map((program, index) => (
              <Card
                key={index}
                className="shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="flex flex-row items-start gap-6 mb-2">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                      program.color === "primary"
                        ? "bg-[var(--rh-500)]/80"
                        : "bg-[var(--rh-yellow-500)]/80"
                    }`}
                  >
                    <program.icon className="w-8 h-8 text-white " />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-1">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="text-[var(--rh-red-500)] font-semibold">
                      {program.subtitle}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      {program.servicesTitle}
                    </h4>
                    <ul className="space-y-2">
                      {program.services.map((service, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-[var(--rh-red-500)] mt-1">
                            •
                          </span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {additionalServices.map((service, index) => (
              <div
                key={service.id}
                className={`${service.backgroundClasses} p-8 rounded-2xl text-white shadow-medium animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <service.icon className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-white/95 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-3 mb-6">
                  {service.details.map((detail, idx) =>
                    detail.type === "video" ? (
                      <div
                        key={idx}
                        className="bg-white/10 p-4 rounded-lg transition-colors duration-200 hover:bg-white/20"
                      >
                        <p className="font-semibold mb-1">{detail.label}</p>
                        <p className="text-sm text-white/90">{detail.value}</p>
                      </div>
                    ) : (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-white/90">{detail.icon}</span>
                        <div>
                          <p className="font-semibold">{detail.label}</p>
                          <p className="text-sm text-white/90">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  className={`bg-white ${service.buttonTextColor} hover:bg-white/80 w-full sm:w-auto`}
                >
                  {service.buttonText}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-muted p-8 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Besoin d'aide en français?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our French services team is here to support you. Contact us to
              learn more about francophone programs, upcoming events, or to
              connect with French-speaking settlement counselors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[var(--rh-500)] text-[var(--primary-foreground)] hover:bg-[var(--rh-400)]"
              >
                Contact French Services
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--rh-500)] text-[var(--rh-500)] hover:bg-[var(--rh-50)] hover:text-[var(--rh-500)]"
              >
                View All Programs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrenchServicesSection;
