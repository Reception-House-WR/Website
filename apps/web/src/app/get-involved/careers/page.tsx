import { fetchCareersPage } from '@/lib/strapi/helpers/getInvolved/careerHelper';
import { CareersSection } from '@/sections/get-involved/careers/CareersSection'
import HeroGetInvolved from '@/sections/get-involved/overview/HeroGetInvolved';
import React from 'react'

const page = async () => {

  const res = await fetchCareersPage();
  // console.log("CAREERS ", res);
  
  if (!res) {
    return <div>Failed to load data</div>;
  }
  return (
    <>
      <HeroGetInvolved title={res.hero.title} desc={res.hero.description} />
      <CareersSection openings={res.openingsSection.jobs} openingsTitle={res.openingsSection.section.title} openingsDesc={res.openingsSection.section.description} benefitsTitle={res.benefitsSection.title} benefits={res.benefitsSection.benefits} workingHereTitle={res.workingHereSection.title} workingHereDesc={res.workingHereSection.description} workingHereCards={res.workingHereSection.cards} />
    </>
  )
}

export default page