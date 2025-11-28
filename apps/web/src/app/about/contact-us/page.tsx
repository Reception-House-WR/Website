import { fetchContactUsPage } from '@/lib/strapi/helpers/about/aboutContactUsHelper'
import ContactBlock from '@/sections/about/contact-us/ContactBlock'
import ContactUsMap from '@/sections/about/contact-us/ContactUsMap'
import HeroContactUs from '@/sections/about/contact-us/HeroContactUs'

const page = async () => {

  const res = await fetchContactUsPage();
  // console.log("Contact Us Page Data:", res);

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return (
    <div>
        <HeroContactUs title={res.hero?.title || ""}  desc={res.hero?.description || ""} />
        <ContactBlock contactInfoItems={res?.contactUsInfoSection?.contactInfo || []} title={res?.contactUsInfoSection?.title || ""} desc={res?.contactUsInfoSection?.description || ""} parkingSection={res?.parkingSection} /> 
        <ContactUsMap />
    </div>
  )
}

export default page