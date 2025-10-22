"use client"; // Required for useState

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";


// Using a placeholder image as the local asset wasn't provided
const teamImageUrl =
  "/assets/team-collaboration.jpg";

const departments = [
  "All",
  "Leadership",
  "Programs",
  "Operations",
  "Development",
  "Communications",
];

const employees = [
  {
    name: "Sarah Johnson",
    role: "Executive Director",
    department: "Leadership",
    email: "sarah@nonprofit.org",
    imageUrl: "/avatars/sarah-johnson.jpg", // Placeholder for potential future image URL
  },
  {
    name: "Michael Chen",
    role: "Director of Programs",
    department: "Programs",
    email: "michael@nonprofit.org",
    imageUrl: "",
  },
  {
    name: "Emily Rodriguez",
    role: "Development Manager",
    department: "Development",
    email: "emily@nonprofit.org",
    imageUrl: "",
  },
  {
    name: "David Kim",
    role: "Operations Coordinator",
    department: "Operations",
    email: "david@nonprofit.org",
    imageUrl: "",
  },
  {
    name: "Jessica Williams",
    role: "Communications Lead",
    department: "Communications",
    email: "jessica@nonprofit.org",
    imageUrl: "",
  },
  {
    name: "Robert Taylor",
    role: "Program Specialist",
    department: "Programs",
    email: "robert@nonprofit.org",
    imageUrl: "",
  },
  {
    name: "Amanda Garcia",
    role: "Finance Director",
    department: "Operations",
    email: "amanda@nonprofit.org",
    imageUrl: "",
  },
  {
    name: "James Martinez",
    role: "Outreach Coordinator",
    department: "Communications",
    email: "james@nonprofit.org",
    imageUrl: "",
  },
];

export default function OurPeople() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden" role="banner">
        <div className="absolute inset-0 z-0 bg-[url('/assets/hero-photo2.jpg')] bg-cover bg-center">

           <div 
            className="absolute inset-0 "
            style={{ background: 'var(--hero-gradient)' }}
          />
          {/* Solid accent color overlay (now rh-teal) */}
          
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4"
            // style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
            >
              Our People
            </h1>
            <p className="text-xl text-white/90"
            // style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
            >
              Meet the passionate individuals who make our mission possible every
              day.
            </p>
          </div>
        </div>
      </section>

      {/* Team Directory */}
      {/* Main section uses bg-background (now light grey) */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter */}
            <div className="mb-12 space-y-6 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // Styling to match design (white bg, light border, branded focus ring)
                  className="pl-12 py-6 text-lg bg-card border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <Badge
                    key={dept}
                    // We are removing the `variant` prop to take full control
                    className={cn(
                      // 1. Base styles for all badges
                      "px-4 py-1.5 rounded-full cursor-pointer transition-colors text-sm font-medium border",

                      // 2. Conditional styles
                      selectedDepartment === dept
                        ? // If TRUE (Selected): Use primary (orange) styles
                          "bg-[var(--rh-400)] text-white border-[var(--rh-500)] hover:bg-[var(--rh-400)]/90"
                        : // If FALSE (Not Selected): Use card/border (white/grey) styles
                          "bg-card border-border text-foreground hover:bg-[var(--rh-400)] hover:text-white hover:border-[var(--rh-500)]"
                    )}
                    onClick={() => setSelectedDepartment(dept)}
                  >
                  {dept}
                </Badge>
                ))}
              </div>
            </div>

            {/* Employee Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee, index) => (
                <Card
                  key={employee.email}
                  // Card styling (white bg, light border, hover effect)
                  className="p-6 bg-card rounded-lg border-2 border-transparent hover:border-primary hover:shadow-soft transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-4">
                    {/* Avatar Placeholder */}
                    {employee.imageUrl ? (
                      // IF an image URL exists, show the image:
                      <img
                        src={employee.imageUrl}
                        alt={employee.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      // ELSE, show the initials (your original code):
                      <div className="w-20 h-20 bg-[var(--rh-500)] rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-2xl font-bold">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}

                    {/* Info */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {employee.name}
                      </h3>
                      <p className="text-muted-foreground font-medium mb-2">
                        {employee.role}
                      </p>
                      {/* variant="secondary" now maps to the green tag */}
                      <Badge
                        variant="secondary"
                        className="mb-3 font-medium border-0 bg-[var(--rh-yellow-200)]"
                      >
                        {employee.department}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

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
    </>
  );
}