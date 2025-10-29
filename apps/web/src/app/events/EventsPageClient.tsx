"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCalendar } from "./EventCalendar";
import { type HeroData, type Event } from "@/lib/strapi";
import { EventCard } from "./EventCard";

// --- Main Events Page Client Component ---
interface EventsPageClientProps {
  heroData: HeroData;
  allEventsData: Event[];
}

export default function EventsPageClient({
  heroData,
  allEventsData,
}: EventsPageClientProps) {
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
    <div className="min-h-screen bg-background">
      {/* --- HERO SECTION --- */}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
        role="banner"
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroData.imageUrl})` }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--hero-gradient)" }}
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {heroData.title}
            </h1>
            <p className="text-xl text-white/90">{heroData.description}</p>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Event Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

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
