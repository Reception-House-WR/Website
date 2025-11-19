import { fetchCareersPage } from '@/lib/strapi/helpers/getInvolved/careerHelper';
import { CareersSection } from '@/sections/get-involved/careers/CareersSection'
import React from 'react'

const page = async () => {

  const res = await fetchCareersPage();
  console.log("CAREERS ", res);
  return (
    <CareersSection />
  )
}

export default page