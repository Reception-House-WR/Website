import { fetchOurPurposePage } from '@/lib/strapi/helpers/about/aboutOurPurposeHelper'
import { CoreValues } from '@/sections/about/our-purpose/CoreValues'
import { Hero } from '@/sections/about/our-purpose/Hero'
import { Reports } from '@/sections/about/our-purpose/Reports'
import { StrategicPriorities } from '@/sections/about/our-purpose/StrategicPriorities'
import { VideoSection } from '@/sections/about/our-purpose/VideoSection'
import { VisionMission } from '@/sections/about/our-purpose/VisionMission'



const page = async () => {

  const res = await fetchOurPurposePage();
  console.log("Our Purpose page data:", res);
  
  
  return (
    <div className='min-h-screen'>
      <Hero />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <VisionMission />
          <CoreValues />
          <StrategicPriorities />
          <VideoSection />
          <Reports />
        </div>
      </section>
    </div>
  )
}

export default page