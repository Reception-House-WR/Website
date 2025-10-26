import Programs from "@/sections/programs-and-services/overview/programs"
import Services from "@/sections/programs-and-services/overview/Services"
import HealthcareSection from "@/sections/programs-and-services/health/Healthcare"
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero"

const page = () => {

  return (

    <div>
        <ServicesHero />
        <Services />
        <Programs />
        <HealthcareSection />
    </div>
  
  )
}

export default page