import type { ComponentType, SVGProps } from "react";
import { Card } from "@/components/ui/card";
import { contactInfo as contactInfoType } from "@/lib/strapi/models/about/contactInfo";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [Phone,Mail, MapPin,Clock]

export default function ContactCards({
    contactInfo
}: {
  contactInfo: contactInfoType[]
}) {
    return (
        <div className="space-y-4">
            {contactInfo.map((info, index) => {
            const Icon = contactIcons[index % contactIcons.length];
            return (
                <Card
                key={info.title}
                className="p-6 hover:shadow-soft transition-all duration-300 border-2 hover:border-primary animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--rh-500)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-foreground">{info?.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{info?.value}</p>
                    </div>
                </div>
                </Card>
            );
            })}
        </div>
    );
}