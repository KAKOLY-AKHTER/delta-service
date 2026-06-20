import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const steps = [
  {
    num: '01',
    title: 'Book Your Ride',
    desc: 'Call us or fill out the online booking form with your trip details, pickup location, and destination.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Get Confirmation',
    desc: 'Our team reviews your request and sends a confirmation within minutes with all your trip details.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Driver Picks You Up',
    desc: 'Your professional driver arrives on time and assists you safely and comfortably into the vehicle.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Safe Arrival',
    desc: 'Sit back and relax as we take you safely to your destination — door-to-door, every single time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView()
  return (
    <section
      id="how-it-works"
      ref={ref}
      className="overflow-hidden py-14 lg:py-20 px-5 md:px-10 lg:px-13"
      style={{ background: 'linear-gradient(160deg, #f8faff 0%, #eef3fb 100%)' }}
    >
      {/* Header */}
      <div className={`text-center mb-12 anim-fade-up ${inView ? 'anim-in' : ''}`}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
          style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Simple Process</span>
        </div>
        <h2 className="font-black text-[#0a2558] leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          How It Works —<br />
          <span style={{ color: '#f97316' }}>Ready in 4 Easy Steps</span>
        </h2>
        <p className="text-gray-500 mt-3 mx-auto" style={{ fontSize: '15px', maxWidth: '440px' }}>
          Booking a ride with Delta Care Transport is fast, simple, and stress-free.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Connecting line — desktop only */}
        <div className="hidden lg:block absolute top-[52px] left-0 right-0 pointer-events-none"
          style={{ zIndex: 0 }}>
          <div className="mx-auto" style={{ maxWidth: '900px', padding: '0 80px' }}>
            <div style={{ height: '2px', background: 'repeating-linear-gradient(to right, #f97316 0px, #f97316 10px, transparent 10px, transparent 20px)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`flex flex-col items-center text-center anim-fade-up ${inView ? 'anim-in' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              {/* Step circle */}
              <div
                className="relative flex items-center justify-center rounded-full mb-5"
                style={{
                  width: '72px', height: '72px',
                  background: i % 2 === 0 ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#0a2558',
                  boxShadow: i % 2 === 0
                    ? '0 8px 28px rgba(249,115,22,0.42)'
                    : '0 8px 28px rgba(10,37,88,0.28)',
                  color: 'white',
                  border: '4px solid white',
                }}
              >
                {s.icon}
                {/* Step number badge */}
                <div
                  className="absolute flex items-center justify-center rounded-full font-black"
                  style={{
                    width: '22px', height: '22px',
                    background: i % 2 === 0 ? '#0a2558' : '#f97316',
                    color: 'white', fontSize: '9px',
                    top: '-6px', right: '-6px',
                    border: '2px solid white',
                  }}
                >
                  {i + 1}
                </div>
              </div>

              {/* Card */}
              <div className="rounded-2xl p-5 w-full"
                style={{ background: 'white', border: '1px solid #e8eef8', boxShadow: '0 4px 20px rgba(10,37,88,0.06)' }}>
                <h3 className="font-black text-[#0a2558] mb-2" style={{ fontSize: '15px' }}>{s.title}</h3>
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: '13px' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={`text-center mt-12 anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.55s' }}>
        <Link to="/contact"
          className="inline-flex items-center gap-2.5 font-black text-white rounded-xl tracking-widest"
          style={{
            padding: '14px 28px', fontSize: '12px',
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            boxShadow: '0 8px 24px rgba(249,115,22,0.38)',
            textDecoration: 'none',
          }}
        >
          START BOOKING NOW
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  )
}
