import { Users } from "lucide-react"; // Icon for Hero section
import TeamDirectory from "./TeamDirectory"; // Client Component for interactive directory
import {
  fetchPageHero,
  type HeroData,
  fetchEmployees,
  type Employee,
  fetchDepartments,
} from "@/lib/strapi"; // API fetching functions and types

// Fallback data used if fetching from Strapi fails
const defaultHeroData: HeroData = {
  title: "Our People",
  description:
    "Meet the passionate individuals who make our mission possible every day.",
  imageUrl: "/assets/hero-photo2.jpg",
};
const defaultDepartments: string[] = ["All"];
const defaultEmployees: Employee[] = [];

// Server-side data fetching function for this page
async function getData() {
  // Fetch required data concurrently
  const [heroResult, employeesResult, departmentsResult] = await Promise.all([
    fetchPageHero("our-people-hero"),
    fetchEmployees(),
    fetchDepartments(),
  ]);

  // Return fetched data or fallbacks
  return {
    heroData: heroResult || defaultHeroData,
    employees: employeesResult || defaultEmployees,
    departments: departmentsResult || defaultDepartments,
  };
}

// Main Page Component - Renders on the Server
export default async function OurPeople() {
  // Fetch data before rendering the page
  const { heroData, employees, departments } = await getData();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
        role="banner"
      >
        {/* Background image */}
        {heroData.imageUrl && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroData.imageUrl})` }}
          >
            <div
              className="absolute inset-0 "
              style={{ background: "var(--hero-gradient)" }} // Gradient overlay defined in CSS
            />
          </div>
        )}
        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {heroData.title}
            </h1>
            <p className="text-xl text-white/90">{heroData.description}</p>
          </div>
        </div>
      </section>

      {/* Team Directory Section */}
      {/* Renders the client component responsible for filtering and displaying employees */}
      <TeamDirectory departments={departments} employees={employees} />
    </>
  );
}
