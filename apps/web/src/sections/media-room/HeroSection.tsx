import React from 'react'

export const HeroSection = () => {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-[var(--rh-500)] to-[var(--rh-500)]/80 py-20 md:py-28"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Media Room
          </h1>
          <p className="text-lg text-primary-foreground/95 md:text-xl leading-relaxed">
            Access our media kit, explore recent press releases, and view photos and videos 
            highlighting our work supporting refugees and newcomers in Waterloo Region.
          </p>
        </div>
      </div>
      
      {/* Decorative elements for visual interest */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-primary-foreground blur-3xl" />
      </div>
    </section>
  )
}
