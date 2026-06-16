import logo from '../assets/logo.png'
import useInView from '../hooks/useInView'

const quickLinks = ['Home', 'About Us', 'Services', 'How It Works', 'Our Fleet', 'Contact Us']
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
    label: 'Phone', value: '(123) 456-7890',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email', value: 'info@deltacaretransport.com',
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
    label: 'Location', value: 'Atlanta, Georgia',
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
        style={{ background: 'linear-gradient(135deg, #0d3070 0%, #0a2558 100%)', padding: '40px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="absolute rounded-full" style={{ width: '320px', height: '320px', background: 'rgba(249,115,22,0.06)', right: '-60px', top: '-80px', border: '1px solid rgba(249,115,22,0.1)' }} />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-7xl mx-auto px-2 md:px-8">
          <div>
            <p className="text-orange-400 font-bold text-xs tracking-widest uppercase mb-2">Ready to Travel?</p>
            <h3 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              Book Your Ride Today —<br />
              <span style={{ color: '#f97316' }}>Safe, Fast & Reliable.</span>
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(249,115,22,0.2)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-5 h-5">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-200 text-xs mb-0.5">Call us anytime</p>
                <p className="text-white font-black" style={{ fontSize: '17px' }}>(123) 456-7890</p>
              </div>
            </div>
            <button className="font-black text-white rounded-2xl tracking-widest whitespace-nowrap"
              style={{ padding: '16px 28px', fontSize: '13px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', boxShadow: '0 8px 28px rgba(249,115,22,0.4)' }}>
              BOOK A RIDE →
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="px-5 md:px-10 lg:px-[52px] py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Logo + about */}
          <div className={`sm:col-span-2 lg:col-span-1 anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="inline-flex items-center justify-center rounded-2xl mb-5"
              style={{ background: 'white', padding: '10px 18px', boxShadow: '0 8px 28px rgba(0,0,0,0.25)' }}>
              <img src={logo} alt="Delta Care Transport" style={{ height: '64px', width: 'auto' }} />
            </div>
            <p className="font-black mb-3 leading-snug" style={{ color: '#f97316', fontSize: '15px' }}>
              Connecting People with Safe &amp;<br />Reliable Transportation.
            </p>
            <p className="text-blue-100 leading-relaxed mb-6" style={{ fontSize: '14px' }}>
              Professional non-medical transportation you can trust — serving patients, seniors,
              and families across Atlanta and beyond.
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
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="group flex items-center gap-3" style={{ color: '#93c5fd' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" className="w-3 h-3 shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm hover:text-white transition-colors">{l}</span>
                  </a>
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
                  <a href="#" className="group flex items-center gap-3" style={{ color: '#93c5fd' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" className="w-3 h-3 shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm hover:text-white transition-colors">{s}</span>
                  </a>
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
        <p className="text-blue-200 text-sm text-center sm:text-left">
          © 2024 <span className="text-white font-semibold">Delta Care Transport</span>. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {['Privacy Policy', 'Terms of Service', 'Non-Medical Transportation'].map((item) => (
            <a key={item} href="#" className="text-blue-200 text-sm hover:text-orange-400 transition-colors">{item}</a>
          ))}
        </div>
      </div>

    </footer>
  )
}
