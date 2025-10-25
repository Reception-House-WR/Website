"use client"; // Required for useState and useEffect

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Loader2 } from "lucide-react"; // Added Loader2
import { useState, useEffect } from "react"; // Added useEffect
import { cn } from "@/lib/utils";
// Import fetch functions and types for hero AND employees
import {
  fetchPageHero,
  type HeroData,
  fetchEmployees,
  type Employee,
  fetchDepartments,
} from "@/lib/strapi";

// Commented out static hero image URL - will be fetched
// const teamImageUrl = "/assets/team-collaboration.jpg";

// Static placeholder data for departments - kept as is (could also be fetched)
// const departments = [
//   "All",
//   "Leadership",
//   "Programs",
//   "Operations",
//   "Development",
//   "Communications",
// ];

// --- Commented out static employee data ---
/*
const employees = [
  {
    name: "Sarah Johnson",
    role: "Executive Director",
    department: "Leadership",
    email: "sarah@nonprofit.org",
    imageUrl: "/avatars/sarah-johnson.jpg",
  },
  { name: "Michael Chen", role: "Director of Programs", department: "Programs", email: "michael@nonprofit.org", imageUrl: null, },
  { name: "Emily Rodriguez", role: "Development Manager", department: "Development", email: "emily@nonprofit.org", imageUrl: null, },
  { name: "David Kim", role: "Operations Coordinator", department: "Operations", email: "david@nonprofit.org", imageUrl: null, },
  { name: "Jessica Williams", role: "Communications Lead", department: "Communications", email: "jessica@nonprofit.org", imageUrl: null, },
  { name: "Robert Taylor", role: "Program Specialist", department: "Programs", email: "robert@nonprofit.org", imageUrl: null, },
  { name: "Amanda Garcia", role: "Finance Director", department: "Operations", email: "amanda@nonprofit.org", imageUrl: null, },
  { name: "James Martinez", role: "Outreach Coordinator", department: "Communications", email: "james@nonprofit.org", imageUrl: null, },
];
*/
// --- END Commented out static employee data ---

