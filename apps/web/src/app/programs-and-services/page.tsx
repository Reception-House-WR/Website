import Programs from "@/sections/programs-and-services/overview/programs"
import Services from "@/sections/programs-and-services/overview/Services"
import HealthcareSection from "@/sections/programs-and-services/health/Healthcare"
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero"
import YouthSection from "@/sections/programs-and-services/children/YouthSection"

export default function Home(){
  return (

    <div>
        <ServicesHero />
        <Services />
        <Programs />
        <HealthcareSection />
        <YouthSection />
    </div>
  
  )
}

