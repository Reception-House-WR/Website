"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Employee } from "@/lib/strapi";

// Define the props this component expects from its parent (page.tsx)
interface TeamDirectoryProps {
  departments: string[];
  employees: Employee[];
}

export default function TeamDirectory({
  departments,
  employees,
}: TeamDirectoryProps) {
  // State for managing the search input value
  const [searchQuery, setSearchQuery] = useState("");
  // State for managing the currently selected department filter
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Filter the employees array based on current search query and selected department
  const filteredEmployees = employees.filter((employee) => {
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

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Input and Department Filter Badges */}
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

            {/* Department Filter Badges */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <Badge
                  key={dept}
                  className={cn(
                    "px-4 py-1.5 rounded-full cursor-pointer transition-colors text-sm font-medium border",
                    // Apply active styles if the department is selected
                    selectedDepartment === dept
                      ? "bg-[var(--rh-400)] text-white border-[var(--rh-500)] hover:bg-[var(--rh-400)]/90"
                      : "bg-card border-border text-foreground hover:bg-[var(--rh-400)] hover:text-white hover:border-[var(--rh-500)]"
                  )}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </Badge>
              ))}
            </div>
          </div>

          {/* Employee Grid Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Render a card for each employee in the filtered list */}
            {filteredEmployees.map((employee, index) => (
              <Card
                key={employee.email || index}
                className="p-6 bg-card rounded-lg border-2 border-transparent hover:border-primary hover:shadow-soft transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="space-y-4">
                  {/* Display Employee Image or Initials Fallback */}
                  {employee.imageUrl ? (
                    <img
                      src={employee.imageUrl}
                      alt={employee.name || "Employee"}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-[var(--rh-500)] rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-2xl font-bold">
                        {employee.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "??"}
                      </span>
                    </div>
                  )}

                  {/* Employee Information */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {employee.name || "Unknown Employee"}
                    </h3>
                    <p className="text-muted-foreground font-medium mb-2">
                      {employee.role || "Unknown Role"}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mb-3 font-medium border-0 bg-[var(--rh-yellow-200)]" // Using yellow override
                    >
                      {employee.department || "Unknown Dept"}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {employee.email || "No Email Provided"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Message shown when no employees match the current filters */}
          {filteredEmployees.length === 0 && (
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
  );
}