export default function OurPeople() {
  // --- State for Hero Data ---
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoadingHero, setIsLoadingHero] = useState(true);

  // --- ADDED: State for Employee Data ---
  const [employeesData, setEmployeesData] = useState<Employee[]>([]); // Initialize with empty array
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  // --- END ADDED ---
  // --- ADDED: State for Departments ---
  const [departments, setDepartments] = useState<string[]>(["All"]); // Start with default
  const [isLoadingDepts, setIsLoadingDepts] = useState(true);
  // --- END ADDED ---

  // --- State for Filtering (Original) ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // --- Fetch All Data ---
  useEffect(() => {
    async function getAllData() {
      // Set all loading states
      setIsLoadingHero(true);
      setIsLoadingEmployees(true);
      setIsLoadingDepts(true);

      // Fetch in parallel
      const [heroResult, employeesResult, departmentsResult] =
        await Promise.all([
          fetchPageHero("our-people-hero"),
          fetchEmployees(),
          fetchDepartments(), // Call the new function
        ]);

      // Update states
      setHeroData(heroResult);
      setEmployeesData(employeesResult || []);
      setDepartments(departmentsResult || ["All"]); // Use fetched or default

      // Reset loading states
      setIsLoadingHero(false);
      setIsLoadingEmployees(false);
      setIsLoadingDepts(false);
    }

    getAllData();
  }, []); // Runs once on mount

  console.log("--- OurPeople Render ---"); // Log start of render
  console.log("isLoadingEmployees:", isLoadingEmployees); // Log loading state
  console.log("Raw employeesData state:", employeesData); // Log the raw fetched data (check length!)

  // --- Filtering Logic - MODIFIED to use employeesData state ---
  const filteredEmployees = employeesData.filter((employee) => {
    // Use employeesData here
    // Ensure properties exist before calling toLowerCase (optional chaining)
    const nameMatches =
      employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const roleMatches =
      employee.role?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = nameMatches || roleMatches;

    const matchesDepartment =
      selectedDepartment === "All" ||
      employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });
  // --- END MODIFIED ---

  console.log("Filtered employees:", filteredEmployees); // Log the result of filtering (check length!)

  return (
    <>
      {/* Hero Section - Modified for dynamic data & loading state */}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200" // Fallback bg
        role="banner"
      >
        {/* Background image conditional rendering */}
        {heroData?.imageUrl && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url(${heroData.imageUrl})`,
              opacity: isLoadingHero ? 0 : 1,
            }}
          >
            <div
              className="absolute inset-0 "
              style={{ background: "var(--hero-gradient)" }}
            />
          </div>
        )}
        {/* Loading/Error/Content display */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          {isLoadingHero ? (
            <div className="w-full flex justify-center items-center text-gray-600 dark:text-gray-300">
              <Loader2 className="w-12 h-12 animate-spin" />
            </div>
          ) : heroData ? (
            <div className="max-w-2xl text-white animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {heroData.title}
              </h1>
              <p className="text-xl text-white/90">{heroData.description}</p>
            </div>
          ) : (
            <div className="max-w-2xl text-white animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-400">
                Error Loading Content
              </h1>
              <p className="text-xl text-white/90">
                Could not load hero information.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Team Directory - Now uses dynamic employee data state */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter (Remains the same, interacts with state) */}
            <div className="mb-12 space-y-6 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg bg-card border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {isLoadingDepts ? (
                  <p className="text-muted-foreground">
                    Loading departments...
                  </p>
                ) : (
                  departments.map((dept) => (
                    <Badge
                      key={dept}
                      className={cn(
                        "px-4 py-1.5 rounded-full cursor-pointer transition-colors text-sm font-medium border",
                        selectedDepartment === dept
                          ? "bg-[var(--rh-400)] text-white border-[var(--rh-500)] hover:bg-[var(--rh-400)]/90"
                          : //? "bg-primary text-primary-foreground border-primary hover:bg-primary/90" // Alternative using theme colors
                            "bg-card border-border text-foreground hover:bg-[var(--rh-400)] hover:text-white hover:border-[var(--rh-500)]"
                        //: "bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary" // Alternative using theme colors
                      )}
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept}
                    </Badge>
                  ))
                )}
              </div>
            </div>

            {/* --- MODIFIED Employee Grid --- */}
            {/* Show loading state while fetching employees */}
            {isLoadingEmployees ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />{" "}
                {/* Use theme color */}
              </div>
            ) : (
              // Render grid once employeesData is loaded
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Maps over the filtered list (which uses employeesData state) */}
                {filteredEmployees.map((employee, index) => (
                  <Card
                    key={employee.email || index} // Use index as fallback key if email isn't guaranteed unique/present
                    className="p-6 bg-card rounded-lg border-2 border-transparent hover:border-primary hover:shadow-soft transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="space-y-4">
                      {/* Avatar Placeholder or Image */}
                      {employee.imageUrl ? (
                        <img
                          src={employee.imageUrl}
                          alt={employee.name || "Employee"} // Add fallback alt text
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        // Fallback uses initials
                        <div className="w-20 h-20 bg-[var(--rh-500)] rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-2xl font-bold">
                            {employee.name // Check if name exists before splitting
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "??"}{" "}
                            {/* Fallback initials */}
                          </span>
                        </div>
                      )}

                      {/* Info */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {employee.name || "Unknown Employee"}{" "}
                          {/* Fallback name */}
                        </h3>
                        <p className="text-muted-foreground font-medium mb-2">
                          {employee.role || "Unknown Role"}{" "}
                          {/* Fallback role */}
                        </p>
                        <Badge
                          variant="secondary" // Check globals.css mapping
                          className="mb-3 font-medium border-0 bg-[var(--rh-yellow-200)]" // Still overridden? Check if theme color works better
                        >
                          {employee.department || "Unknown Dept"}{" "}
                          {/* Fallback dept */}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {employee.email || "No Email Provided"}{" "}
                          {/* Fallback email */}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            {/* --- END MODIFIED Employee Grid --- */}

            {/* No Results Message - Renders based on filtered list */}
            {/* Show only if NOT loading AND filtered list is empty */}
            {!isLoadingEmployees && filteredEmployees.length === 0 && (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">
                  No team members found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
