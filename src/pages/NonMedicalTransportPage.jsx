import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'

const services = [
  { icon: '🏥', title: 'Medical Appointments', desc: 'Reliable rides to doctor visits, specialist consultations, clinics, and outpatient procedures.' },
  { icon: '💉', title: 'Dialysis Treatments', desc: 'Consistent, on-time transportation for patients requiring regular dialysis sessions.' },
  { icon: '🧠', title: 'Therapy Sessions', desc: 'Physical therapy, occupational therapy, mental health appointments, and rehabilitation visits.' },
  { icon: '✈️', title: 'Airport Transfers', desc: 'Stress-free rides to and from Sacramento International Airport and San Jose International Airport.' },
  { icon: '🏘️', title: 'Family & Social Visits', desc: 'Transportation for seniors and individuals who need help visiting family, friends, or community events.' },
  { icon: '🛒', title: 'Errands & Shopping', desc: 'Grocery runs, pharmacy pickups, and other daily errands for those who need mobility assistance.' },
]

const differences = [
  {
    title: 'Non-Medical Transport',
    color: '#f97316',
    points: [
      'Transportation to and from appointments',
      'No medical care provided during the ride',
      'For stable patients who can travel safely',
      'More affordable than medical transport',
      'Available for a wide range of destinations',
      'Booked in advance via phone or online',
    ],
  },
  {
    title: 'Medical Transport (Ambulance)',
    color: '#64748b',
    points: [
      'Emergency or critical medical situations',
      'Medical staff and equipment on board',
      'For patients who need care during transport',
      'Significantly more expensive',
      'Primarily to emergency medical facilities',
      'Dispatched via 911 or hospital order',
    ],
  },
]

const faqs = [
  { q: 'Who qualifies for non-medical transportation?', a: 'Anyone who needs a reliable ride to a medical appointment, therapy session, or other destination but does not require emergency medical care during transport. This includes seniors, individuals with disabilities, and patients recovering from surgery.' },
  { q: 'Do you offer wheelchair-accessible vehicles?', a: 'Yes, we have wheelchair-accessible vehicles available upon request. Please specify your accessibility needs when booking so we can dispatch the appropriate vehicle.' },
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 24 hours in advance to ensure availability. For recurring appointments (such as dialysis), we offer standing reservation options. Same-day rides may be available based on driver availability.' },
  { q: 'What areas do you serve?', a: 'We primarily serve Lathrop and surrounding communities including Stockton, Manteca, Tracy, Modesto, and more within a 30-mile radius. Please contact us if you have a specific destination to confirm service availability.' },
  { q: 'Can a family member ride along?', a: 'Yes, family members or caregivers are welcome to accompany passengers. Please let us know at the time of booking so we can ensure appropriate seating.' },
  { q: 'Is your service covered by insurance or Medicaid?', a: 'Coverage varies depending on your insurance plan. We recommend contacting your insurance provider or Medicaid case manager to verify coverage for non-emergency medical transportation (NEMT).' },
]

