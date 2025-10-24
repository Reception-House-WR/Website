import {Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Facebook, name: "Facebook", url: "#" },
  { icon: Twitter, name: "Twitter", url: "#" },
  { icon: Instagram, name: "Instagram", url: "#" },
  { icon: Linkedin, name: "LinkedIn", url: "#" },
];

export default function SocialMedia() {
    return (
        <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Connect With Us</h3>
            <div className="flex gap-3">
            {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                <a
                    key={social.name}
                    href={social.url}
                    className="w-12 h-12 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label={social.name}
                >
                    <Icon className="w-5 h-5 text-foreground group-hover:text-primary-foreground" />
                </a>
                );
            })}
            </div>
        </div>
    );
}