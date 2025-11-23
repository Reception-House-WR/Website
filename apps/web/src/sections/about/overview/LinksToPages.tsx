import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  History,
  Mail,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

type QuickLink = {
  title: string;
  path: string;
  icon: LucideIcon;
  description: string;
};

const quickLinks: QuickLink[] = [
  {
    title: "Our People",
    path: "/about/our-people",
    icon: Users,
    description: "Meet our dedicated team members",
  },
  {
    title: "Our Purpose",
    path: "/about/purpose",
    icon: Target,
    description: "Our mission, vision, and values",
  },
  {
    title: "Our History",
    path: "/about/our-history",
    icon: History,
    description: "Journey of impact and growth",
  },
  {
    title: "Contact Us",
    path: "/about/contact-us",
    icon: Mail,
    description: "Get in touch with us",
  }
];

export default function LinkToPages() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 mx-8 ">
      {quickLinks.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            href={item.path}
            className="group animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card className="p-6 h-full hover:shadow-soft transition-all duration-300 border-2 hover:border-primary">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warm-gradient rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 bg-[var(--rh-500)]">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