export default function NonMedicalTransportPage() {
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const [ref3, inView3] = useInView()
  const [ref4, inView4] = useInView()

  return (
    <>
      <PageBanner
        title="Non-Medical Transportation"
        subtitle="Safe, reliable, and compassionate rides for patients, seniors, and individuals who need dependable transportation — without the cost of an ambulance."
      />

      {/* What is it */}
      <section ref={ref1} style={{ background: '#fff', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className={`flex-1 anim-fade-up ${inView1 ? 'anim-in' : ''}`}>
              <p className="font-bold tracking-widest uppercase mb-3" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>What We Do</p>
              <h2 className="font-black text-[#0a2558] mb-5 leading-tight" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
                What Is Non-Medical Transportation?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4" style={{ fontSize: '15.5px' }}>
                Non-medical transportation (also called non-emergency medical transportation or NEMT) provides reliable rides for individuals who need to attend medical appointments, therapy sessions, or other destinations but do not require emergency medical care or a medical professional during the ride.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6" style={{ fontSize: '15.5px' }}>
                Delta Care Transport specializes in this service — offering a compassionate, professional alternative to expensive ambulance rides for stable patients, seniors, and individuals with disabilities in Lathrop, California.
              </p>
              <div className="flex flex-col gap-3">
                {['Licensed, insured & background-checked drivers', 'Wheelchair-accessible vehicles available', 'On-time guarantee for all scheduled rides', 'Door-to-door service from pickup to destination'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 10px rgba(249,115,22,0.35)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span className="text-gray-700 font-medium" style={{ fontSize: '14px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:w-[44%] anim-fade-up ${inView1 ? 'anim-in' : ''}`} style={{ transitionDelay: '0.1s' }}>
              <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg,#0a2558,#0d3070)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '22px 22px' }} />
                <div className="relative z-10">
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg,#f97316,#ea580c)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 6px 20px rgba(249,115,22,0.4)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="24" height="24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3 className="font-black text-white mb-5" style={{ fontSize: '20px' }}>When To Use Our Service</h3>
                  {[
                    'Routine doctor or specialist appointments',
                    'Recurring dialysis or chemotherapy',
                    'Physical or occupational therapy',
                    'Post-surgery follow-up visits',
                    'Mental health appointments',
                    'Airport drop-off or pickup',
                    'Senior center or day program',
                    'Pharmacy or grocery errands',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 mb-3">
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13.5px' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref2} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <p className="font-bold tracking-widest uppercase mb-2 text-center" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>What We Offer</p>
          <h2 className="font-black text-[#0a2558] text-center mb-12" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>Our Transportation Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className={`rounded-2xl p-6 anim-fade-up ${inView2 ? 'anim-in' : ''}`}
                style={{ background: '#fff', border: '1.5px solid #e8eef8', transitionDelay: `${i * 0.08}s` }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{s.icon}</div>
                <h3 className="font-black text-[#0a2558] mb-2" style={{ fontSize: '16px' }}>{s.title}</h3>
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: '13.5px' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section ref={ref3} style={{ background: '#fff', borderTop: '1px solid #e8eef8', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <p className="font-bold tracking-widest uppercase mb-2 text-center" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Know The Difference</p>
          <h2 className="font-black text-[#0a2558] text-center mb-4" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>Non-Medical vs Medical Transport</h2>
          <p className="text-gray-500 text-center mb-12 mx-auto" style={{ fontSize: '14.5px', maxWidth: '540px' }}>Understanding which type of transportation is right for your situation can save time, stress, and money.</p>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 anim-fade-up ${inView3 ? 'anim-in' : ''}`}>
            {differences.map((d) => (
              <div key={d.title} className="rounded-2xl p-7"
                style={{ background: d.color === '#f97316' ? 'linear-gradient(135deg,#fff8f5,#fff)' : '#f8faff', border: `2px solid ${d.color === '#f97316' ? '#fed7aa' : '#e8eef8'}` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <h3 className="font-black" style={{ fontSize: '16px', color: d.color === '#f97316' ? '#0a2558' : '#374151' }}>{d.title}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {d.points.map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: d.color, marginTop: '7px', flexShrink: 0 }} />
                      <p className="text-gray-600" style={{ fontSize: '13.5px' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={ref4} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <p className="font-bold tracking-widest uppercase mb-2 text-center" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>FAQ</p>
          <h2 className="font-black text-[#0a2558] text-center mb-12" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <div key={i} className={`rounded-2xl p-6 anim-fade-up ${inView4 ? 'anim-in' : ''}`}
                style={{ background: '#fff', border: '1.5px solid #e8eef8', transitionDelay: `${i * 0.07}s` }}>
                <div className="flex items-start gap-4">
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>Q</span>
                  </div>
                  <div>
                    <p className="font-black text-[#0a2558] mb-2" style={{ fontSize: '15px' }}>{f.q}</p>
                    <p className="text-gray-600 leading-relaxed" style={{ fontSize: '14px' }}>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '70px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <div className="rounded-3xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(135deg,#0a2558,#0d3070)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10">
              <p className="font-bold tracking-widest uppercase mb-3" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Ready to Ride?</p>
              <h3 className="font-black text-white mb-4" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                Book Your Ride Today
              </h3>
              <p className="text-blue-200 mb-8 mx-auto leading-relaxed" style={{ fontSize: '15px', maxWidth: '480px' }}>
                Safe, reliable, and compassionate non-medical transportation for patients, seniors, and families across Lathrop, California.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact"
                  style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', color: 'white', fontWeight: 800, fontSize: '14px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(249,115,22,0.45)', letterSpacing: '0.04em' }}>
                  BOOK A RIDE
                </Link>
                <a href="tel:+14703367475"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: '14px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                  Call (470) 336-7475
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
