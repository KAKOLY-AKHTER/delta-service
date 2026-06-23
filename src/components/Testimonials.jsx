import { useState, useEffect, useCallback } from 'react'
import useInView from '../hooks/useInView'
import CountUp from './CountUp'

const testimonials = [
  {
    name: 'Margaret T.', role: 'Dialysis Patient', location: 'Lathrop, CA', stars: 5,
    quote: 'Delta Care Transport has been a lifesaver for me. They are always on time for my dialysis appointments, and the drivers are so kind and patient. I feel safe and comfortable every single trip.',
  },
  {
    name: 'Robert J.', role: 'Senior Passenger', location: 'Stockton, CA', stars: 5,
    quote: "I've used many transportation services before, but Delta Care is truly the best. The vehicle was clean, the driver was professional, and they helped me door-to-door. Highly recommend!",
  },
  {
    name: 'Linda M.', role: 'Family Member', location: 'Manteca, CA', stars: 5,
    quote: "We use Delta Care Transport for my mother's medical appointments. They are reliable, caring, and always communicate ahead of time. It gives our whole family peace of mind. Thank you!",
  },
  {
    name: 'James K.', role: 'Cancer Patient', location: 'Tracy, CA', stars: 5,
    quote: 'After my surgery, I needed reliable transportation to my follow-up visits. Delta Care was there every time — punctual, courteous, and genuinely caring. I recommend them to everyone.',
  },
  {
    name: 'Susan P.', role: 'Elderly Passenger', location: 'Modesto, CA', stars: 5,
    quote: 'As a senior living alone, I depend on Delta Care for grocery runs and doctor appointments. The drivers are respectful and always make sure I get inside safely. Outstanding service!',
  },
]

const stats = [
  { num: '500+', label: 'Happy Clients' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '10K+', label: 'Trips Completed' },
  { num: '100%', label: 'On-Time Rate' },
]

const N = testimonials.length          // 5
const CARD_W = 340
const GAP = 20
const STEP = CARD_W + GAP             // 360
const TRANSIT_MS = 520

