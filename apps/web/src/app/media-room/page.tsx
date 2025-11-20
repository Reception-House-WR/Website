import { fetchMediaRoomPage } from '@/lib/strapi/helpers/mediaRoomHelper'
import { Gallery } from '@/sections/media-room/Gallery'
import { HeroSection } from '@/sections/media-room/HeroSection'
import { MediaKit } from '@/sections/media-room/MediaKit'
import { PressReleases } from '@/sections/media-room/PressReleases'
import React from 'react'

const Page = async () => {

  const res = await fetchMediaRoomPage();
  console.log("MEDIA ROOM ", res);
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MediaKit />
      <PressReleases />
      <Gallery />
    </main>
  )
}

export default Page