import { Cards } from "@/lib/strapi/models/programs/cards";
import { Heart, Building2, GraduationCap, Briefcase, BookOpen } from "lucide-react";

const serviceIcons = [
  Heart,
  Building2,
  GraduationCap,
  Briefcase,
  BookOpen,
  BookOpen,
];

export default function Services({
  services
}: {
  services: Cards
}){

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12 my-8">
          {services?.cards.map((service, index) => {
            const DynamicIcon = serviceIcons[index % serviceIcons.length];
            return (
            <a
              key={index}
              href={service?.buttonUrl} 
              className="group relative h-64 rounded-xl overflow-hidden cursor-pointer animate-fade-in-up block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              
              {(service?.image?.url && <img 
                src={service?.image.url} 
                alt={service?.image?.alternativeText || service?.title}
                className="absolute inset-0 w-full h-full object-cover"
              />)}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 bg-[var(--rh-500)]/90 translate-x-full translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out origin-top-right" />
              
              <div className="relative h-full flex flex-col items-center justify-end p-6 text-center z-10">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                  <DynamicIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white leading-tight transition-all duration-300 group-hover:text-lg group-hover:font-bold">
                  {service?.title}
                </h3>
              </div>
            </a>
          )})}
        </div>
    );
}