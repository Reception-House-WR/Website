import { fetchContactUsPage } from '@/lib/strapi/helpers/about/aboutContactUsHelper'
import ContactBlock from '@/sections/about/contact-us/ContactBlock'
import ContactUsMap from '@/sections/about/contact-us/ContactUsMap'
import HeroContactUs from '@/sections/about/contact-us/HeroContactUs'
import React from 'react'

const page = async () => {

  const res = await fetchContactUsPage();
  console.log("Contact Us Page Data:", res);
  return (
    <div>
        <HeroContactUs />
        <ContactBlock /> 
        <ContactUsMap />

    </div>
  
  )
}

export default page