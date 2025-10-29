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
import { Badge } from "@/components/ui/badge";
import { type Event } from "@/lib/strapi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RSVPForm } from "./RSVPForm";

// --- Helper: Format date for display (now co-located with the component) ---
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
export const EventCard = ({ event }: { event: Event }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const displayDate = formatDisplayDate(event.date);

  // --- Handler for PAID event button ---
  const handlePaidRSVP = () => {
    if (event.eventbriteUrl) {
      window.open(event.eventbriteUrl, "_blank", "noopener,noreferrer");
    } else {
      console.error(
        "This is a paid event, but no Eventbrite URL was provided."
      );
      alert("Event registration link is missing. Please check back later.");
    }
  };

  // --- This is the shared UI for the card itself ---
  const CardUI = (
    <Card className="group overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all animate-fade-in py-0">
      <CardContent className="p-0 md:flex h-full">
        {/* Event Image Section */}
        <div className="w-full h-48 md:h-auto md:w-1/3  bg-muted/50 flex-shrink-0">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className=" w-full h-full flex items-center justify-center p-6">
              <div className="w-24 h-24 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-10 h-10 text-muted-foreground/50" />
              </div>
            </div>
          )}
        </div>

        {/* Event Details Section */}
        <div className="w-full md:w-2/3 p-6">
          {/* Event Title */}
          <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
          {/* Badges Section */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.category === "upcoming" && (
              <Badge className="font-medium border-0 text-foreground bg-[var(--rh-yellow-300)] hover:bg-[var(--rh-yellow-200)]">
                Upcoming
              </Badge>
            )}
            {event.isPaid && (
              <Badge className="font-medium border-0 bg-[var(--chart-2)] text-white">
                Paid
              </Badge>
            )}
          </div>
          {/* --- End Badges Section --- */}
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

          {/* --- CONDITIONAL BUTTON LOGIC --- */}
          {event.category === "upcoming" ? (
            event.isPaid ? (
              // --- PAID EVENT BUTTON (Direct Link) ---
              <Button
                size="lg"
                className="bg-[var(--rh-500)] text-[var(--primary-foreground)] hover:bg-[var(--rh-400)]"
                onClick={handlePaidRSVP}
              >
                RSVP on Eventbrite
              </Button>
            ) : (
              // --- FREE EVENT BUTTON (Modal Trigger) ---
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-[var(--rh-500)] text-[var(--primary-foreground)] hover:bg-[var(--rh-400)]"
                >
                  RSVP Now
                </Button>
              </DialogTrigger>
            )
          ) : (
            // --- PAST EVENT BUTTON (Disabled) ---
            <Button size="lg" disabled>
              Event Ended
            </Button>
          )}
          {/* --- End Conditional Button --- */}
        </div>
      </CardContent>
    </Card>
  );

  // --- CONDITIONAL WRAPPER ---
  if (event.isPaid || event.category === "past") {
    return CardUI;
  }

  // --- FREE, UPCOMING EVENT: Wrap in the Dialog ---
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {CardUI} {/* This now contains the <DialogTrigger> */}
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
