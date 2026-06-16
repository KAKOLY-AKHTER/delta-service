import useInView from '../hooks/useInView'

const highlights = [
  { title: 'Trained Professionals', desc: 'Background-checked, certified drivers with compassionate care training.' },
  { title: 'Safe Vehicles', desc: 'Clean, well-maintained fleet inspected before every ride.' },
  { title: 'Always On Time', desc: 'Punctual pickups and drop-offs you can count on every time.' },
]

export default function AboutUs() {
  const [ref, inView] = useInView()
  return (
    <section className="overflow-hidden" style={{ padding: '100px 52px', background: '#fff' }} ref={ref}>
      <div className="flex gap-20 items-center">

        {/* ══════ LEFT: Image Collage ══════ */}
        <div className={`shrink-0 relative anim-fade-left ${inView ? 'anim-in' : ''}`} style={{ width: '46%', height: '580px' }}>

          {/* BG orange blob */}
          <div className="absolute rounded-[40px]" style={{
            width: '80%', height: '80%',
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            bottom: '-18px', left: '-18px', zIndex: 0, opacity: 0.12,
            transform: 'rotate(-4deg)',
          }} />

          {/* Dot grid top-left */}
          <svg className="absolute" style={{ top: '-10px', left: '-10px', zIndex: 0, opacity: 0.22 }} width="110" height="110" viewBox="0 0 110 110">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}${c}`} cx={c * 22 + 8} cy={r * 22 + 8} r="3.5" fill="#f97316" />
              ))
            )}
          </svg>

          {/* ── Main tall image (right side) ── */}
          <div className="absolute overflow-hidden" style={{
            width: '68%', height: '100%',
            right: 0, top: 0, zIndex: 2,
            borderRadius: '28px',
            boxShadow: '0 32px 72px rgba(10,37,88,0.18)',
          }}>
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
              alt="Professional care"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Bottom gradient overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(10,37,88,0.72) 0%, rgba(10,37,88,0.1) 45%, transparent 65%)',
            }} />
            {/* Text on image */}
            <div className="absolute" style={{ bottom: '22px', left: '20px', right: '20px' }}>
              <p className="text-white font-black mb-0.5" style={{ fontSize: '17px' }}>Safe & Reliable</p>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '12px' }}>Non-Medical Transportation</p>
            </div>
          </div>

          {/* ── Top-left small image ── */}
          <div className="absolute overflow-hidden" style={{
            width: '38%', height: '46%',
            left: 0, top: 0, zIndex: 3,
            borderRadius: '24px',
            boxShadow: '0 18px 48px rgba(10,37,88,0.16)',
            border: '4px solid white',
          }}>
            <img
              src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&q=80"
              alt="Caring driver"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>

          {/* ── Bottom-left small image ── */}
          <div className="absolute overflow-hidden" style={{
            width: '38%', height: '40%',
            left: 0, bottom: '10px', zIndex: 3,
            borderRadius: '24px',
            boxShadow: '0 18px 48px rgba(10,37,88,0.16)',
            border: '4px solid white',
          }}>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80"
              alt="Medical professional"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* orange overlay tint */}
            <div className="absolute inset-0" style={{ background: 'rgba(249,115,22,0.08)' }} />
          </div>

          {/* ── Years badge (center overlap) ── */}
          <div className="absolute flex flex-col items-center justify-center z-10" style={{
            width: '82px', height: '82px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            left: 'calc(38% - 41px + 4px)',
            top: '46.5%',
            transform: 'translateY(-50%)',
            border: '4px solid white',
            boxShadow: '0 8px 24px rgba(249,115,22,0.45)',
          }}>
            <p className="text-white font-black leading-none" style={{ fontSize: '24px' }}>5+</p>
            <p className="text-white font-bold text-center leading-tight" style={{ fontSize: '8px', letterSpacing: '0.05em' }}>YEARS<br/>SERVICE</p>
          </div>

          {/* ── Floating rating card ── */}
          <div className="absolute flex items-center gap-3 z-10" style={{
            right: '-20px', bottom: '30px',
            background: 'white',
            borderRadius: '18px',
            padding: '13px 18px',
            boxShadow: '0 16px 40px rgba(10,37,88,0.14)',
            minWidth: '190px',
          }}>
            <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#fff4ec' }}>
              <svg viewBox="0 0 24 24" fill="#f97316" className="w-5 h-5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} viewBox="0 0 24 24" fill="#f97316" className="w-3 h-3">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-500 text-xs">500+ Happy Clients</p>
            </div>
          </div>

          {/* Dot grid bottom-right */}
          <svg className="absolute" style={{ bottom: '-8px', right: '34%', zIndex: 0, opacity: 0.15 }} width="90" height="90" viewBox="0 0 90 90">
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 4 }).map((_, c) => (
                <circle key={`d${r}${c}`} cx={c * 22 + 8} cy={r * 22 + 8} r="3" fill="#0a2558" />
              ))
            )}
          </svg>
        </div>

        {/* ══════ RIGHT: Content ══════ */}
        <div className={`flex-1 anim-fade-right ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.15s' }}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">About Delta Care Transport</span>
          </div>

          {/* Heading */}
          <h2 className="font-black text-[#0a2558] leading-[1.1] mb-6" style={{ fontSize: '42px' }}>
            Connecting People with<br />
            <span
              className="relative inline-block"
              style={{ color: '#f97316' }}
            >
              Safe &amp; Reliable
              <svg viewBox="0 0 200 12" className="absolute w-full" style={{ bottom: '-6px', left: 0 }}>
                <path d="M2 8 Q50 2 100 8 Q150 14 198 8" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br />Transportation.
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8" style={{ fontSize: '16px', maxWidth: '480px' }}>
            At Delta Care Transport, we provide professional non-emergency transportation for
            individuals who need safe, comfortable, and on-time rides — whether to medical
            appointments, dialysis centers, airports, or everyday errands.
          </p>

          {/* Feature cards */}
          <div className="flex flex-col gap-4 mb-9">
            {highlights.map((h, i) => (
              <div key={h.title} className="flex items-start gap-4 rounded-2xl p-4" style={{ background: '#f8faff', border: '1px solid #e8eef8' }}>
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                  style={{ background: '#0a2558', fontSize: '15px' }}
                >
                  0{i + 1}
                </div>
                <div>
                  <p className="font-bold text-[#0a2558] text-sm mb-0.5">{h.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider with mission quote */}
          <div
            className="rounded-2xl px-5 py-4 mb-8 flex items-start gap-3"
            style={{ background: '#f1f7fe', borderLeft: '4px solid #f97316' }}
          >
            <svg viewBox="0 0 24 24" fill="#f97316" opacity="0.6" className="w-6 h-6 shrink-0 mt-0.5">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              "We take pride in helping our community stay connected, independent, and mobile
              through dependable non-medical transportation services you can trust."
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-5">
            <button
              className="bg-[#0a2558] text-white font-bold rounded-xl hover:bg-[#0d3070] transition-colors tracking-widest"
              style={{ padding: '15px 32px', fontSize: '13px' }}
            >
              BOOK A RIDE
            </button>
            <a href="#" className="flex items-center gap-2 text-[#0a2558] font-bold text-sm hover:text-orange-500 transition-colors">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#f1f7fe' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              Learn More About Us
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
