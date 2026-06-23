import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import deltaCar1 from '../assets/delta-car1.png'
import useInView from '../hooks/useInView'

const quickLinks = [
  { label: 'Home',         to: '/'             },
  { label: 'About Us',     to: '/about'        },
  { label: 'Services',     to: '/services'     },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Our Fleet',    to: '/fleet'        },
  { label: 'Contact Us',   to: '/contact'      },
]
const services = [
  'Medical Appointments',
  'Dialysis Treatments',
  'Airport Transfers',
  'Rehabilitation Centers',
  'Family Visits',
  'Shopping & Errands',
]

const contactItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-5 h-5">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
      </svg>
    ),
    label: 'Phone', value: '(470) 336-7475',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email', value: 'info@dmctransport.us',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Hours', value: 'Available 24/7',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location', value: 'Lathrop, California',
  },
]

const socials = [
  {
    label: 'Facebook',
    icon: <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    label: 'Instagram',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
  {
    label: 'Twitter',
    icon: <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>,
  },
]

export default function Footer() {
  const [ref, inView] = useInView()
  return (
    <footer style={{ background: '#071a3e' }} ref={ref}>

      {/* ── TOP CTA BAND ── */}
      <div className={`relative overflow-hidden anim-fade-up ${inView ? 'anim-in' : ''}`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', minHeight: '340px' }}>

        {/* Dot pattern background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(135deg, #0d3070 0%, #0a2558 60%, #071a3e 100%)',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />

        <div className="relative z-10 flex flex-col lg:flex-row min-h-[340px]">

          {/* ══ LEFT: Text content ══ */}
          <div className="flex-1 flex items-center px-8 md:px-12 lg:px-16 py-14 relative">
            {/* Left orange accent line */}
            <div className="absolute top-0 left-0 bottom-0 pointer-events-none" style={{ width: '4px', background: 'linear-gradient(to bottom, transparent, #f97316, transparent)' }} />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 pointer-events-none" style={{ width: '55%', height: '3px', background: 'linear-gradient(to right, #f97316, transparent)' }} />

            <div className="max-w-lg">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
                style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                <span className="w-2 h-2 rounded-full bg-orange-400 inline-block animate-pulse" />
                <span className="text-orange-400 font-bold text-xs tracking-widest uppercase">Ready to Travel?</span>
              </div>

              {/* Heading */}
              <h3 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}>
                Book Your Ride Today —<br />
                <span style={{ color: '#f97316' }}>Safe, Fast &amp; Reliable.</span>
              </h3>

              <p className="text-blue-200 mb-7 leading-relaxed" style={{ fontSize: '14px', maxWidth: '380px' }}>
                Professional non-emergency transportation for patients, seniors, and families. Available 24/7, every day of the year.
              </p>

              {/* Feature checklist */}
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Licensed & fully insured drivers',
                  'On-time guarantee, every single ride',
                  'Door-to-door compassionate service',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: '#f97316', boxShadow: '0 3px 10px rgba(249,115,22,0.4)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13.5px', fontWeight: 600 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/contact"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: 'white', fontWeight: 800, fontSize: '13px',
                    letterSpacing: '0.08em', padding: '14px 26px',
                    borderRadius: '12px', textDecoration: 'none',
                    boxShadow: '0 8px 28px rgba(249,115,22,0.45)',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(249,115,22,0.6)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(249,115,22,0.45)' }}
                >
                  BOOK A RIDE
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="15" height="15">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(249,115,22,0.18)', border: '1px solid rgba(249,115,22,0.35)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" width="18" height="18">
                      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Call us 24/7</p>
                    <p style={{ color: 'white', fontWeight: 800, fontSize: '16px', lineHeight: 1.2 }}>(470) 336-7475</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT: Image + floating stat cards ══ */}
          <div className="hidden lg:block lg:w-[42%] relative overflow-hidden">
            <img
              src={deltaCar1}
              alt="Delta Care Transport vehicle"
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Left-to-right gradient overlay to blend with left panel */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0a2558 0%, rgba(10,37,88,0.55) 35%, rgba(10,37,88,0.1) 100%)' }} />
            {/* Dark bottom overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,26,62,0.7) 0%, transparent 60%)' }} />

            {/* Floating stat cards */}
            <div className="absolute bottom-10 right-8 flex flex-col gap-3">
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '18px', padding: '18px 24px',
              }}>
                <p style={{ color: '#f97316', fontWeight: 900, fontSize: '30px', lineHeight: 1 }}>10K+</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>Trips Completed</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                borderRadius: '18px', padding: '18px 24px',
                boxShadow: '0 8px 28px rgba(249,115,22,0.5)',
              }}>
                <p style={{ color: 'white', fontWeight: 900, fontSize: '30px', lineHeight: 1 }}>4.9★</p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>Average Rating</p>
              </div>
            </div>

            {/* Top-left "5+ Years" badge */}
            <div className="absolute top-8 left-8">
              <div style={{
                background: 'rgba(10,37,88,0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '14px', padding: '12px 18px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 800, fontSize: '13px', lineHeight: 1 }}>5+ Years</p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px' }}>Trusted Service</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="px-5 md:px-10 lg:px-[52px] py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Logo + about */}
          <div className={`sm:col-span-2 lg:col-span-1 anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="relative mb-6" style={{ width: '130px', height: '130px' }}>
              {/* Outer glow ring */}
              <div style={{
                position: 'absolute', inset: '-5px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                opacity: 0.3,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                width: '130px', height: '130px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 10px 40px rgba(0,0,0,0.35), 0 0 0 3px #f97316',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <img src={logo} alt="Delta Care Transport" style={{ width: '118px', height: '118px', objectFit: 'contain' }} />
              </div>
            </div>
            <p className="font-black mb-3 leading-snug" style={{ color: '#f97316', fontSize: '15px' }}>
              Connecting People with Safe &amp;<br />Reliable Transportation.
            </p>
            <p className="text-blue-100 leading-relaxed mb-6" style={{ fontSize: '14px' }}>
              Professional non-medical transportation you can trust — serving patients, seniors,
              and families across Lathrop and beyond.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href="#" title={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className={`anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.25s' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: '#f97316' }} />
              <h4 className="text-white font-black text-sm uppercase tracking-widest">Quick Links</h4>
            </div>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="group flex items-center gap-3" style={{ color: '#93c5fd', textDecoration: 'none' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" className="w-3 h-3 shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm hover:text-white transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className={`anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.35s' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: '#f97316' }} />
              <h4 className="text-white font-black text-sm uppercase tracking-widest">Our Services</h4>
            </div>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="group flex items-center gap-3" style={{ color: '#93c5fd', textDecoration: 'none' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" className="w-3 h-3 shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm hover:text-white transition-colors">{s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className={`anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.45s' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: '#f97316' }} />
              <h4 className="text-white font-black text-sm uppercase tracking-widest">Contact Us</h4>
            </div>
            <div className="flex flex-col gap-3">
              {contactItems.map((c) => (
                <div key={c.label} className="flex items-center gap-3 rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.15)' }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-0.5">{c.label}</p>
                    <p className="text-white font-semibold text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 md:px-10 lg:px-[52px] py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-center sm:text-left">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Delta Care Transport</span>. All rights reserved.
          </p>
          <p className="text-blue-300 mt-0.5" style={{ fontSize: '12px' }}>
            Designed and developed by <a href="https://nexviya.com" target="_blank" rel="noopener noreferrer" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Nexviya.com</a>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/privacy-policy" className="text-blue-200 text-sm hover:text-orange-400 transition-colors" style={{ textDecoration:'none' }}>Privacy Policy</Link>
          <Link to="/terms" className="text-blue-200 text-sm hover:text-orange-400 transition-colors" style={{ textDecoration:'none' }}>Terms of Service</Link>
          <Link to="/non-medical-transportation" className="text-blue-200 text-sm hover:text-orange-400 transition-colors" style={{ textDecoration:'none' }}>Non-Medical Transportation</Link>
        </div>
      </div>

    </footer>
  )
}
