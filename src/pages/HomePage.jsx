import Hero from '../components/Hero'
import FeaturesBar from '../components/FeaturesBar'
import AboutUs from '../components/AboutUs'
import WhyChooseUs from '../components/WhyChooseUs'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import Fleet from '../components/Fleet'
import ServiceArea from '../components/ServiceArea'
import BookingForm from '../components/BookingForm'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesBar />
      <AboutUs />
      <WhyChooseUs />
      <Services />
      <HowItWorks />
      <Fleet />
      <ServiceArea />
      <BookingForm />
      <FAQ />
      <Testimonials />
    </>
  )
}
