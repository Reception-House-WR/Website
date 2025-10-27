import Programs from "@/sections/programs-and-services/overview/programs"
import Services from "@/sections/programs-and-services/overview/Services"
import HealthcareSection from "@/sections/programs-and-services/health/Healthcare"
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero"
import { HousingSection } from "@/sections/programs-and-services/housing/HousingSection"
import YouthSection from "@/sections/programs-and-services/children/YouthSection"
import TrainingSection from "@/sections/programs-and-services/skills-training/TrainingSection"
import { EmploymentSection } from "@/sections/programs-and-services/employment/EmploymentSection"

export default function Home(){
  return (

    <div>
        <ServicesHero />
        <Services />
        <Programs />
        <HealthcareSection />
        <HousingSection />
        <YouthSection />
        <TrainingSection />
        <EmploymentSection />
    </div>
  
  )
}

