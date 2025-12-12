import { fetchOurPurposePage } from '@/lib/strapi/helpers/about/aboutOurPurposeHelper'
import { CoreValues } from '@/sections/about/our-purpose/CoreValues'
import { Hero } from '@/sections/about/our-purpose/Hero'
import { Reports } from '@/sections/about/our-purpose/Reports'
import { StrategicPriorities } from '@/sections/about/our-purpose/StrategicPriorities'
import { VideoSection } from '@/sections/about/our-purpose/VideoSection'
import { VisionMission } from '@/sections/about/our-purpose/VisionMission'



const page = async ({ params }: { params: { locale: string } }) => {

  const res = await fetchOurPurposePage(params.locale);
  // console.log("Our Purpose page data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }
  
  
  return (
    <div className='min-h-screen'>
      <Hero title={res.hero.title} desc={res.hero.description} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <VisionMission missionTitle={res.missionAndVissionSection?.mission?.title || ""} missionDesc={res.missionAndVissionSection?.mission?.description || ""} visionTitle={res.missionAndVissionSection?.vision?.title || ""} visionDesc={res.missionAndVissionSection?.vision?.description || ""} />
          <CoreValues title={res.valuesSection?.section?.title || ""} desc={res.valuesSection?.section?.description || ""} values={res.valuesSection?.values || []} />
          <StrategicPriorities title={res.strategicPrioritiesSection?.section?.title || ""} desc={res.strategicPrioritiesSection?.section?.description || ""} priorities={res.strategicPrioritiesSection?.priorities || []} />
          <VideoSection image={res.ourImpactSection.image || ""} title={res.ourImpactSection?.title || ""} desc={res.ourImpactSection?.description || ""} url={res.ourImpactSection?.videoUrl || ""} />
          <Reports title={res.transparencyAndAccountabilitySection?.section?.title || ""} desc={res.transparencyAndAccountabilitySection?.section?.description || ""} files={res.transparencyAndAccountabilitySection?.reports || []} />
        </div>
      </section>
    </div>
  )
}

export default page