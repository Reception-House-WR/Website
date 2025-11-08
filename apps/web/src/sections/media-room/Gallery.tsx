"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayIcon } from 'lucide-react';
import React, { useState } from 'react'

interface MediaItem {
  id: number;
  type: "image" | "video";
  thumbnail: string;
  url: string;
  alt: string;
  caption: string;
  videoCaption?: string;
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: "image",
    thumbnail: "/assets/rap.jpg",
    url: "/assets/rap.jpg",
    alt: "Community members welcoming newcomer family at airport arrival",
    caption: "Volunteers welcoming a newcomer family at the airport, showcasing the warm community support that defines Reception House's mission.",
  },
  {
    id: 2,
    type: "image",
    thumbnail: "/assets/rap.jpg",
    url: "/assets/rap.jpg",
    alt: "Children participating in language learning activities",
    caption: "Children engaging in interactive language learning activities at our community center, building skills and friendships.",
  },
  {
    id: 3,
    type: "video",
    thumbnail: "/assets/rap.jpg",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Video: A Day in the Life at Reception House",
    caption: "Experience a typical day at Reception House through the stories of staff, volunteers, and newcomer families.",
    videoCaption: "This video includes English captions and a full transcript is available below.",
  },
  {
    id: 4,
    type: "image",
    thumbnail: "/assets/rap.jpg",
    url: "/assets/rap.jpg",
    alt: "Employment counselor meeting with newcomer client",
    caption: "One-on-one employment counseling helps newcomers navigate the Canadian job market and build successful careers.",
  },
  {
    id: 5,
    type: "image",
    thumbnail: "/assets/rap.jpg",
    url: "/assets/rap.jpg",
    alt: "Community cultural celebration event with diverse participants",
    caption: "Annual cultural celebration bringing together newcomers and long-time residents in a spirit of community and understanding.",
  },
  {
    id: 6,
    type: "video",
    thumbnail: "/assets/rap.jpg",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Video: Success Stories - From Arrival to Integration",
    caption: "Hear firsthand accounts from refugees who have successfully rebuilt their lives in Waterloo Region with Reception House support.",
    videoCaption: "This video includes English captions and a full transcript is available below.",
  },
];

export const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos">("all");

  const filteredMedia = mediaItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "images") return item.type === "image";
    if (activeTab === "videos") return item.type === "video";
    return true;
  });
  return (
    <section 
      className="py-16 md:py-24 bg-muted/30"
      aria-labelledby="gallery-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 
            id="gallery-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Photos & Videos
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Visual stories of hope, resilience, and community support
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-8">
          <TabsList className="mx-auto flex w-fit">
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="images">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMedia.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative overflow-hidden rounded-lg bg-muted transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`View ${item.alt}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="rounded-full bg-primary p-4 transition-transform group-hover:scale-110">
                      <PlayIcon className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground/80 line-clamp-2">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent
          className="max-w-4xl"
          aria-describedby="media-description"
        >
          <DialogTitle className="sr-only">
            {selectedMedia?.alt}
          </DialogTitle>
          {selectedMedia && (
            <>
              <div className="relative">
                {selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.alt}
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="aspect-video">
                    <iframe
                      src={selectedMedia.url}
                      title={selectedMedia.alt}
                      className="h-full w-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
              <DialogDescription id="media-description" className="space-y-2">
                <span className="text-base text-foreground">{selectedMedia.caption}</span>
                {selectedMedia.videoCaption && (
                  <span className="text-sm text-muted-foreground italic">
                    {selectedMedia.videoCaption}
                  </span>
                )}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
