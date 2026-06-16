import useInView from '../hooks/useInView'

const reasons = [
  {
    title: 'Safety First',
    desc: 'Every trip is handled with the highest safety standards. Your wellbeing is our top priority on every ride.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Trained Drivers',
    desc: 'Professional, background-checked, and courteous drivers dedicated to your comfort and care.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Always On Time',
    desc: 'Punctual pickups and drop-offs every single time. We respect your schedule and your time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Clean Vehicles',
    desc: 'Well-maintained, sanitized, and comfortable vehicles inspected before every single trip.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
        <rect x="9" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      </svg>
    ),
  },
  {
    title: '24/7 Availability',
    desc: 'Available around the clock — early morning, late night, weekends, and holidays.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Personalized Care',
    desc: 'Every passenger receives individual attention, care, and respect from pickup to drop-off.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

const stats = [
  { num: '500+', label: 'Happy Clients' },
  { num: '10K+', label: 'Trips Completed' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '24/7', label: 'Availability' },
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView()
  return (
    <section
      className="overflow-hidden py-16 lg:py-25 px-5 md:px-10 lg:px-13"
      style={{ background: '#f8faff' }}
      ref={ref}
    >

      {/* ── Header ── */}
      <div className={`text-center mb-12 lg:mb-16 anim-fade-up ${inView ? 'anim-in' : ''}`}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
          style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Our Advantages</span>
        </div>
        <h2 className="font-black text-[#0a2558] leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          Why Clients Choose<br />
          <span style={{ color: '#f97316' }}>Delta Care Transport</span>
        </h2>
        <p className="text-gray-600 mt-4 mx-auto leading-relaxed" style={{ fontSize: '15px', maxWidth: '480px' }}>
          We go beyond just getting you there — we make every journey safe,
          comfortable, and stress-free from start to finish.
        </p>
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:items-stretch">

        {/* ══ LEFT: Image panel ══ */}
        <div
          className={`w-full lg:w-[38%] lg:shrink-0 relative overflow-hidden rounded-3xl min-h-90 anim-fade-left ${inView ? 'anim-in' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1600&q=95"
            alt="Professional caregiver"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(10,37,88,0.97) 0%, rgba(10,37,88,0.55) 45%, rgba(10,37,88,0.1) 80%)',
          }} />

          {/* Trust badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: '#f97316', boxShadow: '0 6px 20px rgba(249,115,22,0.45)' }}>
            <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-white font-bold text-xs">#1 Trusted Transport</span>
          </div>

          {/* Stats grid at bottom */}
          <div className="absolute bottom-0 left-0 right-0" style={{ padding: '0 20px 24px' }}>
            <p className="text-orange-400 font-bold text-xs tracking-widest uppercase mb-3">Our Numbers</p>
            <div className="grid grid-cols-2 gap-2.5">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl p-3" style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(10px)',
                }}>
                  <p className="font-black text-white leading-none mb-1" style={{ fontSize: '22px' }}>{s.num}</p>
                  <p className="text-blue-200 font-medium" style={{ fontSize: '11px' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT: Reason cards ══ */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`group flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg anim-fade-up ${inView ? 'anim-in' : ''}`}
              style={{
                background: '#fff',
                border: '1px solid #e8eef8',
                transitionDelay: `${0.15 + i * 0.07}s`,
              }}
            >
              {/* Icon */}
              <div className="shrink-0 rounded-xl flex items-center justify-center"
                style={{ width: '48px', height: '48px', background: '#fff4ec', border: '1px solid #fed7aa', alignSelf: 'flex-start' }}>
                {r.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-black text-[#0a2558]" style={{ fontSize: '14px' }}>{r.title}</h3>
                  <span className="font-black shrink-0 ml-2" style={{ color: 'rgba(10,37,88,0.10)', fontSize: '20px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: '13px' }}>{r.desc}</p>
                <div className="mt-3 h-px" style={{ background: 'linear-gradient(to right, #f97316 0%, rgba(249,115,22,0.12) 60%, transparent 100%)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA strip ── */}
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-10 rounded-2xl px-6 py-5 anim-fade-up ${inView ? 'anim-in' : ''}`}
        style={{
          background: '#0a2558',
          transitionDelay: '0.65s',
        }}
      >
        <div>
          <p className="text-white font-bold" style={{ fontSize: '16px' }}>Ready to experience the difference?</p>
          <p className="text-blue-200 text-sm mt-0.5">Safe, reliable, and on-time — every single ride. Available 24/7.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors tracking-widest"
            style={{ padding: '12px 22px', fontSize: '13px' }}>
            BOOK A RIDE
          </button>
          <button className="font-bold rounded-xl tracking-widest transition-colors"
            style={{ padding: '12px 22px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}>
            CALL NOW
          </button>
        </div>
      </div>

    </section>
  )
}
