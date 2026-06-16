import useInView from '../hooks/useInView'

const steps = [
  { num: '01', label: 'Fill the form', desc: 'Enter your trip details below' },
  { num: '02', label: 'Get confirmation', desc: 'We confirm within minutes' },
  { num: '03', label: 'Enjoy your ride', desc: 'Sit back & ride comfortably' },
]

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
      </svg>
    ),
    value: '(123) 456-7890',
    sub: 'Call us anytime, 24/7',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    value: 'info@deltacaretransport.com',
    sub: 'We reply within 1 hour',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    value: 'Available 24/7',
    sub: 'Including weekends & holidays',
  },
]

export default function BookingForm() {
  const [ref, inView] = useInView()
  return (
    <section className="overflow-hidden" style={{ background: '#f8faff' }} ref={ref}>
      <div className="flex flex-col lg:flex-row">

        {/* ══════ LEFT PANEL ══════ */}
        <div
          className={`w-full lg:w-105 lg:shrink-0 relative flex flex-col justify-between anim-fade-left ${inView ? 'anim-in' : ''}`}
          style={{ background: 'linear-gradient(160deg, #0d3070 0%, #0a2558 55%, #071a3e 100%)', padding: '36px 32px' }}
        >
          {/* Decorative circles */}
          <div className="absolute rounded-full pointer-events-none" style={{ width: '320px', height: '320px', background: 'rgba(249,115,22,0.07)', top: '-80px', right: '-100px', border: '1px solid rgba(249,115,22,0.12)' }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: '200px', height: '200px', background: 'rgba(255,255,255,0.03)', bottom: '60px', left: '-80px' }} />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
              style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block animate-pulse" />
              <span className="text-orange-400 font-bold text-xs tracking-widest uppercase">Schedule a Trip</span>
            </div>

            {/* Heading */}
            <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(28px, 3vw, 38px)' }}>
              Book Your Ride<br />
              <span style={{ color: '#f97316' }}>In Minutes</span>
            </h2>

            <p className="text-blue-200 leading-relaxed mb-6" style={{ fontSize: '14px', maxWidth: '300px' }}>
              Fill out the form and our team will confirm your booking shortly.
              Safe, reliable, and on-time — every trip, every time.
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-3 mb-6">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-black text-sm"
                    style={{
                      background: i === 0 ? '#f97316' : 'rgba(255,255,255,0.08)',
                      border: i !== 0 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                      color: 'white',
                      boxShadow: i === 0 ? '0 6px 18px rgba(249,115,22,0.4)' : 'none',
                    }}>
                    {s.num}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{s.label}</p>
                    <p className="text-blue-300 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mb-5" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((c) => (
                <div key={c.value} className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.2)' }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{c.value}</p>
                    <p className="text-blue-300 text-xs">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom trust strip */}
          <div className="relative z-10 flex items-center gap-3 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex -space-x-2">
              {['#f97316', '#1e5799', '#0d3070'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white font-black text-xs" style={{ background: c, borderColor: '#0a2558' }}>
                  {['A', 'B', 'C'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} viewBox="0 0 24 24" fill="#f97316" className="w-3 h-3">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-blue-200 text-xs">500+ satisfied passengers</p>
            </div>
          </div>
        </div>

        {/* ══════ RIGHT PANEL: Form ══════ */}
        <div
          className={`flex-1 flex items-center justify-center anim-fade-right ${inView ? 'anim-in' : ''}`}
          style={{ background: '#f8faff', padding: '36px 32px', transitionDelay: '0.15s' }}
        >
          <div className="w-full" style={{ maxWidth: '580px' }}>

            {/* Form header */}
            <div className="mb-5">
              <h3 className="font-black text-[#0a2558] mb-1" style={{ fontSize: '22px' }}>Ride Booking Form</h3>
              <p className="text-gray-500 text-sm">Complete all fields for a quick booking confirmation.</p>
            </div>

            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" placeholder="John Smith"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#1e293b' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Phone Number</label>
                <input type="tel" placeholder="(123) 456-7890"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#1e293b' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            {/* Row 2: Email + Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" placeholder="john@email.com"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#1e293b' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Service Type</label>
                <select
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#475569' }}
                >
                  <option value="">Select service...</option>
                  <option>Medical Appointment</option>
                  <option>Dialysis Treatment</option>
                  <option>Airport Transfer</option>
                  <option>Rehabilitation Center</option>
                  <option>Family Visit</option>
                  <option>Shopping & Errands</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Row 3: Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Pickup Date</label>
                <input type="date"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#475569' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Pickup Time</label>
                <input type="time"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#475569' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            {/* Pickup address */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Pickup Address</label>
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" className="w-4 h-4 absolute pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)', left: '14px' }}>
                  <circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                </svg>
                <input type="text" placeholder="Enter pickup location"
                  className="w-full rounded-xl py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', paddingLeft: '38px', paddingRight: '16px', color: '#1e293b' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            {/* Drop-off address */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Drop-off Address</label>
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2" className="w-4 h-4 absolute pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)', left: '14px' }}>
                  <circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                </svg>
                <input type="text" placeholder="Enter drop-off location"
                  className="w-full rounded-xl py-3 text-sm outline-none transition-all"
                  style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', paddingLeft: '38px', paddingRight: '16px', color: '#1e293b' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#0a2558] uppercase tracking-wider mb-2">Special Needs / Notes</label>
              <textarea rows={2} placeholder="Wheelchair access, oxygen needed, extra stops, etc."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all"
                style={{ border: '1.5px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#1e293b' }}
                onFocus={e => e.target.style.borderColor = '#f97316'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Submit button */}
            <button
              className="w-full font-black text-white rounded-xl tracking-widest transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{
                padding: '17px',
                fontSize: '13px',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                boxShadow: '0 8px 28px rgba(249,115,22,0.38)',
              }}
            >
              CONFIRM MY BOOKING →
            </button>

            <p className="text-center text-gray-400 text-xs mt-4">
              🔒 Your information is safe and secure with us.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
