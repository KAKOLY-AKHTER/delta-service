import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'

const steps = [
  {
    num: '01',
    title: 'Choose How to Book',
    desc: 'Reach us the way that works best for you — call our 24/7 line, send a WhatsApp message, or fill out the online booking form. All three methods are quick and easy.',
    sub: [
      { label: 'Phone', val: '(209) 684-8359 — available 24/7' },
      { label: 'WhatsApp', val: 'Message us anytime for a fast reply' },
      { label: 'Online Form', val: 'Takes less than 2 minutes to complete' },
    ],
  },
  {
    num: '02',
    title: 'Share Your Trip Details',
    desc: 'Provide your pickup address, destination, preferred date and time, and any special requirements such as wheelchair access or extra assistance. The more detail you share, the better we can serve you.',
    sub: [
      { label: 'Pickup & destination', val: 'Exact addresses for both locations' },
      { label: 'Date & time', val: 'Your preferred pickup window' },
      { label: 'Special needs', val: 'Wheelchair, oxygen, extra help, etc.' },
    ],
  },
  {
    num: '03',
    title: 'Receive Your Confirmation',
    desc: "Our dispatch team reviews your booking and sends a confirmation — including your driver's name, vehicle details, and arrival window — typically within minutes of your request.",
    sub: [
      { label: 'Booking confirmed', val: 'Via phone call or message' },
      { label: 'Driver info', val: "Name & vehicle details shared in advance" },
      { label: 'Reminder', val: 'Sent before your scheduled trip' },
    ],
  },
  {
    num: '04',
    title: 'Driver Picks You Up',
    desc: 'Your driver arrives on time at your door. They will assist you safely into the vehicle, confirm your destination, and ensure you are comfortable before departure.',
    sub: [
      { label: 'On-time arrival', val: 'We track and meet your schedule' },
      { label: 'Personal assistance', val: 'Help in and out of the vehicle' },
      { label: 'Clean vehicle', val: 'Pre-inspected and sanitized' },
    ],
  },
  {
    num: '05',
    title: 'Safe, Comfortable Journey',
    desc: 'Sit back and relax. Your driver follows the best route to your destination. Need a stop along the way? Just let us know — we are flexible and accommodating.',
    sub: [
      { label: 'Climate control', val: 'Comfortable temperature throughout' },
      { label: 'Safe driving', val: 'Courteous, defensive driving always' },
      { label: 'Multi-stop', val: 'Additional stops can be arranged' },
    ],
  },
  {
    num: '06',
    title: 'Door-to-Door Arrival',
    desc: 'We drop you off exactly where you need to be — at the entrance, not the parking lot. Need a return trip? Simply call us and we will arrange your ride home.',
    sub: [
      { label: 'Entrance drop-off', val: 'Never left at the parking lot' },
      { label: 'Return trip', val: 'Easily scheduled by phone or message' },
      { label: 'Feedback welcome', val: 'Tell us how we did after every ride' },
    ],
  },
]

const faqs = [
  { q: 'How far in advance should I book?', a: 'We recommend 24–48 hours in advance for guaranteed availability. Same-day bookings are accepted based on availability — call us directly for urgent requests.' },
  { q: 'Can I schedule recurring rides?', a: 'Absolutely. We offer recurring scheduling for dialysis, therapy, and other regular appointments. Contact us to set up a repeating schedule.' },
  { q: 'What if my appointment runs late?', a: 'Let your driver know or call our dispatch. We do our best to accommodate delays and will arrange your return trip accordingly.' },
  { q: 'Do you serve wheelchair users?', a: 'Yes. We have wheelchair-accessible vehicles with proper ramps, lifts, and securing systems. Just mention your needs when booking.' },
]

export default function HowItWorksPage() {
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()

  return (
    <>
      <PageBanner title="How It Works" subtitle="Booking a ride with Delta Care Transport is simple, transparent, and takes just minutes." />

      {/* Intro */}
      <section style={{ background: '#fff', padding: '64px 20px 0' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto text-center" style={{ maxWidth: '680px' }}>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: '16px' }}>
            We've made the booking process as straightforward as possible. Here's exactly what happens from the moment you contact us to the moment you arrive at your destination.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section ref={ref1} style={{ background: '#fff', padding: '60px 20px 80px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
          <div className="flex flex-col gap-0">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`flex flex-col sm:flex-row gap-6 anim-fade-up ${inView1 ? 'anim-in' : ''}`}
                style={{
                  transitionDelay: `${0.06 + i * 0.09}s`,
                  paddingBottom: '40px',
                  marginBottom: '40px',
                  borderBottom: i < steps.length - 1 ? '1px solid #f0f4fb' : 'none',
                }}
              >
                {/* Step number */}
                <div className="shrink-0 flex flex-col items-center" style={{ width: '64px' }}>
                  <div className="flex items-center justify-center rounded-full font-black"
                    style={{
                      width: '56px', height: '56px',
                      background: i % 2 === 0 ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#0a2558',
                      color: 'white', fontSize: '16px',
                      boxShadow: i % 2 === 0 ? '0 6px 20px rgba(249,115,22,0.35)' : '0 6px 20px rgba(10,37,88,0.25)',
                    }}>
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block mt-2" style={{ width: '2px', flex: 1, minHeight: '40px', background: '#e8eef8' }} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h2 className="font-black text-[#0a2558] mb-2" style={{ fontSize: 'clamp(18px, 2.2vw, 22px)' }}>{s.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-5" style={{ fontSize: '14.5px' }}>{s.desc}</p>
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e8eef8' }}>
                    {s.sub.map((item, j) => (
                      <div key={item.label} className="flex items-start gap-4 px-5 py-3"
                        style={{ background: j % 2 === 0 ? '#f8faff' : '#fff', borderTop: j > 0 ? '1px solid #f0f4fb' : 'none' }}>
                        <span className="font-bold text-[#0a2558] shrink-0" style={{ fontSize: '13px', minWidth: '130px' }}>{item.label}</span>
                        <span className="text-gray-500" style={{ fontSize: '13px' }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={ref2} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '820px' }}>
          <p className="font-bold tracking-widest uppercase mb-2 text-center" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Common Questions</p>
          <h2 className="font-black text-[#0a2558] text-center mb-10" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Frequently Asked Questions</h2>
          <div className="flex flex-col gap-5">
            {faqs.map((f, i) => (
              <div key={i} className={`rounded-2xl p-6 anim-fade-up ${inView2 ? 'anim-in' : ''}`}
                style={{ background: '#fff', border: '1px solid #e8eef8', transitionDelay: `${i * 0.08}s` }}>
                <p className="font-black text-[#0a2558] mb-2" style={{ fontSize: '15px' }}>{f.q}</p>
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: '14px' }}>{f.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4" style={{ fontSize: '14.5px' }}>Still have questions? We're happy to help.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-white rounded-xl"
                style={{ padding: '12px 22px', fontSize: '13px', background: 'linear-gradient(135deg,#f97316,#ea580c)', textDecoration: 'none', boxShadow: '0 6px 18px rgba(249,115,22,0.32)' }}>
                Book a Ride Online
              </Link>
              <a href="tel:+12096848359" className="inline-flex items-center gap-2 font-bold rounded-xl"
                style={{ padding: '12px 22px', fontSize: '13px', background: '#fff', color: '#0a2558', border: '1.5px solid #dce8f8', textDecoration: 'none' }}>
                Call (209) 684-8359
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
