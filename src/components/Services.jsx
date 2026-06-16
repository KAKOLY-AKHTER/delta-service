import useInView from '../hooks/useInView'

const services = [
  {
    title: 'Medical Appointments',
    desc: 'Doctor visits, check-ups, and follow-up appointments with safe, on-time transportation.',
    img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&q=85',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
      </svg>
    ),
  },
  {
    title: 'Dialysis Treatments',
    desc: 'Reliable rides to and from dialysis centers, ensuring you never miss a treatment.',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=85',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
        <circle cx="12" cy="5" r="3" /><path d="M12 8v6M9 22l3-8 3 8M5 13h14" />
      </svg>
    ),
  },
  {
    title: 'Airport Transfers',
    desc: 'Stress-free airport pickups and drop-offs — on time, every time.',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=85',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L8 10 1.2 8l-1 2.7L6 13l-2 3 2 1 1-2 3 2 2.3 5.8z" />
      </svg>
    ),
  },
  {
    title: 'Rehabilitation Centers',
    desc: 'Comfortable transportation to rehab, therapy, and recovery sessions.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=85',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
  },
  {
    title: 'Family Visits',
    desc: 'Stay connected with loved ones with our dependable and caring ride service.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=85',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Shopping & Errands',
    desc: 'We help you get to stores, pharmacies, and run everyday errands with ease.',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=85',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
]

export default function Services() {
  const [ref, inView] = useInView()
  return (
    <section className="py-16 lg:py-[100px] px-5 md:px-10 lg:px-[52px]" style={{ background: '#0a2558' }} ref={ref}>

      {/* ── Header ── */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 lg:mb-14 anim-fade-up ${inView ? 'anim-in' : ''}`}>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
            style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.35)' }}>
            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
            <span className="text-orange-400 font-bold text-xs tracking-widest uppercase">What We Offer</span>
          </div>
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
            Our Transportation <span style={{ color: '#f97316' }}>Services</span>
          </h2>
        </div>
        <p className="text-blue-100 text-sm leading-relaxed md:text-right" style={{ maxWidth: '320px', fontSize: '15px' }}>
          From medical appointments to everyday errands — we provide safe, reliable, and
          comfortable rides for every need.
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`group relative overflow-hidden rounded-3xl anim-fade-up ${inView ? 'anim-in' : ''}`}
            style={{ height: '300px', cursor: 'pointer', transitionDelay: `${0.1 + i * 0.1}s` }}
          >
            <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,15,40,0.96) 0%, rgba(5,15,40,0.55) 45%, rgba(5,15,40,0.15) 100%)' }} />
            <div className="absolute font-black" style={{ top: '14px', right: '18px', color: 'rgba(255,255,255,0.10)', fontSize: '72px', lineHeight: 1, userSelect: 'none' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="absolute flex items-center justify-center rounded-2xl" style={{ top: '20px', left: '20px', width: '52px', height: '52px', background: '#f97316', boxShadow: '0 8px 24px rgba(249,115,22,0.5)' }}>
              {s.icon}
            </div>
            <div className="absolute bottom-0 left-0 right-0" style={{ padding: '0 22px 22px' }}>
              <div style={{ height: '2px', width: '36px', background: '#f97316', borderRadius: '2px', marginBottom: '10px' }} />
              <h3 className="font-black text-white mb-1" style={{ fontSize: '17px' }}>{s.title}</h3>
              <p className="text-blue-100 leading-relaxed" style={{ fontSize: '13px' }}>{s.desc}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-orange-400 font-bold text-xs tracking-widest uppercase">Learn More</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-10 rounded-2xl px-6 py-5 anim-fade-up ${inView ? 'anim-in' : ''}`}
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', transitionDelay: '0.7s' }}>
        <div>
          <p className="text-white font-bold text-base">Need a ride? We're available 24/7.</p>
          <p className="text-blue-100 text-sm mt-1">Call us or book online — fast, easy, and reliable.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors tracking-widest" style={{ padding: '12px 22px', fontSize: '13px' }}>
            BOOK A RIDE
          </button>
          <button className="font-bold rounded-xl tracking-widest transition-colors" style={{ padding: '12px 22px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}>
            CALL NOW
          </button>
        </div>
      </div>

    </section>
  )
}
