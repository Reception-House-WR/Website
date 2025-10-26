import Programs from "@/sections/programs-and-services/overview/programs"
import Services from "@/sections/programs-and-services/overview/Services"
import HealthcareSection from "@/sections/programs-and-services/health/Healthcare"
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero"
import { HousingSection } from "@/sections/programs-and-services/housing/HousingSection"

const page = () => {

  return (

    <div>
        <ServicesHero />
        <Services />
        <Programs />
        <HealthcareSection />
        <HousingSection />
    </div>
  
  )
}

export default page