import Programs from "@/sections/programs-and-services/overview/programs"
import Services from "@/sections/programs-and-services/overview/Services"
import ServicesHero from "@/sections/programs-and-services/overview/ServicesHero"

const page = () => {

  return (

    <div>
        <ServicesHero />
        <Services />
        <Programs />
    </div>
  
  )
}

export default page