import { getTranslatedNav } from "@/lib/translation/translateNav";

export const NAV = [
  { label: "Home", href: "/" },

  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Overview",
        href: "/about",
        description: "A quick overview of this section.",
      },
      {
        label: "Our People",
        href: "/about/our-people",
        description: "Meet the team behind Reception House.",
      },
      {
        label: "Our Purpose",
        href: "/about/purpose",
        description: "What we do and why we exist.",
      },
      {
        label: "Our History",
        href: "/about/our-history",
        description: "Milestones and impact over the years.",
      },
      {
        label: "Contact Us",
        href: "/about/contact-us",
        description: "Get in touch or visit our offices.",
      },
    ],
  },

  {
    label: "Programs & Services",
    href: "/programs-and-services",
    children: [
      {
        label: "Overview",
        href: "/programs-and-services",
        description: "A quick overview of this section.",
      },
      {
        label: "Healthcare & Wellbeing",
        href: "/programs-and-services/healthcare-wellbeing",
        description: "Primary care access, mental health and wellness.",
      },
      {
        label: "Temporary Accommodation & Housing",
        href: "/programs-and-services/housing",
        description: "Short-term stays and pathways to permanent housing.",
      },
      {
        label: "Children & Youth",
        href: "/programs-and-services/children-youth",
        description: "Support for school readiness and youth programs.",
      },
      {
        label: "Employment Services",
        href: "/programs-and-services/employment",
        description: "Job search help, coaching and employer links.",
      },
      {
        label: "Integration Skills Training",
        href: "/programs-and-services/integration-skills",
        description: "Language and life skills for newcomers.",
      },
      {
        label: "French Services",
        href: "/programs-and-services/french-services",
        description: "Services en français pour les nouveaux arrivants.",
      },
    ],
  },

  { label: "Events", href: "/events" },

  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      {
        label: "Overview",
        href: "/get-involved",
        description: "A quick overview of this section.",
      },
      {
        label: "Volunteer Sign Up",
        href: "/get-involved/volunteer",
        description: "Share your time and skills with our community.",
      },
      {
        label: "Careers",
        href: "/get-involved/careers",
        description: "Join our staff—see current openings.",
      },
    ],
  },

  { label: "Stories", href: "/stories" },
  { label: "Donate", href: "/donate" },
  { label: "Media Room", href: "/media-room" },
];

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export async function buildLocalizedNav(locale: string): Promise<NavItem[]> {
  const base = await getTranslatedNav(locale);
  return base.map((item) => ({
    ...item,
    href: `/${locale}${item.href}`,
    children: item.children
      ? item.children.map((child) => ({
          ...child,
          href: `/${locale}${child.href}`,
        }))
      : undefined,
  }));
}