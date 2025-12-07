import { translateWithCache } from "@/lib/translation/service";
import { LucideIcon, Users, Target, History, Mail } from "lucide-react";

export type QuickLink = {
  title: string;
  path: string;
  icon: LucideIcon;
  description: string;
};

const quickLinksEn: QuickLink[] = [
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
  },
];

export async function getAboutUsQuickLinks(
  locale: string
): Promise<QuickLink[]> {

  if (!locale || locale === "en") return quickLinksEn;

  const strings: string[] = [];
  quickLinksEn.forEach((link) => {
    strings.push(link.title);
    strings.push(link.description);
  });

  let translated: string[];
  try {
    translated = await translateWithCache(strings, "en", locale);
  } catch (err) {
    console.error("[getAboutUsQuickLinks] translation failed:", err);
    return quickLinksEn;
  }

  let i = 0;
  const localizedLinks: QuickLink[] = quickLinksEn.map((link) => {
    const title = translated[i++];
    const description = translated[i++];
    return { ...link, title, description };
  });

  return localizedLinks;
}
