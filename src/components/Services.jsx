import { useState, useEffect, useCallback } from 'react'
import medicalImg from '../assets/medical-appoinment.png'
import dialysisImg from '../assets/dialysis.png'
import airportImg from '../assets/airport-transfer.png'
import rehabImg from '../assets/rehabilation.png'

import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const services = [
  {
    title: 'Medical Appointments',
    desc: 'Doctor visits, check-ups, and follow-up appointments with safe, on-time transportation.',
    img: medicalImg,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-6 h-6"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" /></svg>,
  },
  {
    title: 'Dialysis Treatments',
    desc: 'Reliable rides to and from dialysis centers, ensuring you never miss a treatment.',
    img: dialysisImg,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-6 h-6"><circle cx="12" cy="5" r="3" /><path d="M12 8v6M9 22l3-8 3 8M5 13h14" /></svg>,
  },
  {
    title: 'Airport Transfers',
    desc: 'Stress-free airport pickups and drop-offs — on time, every time.',
    img: airportImg,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-6 h-6"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L8 10 1.2 8l-1 2.7L6 13l-2 3 2 1 1-2 3 2 2.3 5.8z" /></svg>,
  },
  {
    title: 'Rehabilitation Centers',
    desc: 'Comfortable transportation to rehab, therapy, and recovery sessions.',
    img: rehabImg,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-6 h-6"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" /></svg>,
  },
  {
    title: 'Family Visits',
    desc: 'Stay connected with loved ones with our dependable and caring ride service.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=90',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    title: 'Shopping & Errands',
    desc: 'We help you get to stores, pharmacies, and run everyday errands with ease.',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=90',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" className="w-6 h-6"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  },
]

/* ─── Carousel constants ─── */
const N = services.length          // 6
const ITEM_W = 262                  // px width of each slot
const GAP = 56                      // px gap between slots
const STEP = ITEM_W + GAP           // 318
const SZ_SIDE = 158                 // circle diameter (side)
const SZ_CENTER = 210               // circle diameter (center)
const CIRCLE_H = 240                // fixed height for circle container
const TRANSIT_MS = 580

// Extended array: 2 clones before + 6 real + 2 clones after = 10
const EXT = [
  services[N - 2], services[N - 1],  // indices 0,1  (clones of s4,s5)
  ...services,                        // indices 2–7  (real s0–s5)
  services[0], services[1],           // indices 8,9  (clones of s0,s1)
]

const CONNECTOR_TOP = CIRCLE_H / 2   // vertical center of circle container

export default function Services() {
  const [ref, inView] = useInView()
  const [ci, setCi] = useState(2)          // center index in EXT (starts at real s0)
  const [transit, setTransit] = useState(true)

  const advance = useCallback(() => setCi(p => p + 1), [])

  // Auto-slide every 3.2s — always running
  useEffect(() => {
    const t = setInterval(advance, 3200)
    return () => clearInterval(t)
  }, [advance])

  // Loop: when ci enters clone zone (≥8), jump back silently
  useEffect(() => {
    if (ci >= 8) {
      const t = setTimeout(() => {
        setTransit(false)
        setCi(c => c - N)
      }, TRANSIT_MS + 40)
      return () => clearTimeout(t)
    }
  }, [ci])

  // Re-enable transition one frame after silent jump
  useEffect(() => {
    if (!transit) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransit(true))
      )
      return () => cancelAnimationFrame(id)
    }
  }, [transit])

  const trackX = -((ci - 1) * STEP)
  const realIdx = ((ci - 2) % N + N) % N  // 0-5 for dots

  return (
    <section
      id="services"
      className="py-16 lg:py-24 px-5 md:px-10 lg:px-13"
      style={{ background: '#f8faff' }}
      ref={ref}
    >

      {/* ── Header ── */}
      <div className={`text-center mb-14 anim-fade-up ${inView ? 'anim-in' : ''}`}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
          style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">What We Offer</span>
        </div>
        <h2 className="font-black text-[#0a2558] leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          How We <span style={{ color: '#f97316' }}>Serve You</span>
        </h2>
        <p className="text-gray-500 mt-3 mx-auto leading-relaxed" style={{ fontSize: '14.5px', maxWidth: '440px' }}>
          From medical appointments to everyday errands — safe, reliable rides for every need.
        </p>
      </div>

      {/* ── Desktop carousel ── */}
      <div className={`hidden lg:block anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.1s' }}>

        {/* Viewport window */}
        <div style={{
          maxWidth: `${3 * STEP - GAP}px`,
          margin: '0 auto',
          overflow: 'hidden',
          position: 'relative',
        }}>

          {/* Fixed diamond connectors (always between the 3 visible circles) */}
          {[ITEM_W, ITEM_W + STEP].map((x, k) => (
            <div key={k} style={{
              position: 'absolute', top: `${CONNECTOR_TOP - 1}px`,
              left: `${x}px`, width: `${GAP}px`,
              display: 'flex', alignItems: 'center',
              zIndex: 10, pointerEvents: 'none',
            }}>
              <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, transparent, #f97316)' }} />
              <div style={{ width: '10px', height: '10px', background: '#f97316', transform: 'rotate(45deg)', flexShrink: 0, boxShadow: '0 2px 8px rgba(249,115,22,0.6)' }} />
              <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to left, transparent, #f97316)' }} />
            </div>
          ))}

          {/* Scrolling track */}
          <div style={{
            display: 'flex',
            gap: `${GAP}px`,
            transform: `translateX(${trackX}px)`,
            transition: transit ? `transform ${TRANSIT_MS}ms cubic-bezier(0.4,0,0.2,1)` : 'none',
          }}>
            {EXT.map((s, i) => {
              const isCenter = i === ci
              const sz = isCenter ? SZ_CENTER : SZ_SIDE
              const globalNum = ((i - 2) % N + N) % N + 1
              return (
                <div key={i} style={{ width: `${ITEM_W}px`, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                  {/* Circle container — fixed height so layout never shifts */}
                  <div style={{ height: `${CIRCLE_H}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%' }}>
                    <div style={{
                      width: `${sz}px`,
                      height: `${sz}px`,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: `${isCenter ? 6 : 4}px solid white`,
                      boxShadow: isCenter
                        ? '0 0 0 5px #f97316, 0 24px 64px rgba(249,115,22,0.42)'
                        : '0 0 0 3px rgba(249,115,22,0.55), 0 10px 28px rgba(249,115,22,0.16)',
                      transition: transit ? `width ${TRANSIT_MS}ms cubic-bezier(0.4,0,0.2,1), height ${TRANSIT_MS}ms cubic-bezier(0.4,0,0.2,1), box-shadow ${TRANSIT_MS}ms ease` : 'none',
                      position: 'relative', zIndex: isCenter ? 2 : 1,
                    }}>
                      <img src={s.img} alt={s.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'translateZ(0)' }} />
                    </div>

                    {/* Number badge */}
                    <div style={{
                      position: 'absolute',
                      top: `${CIRCLE_H / 2 - sz / 2 + 6}px`,
                      right: `${ITEM_W / 2 - sz / 2 - 4}px`,
                      width: isCenter ? '42px' : '34px',
                      height: isCenter ? '42px' : '34px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#f97316,#ea580c)',
                      boxShadow: '0 4px 14px rgba(249,115,22,0.6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, color: 'white',
                      fontSize: isCenter ? '15px' : '12px',
                      border: '3px solid white',
                      zIndex: 4,
                      transition: transit ? `all ${TRANSIT_MS}ms ease` : 'none',
                    }}>
                      {String(globalNum).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontWeight: 900, color: '#0a2558',
                    fontSize: '14px',
                    lineHeight: 1.25, marginBottom: '8px',
                    opacity: isCenter ? 1 : 0.65,
                    transition: transit ? `all ${TRANSIT_MS}ms ease` : 'none',
                  }}>
                    {s.title}
                  </h3>

                  {/* Desc */}
                  <p style={{
                    color: '#64748b', fontSize: '12.5px',
                    lineHeight: 1.7, maxWidth: '200px',
                    opacity: isCenter ? 1 : 0.55,
                    transition: transit ? `all ${TRANSIT_MS}ms ease` : 'none',
                    minHeight: '60px',
                  }}>
                    {s.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div style={{ width: '200px', height: '3px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', margin: '28px auto 0' }}>
          <div
            key={ci}
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #f97316, #ea580c)',
              borderRadius: '99px',
              animation: `progressFill 3.2s linear forwards`,
            }}
          />
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-center gap-5 mt-5">
          <button
            onClick={() => setCi(p => Math.max(2, p - 1))}
            style={{ width: '42px', height: '42px', borderRadius: '50%', border: 'none', background: ci <= 2 ? '#e8eef8' : '#0a2558', cursor: ci <= 2 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={ci <= 2 ? '#aab8cc' : 'white'} strokeWidth="2.5" className="w-5 h-5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, fontSize: '15px' }}>
            <span style={{ color: '#f97316' }}>{String(realIdx + 1).padStart(2, '0')}</span>
            <span style={{ color: '#cbd5e1', fontSize: '13px' }}>/</span>
            <span style={{ color: '#94a3b8' }}>{String(N).padStart(2, '0')}</span>
          </div>

          <button
            onClick={advance}
            style={{ width: '42px', height: '42px', borderRadius: '50%', border: 'none', background: '#0a2558', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

      </div>

      {/* ── Mobile: 2-col grid ── */}
      <div className="lg:hidden grid grid-cols-2 gap-8">
        {services.map((s, i) => (
          <div key={s.title} className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="rounded-full overflow-hidden"
                style={{ width: '110px', height: '110px', border: '4px solid white', boxShadow: '0 0 0 3px #f97316, 0 8px 24px rgba(249,115,22,0.2)' }}>
                <img src={s.img} alt={s.title} className="w-full h-full" style={{ objectFit: 'cover' }} />
              </div>
              <div className="absolute flex items-center justify-center font-black text-white rounded-full"
                style={{ width: '28px', height: '28px', background: '#f97316', top: '4px', right: '4px', fontSize: '11px', border: '2px solid white' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            <h3 className="font-black text-[#0a2558] mb-1" style={{ fontSize: '12.5px' }}>{s.title}</h3>
            <p className="text-gray-500 leading-relaxed" style={{ fontSize: '11px' }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-12 rounded-2xl px-7 py-5 anim-fade-up ${inView ? 'anim-in' : ''}`}
        style={{ background: '#0a2558', transitionDelay: '0.35s' }}>
        <div>
          <p className="text-white font-bold" style={{ fontSize: '15px' }}>Need a ride? We're available 24/7.</p>
          <p className="text-blue-200 text-sm mt-1">Call us or book online — fast, easy, and reliable.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to="/contact" className="bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors tracking-widest"
            style={{ padding: '12px 24px', fontSize: '12px', textDecoration: 'none' }}>BOOK A RIDE</Link>
          <a href="tel:+14703367475" className="font-bold rounded-xl tracking-widest"
            style={{ padding: '12px 24px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.25)', color: 'white', textDecoration: 'none' }}>CALL NOW</a>
        </div>
      </div>

    </section>
  )
}