// 2 front clones + N real + 2 back clones = 9 items
const EXT = [
  testimonials[N - 2], testimonials[N - 1],
  ...testimonials,
  testimonials[0], testimonials[1],
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, j) => (
        <svg key={j} viewBox="0 0 24 24" fill="#f97316" width="15" height="15">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView()
  const [ci, setCi] = useState(2)    // ci=2 → center on testimonials[0]
  const [transit, setTransit] = useState(true)

  const advance = useCallback(() => setCi(c => c + 1), [])
  const retreat = useCallback(() => setCi(c => c - 1), [])

  // Seamless infinite loop
  useEffect(() => {
    if (ci >= N + 2) {
      const t = setTimeout(() => {
        setTransit(false)
        setCi(c => c - N)
        requestAnimationFrame(() => requestAnimationFrame(() => setTransit(true)))
      }, TRANSIT_MS + 40)
      return () => clearTimeout(t)
    }
    if (ci < 2) {
      const t = setTimeout(() => {
        setTransit(false)
        setCi(c => c + N)
        requestAnimationFrame(() => requestAnimationFrame(() => setTransit(true)))
      }, TRANSIT_MS + 40)
      return () => clearTimeout(t)
    }
  }, [ci])

  // Auto-slide
  useEffect(() => {
    const t = setInterval(advance, 3800)
    return () => clearInterval(t)
  }, [advance])

  const trackX = -(ci - 1) * STEP
  const dotIdx = ((ci - 2) % N + N) % N

  return (
    <section className="overflow-hidden" style={{ background: '#fff', paddingTop: '80px' }} ref={ref}>

      {/* ── Header ── */}
      <div className={`text-center mb-12 px-5 md:px-10 anim-fade-up ${inView ? 'anim-in' : ''}`}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
          style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Client Reviews</span>
        </div>
        <h2 className="font-black text-[#0a2558] leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
          Real Stories from Real<br />
          <span style={{ color: '#f97316' }}>Passengers</span>
        </h2>
        <p className="text-gray-500 mt-4 mx-auto" style={{ fontSize: '15px', maxWidth: '460px' }}>
          Don't just take our word for it — hear directly from the people we serve every day.
        </p>
      </div>

      {/* ── Slider ── */}
      <div style={{ maxWidth: `${CARD_W * 3 + GAP * 2}px`, margin: '0 auto', padding: '28px 0 20px', overflow: 'visible' }}>
        <div
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            transform: `translateX(${trackX}px)`,
            transition: transit ? `transform ${TRANSIT_MS}ms cubic-bezier(0.4,0,0.2,1)` : 'none',
            willChange: 'transform',
          }}
        >
          {EXT.map((t, idx) => {
            const isCenter = idx === ci
            return (
              <div
                key={`${idx}-${t.name}`}
                style={{
                  width: `${CARD_W}px`,
                  flexShrink: 0,
                  borderRadius: '20px',
                  padding: '28px 24px',
                  background: isCenter ? '#0a2558' : '#f8faff',
                  border: isCenter ? 'none' : '1px solid #e8eef8',
                  boxShadow: isCenter
                    ? '0 28px 70px rgba(10,37,88,0.28)'
                    : '0 4px 16px rgba(10,37,88,0.04)',
                  transform: isCenter ? 'scale(1.08)' : 'scale(1)',
                  transition: `transform ${TRANSIT_MS}ms cubic-bezier(0.4,0,0.2,1), background ${TRANSIT_MS}ms ease, box-shadow ${TRANSIT_MS}ms ease`,
                  zIndex: isCenter ? 2 : 1,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* TOP REVIEW badge — inline at top for center */}
                {isCenter && (
                  <div style={{
                    position: 'absolute', top: 0, left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#f97316', borderRadius: '999px',
                    padding: '6px 16px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    boxShadow: '0 6px 20px rgba(249,115,22,0.45)',
                    whiteSpace: 'nowrap',
                  }}>
                    <svg viewBox="0 0 24 24" fill="white" width="11" height="11">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Top Review</span>
                  </div>
                )}

                {/* Quote mark */}
                <div style={{
                  fontSize: '70px', lineHeight: 0.8, marginBottom: '14px', userSelect: 'none',
                  color: isCenter ? 'rgba(249,115,22,0.22)' : 'rgba(10,37,88,0.07)',
                  fontFamily: 'Georgia, serif',
                }}>
                  "
                </div>

                <Stars count={t.stars} />

                {/* Quote */}
                <p style={{
                  fontSize: '14px', lineHeight: 1.8, flex: 1, marginBottom: '20px',
                  color: isCenter ? 'rgba(255,255,255,0.92)' : '#374151',
                  transition: `color ${TRANSIT_MS}ms ease`,
                }}>
                  "{t.quote}"
                </p>

                {/* Divider */}
                <div style={{ height: '1px', background: isCenter ? 'rgba(255,255,255,0.1)' : '#e8eef8', marginBottom: '16px' }} />

                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                    background: isCenter ? '#f97316' : '#0a2558',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: '15px',
                    boxShadow: isCenter ? '0 6px 20px rgba(249,115,22,0.4)' : '0 4px 14px rgba(10,37,88,0.18)',
                    transition: `background ${TRANSIT_MS}ms ease`,
                    flexShrink: 0,
                  }}>
                    {t.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 800, fontSize: '13px', color: isCenter ? 'white' : '#0a2558', transition: `color ${TRANSIT_MS}ms ease` }}>{t.name}</p>
                    <p style={{ fontSize: '11px', color: isCenter ? 'rgba(255,255,255,0.5)' : '#9ca3af', transition: `color ${TRANSIT_MS}ms ease` }}>{t.role} · {t.location}</p>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    borderRadius: '999px', padding: '4px 10px', flexShrink: 0,
                    background: isCenter ? 'rgba(255,255,255,0.1)' : '#f0fdf4',
                    transition: `background ${TRANSIT_MS}ms ease`,
                  }}>
                    <svg viewBox="0 0 24 24" fill={isCenter ? '#86efac' : '#16a34a'} width="12" height="12">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: isCenter ? '#86efac' : '#16a34a', transition: `color ${TRANSIT_MS}ms ease` }}>Verified</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '52px' }}>

        {/* Prev */}
        <button
          onClick={retreat}
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            border: '2px solid #e2e8f0', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.22s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0a2558'; e.currentTarget.style.borderColor = '#0a2558' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0' }}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" width="17" height="17"
            style={{ stroke: 'inherit', display: 'block' }}>
            <path d="M15 18l-6-6 6-6" stroke="#0a2558" />
          </svg>
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCi(i + 2)}
              style={{
                width: dotIdx === i ? '28px' : '8px',
                height: '8px', borderRadius: '999px',
                background: dotIdx === i ? '#f97316' : '#e2e8f0',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={advance}
          style={{
            width: '42px', height: '42px', borderRadius: '50%',
            border: '2px solid #e2e8f0', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.22s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0a2558'; e.currentTarget.style.borderColor = '#0a2558' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0' }}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" width="17" height="17">
            <path d="M9 18l6-6-6-6" stroke="#0a2558" />
          </svg>
        </button>
      </div>

      {/* ── Stats strip ── */}
      <div className={`grid grid-cols-2 md:grid-cols-4 anim-fade-up ${inView ? 'anim-in' : ''}`}
        style={{ background: '#0a2558', transitionDelay: '0.5s' }}>
        {stats.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center justify-center py-8"
            style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
            <p className="font-black text-white leading-none mb-1" style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}><CountUp value={s.num} inView={inView} /></p>
            <p className="text-blue-100 text-xs tracking-widest uppercase font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
