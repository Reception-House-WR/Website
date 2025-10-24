import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Car, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Community Drive", "Suite 200", "City, State 12345"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["Main: (555) 123-4567", "Fax: (555) 123-4568"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@nonprofit.org", "support@nonprofit.org"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9am - 5pm", "Saturday: 10am - 2pm", "Sunday: Closed"],
  },
];

export default function ContactCards() {
    return (
        <div className="space-y-4">
            {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
                <Card
                key={info.title}
                className="p-6 hover:shadow-soft transition-all duration-300 border-2 hover:border-primary animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-warm-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">{detail}</p>
                    ))}
                    </div>
                </div>
                </Card>
            );
            })}
        </div>
    );
}