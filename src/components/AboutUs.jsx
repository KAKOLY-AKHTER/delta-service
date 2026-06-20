import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'
import deltaCar from '../assets/delta-car.png'
import deltaCar1 from '../assets/delta-car1.png'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import patient from '../assets/patient.png'

const highlights = [
  { title: 'Trained Professionals', desc: 'Background-checked, certified drivers with compassionate care training.' },
  { title: 'Safe Vehicles', desc: 'Clean, well-maintained fleet inspected before every ride.' },
  { title: 'Always On Time', desc: 'Punctual pickups and drop-offs you can count on every time.' },
]

export default function AboutUs() {
  const [ref, inView] = useInView()
  return (
    <section
      id="about"
      className="overflow-hidden py-8 lg:py-12 px-5 md:px-10 lg:px-13"
      style={{ background: '#fff' }}
      ref={ref}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-stretch">

        {/* ══════ LEFT: 4-image collage ══════ */}
        <div
          className={`w-full lg:w-[48%] lg:shrink-0 relative h-105 lg:h-auto anim-fade-left ${inView ? 'anim-in' : ''}`}
        >
          {/* Decorative blob behind */}
          <div className="absolute rounded-[40px] hidden lg:block" style={{
            width: '85%', height: '85%',
            background: 'linear-gradient(135deg, #f97316, #fb923c)',
            bottom: '-14px', left: '-14px', zIndex: 0, opacity: 0.10,
            transform: 'rotate(-3deg)',
          }} />

          {/* Magazine-style asymmetric grid */}
          <div
            className="relative z-10 h-full"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '57% 43%',
              gap: '8px',
              minHeight: '400px',
            }}
          >
            {/* Top-left WIDE: delta-car1 — spans 2 cols */}
            <div className="relative overflow-hidden" style={{ gridColumn: '1 / 3', gridRow: '1', borderRadius: '20px', boxShadow: '0 20px 50px rgba(10,37,88,0.18)' }}>
              <img src={deltaCar1} alt="Delta transport van" className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center', transform: 'translateZ(0)', imageRendering: 'auto' }} />
              {/* 5+ badge */}
              <div className="absolute top-4 right-4 flex flex-col items-center justify-center rounded-full"
                style={{ width: '68px', height: '68px', background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 6px 20px rgba(249,115,22,0.5)', border: '3px solid white' }}>
                <p className="text-white font-black leading-none" style={{ fontSize: '20px' }}>5+</p>
                <p className="text-white font-bold text-center leading-tight" style={{ fontSize: '7px', letterSpacing: '0.04em' }}>YEARS</p>
              </div>
            </div>

            {/* Top-right NARROW: patient — col 3 */}
            <div className="relative overflow-hidden" style={{ gridColumn: '3', gridRow: '1', borderRadius: '20px', boxShadow: '0 20px 50px rgba(10,37,88,0.18)' }}>
              <img src={patient} alt="Patient transport" className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center top', transform: 'translateZ(0)' }} />
            </div>

            {/* Bottom-left NARROW: img2 — col 1 */}
            <div className="relative overflow-hidden" style={{ gridColumn: '1', gridRow: '2', borderRadius: '20px', boxShadow: '0 20px 50px rgba(10,37,88,0.18)' }}>
              <img src={img2} alt="Driver assisting passenger" className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center', transform: 'translateZ(0)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,37,88,0.75) 0%, transparent 50%)' }} />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-1" style={{ background: '#f97316' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  <span className="text-white font-bold" style={{ fontSize: '10px' }}>DELTA FLEET</span>
                </div>
                <p className="text-white font-black leading-tight" style={{ fontSize: '13px' }}>Safe & Reliable</p>
                <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: '10px' }}>Non-Medical Transportation</p>
              </div>
            </div>

            {/* Bottom-right WIDE: delta-car — spans 2 cols */}
            <div className="relative overflow-hidden" style={{ gridColumn: '2 / 4', gridRow: '2', borderRadius: '20px', boxShadow: '0 12px 32px rgba(10,37,88,0.12)' }}>
              <img src={deltaCar} alt="Delta branded vehicle" className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: '85% center', transform: 'translateZ(0)', imageRendering: 'auto' }} />
            </div>

            {/* Bottom-right: img1 */}
            {/* <div className="relative overflow-hidden" style={{ gridColumn: '3', gridRow: '2', borderRadius: '20px', boxShadow: '0 12px 32px rgba(10,37,88,0.12)' }}>
              <img src={img1} alt="Transport care service" className="w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center top', transform: 'translateZ(0)', imageRendering: 'auto' }} />
            </div> */}

          </div>

          {/* Floating rating card */}
          <div className="absolute hidden lg:flex items-center gap-3 z-20" style={{
            right: '-16px', bottom: '24px',
            background: 'white', borderRadius: '16px',
            padding: '10px 16px',
            boxShadow: '0 12px 36px rgba(10,37,88,0.14)',
            minWidth: '175px',
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
            <Link to="/contact" className="bg-[#0a2558] text-white font-bold rounded-xl hover:bg-[#0d3070] transition-colors tracking-widest"
              style={{ padding: '12px 24px', fontSize: '12px', textDecoration: 'none' }}>
              BOOK A RIDE
            </Link>
            <Link to="/about" className="flex items-center gap-2 text-[#0a2558] font-bold text-sm hover:text-orange-500 transition-colors" style={{ textDecoration: 'none' }}>
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#f1f7fe' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              Learn More
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
