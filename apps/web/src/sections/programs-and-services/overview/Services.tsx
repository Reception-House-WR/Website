import { Heart, Building2, GraduationCap, Briefcase, BookOpen } from "lucide-react";

const serviceHighlights = [
    {
      icon: Heart,
      image: "assets/services/service-health-wellbeing.jpg",
      title: "Health and Wellbeing Support",
      color: "primary", 
      href: "programs-and-services/healthcare-wellbeing"
    },
    {
      icon: Building2,
      image: "assets/services/service-housing-support.jpg",
      title: "Temporary Accommodation and Housing Support",
      color: "secondary", 
      href: "programs-and-services/housing"
    },
    {
      icon: GraduationCap,
      image: "assets/services/service-children-youth.jpg",
      title: "Children and Youth",
      color: "accent", 
      href: "programs-and-services/children-youth"
    },
    {
      icon: Briefcase,
      image: "assets/services/service-employment.jpg",
      title: "Employment Services",
      color: "primary", 
      href: "programs-and-services/employment"
    },
    {
      icon: BookOpen,
      image: "assets/services/service-integration-training.jpg",
      title: "Integration Skills Training",
      color: "secondary", 
      href: "programs-and-services/integration-skills"
    }, 
    {
      icon: BookOpen,
      image: "assets/services/service-integration-training.jpg",
      title: "Services en Français",
      color: "secondary", 
      href: "programs-and-services/french-services"
    }
  ];

export default function Services(){

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12 my-8">
          {serviceHighlights.map((service, index) => (
            <a
              key={index}
              href={service.href} // ej: "#health-and-wellbeing"
              className="group relative h-64 rounded-xl overflow-hidden cursor-pointer animate-fade-in-up block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <img 
                src={service.image} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Default Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              
              {/* Teal Hover Overlay - slides from top-right */}
              <div className="absolute inset-0 bg-[var(--rh-500)]/90 translate-x-full translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out origin-top-right" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-end p-6 text-center z-10">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white leading-tight transition-all duration-300 group-hover:text-lg group-hover:font-bold">
                  {service.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
    );
}