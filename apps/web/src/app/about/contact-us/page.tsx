import ContactBlock from '@/sections/about/contact-us/ContactBlock'
import ContactUsMap from '@/sections/about/contact-us/ContactUsMap'
import HeroContactUs from '@/sections/about/contact-us/HeroContactUs'
import React from 'react'

const page = () => {
  return (
    <div>
        <HeroContactUs />
        <ContactBlock /> 
        <ContactUsMap />

    </div>
  
  )
}

export default page