import { fetchMediaRoomPage } from '@/lib/strapi/helpers/mediaRoomHelper'
import { Gallery } from '@/sections/media-room/Gallery'
import { HeroSection } from '@/sections/media-room/HeroSection'
import { MediaKit } from '@/sections/media-room/MediaKit'
import { PressReleases } from '@/sections/media-room/PressReleases'

const Page = async () => {

  const res = await fetchMediaRoomPage();
  // console.log("MEDIA ROOM ", res);

  if (!res) {
    return <div className="flex items-center justify-center py-5">Error loading media room page data.</div>;
  }
  
  return (
    <main className="min-h-screen">
      <HeroSection title={res.hero?.title || ""} desc={res.hero?.description || ""} />
      <MediaKit kits={res.mediaKitSection?.kits || []} title={res.mediaKitSection?.title || ""} desc={res.mediaKitSection?.description || ""} />
      <PressReleases title={res.releasesSection?.title || ""} desc={res.releasesSection?.description || ""} releases={res.releasesSection?.pressReleases || []} />
      <Gallery mediaItems={res.photosAndVideos?.media || []} title={res.photosAndVideos?.section?.title || ""} desc={res.photosAndVideos?.section?.description || ""} />
    </main>
  )
}

export default Page