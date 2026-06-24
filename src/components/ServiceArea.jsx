import useInView from '../hooks/useInView'
import CountUp from './CountUp'

const cities = [
  { name: 'Lathrop', main: true },
  { name: 'Stockton' },
  { name: 'Manteca' },
  { name: 'Tracy' },
  { name: 'Modesto' },
  { name: 'Ripon' },
  { name: 'Escalon' },
  { name: 'Lodi' },
  { name: 'Turlock' },
  { name: 'Patterson' },
  { name: 'Newman' },
  { name: 'Ceres' },
  { name: 'Oakdale' },
  { name: 'Riverbank' },
  { name: 'Waterford' },
  { name: 'Gustine' },
  { name: 'Los Banos' },
  { name: 'Merced' },
]

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'On-Time Pickups',
    sub: '30-min windows',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Door-to-Door',
    sub: 'Every trip',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    label: 'Expanding Coverage',
    sub: 'New areas added',
  },
]

export default function ServiceArea() {
  const [ref, inView] = useInView()

  return (
    <section
      ref={ref}
      className="py-14 lg:py-20 px-5 md:px-10 lg:px-13 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f8faff 0%, #eef3fb 100%)' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>

        {/* Header */}
        <div className={`text-center mb-12 anim-fade-up ${inView ? 'anim-in' : ''}`}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
            style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Coverage</span>
          </div>
          <h2
            className="font-black text-[#0a2558] leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            We Serve <span style={{ color: '#f97316' }}>Lathrop, California</span><br />
            & Surrounding Areas
          </h2>
          <p className="text-gray-500 mt-3 mx-auto" style={{ fontSize: '15px', maxWidth: '460px' }}>
            Delta Care Transport proudly covers a wide service area across California. Not sure if we serve your location? Just call us!
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* City grid */}
          <div
            className={`flex-1 anim-fade-up ${inView ? 'anim-in' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="flex flex-wrap gap-3">
              {cities.map((city, i) => (
                <div
                  key={city.name}
                  className="flex items-center gap-2 rounded-xl font-semibold"
                  style={{
                    padding: city.main ? '10px 18px' : '9px 16px',
                    fontSize: city.main ? '14px' : '13.5px',
                    background: city.main
                      ? 'linear-gradient(135deg, #0a2558, #0d3070)'
                      : 'white',
                    color: city.main ? 'white' : '#0a2558',
                    border: city.main ? 'none' : '1.5px solid #dce8f8',
                    boxShadow: city.main
                      ? '0 6px 20px rgba(10,37,88,0.25)'
                      : '0 2px 8px rgba(10,37,88,0.06)',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill={city.main ? '#f97316' : '#0a2558'}
                    width="13"
                    height="13"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                  </svg>
                  {city.name}
                  {city.main && (
                    <span
                      className="rounded-full font-bold"
                      style={{ background: '#f97316', padding: '2px 7px', fontSize: '9px', letterSpacing: '0.05em' }}
                    >
                      HUB
                    </span>
                  )}
                </div>
              ))}

              {/* More areas */}
              <div
                className="flex items-center gap-2 rounded-xl font-semibold"
                style={{
                  padding: '9px 16px', fontSize: '13.5px',
                  background: '#f1f7fe',
                  color: '#64748b',
                  border: '1.5px dashed #b8d0f0',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="13" height="13">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
                + More Areas
              </div>
            </div>

            {/* Bottom note */}
            <div
              className="flex items-center gap-3 rounded-xl mt-5 p-4"
              style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}
            >
              <svg viewBox="0 0 24 24" fill="#f97316" width="20" height="20">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
              </svg>
              <p className="text-orange-700" style={{ fontSize: '13px' }}>
                <strong>Don't see your city?</strong> Call us at <strong>(470) 336-7475</strong> — we may still be able to help!
              </p>
            </div>

            {/* Service highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" width="22" height="22">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                  ),
                  title: 'Same-Day Booking',
                  desc: 'Schedule rides anytime, 24/7',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" width="22" height="22">
                      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                    </svg>
                  ),
                  title: 'Real-Time Tracking',
                  desc: 'Know exactly when we arrive',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" width="22" height="22">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                  title: 'Licensed & Insured',
                  desc: 'Fully compliant, every ride',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-4 flex flex-col gap-2"
                  style={{ background: 'white', border: '1.5px solid #e8eef8', boxShadow: '0 4px 14px rgba(10,37,88,0.06)' }}
                >
                  <div className="flex items-center justify-center rounded-xl" style={{ width: '44px', height: '44px', background: '#fff4ec' }}>
                    {item.icon}
                  </div>
                  <p className="font-black text-[#0a2558]" style={{ fontSize: '13.5px' }}>{item.title}</p>
                  <p className="text-gray-400" style={{ fontSize: '12px' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: feature cards */}
          <div
            className={`lg:w-[300px] flex flex-col gap-4 anim-fade-up ${inView ? 'anim-in' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            {features.map((f, i) => (
              <div
                key={f.label}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: 'white',
                  border: '1px solid #e8eef8',
                  boxShadow: '0 4px 16px rgba(10,37,88,0.07)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{
                    width: '48px', height: '48px',
                    background: i === 1 ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#f0f6ff',
                    color: i === 1 ? 'white' : '#0a2558',
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="font-black text-[#0a2558]" style={{ fontSize: '14px' }}>{f.label}</p>
                  <p className="text-gray-400" style={{ fontSize: '12px' }}>{f.sub}</p>
                </div>
              </div>
            ))}

            {/* Stats card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, #0a2558, #0d3070)',
                boxShadow: '0 10px 28px rgba(10,37,88,0.22)',
              }}
            >
              <p className="text-blue-200 text-xs tracking-widest uppercase mb-3">Coverage Stats</p>
              <div className="grid grid-cols-2 gap-3">
                {[['18+', 'Cities Served'], ['30mi', 'Max Radius'], ['24/7', 'Scheduling'], ['100%', 'On-Time Goal']].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="text-white font-black" style={{ fontSize: '22px' }}><CountUp value={val} inView={inView} /></p>
                    <p className="text-blue-200" style={{ fontSize: '11px' }}>{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
