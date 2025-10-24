
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

const socialLinks = [
  { icon: Facebook, name: "Facebook", url: "#" },
  { icon: Twitter, name: "Twitter", url: "#" },
  { icon: Instagram, name: "Instagram", url: "#" },
  { icon: Linkedin, name: "LinkedIn", url: "#" },
];

export default function HeroContactUs() {
    return (
         <section className="bg-[image:var(--hero-gradient)] py-16">
            <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-white/90">
                We're here to answer your questions and connect you with the support you need.
                </p>
            </div>
            </div>
        </section>
    );
}