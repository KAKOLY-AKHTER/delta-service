import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'
import medicalImg from '../assets/medical-appoinment.png'
import dialysisImg from '../assets/dialysis.png'
import airportImg from '../assets/airport-transfer.png'
import rehabImg from '../assets/rehabilation.png'

const services = [
  {
    img: medicalImg,
    title: 'Medical Appointments',
    category: 'Healthcare Transport',
    desc: 'Never miss a doctor visit again. We provide timely, door-to-door transportation to hospitals, clinics, specialists, and routine check-ups. Our drivers wait during short appointments and assist you every step of the way.',
    features: ['Door-to-door service', 'Driver waits during appointment', 'Assistance in & out of vehicle', 'On-time guarantee'],
  },
  {
    img: dialysisImg,
    title: 'Dialysis Transportation',
    category: 'Recurring Medical Rides',
    desc: 'We understand how critical dialysis appointments are. Our drivers are trained to support dialysis patients with the extra care and consistency these life-sustaining trips require — often multiple times per week.',
    features: ['Recurring ride scheduling', 'Consistent assigned driver', 'Patient comfort priority', 'Flexible pickup times'],
  },
  {
    img: airportImg,
    title: 'Airport Transfers',
    category: 'Travel Transport',
    desc: 'Start your journey stress-free. We provide reliable airport pick-up and drop-off service, tracking your flight to ensure we are there when you need us — no matter what time your flight lands.',
    features: ['Real-time flight tracking', 'Early morning & late night available', 'Luggage assistance', 'Sacramento & San Jose airports'],
  },
  {
    img: rehabImg,
    title: 'Rehabilitation Center',
    category: 'Recovery Support',
    desc: 'Consistency is the foundation of recovery. We ensure patients reach their physical therapy, occupational therapy, and rehabilitation sessions on time, every session — without added stress.',
    features: ['Flexible scheduling', 'Wheelchair-accessible vehicles', 'Compassionate & patient drivers', 'Return trip included'],
  },
  {
    img: null,
    title: 'Family & Social Visits',
    category: 'Personal Transport',
    desc: 'Staying connected with loved ones matters deeply. We provide comfortable, reliable transportation for family visits, social gatherings, and community activities that keep life meaningful and connected.',
    features: ['Group-friendly vehicles', 'Flexible timing & wait service', 'Comfortable spacious interior', 'Evening & weekend available'],
  },
  {
    img: null,
    title: 'Shopping & Errands',
    category: 'Everyday Rides',
    desc: 'From grocery runs to pharmacy pickups, we help with the everyday errands that keep life running smoothly — offering wait time and return trips so you never have to rush or worry.',
    features: ['Multi-stop trips accepted', 'Driver wait service', 'Assistance with packages', 'Flexible scheduling'],
  },
]

export default function ServicesPage() {
  const [ref, inView] = useInView()

  return (
    <>
      <PageBanner title="Our Services" subtitle="Dependable, door-to-door transportation built around your schedule and your needs." />

      {/* Intro */}
      <section style={{ background: '#fff', padding: '64px 20px 48px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto text-center" style={{ maxWidth: '700px' }}>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: '16px' }}>
            Delta Care Transport offers a full range of non-medical transportation services across Lathrop, California. Whether you need a one-time ride or regular recurring transportation, we are here — 24 hours a day, 7 days a week.
          </p>
          <div style={{ width: '60px', height: '3px', background: '#f97316', borderRadius: '2px', margin: '28px auto 0' }} />
        </div>
      </section>

      {/* Services List */}
      <section ref={ref} style={{ background: '#fff', padding: '0 20px 80px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto flex flex-col gap-0" style={{ maxWidth: '1100px' }}>
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`flex flex-col lg:flex-row gap-0 anim-fade-up ${inView ? 'anim-in' : ''}`}
              style={{
                transitionDelay: `${0.07 + i * 0.08}s`,
                borderBottom: i < services.length - 1 ? '1px solid #f0f4fb' : 'none',
                padding: '40px 0',
              }}
            >
              {/* Image */}
              <div className="lg:w-[300px] shrink-0 rounded-2xl overflow-hidden mb-6 lg:mb-0 lg:mr-10"
                style={{ height: '200px', background: i % 2 === 0 ? '#f0f6ff' : '#fff4ec', flexShrink: 0 }}>
                {s.img ? (
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke={i % 2 === 0 ? '#0a2558' : '#f97316'} strokeWidth="1.2" width="52" height="52" opacity="0.25">
                      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
                      <rect x="9" y="11" width="14" height="10" rx="2"/>
                      <circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    </svg>
                    <p className="font-semibold text-gray-300" style={{ fontSize: '12px' }}>Transport Service</p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-bold tracking-widest uppercase mb-1" style={{ fontSize: '10.5px', color: i % 2 === 0 ? '#0a2558' : '#f97316', letterSpacing: '0.14em' }}>
                  {s.category}
                </p>
                <h2 className="font-black text-[#0a2558] mb-3" style={{ fontSize: 'clamp(20px, 2.5vw, 26px)' }}>{s.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-5" style={{ fontSize: '14.5px', maxWidth: '580px' }}>{s.desc}</p>

                <div className="grid grid-cols-2 gap-y-2 gap-x-6 mb-6">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" width="13" height="13">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-gray-600" style={{ fontSize: '13px' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact"
                  className="inline-flex items-center gap-2 font-bold rounded-xl"
                  style={{
                    padding: '10px 20px', fontSize: '12.5px', textDecoration: 'none',
                    background: '#0a2558', color: 'white',
                    boxShadow: '0 4px 14px rgba(10,37,88,0.18)',
                  }}>
                  Book This Service
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="13" height="13">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '60px 20px' }}>
        <div className="text-center">
          <h2 className="font-black text-[#0a2558] mb-3" style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}>
            Don't see the service you need?
          </h2>
          <p className="text-gray-500 mb-6" style={{ fontSize: '15px' }}>Call us — we accommodate many custom transportation requests.</p>
          <a href="tel:+14703367475"
            className="inline-flex items-center gap-2 font-black text-white rounded-xl"
            style={{ padding: '14px 28px', fontSize: '13px', background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 8px 24px rgba(249,115,22,0.35)', textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
            </svg>
            Call (470) 336-7475
          </a>
        </div>
      </section>
    </>
  )
}
