import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturesBar from './components/FeaturesBar'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import BookingForm from './components/BookingForm'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

const whoWeServe = [
  {
    title: 'Medical Appointments',
    desc: 'Doctor visits, check-ups, and follow-ups.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-12 h-12">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M12 14v4M10 16h4" />
      </svg>
    ),
  },
  {
    title: 'Dialysis Treatments',
    desc: 'Travel to and from dialysis centers safely.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-12 h-12">
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v6M9 22l3-8 3 8" />
        <path d="M5 13h14" />
      </svg>
    ),
  },
  {
    title: 'Airport Transfers',
    desc: 'On-time airport pickups and drop-offs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-12 h-12">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L8 10 1.2 8l-1 2.7L6 13l-2 3 2 1 1-2 3 2 2.3 5.8z" />
      </svg>
    ),
  },
  {
    title: 'Shopping & Errands',
    desc: 'We help you get where you need to go.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-12 h-12">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
]

export default function App() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Features Bar ── */}
      <FeaturesBar />

      {/* ── About Us ── */}
      <AboutUs />

      {/* ── Services ── */}
      <Services />

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />

      {/* ── Book a Ride ── */}
      <BookingForm />

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Footer ── */}
      <Footer />

    </div>
  )
}
