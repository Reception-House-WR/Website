"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react"; 

export const Footer = () => {
  const socialLinks = [
    {
      id: 1,
      name: "Facebook",
      href: "https://www.facebook.com/ReceptionHouseWR",
      icon: <Facebook className="w-6 h-6" />,
    },
    {
      id: 2,
      name: "Instagram",
      href: "https://www.instagram.com/receptionhousewr/",
      icon: <Instagram className="w-6 h-6" />,
    },
    {
      id: 3,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/receptionhousewr",
      icon: <Linkedin className="w-6 h-6" />,
    },
    {
      id: 4,
      name: "Twitter",
      href: "https://x.com/Reception_House",
      icon: <Twitter className="w-6 h-6" />,
    },
    {
      id: 5,
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCev97bOHM9WVxYF7CbqxaFw/videos",
      icon: <Youtube className="w-6 h-6" />,
    },
  ];

  return (
    <footer className="bg-[var(--rh-yellow-500)] text-black py-6 mt-12 min-h-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex justify-center md:justify-start gap-5">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="transition-transform hover:scale-110 hover:text-[var(--rh-500)]"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="text-sm text-center md:text-right">
          © 2025 Reception House Waterloo Region
        </p>
      </div>
    </footer>
  );
};

export default Footer;
