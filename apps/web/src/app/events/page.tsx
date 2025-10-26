"use client";

import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// 1. IMPORT YOUR NEW EVENT CALENDAR COMPONENT
// (Assuming it's in the same folder)
import { EventCalendar } from "./EventCalendar";

// --- NEW EVENT TYPE ---
type Event = {
  title: string;
  description: string;
  date: string; // ISO date string like "2025-11-15"
  time: string;
  location: string;
  image: string;
  category: "upcoming" | "past";
};

// --- HELPER FUNCTION ---
function formatDisplayDate(isoDate: string) {
  const date = new Date(isoDate);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/// --- EVENT CARD COMPONENT (for the left column) ---
// Updated to use your custom 'rh-500' color
const EventCard = ({ event }: { event: Event }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-0 md:flex">
      {/* Image Placeholder */}
      <div className="w-full md:w-1/3 bg-muted/50 flex items-center justify-center p-6">
        <div className="w-24 h-24 bg-muted-foreground/10 rounded-full flex items-center justify-center">
          <CalendarIcon className="w-10 h-10 text-muted-foreground/50" />
        </div>
      </div>

      {/* Event Details */}
      <div className="w-full md:w-2/3 p-6">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl ">{event.title}</CardTitle>
          {event.category === "upcoming" && (
            // --- MODIFIED BADGE ---
            // Removed variant="default"
            // Added classes to use your --rh-500 color and --primary-foreground for light text
            <Badge className="mb-3 font-medium border-0 text-foreground bg-[var(--rh-yellow-300)] hover:bg-[var(--rh-yellow-200)]">
              Upcoming
            </Badge>
          )}
        </div>
        <CardDescription className="mb-4">{event.description}</CardDescription>

        <div className="space-y-3 text-muted-foreground mb-6">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5" />
            {/* Use the new formatting function */}
            <span>{formatDisplayDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* --- MODIFIED BUTTON ---
            // Added classes to use your --rh-500 color and --primary-foreground for light text
        */}
        <Button
          size="lg"
          className="bg-[var(--rh-500)] text-[var(--primary-foreground)] hover:bg-[var(--rh-400)]"
        >
          RSVP Now
        </Button>
      </div>
    </CardContent>
  </Card>
);

// --- MOCK DATA ---
const allEventsData: Event[] = [
  // ... (Your event data is unchanged) ...
  {
    title: "Welcome Orientation Session",
    description:
      "Join us for an introduction to our services and meet fellow newcomers in the community.",
    date: "2025-11-15",
    time: "2:00 PM - 4:00 PM",
    location: "Reception House Main Office",
    image: "/placeholder.svg",
    category: "upcoming",
  },
  {
    title: "English Conversation Circle",
    description:
      "Practice your English in a friendly, supportive environment with volunteers and other learners.",
    date: "2025-11-18",
    time: "6:00 PM - 7:30 PM",
    location: "Community Center",
    image: "/placeholder.svg",
    category: "upcoming",
  },
  {
    title: "Cultural Potluck Dinner",
    description:
      "Share dishes from your home country and experience the flavors of our diverse community.",
    date: "2025-11-22",
    time: "5:30 PM - 8:00 PM",
    location: "Reception House Community Hall",
    image: "/placeholder.svg",
    category: "upcoming",
  },
  {
    title: "Job Search Workshop",
    description:
      "Learn how to create a Canadian-style resume and prepare for job interviews.",
    date: "2025-10-15",
    time: "1:00 PM - 3:00 PM",
    location: "Reception House Main Office",
    image: "/placeholder.svg",
    category: "past",
  },
  {
    title: "Family Day Celebration",
    description:
      "A fun-filled day with activities for the whole family, games, and cultural performances.",
    date: "2025-10-20",
    time: "11:00 AM - 3:00 PM",
    location: "City Park",
    image: "/placeholder.svg",
    category: "past",
  },
];

// --- MAIN EVENTS PAGE COMPONENT ---

export default function EventsPage() {
  const calendarEvents = allEventsData.map((event, index) => ({
    id: index,
    title: event.title,
    date: event.date,
    category: event.category,
  }));

  const upcomingEvents = allEventsData.filter(
    (event) => event.category === "upcoming"
  );
  const pastEvents = allEventsData.filter((event) => event.category === "past");

  return (
    // 1. REMOVED background gradient from this wrapper
    <div className="min-h-screen bg-background">
      {/* --- NEW HERO SECTION (Copied from OurPeople) --- */}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
        role="banner"
      >
        {/* 2. Set a background image. Change this URL to your desired image. */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/hero-photo2.jpg')` }}
        >
          {/* 3. This gradient comes from your globals.css (like on the OurPeople page) */}
          <div
            className="absolute inset-0 "
            style={{ background: "var(--hero-gradient)" }}
          />
        </div>
        {/* 4. Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white animate-fade-in-up">
            {/* 5. Used CalendarIcon instead of Users icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            {/* 6. Used the text from your original EventsPage header */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Community Events
            </h1>
            <p className="text-xl text-white/90">
              Join us in our upcoming events and community activities. Your
              participation helps us build a more welcoming community for
              newcomers.
            </p>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      {/* 7. Added a new wrapper for your main content with padding */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Event Listings */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="all">All Events</TabsTrigger>
              </TabsList>

              {/* Upcoming Events Panel */}
              <TabsContent value="upcoming" className="mt-6">
                <div className="space-y-6">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <EventCard key={event.title} event={event} />
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      No upcoming events right now.
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Past Events Panel */}
              <TabsContent value="past" className="mt-6">
                <div className="space-y-6">
                  {pastEvents.length > 0 ? (
                    pastEvents.map((event) => (
                      <EventCard key={event.title} event={event} />
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      No past events to show right now.
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* All Events Panel */}
              <TabsContent value="all" className="mt-6">
                <div className="space-y-6">
                  {allEventsData.length > 0 ? (
                    allEventsData.map((event) => (
                      <EventCard key={event.title} event={event} />
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      No events to show right now.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Calendar Sidebar */}
          <div className="lg:col-span-1">
            <EventCalendar events={calendarEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}
