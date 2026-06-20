import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'
import deltaCar from '../assets/delta-car.png'
import deltaCar1 from '../assets/delta-car1.png'

const vehicles = [
  {
    img: deltaCar1,
    name: 'Delta Medical Transport Van',
    type: 'Accessible Van',
    capacity: 'Up to 6 passengers',
    badge: 'WHEELCHAIR ACCESSIBLE',
    badgeColor: '#f97316',
    features: [
      'Wheelchair ramp & lift',
      'Securing restraints',
      'Climate controlled',
      'Extra legroom & headroom',
      'Emergency equipment onboard',
    ],
    highlight: true,
  },
  {
    img: deltaCar,
    name: 'Delta Care Minivan',
    type: 'Comfort Minivan',
    capacity: 'Up to 7 passengers',
    badge: 'COMFORT RIDE',
    badgeColor: '#0a2558',
    features: [
      'Spacious interior',
      'Comfortable seating',
      'Climate controlled',
      'Smooth & quiet ride',
      'Ideal for group trips',
    ],
    highlight: false,
  },
]

export default function Fleet() {
  const [ref, inView] = useInView()

  return (
    <section
      id="fleet"
      ref={ref}
      className="py-14 lg:py-20 px-5 md:px-10 lg:px-13 overflow-hidden"
      style={{ background: '#fff' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>

        {/* Header */}
        <div className={`text-center mb-12 anim-fade-up ${inView ? 'anim-in' : ''}`}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
            style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Our Fleet</span>
          </div>
          <h2
            className="font-black text-[#0a2558] leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Clean, Safe &{' '}
            <span style={{ color: '#f97316' }}>Well-Maintained</span>
            <br />Vehicles
          </h2>
          <p className="text-gray-500 mt-3 mx-auto" style={{ fontSize: '15px', maxWidth: '460px' }}>
            Every vehicle in our fleet is regularly inspected, sanitized, and fully equipped for a safe and comfortable journey.
          </p>
        </div>

        {/* Vehicle cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vehicles.map((v, i) => (
            <div
              key={v.name}
              className={`rounded-3xl overflow-hidden anim-fade-up ${inView ? 'anim-in' : ''}`}
              style={{
                transitionDelay: `${0.1 + i * 0.15}s`,
                border: v.highlight ? '2px solid #f97316' : '1.5px solid #e8eef8',
                boxShadow: v.highlight
                  ? '0 16px 48px rgba(249,115,22,0.14)'
                  : '0 8px 28px rgba(10,37,88,0.07)',
              }}
            >
              {/* Image area */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: '240px',
                  background: v.highlight ? '#f0f6ff' : '#f8faff',
                }}
              >
                <img
                  src={v.img}
                  alt={v.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,37,88,0.35) 0%, transparent 50%)' }}
                />
                {/* Badge */}
                <div
                  className="absolute top-4 left-4 rounded-full font-black tracking-widest"
                  style={{
                    background: v.badgeColor,
                    color: 'white',
                    padding: '5px 12px',
                    fontSize: '9px',
                    letterSpacing: '0.08em',
                  }}
                >
                  {v.badge}
                </div>
                {/* Capacity badge */}
                <div
                  className="absolute bottom-4 right-4 rounded-xl font-bold flex items-center gap-1.5"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    color: '#0a2558',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2" width="13" height="13">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {v.capacity}
                </div>
              </div>

              {/* Info area */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1">{v.type}</p>
                    <h3 className="font-black text-[#0a2558]" style={{ fontSize: '17px' }}>{v.name}</h3>
                  </div>
                  <div
                    className="flex items-center justify-center rounded-xl shrink-0"
                    style={{
                      width: '44px', height: '44px',
                      background: v.highlight ? '#fff4ec' : '#f0f6ff',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke={v.highlight ? '#f97316' : '#0a2558'} strokeWidth="2" width="20" height="20">
                      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
                      <rect x="9" y="11" width="14" height="10" rx="2" />
                      <circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    </svg>
                  </div>
                </div>

                {/* Features list */}
                <div className="flex flex-col gap-2.5">
                  {v.features.map(feat => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: '20px', height: '20px',
                          background: v.highlight ? '#fff4ec' : '#f0f6ff',
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke={v.highlight ? '#f97316' : '#0a2558'} strokeWidth="2.5" width="11" height="11">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-gray-600" style={{ fontSize: '13px' }}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to="/contact"
                  className="w-full mt-5 rounded-xl font-black tracking-widest flex items-center justify-center gap-2"
                  style={{
                    padding: '13px',
                    fontSize: '12px',
                    background: v.highlight
                      ? 'linear-gradient(135deg, #f97316, #ea580c)'
                      : '#0a2558',
                    color: 'white',
                    textDecoration: 'none',
                    boxShadow: v.highlight
                      ? '0 6px 20px rgba(249,115,22,0.35)'
                      : '0 6px 20px rgba(10,37,88,0.2)',
                  }}
                >
                  BOOK THIS VEHICLE
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`text-center mt-10 anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{ transitionDelay: '0.35s' }}
        >
          <div
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-4"
            style={{
              background: '#f0f6ff',
              border: '1px solid #dce8f8',
            }}
          >
            <svg viewBox="0 0 24 24" fill="#0a2558" width="18" height="18">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p className="text-[#0a2558] font-semibold" style={{ fontSize: '13.5px' }}>
              All vehicles are inspected, insured, and sanitized before every trip.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
