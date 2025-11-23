"use client";
import { NAV } from "@/components/common/header/Menu";
import { useMemo } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const socialLinks = [
  {
    icon: Facebook,
    name: "Facebook",
    url: "https://www.facebook.com/ReceptionHouseWR",
  },
  { icon: Twitter, name: "Twitter", url: "https://x.com/Reception_House" },
  {
    icon: Instagram,
    name: "Instagram",
    url: "https://www.instagram.com/receptionhousewr/",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/receptionhousewr",
  },
  {
    icon: Youtube,
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCev97bOHM9WVxYF7CbqxaFw/videos",
  },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

type FooterColumn = { title: string; links: { label: string; href: string }[] };

export function buildFooterColumns(nav: NavItem[]) {
  const columns: { title: string; links: { label: string; href: string }[] }[] =
    [];
  const more: { label: string; href: string }[] = [];

  for (const item of nav) {
    if (item.children && item.children.length > 0) {
      columns.push({
        title: item.label,
        links: item.children.map((c) => ({ label: c.label, href: c.href })),
      });
    } else {
      if (item.label.toLowerCase() !== "home") {
        more.push({ label: item.label, href: item.href });
      }
    }
  }

  if (more.length > 0) {
    columns.push({ title: "More", links: more });
  }

  return columns;
}

export const Footer = () => {
  const cols = useMemo<FooterColumn[]>(
    () => buildFooterColumns(NAV as NavItem[]),
    []
  );

  return (
    <footer className="bg-[var(--rh-yellow-500)] text-black py-10 mt-12 min-h-40">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column: Contact & Accessibility */}
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-xl mb-4">
                Reception House Waterloo Region
              </h2>
              <address className="not-italic space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="https://maps.google.com/?q=101+Frederick+St,+Kitchener,+ON+N2H+6R2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-colors flex items-center min-h-11"
                    aria-label="View our location on Google Maps: 101 Frederick St, Kitchener, ON N2H 6R2"
                  >
                    101 Frederick St, Kitchener, ON N2H 6R2
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+15197446549"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-colors flex items-center min-h-11"
                    aria-label="Call us at 519-744-6549"
                  >
                    519-744-6549
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:info@receptionhouse.ca"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-colors flex items-center min-h-11"
                    aria-label="Email us at info@receptionhouse.ca"
                  >
                    info@receptionhouse.ca
                  </a>
                </div>

                <p className="pt-2 text-xs">
                  Charitable Registration No. 11890 5297 RR0001
                </p>
              </address>
            </div>

            {/* Accessibility Statement */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">
                Accessibility at Reception House
              </h3>
              <p className="text-sm leading-relaxed">
                We are committed to providing accessible services in accordance
                with the Accessibility for Ontarians with Disabilities Act
                (AODA). For alternate formats or accessibility inquiries,
                contact{" "}
                <a
                  href="mailto:info@receptionhouse.ca"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-colors font-medium flex items-center min-h-11"
                >
                  info@receptionhouse.ca
                </a>
                .
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-opacity flex items-center justify-center min-h-11 w-11"
                    aria-label={`Visit our ${social.name} page`}
                    key={social.name}
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </a>
                );
              })}
            </div>
          </div>

          {/*Right Column: Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cols.map((col, idx) => (
              <nav key={col.title} aria-labelledby={`footer-col-${idx}`}>
                <h3
                  id={`footer-col-${idx}`}
                  className="font-semibold text-base mb-3"
                >
                  {col.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="underline decoration-transparent hover:decoration-inherit focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-yellow-300 rounded-sm flex items-center min-h-11"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        {/*Bottom Bar */}
        <div className="border-t border-foreground/10 pt-6 text-center">
          <p className="text-sm mb-2">
            © 2025 Reception House Waterloo Region | All rights reserved
          </p>
          <nav
            aria-label="Legal links"
            className="flex flex-wrap justify-center gap-3 text-xs items-center"
          >
            <Link
              href="/privacy"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-colors flex items-center min-h-11"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href="/accessibility"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-colors flex items-center min-h-11"
            >
              Accessibility
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href="/terms"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary transition-colors flex items-center min-h-11"
            >
              Terms of Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
