"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'

const pressReleases = [
  {
    id: 1,
    date: "2024-03-15",
    title: "Reception House Celebrates 50 Years of Welcoming Refugees",
    summary: "Reception House Waterloo Region marks half a century of providing essential support services to refugees and newcomers.",
    content: "For five decades, Reception House has been a beacon of hope for refugees arriving in Waterloo Region. This milestone celebrates countless lives changed, families reunited, and community bonds strengthened through our comprehensive settlement services.",
  },
  {
    id: 2,
    date: "2024-02-28",
    title: "New Partnership Expands Employment Services for Newcomers",
    summary: "Collaboration with local employers creates pathways to meaningful employment for refugee populations.",
    content: "Reception House announces a groundbreaking partnership with regional employers to provide tailored employment services, skills training, and workplace integration support for newcomers seeking to rebuild their careers in Canada.",
  },
  {
    id: 3,
    date: "2024-01-20",
    title: "Housing Initiative Addresses Critical Need in Community",
    summary: "New housing program helps refugee families find safe, affordable accommodations.",
    content: "In response to the housing crisis affecting newcomers, Reception House launches an innovative housing initiative connecting refugee families with landlords and providing rental support during the crucial settlement period.",
  },
  {
    id: 4,
    date: "2023-12-10",
    title: "Annual Report Highlights Record Year of Impact",
    summary: "2023 sees significant growth in services and community support for refugees.",
    content: "Our annual report reveals that Reception House served over 800 individuals in 2023, providing settlement services, language training, employment support, and community integration programs.",
  },
];


export const PressReleases = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section 
      className="py-16 md:py-24"
      aria-labelledby="press-releases-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 
            id="press-releases-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Press Releases
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Stay updated with our latest news and announcements
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {pressReleases.map((release) => (
            <Collapsible
              key={release.id}
              open={openItems.has(release.id)}
              onOpenChange={() => toggleItem(release.id)}
            >
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                        <time dateTime={release.date}>{formatDate(release.date)}</time>
                      </div>
                      <CardTitle className="mb-2 text-xl">{release.title}</CardTitle>
                      <CardDescription className="text-base">
                        {release.summary}
                      </CardDescription>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0"
                        aria-label={
                          openItems.has(release.id)
                            ? `Collapse ${release.title}`
                            : `Expand ${release.title}`
                        }
                      >
                        {openItems.has(release.id) ? (
                          <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-foreground/90 leading-relaxed">{release.content}</p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}
