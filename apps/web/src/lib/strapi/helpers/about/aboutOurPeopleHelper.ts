import { Employee } from "../../models/about/employee";
import { AboutOurPeopleSections } from "../../models/about/ourPeopleSections";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { fetchAboutOurPeople, fetchAllEmployees } from "../../services/about/ourPeopleService";

//Raw Strapi section type
type RawStrapiComponent = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
};

//Raw employee type from Strapi
type RawEmployee = {
  name?: string;
  role?: string;
  department?: string;
  email?: string;
  image?: { url?: string };
};

const toSection = (s?: RawStrapiComponent): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toHero = (s?: RawStrapiComponent): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toEmployee = (e: RawEmployee): Employee => ({
  name: e.name ?? "",
  role: e.role ?? "",
  department: e.department ?? "",
  email: e.email ?? "",
  imageUrl: e.image?.url ?? "",
});

export async function fetchAboutOurPeoplePage(locale: string): Promise<AboutOurPeopleSections | null> {
  const [pageRes, employeesRes] = await Promise.all([
    fetchAboutOurPeople(locale),
    fetchAllEmployees(locale),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiComponent[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const notFoundRaw = sections.find(
    (s) => s.__component === "common.section"
  );

  const hero = toHero(heroRaw);
  const notFound = toSection(notFoundRaw);

  const people: Employee[] = (employeesRes?.data ?? []).map((e) =>
    toEmployee(e as RawEmployee)
  );

  //DISTINCT departments 
  const departments: string[] = Array.from(
    new Set(
      people
        .map((p) => p.department?.trim())
        .filter((d): d is string => !!d),
    ),
  ).sort((a, b) => a.localeCompare(b));

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    notFound,
    people,
    departments,
  };
}