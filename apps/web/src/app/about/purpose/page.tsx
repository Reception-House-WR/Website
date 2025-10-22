import { CoreValues } from '@/sections/about/our-purpose/CoreValues'
import { Hero } from '@/sections/about/our-purpose/Hero'
import { VisionMission } from '@/sections/about/our-purpose/VisionMission'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen'>
      <Hero />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <VisionMission />
          <CoreValues />
        </div>
      </section>
    </div>
  )
}

export default page