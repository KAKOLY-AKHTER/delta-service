import useInView from '../hooks/useInView'

const testimonials = [
  {
    name: 'Margaret T.',
    role: 'Dialysis Patient',
    location: 'Atlanta, GA',
    quote:
      'Delta Care Transport has been a lifesaver for me. They are always on time for my dialysis appointments, and the drivers are so kind and patient. I feel safe and comfortable every single trip.',
    stars: 5,
    color: '#f97316',
  },
  {
    name: 'Robert J.',
    role: 'Senior Passenger',
    location: 'Marietta, GA',
    quote:
      "I've used many transportation services before, but Delta Care is truly the best. The vehicle was clean, the driver was professional, and they helped me door-to-door. Highly recommend!",
    stars: 5,
    color: '#0a2558',
    featured: true,
  },
  {
    name: 'Linda M.',
    role: 'Family Member',
    location: 'Decatur, GA',
    quote:
      "We use Delta Care Transport for my mother's medical appointments. They are reliable, caring, and always communicate ahead of time. It gives our whole family peace of mind. Thank you!",
    stars: 5,
    color: '#f97316',
  },
]

const stats = [
  { num: '500+', label: 'Happy Clients' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '10K+', label: 'Trips Completed' },
  { num: '100%', label: 'On-Time Rate' },
]

export default function Testimonials() {
  const [ref, inView] = useInView()
  return (
    <section className="overflow-hidden" style={{ background: '#fff', padding: '100px 0 0' }} ref={ref}>

      {/* ── Header ── */}
      <div className={`text-center mb-16 anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ padding: '0 52px' }}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
          style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Client Reviews</span>
        </div>
        <h2 className="font-black text-[#0a2558] leading-tight" style={{ fontSize: '42px' }}>
          Real Stories from Real<br />
          <span style={{ color: '#f97316' }}>Passengers</span>
        </h2>
        <p className="text-gray-700 mt-4 mx-auto" style={{ fontSize: '16px', maxWidth: '460px' }}>
          Don't just take our word for it — hear directly from the people we serve every day.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="flex items-stretch gap-0" style={{ padding: '0 52px', marginBottom: '0' }}>
        {testimonials.map((t, i) => {
          const isFeatured = t.featured
          return (
            <div
              key={t.name}
              className={`flex-1 flex flex-col relative anim-fade-up ${inView ? 'anim-in' : ''}`}
              style={{
                background: isFeatured ? '#0a2558' : '#f8faff',
                border: isFeatured ? 'none' : '1px solid #e8eef8',
                borderRadius: i === 0 ? '24px 0 0 24px' : i === 2 ? '0 24px 24px 0' : '0',
                padding: '44px 36px',
                zIndex: isFeatured ? 2 : 1,
                marginTop: isFeatured ? '-16px' : '0',
                marginBottom: isFeatured ? '0' : '0',
                boxShadow: isFeatured ? '0 32px 80px rgba(10,37,88,0.28)' : 'none',
                transitionDelay: `${0.15 + i * 0.12}s`,
              }}
            >
              {/* Featured badge */}
              {isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full px-4 py-1.5"
                  style={{ background: '#f97316', boxShadow: '0 6px 20px rgba(249,115,22,0.45)', whiteSpace: 'nowrap' }}>
                  <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-white font-bold text-xs tracking-widest uppercase">Top Review</span>
                </div>
              )}

              {/* Large decorative quote mark */}
              <div className="font-black leading-none mb-6 select-none"
                style={{
                  fontSize: '96px',
                  lineHeight: 0.8,
                  color: isFeatured ? 'rgba(249,115,22,0.25)' : 'rgba(10,37,88,0.08)',
                  fontFamily: 'Georgia, serif',
                }}>
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg key={j} viewBox="0 0 24 24" fill="#f97316" className="w-4 h-4">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="leading-relaxed flex-1 mb-8"
                style={{
                  fontSize: '15px',
                  color: isFeatured ? 'rgba(255,255,255,0.95)' : '#374151',
                  lineHeight: '1.75',
                }}>
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="mb-6 h-px"
                style={{ background: isFeatured ? 'rgba(255,255,255,0.1)' : '#e8eef8' }} />

              {/* Person */}
              <div className="flex items-center gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-base"
                  style={{
                    background: isFeatured ? '#f97316' : '#0a2558',
                    color: 'white',
                    boxShadow: isFeatured ? '0 6px 20px rgba(249,115,22,0.4)' : '0 4px 14px rgba(10,37,88,0.2)',
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: isFeatured ? 'white' : '#0a2558' }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: isFeatured ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>
                    {t.role} · {t.location}
                  </p>
                </div>
                {/* Verified badge */}
                <div className="ml-auto flex items-center gap-1 rounded-full px-3 py-1"
                  style={{ background: isFeatured ? 'rgba(255,255,255,0.1)' : '#f0fdf4' }}>
                  <svg viewBox="0 0 24 24" fill={isFeatured ? '#86efac' : '#16a34a'} className="w-3 h-3">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                  <span className="text-xs font-bold" style={{ color: isFeatured ? '#86efac' : '#16a34a' }}>Verified</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Stats strip ── */}
      <div className="flex items-center justify-center gap-0 mt-16"
        style={{ background: '#0a2558', padding: '0 52px' }}>
        {stats.map((s, i) => (
          <div key={s.label} className="flex-1 flex flex-col items-center justify-center"
            style={{
              padding: '36px 0',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
            <p className="font-black text-white leading-none mb-1" style={{ fontSize: '34px' }}>{s.num}</p>
            <p className="text-blue-100 text-xs tracking-widest uppercase font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
