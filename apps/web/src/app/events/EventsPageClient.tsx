// app/events/EventsPageClient.tsx

"use client";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EventCalendar } from "./EventCalendar";
import { type HeroData, type Event } from "@/lib/strapi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RSVPForm } from "./RSVPForm";

// --- Helper: Format date for display ---
function formatDisplayDate(isoDate: string) {
  const date = new Date(isoDate);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// --- Event Card (individual event) ---
const EventCard = ({ event }: { event: Event }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const displayDate = formatDisplayDate(event.date);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card className="overflow-hidden">
        <CardContent className="p-0 md:flex h-full">
          {/* Event Image Section */}
          <div className="w-full h-48 md:h-auto md:w-1/3 relative bg-muted/50 flex-shrink-0">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6">
                <div className="w-24 h-24 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-10 h-10 text-muted-foreground/50" />
                </div>
              </div>
            )}
          </div>

          {/* Event Details Section */}
          <div className="w-full md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-2xl">{event.title}</CardTitle>
              {event.category === "upcoming" && (
                <Badge className="mb-3 font-medium border-0 text-foreground bg-[var(--rh-yellow-300)] hover:bg-[var(--rh-yellow-200)]">
                  Upcoming
                </Badge>
              )}
            </div>

            <CardDescription className="mb-4">
              {event.description}
            </CardDescription>

            <div className="space-y-3 text-muted-foreground mb-6">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5" />
                <span>{displayDate}</span>
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

            <DialogTrigger asChild>
              <Button
                size="lg"
                disabled={event.category === "past"}
                className={
                  event.category === "upcoming"
                    ? "bg-[var(--rh-500)] text-[var(--primary-foreground)] hover:bg-[var(--rh-400)]"
                    : ""
                }
              >
                {event.category === "upcoming" ? "RSVP Now" : "Event Ended"}
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">RSVP for Event</DialogTitle>
          <DialogDescription className="text-base">
            <span className="font-semibold text-foreground">{event.title}</span>
            <br />
            {displayDate} at {event.time}
          </DialogDescription>
        </DialogHeader>
        <RSVPForm
          eventTitle={event.title}
          eventDate={`${displayDate} at ${event.time}`}
          onClose={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

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
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="all">All Events</TabsTrigger>
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
