import { useState } from 'react'
import useInView from '../hooks/useInView'
import { submitContactRequest } from '../services/firestoreService'

const steps = [
  {
    num: '01', label: 'Fill the Form', desc: 'Enter pickup, drop-off and trip details',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    num: '02', label: 'Get Confirmation', desc: 'Our team confirms within minutes',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
  {
    num: '03', label: 'Enjoy Your Ride', desc: 'Sit back and ride in comfort',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
]

const miniStats = [
  { num: '500+', label: 'Happy Clients' },
  { num: '10K+', label: 'Trips Done' },
  { num: '4.9★', label: 'Avg Rating' },
]

const contactInfo = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="15" height="15"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z"/></svg>,
    value: '(470) 336-7475', sub: 'Call us anytime, 24/7',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="15" height="15"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    value: 'info@deltacaretransport.com', sub: 'We reply within 1 hour',
  },
]

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0a2558', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', borderRadius: '12px', padding: '11px 14px',
  fontSize: '13.5px', color: '#1e293b', outline: 'none',
  border: '1.5px solid #e2e8f0', background: 'white',
  transition: 'border-color 0.2s',
}

export default function BookingForm() {
  const [ref, inView] = useInView()
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const focusStyle = e => e.target.style.borderColor = '#f97316'
  const blurStyle  = e => e.target.style.borderColor = '#e2e8f0'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.target)
    try {
      await submitContactRequest({
        name:        fd.get('name'),
        phone:       fd.get('phone'),
        email:       fd.get('email'),
        passengers:  fd.get('passengers'),
        serviceType: fd.get('serviceType'),
        date:        fd.get('date'),
        time:        fd.get('time'),
        pickup:      fd.get('pickup'),
        destination: fd.get('destination'),
        notes:       fd.get('notes'),
        source:      'homepage-form',
      })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #eef3fb 0%, #f8faff 100%)', padding: '64px 20px' }}
    >
      {/* ── Section Header ── */}
      <div className={`text-center mb-10 anim-fade-up ${inView ? 'anim-in' : ''}`}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
          style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}>
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block animate-pulse" />
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Easy Booking</span>
        </div>
        <h2 className="font-black text-[#0a2558] leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          Reserve Your Ride<br />
          <span style={{ color: '#f97316' }}>In Under 60 Seconds</span>
        </h2>
        <p className="text-gray-500 mt-3 mx-auto" style={{ fontSize: '14.5px', maxWidth: '420px' }}>
          Safe, on-time, and stress-free — fill out the form below and we'll handle the rest.
        </p>
      </div>

      {/* ── Card ── */}
      <div className="mx-auto" style={{ maxWidth: '1140px' }}>
        <div
          className={`flex flex-col lg:flex-row rounded-3xl overflow-hidden anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{ boxShadow: '0 24px 72px rgba(10,37,88,0.16)', transitionDelay: '0.1s' }}
        >

          {/* ══ LEFT PANEL ══ */}
          <div
            className="w-full lg:w-[380px] lg:shrink-0 relative flex flex-col"
            style={{ background: 'linear-gradient(160deg, #0d3070 0%, #0a2558 55%, #071a3e 100%)', padding: '40px 32px' }}
          >
            {/* Decorative blobs */}
            <div className="absolute rounded-full pointer-events-none" style={{ width: '280px', height: '280px', background: 'rgba(249,115,22,0.08)', top: '-70px', right: '-90px', border: '1px solid rgba(249,115,22,0.14)' }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width: '160px', height: '160px', background: 'rgba(255,255,255,0.03)', bottom: '80px', left: '-60px' }} />

            <div className="relative z-10 flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5"
                style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block animate-pulse" />
                <span className="text-orange-400 font-bold text-xs tracking-widest uppercase">Schedule a Trip</span>
              </div>

              {/* Heading */}
              <h3 className="font-black text-white leading-tight mb-3" style={{ fontSize: 'clamp(24px, 2.5vw, 32px)' }}>
                Book Your Ride<br />
                <span style={{ color: '#f97316' }}>In Minutes</span>
              </h3>
              <p className="text-blue-200 leading-relaxed mb-7" style={{ fontSize: '13.5px', maxWidth: '280px' }}>
                Fill out the form and our team will confirm your booking shortly. Every trip, every time.
              </p>

              {/* Steps with vertical line */}
              <div className="flex flex-col mb-7" style={{ gap: 0 }}>
                {steps.map((s, i) => (
                  <div key={s.num} className="flex gap-4">
                    {/* Icon + connecting line */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: i === 0 ? '#f97316' : 'rgba(255,255,255,0.08)',
                          border: i !== 0 ? '1.5px solid rgba(255,255,255,0.18)' : 'none',
                          color: i === 0 ? 'white' : 'rgba(255,255,255,0.6)',
                          boxShadow: i === 0 ? '0 6px 18px rgba(249,115,22,0.45)' : 'none',
                        }}>
                        {s.icon}
                      </div>
                      {i < steps.length - 1 && (
                        <div style={{ width: '1.5px', height: '28px', background: 'rgba(255,255,255,0.12)', margin: '4px 0' }} />
                      )}
                    </div>
                    {/* Text */}
                    <div style={{ paddingTop: '10px', paddingBottom: i < steps.length - 1 ? '0' : '0' }}>
                      <p className="text-white font-bold" style={{ fontSize: '13.5px' }}>{s.label}</p>
                      <p className="text-blue-300" style={{ fontSize: '12px', marginTop: '2px', marginBottom: i < steps.length - 1 ? '4px' : '0' }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini stats row */}
              <div className="grid grid-cols-3 gap-2 mb-7">
                {miniStats.map((s) => (
                  <div key={s.label} className="text-center rounded-2xl py-3 px-2"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="font-black leading-none mb-1" style={{ color: '#f97316', fontSize: '17px' }}>{s.num}</p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px', fontWeight: 600 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }} />

              {/* Contact info */}
              <div className="flex flex-col gap-3">
                {contactInfo.map((c) => (
                  <div key={c.value} className="flex items-center gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(249,115,22,0.2)' }}>
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold" style={{ fontSize: '13px' }}>{c.value}</p>
                      <p className="text-blue-300" style={{ fontSize: '11px' }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom trust strip */}
            <div className="relative z-10 flex items-center gap-3 pt-6 mt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex -space-x-2">
                {['#f97316', '#1e5799', '#0d3070'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white font-black text-xs"
                    style={{ background: c, borderColor: '#0a2558' }}>
                    {['A', 'B', 'C'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} viewBox="0 0 24 24" fill="#f97316" width="11" height="11">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-blue-200" style={{ fontSize: '11px' }}>500+ satisfied passengers</p>
              </div>
            </div>
          </div>

          {/* ══ RIGHT PANEL: Form ══ */}
          <div className="flex-1 flex items-center justify-center" style={{ background: 'white', padding: '40px 36px' }}>
            <div className="w-full" style={{ maxWidth: '560px' }}>

              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="flex items-center justify-center rounded-full mb-5"
                    style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 12px 36px rgba(249,115,22,0.38)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="32" height="32"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="font-black text-[#0a2558] mb-2" style={{ fontSize: '22px' }}>Booking Request Sent!</h3>
                  <p className="text-gray-500 mb-6" style={{ fontSize: '14.5px', maxWidth: '300px' }}>
                    Our team will call you within minutes to confirm your ride.
                  </p>
                  <button onClick={() => setSent(false)}
                    className="font-bold rounded-xl"
                    style={{ padding: '11px 24px', fontSize: '13px', background: '#f0f6ff', color: '#0a2558', border: 'none', cursor: 'pointer' }}>
                    Book Another Ride
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Form header */}
                  <div className="mb-6 pb-5" style={{ borderBottom: '1.5px solid #f1f5fb' }}>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fff4ec' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.2" width="16" height="16">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                      </div>
                      <h3 className="font-black text-[#0a2558]" style={{ fontSize: '20px' }}>Ride Booking Form</h3>
                    </div>
                    <p className="text-gray-400" style={{ fontSize: '13px', marginLeft: '44px' }}>
                      Complete all fields for a quick booking confirmation.
                    </p>
                  </div>

                  {/* Personal Info */}
                  <p className="font-bold text-[#0a2558] mb-3" style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Personal Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <Field label="Full Name">
                      <div className="relative">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15"
                          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', pointerEvents: 'none' }}>
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <input name="name" required type="text" placeholder="John Smith"
                          style={{ ...inputStyle, paddingLeft: '34px' }} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </Field>
                    <Field label="Phone Number">
                      <div className="relative">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15"
                          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', pointerEvents: 'none' }}>
                          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z"/>
                        </svg>
                        <input name="phone" required type="tel" placeholder="(000) 000-0000"
                          style={{ ...inputStyle, paddingLeft: '34px' }} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <Field label="Email Address">
                      <div className="relative">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15"
                          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', pointerEvents: 'none' }}>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <input name="email" type="email" placeholder="john@email.com"
                          style={{ ...inputStyle, paddingLeft: '34px' }} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </Field>
                    <Field label="Passengers">
                      <div className="relative">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15"
                          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', pointerEvents: 'none' }}>
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <select name="passengers" style={{ ...inputStyle, paddingLeft: '34px', color: '#475569' }}>
                          <option value="">Select...</option>
                          {[1,2,3,4,'5+'].map(n => <option key={n}>{n} Passenger{n !== 1 ? 's' : ''}</option>)}
                        </select>
                      </div>
                    </Field>
                  </div>

                  {/* Trip Details */}
                  <div style={{ height: '1px', background: '#f1f5fb', marginBottom: '16px' }} />
                  <p className="font-bold text-[#0a2558] mb-3" style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Trip Details</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <Field label="Service Type">
                      <select name="serviceType" required style={{ ...inputStyle, color: '#475569' }} onFocus={focusStyle} onBlur={blurStyle}>
                        <option value="">Select...</option>
                        <option>Medical Appointment</option>
                        <option>Dialysis Treatment</option>
                        <option>Airport Transfer</option>
                        <option>Rehabilitation Center</option>
                        <option>Family Visit</option>
                        <option>Shopping & Errands</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <Field label="Pickup Date">
                      <input name="date" required type="date" style={{ ...inputStyle, color: '#475569' }} onFocus={focusStyle} onBlur={blurStyle} />
                    </Field>
                    <Field label="Pickup Time">
                      <input name="time" required type="time" style={{ ...inputStyle, color: '#475569' }} onFocus={focusStyle} onBlur={blurStyle} />
                    </Field>
                  </div>

                  <div className="mb-3">
                    <Field label="Pickup Address">
                      <div className="relative">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" width="15" height="15"
                          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', pointerEvents: 'none' }}>
                          <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                        </svg>
                        <input name="pickup" required type="text" placeholder="Enter pickup location"
                          style={{ ...inputStyle, paddingLeft: '34px' }} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </Field>
                  </div>

                  <div className="mb-3">
                    <Field label="Drop-off Address">
                      <div className="relative">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2" width="15" height="15"
                          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', pointerEvents: 'none' }}>
                          <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                        </svg>
                        <input name="destination" required type="text" placeholder="Enter drop-off location"
                          style={{ ...inputStyle, paddingLeft: '34px' }} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </Field>
                  </div>

                  <div className="mb-5">
                    <Field label="Special Needs / Notes">
                      <textarea name="notes" rows={2} placeholder="Wheelchair access, oxygen needed, extra stops, etc."
                        style={{ ...inputStyle, resize: 'none' }} onFocus={focusStyle} onBlur={blurStyle} />
                    </Field>
                  </div>

                  {error && (
                    <p className="text-red-500 text-center font-semibold rounded-lg py-2.5 mb-4"
                      style={{ fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca' }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full font-black text-white rounded-xl tracking-widest flex items-center justify-center gap-3"
                    style={{ padding: '16px', fontSize: '13px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', boxShadow: '0 8px 28px rgba(249,115,22,0.38)', opacity: loading ? 0.75 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? (
                      <>
                        <svg style={{ animation: 'spin 0.9s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="17" height="17">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        Submitting…
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
                          <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                        CONFIRM MY BOOKING
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="13" height="13">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <p className="text-gray-400" style={{ fontSize: '12px' }}>Your information is 100% secure and never shared.</p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
