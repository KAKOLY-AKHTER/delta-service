import useInView from '../hooks/useInView'

const features = [
  {
    title: 'Safe & Reliable',
    desc: 'Your safety is our top priority.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'On-Time',
    desc: 'Punctual service you can count on.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Caring Drivers',
    desc: 'Friendly, professional and courteous.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Comfortable Rides',
    desc: 'Clean vehicles for a smooth journey.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
        <rect x="9" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
      </svg>
    ),
  },
  {
    title: 'Anywhere',
    desc: 'We take you where you need to go.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function FeaturesBar() {
  const [ref, inView] = useInView()
  return (
    <section className="px-4 md:px-8 lg:px-[52px] pb-10" ref={ref}>
      <div style={{ position: 'relative' }}>
        <div
          className={`anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{
            height: '28px',
            background: '#f97316',
            clipPath: 'ellipse(54% 100% at 50% 0%)',
            position: 'relative',
            zIndex: 1,
          }}
        />
        <div className="rounded-3xl" style={{ background: '#0a2558', position: 'relative', zIndex: 2, marginTop: '-10px' }}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 px-6 lg:px-10 py-6 lg:py-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex items-center gap-3 py-4 lg:py-0 anim-fade-up ${inView ? 'anim-in' : ''}`}
                style={{
                  transitionDelay: `${0.1 + i * 0.1}s`,
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  paddingRight: i % 2 === 0 ? '12px' : '0',
                }}
              >
                <div className="border-2 border-white/40 rounded-full p-2.5 shrink-0 bg-white">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">{f.title}</p>
                  <p className="text-blue-100 text-xs leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
