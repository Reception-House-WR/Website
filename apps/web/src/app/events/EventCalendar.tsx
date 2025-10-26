import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
}

interface EventCalendarProps {
  events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Convert event dates to Date objects for the calendar
  const eventDates = events
    .filter((event) => event.category === "upcoming")
    .map((event) => new Date(event.date));

  // Get events for selected date
  const eventsOnSelectedDate = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Upcoming Events Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border mx-auto"
          modifiers={{
            eventDay: eventDates,
          }}
          modifiersStyles={{
            eventDay: {
              fontWeight: "bold",
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              borderRadius: "0.5rem",
            },
          }}
        />

        {selectedDate && eventsOnSelectedDate.length > 0 && (
          <div className="space-y-2 pt-2">
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
