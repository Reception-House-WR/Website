import { Employee } from "../../models/about/employee";
import { AboutOurPeopleSections } from "../../models/about/ourPeopleSections";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { fetchAboutOurPeople, fetchAllEmployees } from "../../services/about/ourPeopleService";

const toSection = (s: any): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toEmployee = (e: any): Employee => ({
  name: e?.name ?? "",
  role: e?.role ?? "",
  department: e?.department ?? "",
  email: e?.email ?? "",
  imageUrl: e?.image?.url ?? "",
});

export async function fetchAboutOurPeoplePage(): Promise<AboutOurPeopleSections | null> {
  const [pageRes, employeesRes] = await Promise.all([
    fetchAboutOurPeople(),
    fetchAllEmployees(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero",
  ) as any;

  const notFoundRaw = sections.find(
    (s: any) => s.__component === "common.section",
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const notFound = toSection(notFoundRaw ?? {});

  const people: Employee[] = (employeesRes?.data ?? []).map((e: any) =>
    toEmployee(e),
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