import { useState, useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import { submitContactRequest, addBooking, addNotification } from '../services/firestoreService'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'


const serviceTypes = ['Medical Appointments', 'Dialysis Transportation', 'Airport Transfers', 'Rehabilitation Center', 'Family & Social Visits', 'Shopping & Errands', 'Other']

const inputCls = {
  width: '100%', borderRadius: '10px', padding: '11px 14px',
  fontSize: '14px', color: '#1e293b', outline: 'none',
  border: '1.5px solid #e2e8f0', background: '#fff',
  transition: 'border-color 0.2s',
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
        {label}{required && <span style={{ color: '#f97316' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

export default function ContactPage() {
  const [ref, inView] = useInView()
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [toast, setToast]     = useState(false)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUserEmail(u?.email || '')
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(false), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.target)
    const bookingData = {
      name:        fd.get('name'),
      phone:       fd.get('phone'),
      email:       fd.get('email'),
      pickup:      fd.get('pickup'),
      destination: fd.get('destination'),
      serviceType: fd.get('serviceType'),
      date:        fd.get('date'),
      time:        fd.get('time'),
      passengers:  fd.get('passengers'),
      specialReqs: fd.get('specialReqs'),
      notes:       fd.get('notes'),
    }
    try {
      await submitContactRequest(bookingData)
      const user = auth.currentUser
      if (user) {
        try {
          await addBooking(user.uid, {
            ...bookingData,
            from:   bookingData.pickup,
            to:     bookingData.destination,
            type:   bookingData.serviceType,
            status: 'Pending',
            rating: null,
          })
          await addNotification(user.uid, {
            icon: '🚐',
            title: 'Booking Received!',
            msg: `Your ride request for ${bookingData.serviceType} on ${bookingData.date} has been received. We'll confirm shortly.`,
          })
        } catch {
          // silently fail
        }
      }
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageBanner title="Contact Us" subtitle="Ready to book or have a question? We're here around the clock — reach out anytime." />

      {/* Contact info row */}
      <section style={{ background: '#f8faff', borderBottom: '1px solid #e8eef8', padding: '48px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ maxWidth: '1100px' }}>
          {[
            {
              icon: <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z"/></svg>,
              bg: 'linear-gradient(135deg,#f97316,#ea580c)', title: 'Phone', value: '(470) 336-7475', sub: '24/7 scheduling line', href: 'tel:+14703367475',
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.998 2C6.474 2 2 6.476 2 12.001a9.949 9.949 0 0 0 1.404 5.142L2.003 22l4.978-1.378A9.945 9.945 0 0 0 12 22c5.523 0 10-4.477 10-10S17.521 2 11.998 2zm.002 18.168a8.163 8.163 0 0 1-4.158-1.134l-.298-.177-3.083.854.853-3.07-.194-.315A8.168 8.168 0 0 1 3.835 12C3.835 7.491 7.49 3.836 12 3.836c4.512 0 8.165 3.654 8.165 8.164 0 4.511-3.653 8.168-8.165 8.168z"/></svg>,
              bg: '#25D366', title: 'WhatsApp', value: 'Message Us', sub: 'Quick replies guaranteed', href: 'https://wa.me/14703367475',
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
              bg: '#EA4335', title: 'Email', value: 'info@dmctransport.us', sub: 'Reply within 24 hours', href: 'mailto:info@dmctransport.us',
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>,
              bg: '#0a2558', title: 'Service Area', value: 'Lathrop, CA', sub: '18+ cities covered', href: null,
            },
          ].map((c) => {
            const inner = (
              <div className="flex items-center gap-4 p-5 rounded-2xl h-full"
                style={{ background: '#fff', border: '1px solid #e8eef8', boxShadow: '0 2px 12px rgba(10,37,88,0.05)', textDecoration: 'none' }}>
                <div className="flex items-center justify-center rounded-xl shrink-0"
                  style={{ width: '48px', height: '48px', background: c.bg }}>
                  {c.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-400 text-xs tracking-widest uppercase">{c.title}</p>
                  <p className="font-black text-[#0a2558]" style={{ fontSize: '13.5px' }}>{c.value}</p>
                  <p className="text-gray-400" style={{ fontSize: '11.5px' }}>{c.sub}</p>
                </div>
              </div>
            )
            return c.href
              ? <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>
              : <div key={c.title}>{inner}</div>
          })}
        </div>
      </section>

      {/* Main: Form + Sidebar */}
      <section ref={ref} style={{ background: '#fff', padding: '72px 20px 80px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto flex flex-col lg:flex-row gap-10" style={{ maxWidth: '1100px' }}>

          {/* Sidebar */}
          <div className={`lg:w-72 shrink-0 anim-fade-up ${inView ? 'anim-in' : ''}`}>
            <h2 className="font-black text-[#0a2558] mb-2" style={{ fontSize: '22px' }}>Ride Request</h2>
            <p className="text-gray-500 leading-relaxed mb-7" style={{ fontSize: '14px' }}>
              Fill out the form and our team will confirm your booking within minutes. All rides are door-to-door.
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-4 mb-8">
              {['Fill in your trip details', 'We confirm within minutes', 'Driver picks you up on time', 'Safe arrival, door-to-door'].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full font-black shrink-0"
                    style={{ width: '32px', height: '32px', background: i === 0 ? '#f97316' : '#f0f4fb', color: i === 0 ? 'white' : '#0a2558', fontSize: '13px' }}>
                    {i + 1}
                  </div>
                  <p className="text-gray-600" style={{ fontSize: '13.5px' }}>{step}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Form */}
          <div className={`flex-1 anim-fade-up ${inView ? 'anim-in' : ''}`} style={{ transitionDelay: '0.12s' }}>
            <div className="rounded-3xl p-7 lg:p-9" style={{ border: '1.5px solid #e8eef8', boxShadow: '0 8px 32px rgba(10,37,88,0.06)' }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="flex items-center justify-center rounded-full mb-5"
                    style={{ width: '68px', height: '68px', background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="30" height="30"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="font-black text-[#0a2558] mb-2" style={{ fontSize: '22px' }}>Request Sent!</h3>
                  <p className="text-gray-500" style={{ fontSize: '14.5px', maxWidth: '320px' }}>
                    Thank you! Our team will review your request and call to confirm your ride shortly.
                  </p>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required>
                      <input name="name" required style={inputCls} placeholder="Your full name"
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </Field>
                    <Field label="Phone Number" required>
                      <input name="phone" required type="tel" style={inputCls} placeholder="(000) 000-0000"
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </Field>
                  </div>

                  <Field label="Email Address">
                    <input name="email" type="email" style={inputCls} placeholder="your@email.com"
                      defaultValue={userEmail}
                      key={userEmail}
                      onFocus={e => e.target.style.borderColor = '#f97316'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <Field label="Pickup Address" required>
                    <input name="pickup" required style={inputCls} placeholder="Full street address including city"
                      onFocus={e => e.target.style.borderColor = '#f97316'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <Field label="Destination Address" required>
                    <input name="destination" required style={inputCls} placeholder="Full street address including city"
                      onFocus={e => e.target.style.borderColor = '#f97316'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Field label="Service Type" required>
                      <select name="serviceType" required style={{ ...inputCls, cursor: 'pointer' }}
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}>
                        <option value="">Select...</option>
                        {serviceTypes.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Pickup Date" required>
                      <input name="date" required type="date" style={inputCls}
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </Field>
                    <Field label="Pickup Time" required>
                      <input name="time" required type="time" style={inputCls}
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Passengers">
                      <select name="passengers" style={{ ...inputCls, cursor: 'pointer' }}
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}>
                        {[1,2,3,4,5,6,7].map(n => <option key={n}>{n} Passenger{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </Field>
                    <Field label="Special Requirements">
                      <input name="specialReqs" style={inputCls} placeholder="e.g. Wheelchair, oxygen tank"
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </Field>
                  </div>

                  <Field label="Additional Notes">
                    <textarea name="notes" rows={3} style={{ ...inputCls, resize: 'none' }} placeholder="Any extra details that will help us serve you better..."
                      onFocus={e => e.target.style.borderColor = '#f97316'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  {error && (
                    <p className="text-red-500 text-center font-semibold rounded-lg py-2.5"
                      style={{ fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca' }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 font-black text-white rounded-xl"
                    style={{ padding: '14px', fontSize: '13px', background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 8px 22px rgba(249,115,22,0.35)', opacity: loading ? 0.75 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? (
                      <>
                        <svg style={{ animation: 'spin 0.9s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="15" height="15">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Ride Request
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="15" height="15">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-400" style={{ fontSize: '12px' }}>
                    🔒 Your information is private and will never be shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
