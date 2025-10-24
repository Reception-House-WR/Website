'use client';

import { useState } from "react";
// import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";

// import eventOrientation from "@/assets/event-orientation.jpg";
// import eventPotluck from "@/assets/event-potluck.jpg";
// import eventWorkshop from "@/assets/event-workshop.jpg";
// import eventFestival from "@/assets/event-festival.jpg";

// import testImage from 'assets/stories/story-1.jpg'

const testImage = 'assets/stories/story-1.jpg';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  image: {
    url: string;
    alt: string;
  };
  summary: string;
}

interface EventsCalendarProps {
  lang: string;
}

const eventsData = {
  en: {
    title: "Upcoming Events",
    showAllButton: "Show All Events",
    noEventsMessage: "No events planned for this day.",
    viewAllLink: "View all events",
    showingEventsFor: "Showing events for",
    eventsCount: "event",
    eventsCountPlural: "events",
    selectDatePrompt: "Select a date to filter events, or browse all upcoming events below",
    events: [
      {
        id: 1,
        title: "Newcomer Orientation Session",
        date: new Date(2025, 2, 15),
        time: "2:00 PM - 4:00 PM",
        location: "Reception House Main Hall",
        image: {
          url: testImage,
          alt: "Diverse newcomers sitting in a welcoming orientation session",
        },
        summary: "Learn about available services and connect with our support team.",
      },
      {
        id: 2,
        title: "Community Potluck Dinner",
        date: new Date(2025, 2, 22),
        time: "6:00 PM - 9:00 PM",
        location: "Community Center",
        image: {
          url: testImage,
          alt: "People sharing food at a vibrant community potluck dinner",
        },
        summary: "Bring a dish to share! All welcome to this multicultural feast.",
      },
      {
        id: 3,
        title: "Job Skills Workshop",
        date: new Date(2025, 2, 28),
        time: "10:00 AM - 12:00 PM",
        location: "Training Room B",
        image: {
          url: testImage,
          alt: "Professional training session with people learning job skills",
        },
        summary: "Resume building, interview prep, and networking strategies.",
      },
      {
        id: 4,
        title: "Children's Cultural Festival",
        date: new Date(2025, 3, 5),
        time: "1:00 PM - 5:00 PM",
        location: "Victoria Park",
        image: {
          url: testImage,
          alt: "Children celebrating at a colorful cultural festival",
        },
        summary: "Music, dance, crafts, and games celebrating diverse cultures.",
      },
    ],
  },
  fr: {
    title: "Événements à venir",
    showAllButton: "Afficher tous les événements",
    noEventsMessage: "Aucun événement prévu pour ce jour.",
    viewAllLink: "Voir tous les événements",
    showingEventsFor: "Affichage des événements pour",
    eventsCount: "événement",
    eventsCountPlural: "événements",
    selectDatePrompt: "Sélectionnez une date pour filtrer les événements, ou parcourez tous les événements à venir ci-dessous",
    events: [
      {
        id: 1,
        title: "Session d'orientation pour nouveaux arrivants",
        date: new Date(2025, 2, 15),
        time: "14h00 - 16h00",
        location: "Salle principale de Reception House",
        image: {
          url: testImage,
          alt: "Nouveaux arrivants lors d'une session d'orientation accueillante",
        },
        summary: "Découvrez les services disponibles et connectez-vous avec notre équipe.",
      },
      {
        id: 2,
        title: "Repas-partage communautaire",
        date: new Date(2025, 2, 22),
        time: "18h00 - 21h00",
        location: "Centre communautaire",
        image: {
          url: testImage,
          alt: "Personnes partageant de la nourriture lors d'un repas-partage communautaire",
        },
        summary: "Apportez un plat à partager ! Tous sont les bienvenus à ce festin multiculturel.",
      },
      {
        id: 3,
        title: "Atelier de compétences professionnelles",
        date: new Date(2025, 2, 28),
        time: "10h00 - 12h00",
        location: "Salle de formation B",
        image: {
          url: testImage,
          alt: "Session de formation professionnelle avec apprentissage des compétences",
        },
        summary: "Rédaction de CV, préparation aux entretiens et stratégies de réseautage.",
      },
      {
        id: 4,
        title: "Festival culturel pour enfants",
        date: new Date(2025, 3, 5),
        time: "13h00 - 17h00",
        location: "Parc Victoria",
        image: {
          url: testImage,
          alt: "Enfants célébrant lors d'un festival culturel coloré",
        },
        summary: "Musique, danse, artisanat et jeux célébrant diverses cultures.",
      },
    ],
  },
};

export const EventsCalendar = ({ lang }: EventsCalendarProps) => {
  const data = eventsData[lang as keyof typeof eventsData] || eventsData.en;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isLoading] = useState(false);

  const eventDates = data.events.map(event => event.date);
  
  // Display logic: show all events by default, filter when date is selected
  const displayedEvents = selectedDate
    ? data.events.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : data.events;

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
    ? data.eventsCount 
    : data.eventsCountPlural;

  const dateFormatter = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {data.title}
        </h2>

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
                    <span>{lang === 'fr' ? 'Événements programmés' : 'Scheduled Events'}</span>
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
                    {data.showingEventsFor} <strong className="text-foreground">{dateFormatter.format(selectedDate)}</strong>
                    {hasEventsOnSelectedDate && (
                      <> ({displayedEvents.length} {eventsCountText})</>
                    )}
                  </span>
                ) : (
                  <span>{data.selectDatePrompt}</span>
                )}
              </div>
              {selectedDate && (
                <Button
                  onClick={handleShowAllEvents}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  aria-label={data.showAllButton}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                  {data.showAllButton}
                </Button>
              )}
            </div>

            {/* Events List */}
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 scroll-smooth focus-within:ring-2 focus-within:ring-primary/20 rounded-lg">
              {isLoading ? (
                // Loading Skeletons
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
                // Empty State for Selected Date with No Events
                <div 
                  className="text-center py-16 px-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="max-w-sm mx-auto space-y-4">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground/50" aria-hidden="true" />
                    <p className="text-lg text-muted-foreground">
                      {data.noEventsMessage}
                    </p>
                    <Button
                      onClick={handleShowAllEvents}
                      variant="link"
                      className="text-primary hover:text-primary/80"
                      aria-label={data.viewAllLink}
                    >
                      {data.viewAllLink} →
                    </Button>
                  </div>
                </div>
              ) : (
                // Event Cards
                displayedEvents.map((event) => (
                  <Card 
                    key={event.id}
                    className="group overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all animate-fade-in py-0"
                  >
                    <CardContent className="p-0 sm:flex md:h-48">
                        {/* Event Image */}
                        <div className="relative md:aspect-auto overflow-hidden bg-muted h-full ">
                          <img
                            src={'assets/stories/story-1.jpg'}
                            alt={event.image.alt}
                            loading="lazy"
                            className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        {/* Event Details */}
                        <div className="p-6 space-y-3 ">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <span>
                                {event.date.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.summary}
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
