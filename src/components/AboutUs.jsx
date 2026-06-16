import useInView from '../hooks/useInView'

const highlights = [
  { title: 'Trained Professionals', desc: 'Background-checked, certified drivers with compassionate care training.' },
  { title: 'Safe Vehicles', desc: 'Clean, well-maintained fleet inspected before every ride.' },
  { title: 'Always On Time', desc: 'Punctual pickups and drop-offs you can count on every time.' },
]

export default function AboutUs() {
  const [ref, inView] = useInView()
  return (
    <section
      className="overflow-hidden py-10 lg:py-16 px-5 md:px-10 lg:px-13"
      style={{ background: '#fff' }}
      ref={ref}
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-center">

        {/* ══════ LEFT: Image Collage ══════ */}
        <div
          className={`w-full lg:w-[46%] lg:shrink-0 relative h-65 lg:h-130 anim-fade-left ${inView ? 'anim-in' : ''}`}
        >
          {/* ── MOBILE: single image ── */}
          <div className="lg:hidden absolute inset-0 overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=1600&q=95"
              alt="Professional care team"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,37,88,0.65) 0%, transparent 55%)' }} />
            <div className="absolute bottom-4 left-5">
              <p className="text-white font-black" style={{ fontSize: '16px' }}>Safe & Reliable</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Non-Medical Transportation</p>
            </div>
          </div>

          {/* ── DESKTOP: collage ── */}
          <div className="hidden lg:block absolute inset-0">

            {/* BG blob */}
            <div className="absolute rounded-[40px]" style={{
              width: '78%', height: '78%',
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              bottom: '-16px', left: '-16px', zIndex: 0, opacity: 0.10,
              transform: 'rotate(-4deg)',
            }} />

            {/* Dot grid */}
            <svg className="absolute" style={{ top: '-8px', left: '-8px', zIndex: 0, opacity: 0.2 }} width="100" height="100" viewBox="0 0 100 100">
              {Array.from({ length: 5 }).map((_, r) =>
                Array.from({ length: 5 }).map((_, c) => (
                  <circle key={`${r}${c}`} cx={c * 20 + 8} cy={r * 20 + 8} r="3" fill="#f97316" />
                ))
              )}
            </svg>

            {/* Main tall image */}
            <div className="absolute overflow-hidden" style={{
              width: '68%', height: '100%',
              right: 0, top: 0, zIndex: 2,
              borderRadius: '24px',
              boxShadow: '0 24px 60px rgba(10,37,88,0.18)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=1600&q=95"
                alt="Professional care team"
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,37,88,0.75) 0%, rgba(10,37,88,0.1) 45%, transparent 65%)' }} />
              <div className="absolute" style={{ bottom: '20px', left: '18px', right: '18px' }}>
                <p className="text-white font-black mb-0.5" style={{ fontSize: '16px' }}>Safe & Reliable</p>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '12px' }}>Non-Medical Transportation</p>
              </div>
            </div>

            {/* Top-left small image */}
            <div className="absolute overflow-hidden" style={{
              width: '37%', height: '45%',
              left: 0, top: 0, zIndex: 3,
              borderRadius: '20px',
              boxShadow: '0 16px 40px rgba(10,37,88,0.16)',
              border: '4px solid white',
            }}>
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1000&q=95"
                alt="Medical professional"
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>

            {/* Bottom-left small image */}
            <div className="absolute overflow-hidden" style={{
              width: '37%', height: '40%',
              left: 0, bottom: '8px', zIndex: 3,
              borderRadius: '20px',
              boxShadow: '0 16px 40px rgba(10,37,88,0.16)',
              border: '4px solid white',
            }}>
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1000&q=95"
                alt="Caregiver"
                className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>

            {/* Years badge */}
            <div className="absolute flex flex-col items-center justify-center z-10" style={{
              width: '76px', height: '76px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              left: 'calc(37% - 38px + 4px)',
              top: '46%', transform: 'translateY(-50%)',
              border: '4px solid white',
              boxShadow: '0 8px 24px rgba(249,115,22,0.45)',
            }}>
              <p className="text-white font-black leading-none" style={{ fontSize: '22px' }}>5+</p>
              <p className="text-white font-bold text-center leading-tight" style={{ fontSize: '7.5px', letterSpacing: '0.04em' }}>YEARS<br />SERVICE</p>
            </div>

            {/* Floating rating card */}
            <div className="absolute flex items-center gap-3 z-10" style={{
              right: '-16px', bottom: '24px',
              background: 'white', borderRadius: '16px',
              padding: '11px 16px',
              boxShadow: '0 12px 36px rgba(10,37,88,0.14)',
              minWidth: '180px',
            }}>
              <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#fff4ec' }}>
                <svg viewBox="0 0 24 24" fill="#f97316" className="w-4 h-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} viewBox="0 0 24 24" fill="#f97316" className="w-3 h-3">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500" style={{ fontSize: '11px' }}>500+ Happy Clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ RIGHT: Content ══════ */}
        <div
          className={`flex-1 w-full anim-fade-right ${inView ? 'anim-in' : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">About Delta Care Transport</span>
          </div>

          <h2 className="font-black text-[#0a2558] leading-[1.1] mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            Connecting People with<br />
            <span className="relative inline-block" style={{ color: '#f97316' }}>
              Safe &amp; Reliable
              <svg viewBox="0 0 200 10" className="absolute w-full" style={{ bottom: '-4px', left: 0 }}>
                <path d="M2 7 Q50 2 100 7 Q150 12 198 7" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <br />Transportation.
          </h2>

          <p className="text-gray-600 leading-relaxed mb-5" style={{ fontSize: '14px', maxWidth: '460px' }}>
            At Delta Care Transport, we provide professional non-emergency transportation for
            individuals who need safe, comfortable, and on-time rides — whether to medical
            appointments, dialysis centers, airports, or everyday errands.
          </p>

          <div className="flex flex-col gap-2.5 mb-5">
            {highlights.map((h, i) => (
              <div key={h.title} className="flex items-center gap-4 rounded-xl p-3.5"
                style={{ background: '#f8faff', border: '1px solid #e8eef8' }}>
                <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-white"
                  style={{ background: '#0a2558', fontSize: '13px' }}>
                  0{i + 1}
                </div>
                <div>
                  <p className="font-bold text-[#0a2558] text-sm">{h.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl px-4 py-3 mb-5 flex items-start gap-3"
            style={{ background: '#f8faff', borderLeft: '4px solid #f97316' }}>
            <svg viewBox="0 0 24 24" fill="#f97316" opacity="0.5" className="w-5 h-5 shrink-0 mt-0.5">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-600 text-sm leading-relaxed italic">
              "We take pride in helping our community stay connected, independent, and mobile
              through dependable non-medical transportation services you can trust."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-[#0a2558] text-white font-bold rounded-xl hover:bg-[#0d3070] transition-colors tracking-widest"
              style={{ padding: '12px 24px', fontSize: '12px' }}>
              BOOK A RIDE
            </button>
            <a href="#" className="flex items-center gap-2 text-[#0a2558] font-bold text-sm hover:text-orange-500 transition-colors">
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#f1f7fe' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              Learn More
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
