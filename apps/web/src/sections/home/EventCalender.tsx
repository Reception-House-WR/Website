'use client';

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { UpcomingEvent } from "@/lib/strapi/models/event/event";

interface EventsCalendarProps {
  title: string;
  desc: string;
  events: UpcomingEvent[];
}

export const EventsCalendar = ({ title, desc, events }: EventsCalendarProps) => {
  // const data = eventsData[lang as keyof typeof eventsData] || eventsData.en;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isLoading] = useState(false);

  const eventDates = events
  .map(event => event.date)
  .filter((date): date is Date => date !== null);
  
  const displayedEvents = selectedDate
    ? events.filter(event => 
        event?.date && event.date.getDate() === selectedDate.getDate() &&
        event?.date.getMonth() === selectedDate.getMonth() &&
        event?.date.getFullYear() === selectedDate.getFullYear()
      )
    : events;

  const hasEventsOnSelectedDate = selectedDate && displayedEvents.length > 0;
  const isEmptySelectedDate = selectedDate && displayedEvents.length === 0;

  const modifiers = {
    hasEvent: eventDates,
  };

  const modifiersStyles = {
    hasEvent: {
      fontWeight: 'bold',
      position: 'relative' as const
    },
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleShowAllEvents = () => {
    setSelectedDate(undefined);
  };

  const eventsCountText = displayedEvents.length === 1 
    ? 'event' 
    : 'events';

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid lg:grid-cols-[350px_1fr] gap-8 items-start">

          {/* Left Calendar */}
          <Card className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-shadow lg:sticky lg:top-4 ">
            <CardContent className="p-4 flex flex-col items-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                className=" relative rounded-md
                before:content-[''] before:absolute before:inset-0
                before:bg-[url('/assets/leaf.png')] before:bg-no-repeat before:bg-center before:bg-contain
                before:opacity-15 before:pointer-events-none before:z-0"
                modifiersClassNames={{
                  hasEvent: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary",
                }}
              />
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{'Scheduled Events'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Event List */}
          <div className="space-y-6">
            {/* Status Bar with Show All Button */}
            <div 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border"
              role="status"
              aria-live="polite"
            >
              <div className="text-sm text-muted-foreground">
                {selectedDate ? (
                  <span>
                    {'Showing Events For'} <strong className="text-foreground">{dateFormatter.format(selectedDate)}</strong>
                    {hasEventsOnSelectedDate && (
                      <> ({displayedEvents?.length} {eventsCountText})</>
                    )}
                  </span>
                ) : (
                  <span>{'Select a date to filter events, or browse all upcoming events below'}</span>
                )}
              </div>
              {selectedDate && (
                <Button
                  onClick={handleShowAllEvents}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  aria-label={'Show All Events'}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                  {'Show All Events'}
                </Button>
              )}
            </div>

            {/* Events List */}
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 scroll-smooth focus-within:ring-2 focus-within:ring-primary/20 rounded-lg">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden py-0">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-[200px_1fr] gap-4">
                        <Skeleton className="h-48 md:h-full w-full rounded-none" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : isEmptySelectedDate ? (
                //Empty State for Date with No Events
                <div 
                  className="text-center py-16 px-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="max-w-sm mx-auto space-y-4">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground/50" aria-hidden="true" />
                    <p className="text-lg text-muted-foreground">
                      {'No events planned for this day'}
                    </p>
                    <Button
                      onClick={handleShowAllEvents}
                      variant="link"
                      className="text-primary hover:text-primary/80"
                      aria-label={'View All Events'}
                    >
                      {'View All Events'} →
                    </Button>
                  </div>
                </div>
              ) : (
                //Event Cards
                displayedEvents.map((event, id) => (
                  <Card 
                    key={id}
                    className="group overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all animate-fade-in py-0"
                  >
                    <CardContent className="p-0 sm:flex md:h-48">
                        {/* Event Image */}
                        <div className="relative md:aspect-auto overflow-hidden bg-muted h-full ">
                          
                          {(event?.image?.url && <img
                            src={event.image.url}
                            alt={event.image?.alternativeText || event.title}
                            loading="lazy"
                            className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />)}
                        </div>
                        
                        {/* Event Details */}
                        <div className="p-6 space-y-3 ">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {event?.title}
                          </h3>
                          
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <span>
                                {event?.date?.toISOString().split('T')[0]}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{event?.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event?.description}
                          </p>
                        </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
