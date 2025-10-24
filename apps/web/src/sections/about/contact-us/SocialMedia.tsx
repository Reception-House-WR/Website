import {Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Facebook, name: "Facebook", url: "https://www.facebook.com/ReceptionHouseWR" },
  { icon: Twitter, name: "Twitter", url: "https://x.com/Reception_House" },
  { icon: Instagram, name: "Instagram", url: "https://www.instagram.com/receptionhousewr/" },
  { icon: Linkedin, name: "LinkedIn", url: "https://www.linkedin.com/company/receptionhousewr" },
  { icon: Youtube, name: "YouTube", url: "https://www.youtube.com/channel/UCev97bOHM9WVxYF7CbqxaFw/videos" },
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
                    className="w-12 h-12 bg-muted hover:bg-[var(--rh-500)] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
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