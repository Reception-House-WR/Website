"use client"
import { Card } from '@/components/ui/card'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const VideoSection = ({
  title,
  desc,
  url
}: {
  title: string,
  desc: string,
  url: string
}) => {
  const [playing, setPlaying] = useState(false)
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setVideoId(null);
      return;
    }

    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      setVideoId(id);
    } else if (url.includes('v=')) {
      const id = url.split('v=')[1].split('&')[0];
      setVideoId(id);
    } else {
      setVideoId(null);
    }
  }, [url]);
  
  return (
    <div className="mb-20 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {desc}
        </p>
      </div>

      <Card className="overflow-hidden shadow-soft">
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          {/* Replace with your YouTube video ID */}
          {(() => {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

            return playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedUrl}
                title="Our Impact Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none"
                aria-label="Play video"
              >
                <Image
                  src={`https://www.opencityinc.com/wp-content/uploads/Reception-House-Annual-Meeting-50-Charity-Spotlight-OpencityInc.jpg`}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                  fill
                />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-warm-gradient rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-white/90 font-bold">
                    Click to watch our story
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/30" aria-hidden />
              </button>
            )
          })()}
        </div>
      </Card>
    </div>
  )
}
