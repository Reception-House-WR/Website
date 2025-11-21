"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// --- Types ---
interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
}

interface EventCalendarProps {
  events: Event[];
}

// --- Calendar Sidebar Component ---
export function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Converting event date strings to Date objects
  const eventDates = events
    .filter((event) => event.category === "upcoming")
    .map((event) => {
      const date = new Date(event.date);
      date.setUTCDate(date.getUTCDate());
      return date;
    });

  // Get events for the selected date
  const eventsOnSelectedDate = selectedDate
    ? events.filter(
        (event) => event.date === format(selectedDate, "yyyy-MM-dd")
      )
    : [];

  return (
    <Card className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-shadow lg:sticky lg:top-4">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Upcoming Events Calendar
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-4 flex flex-col items-center">
        {/* Calendar with event markers */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="relative rounded-md border mx-auto scale-105 my-3
            before:content-[''] before:absolute before:inset-0
            before:bg-[url('/assets/leaf.png')] before:bg-no-repeat before:bg-center before:bg-contain
            before:opacity-15 before:pointer-events-none before:z-0"
          modifiers={{
            eventDay: eventDates,
          }}
          modifiersClassNames={{
            eventDay:
              "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[var(--rh-500)] aria-selected:after:hidden",
          }}
        />

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border w-full">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--rh-500)]"></div>
              <span>Scheduled Events</span>
            </div>
          </div>
        </div>

        {/* Events for the selected date */}
        {selectedDate && eventsOnSelectedDate.length > 0 && (
          <div className="space-y-2 pt-2 w-full">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Events on{" "}
              {selectedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
              :
            </h4>
            {eventsOnSelectedDate.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <p className="font-medium text-sm">{event.title}</p>
                {event.category === "upcoming" && (
                  <Badge className="mb-3 font-medium border-0 text-foreground bg-[var(--rh-yellow-300)] hover:bg-[var(--rh-yellow-200)]">
                    Upcoming
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No events for selected date */}
        {selectedDate && eventsOnSelectedDate.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No events scheduled for this date
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
