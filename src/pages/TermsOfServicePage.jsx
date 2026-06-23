import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'

const terms = [
  {
    num: '01',
    title: 'Acceptance of Terms',
    content: 'By accessing or using Delta Care Transport\'s services, website, or mobile application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and continued use of our services constitutes acceptance of the updated terms.',
  },
  {
    num: '02',
    title: 'Services Provided',
    content: 'Delta Care Transport provides non-medical transportation services including rides to medical appointments, dialysis centers, rehabilitation facilities, airports, and other destinations. We are not a medical transport service and do not provide medical care or emergency services. In the event of a medical emergency, please call 911 immediately.',
  },
  {
    num: '03',
    title: 'Booking & Scheduling',
    content: 'Bookings must be made in advance through our website, app, or by calling our dispatch. We require accurate pickup and drop-off information, as well as the passenger\'s name and contact number. We will make every effort to accommodate your schedule, but availability cannot be guaranteed, especially for last-minute requests.',
  },
  {
    num: '04',
    title: 'Cancellation Policy',
    content: 'Cancellations made at least 2 hours before the scheduled pickup time will not incur a cancellation fee. Late cancellations (less than 2 hours before pickup) or no-shows may be subject to a cancellation fee. Repeated no-shows may result in suspension of service. We reserve the right to cancel rides due to unsafe conditions or driver unavailability.',
  },
  {
    num: '05',
    title: 'Passenger Conduct',
    content: 'Passengers are expected to treat drivers and other passengers with respect. Behavior that is abusive, threatening, or disruptive will result in immediate termination of the ride and possible suspension of service. Passengers are responsible for the behavior of any companions traveling with them. No smoking, alcohol, or illegal substances are permitted in our vehicles.',
  },
  {
    num: '06',
    title: 'Payment Terms',
    content: 'Payment is due at the time of booking or as otherwise agreed. We accept major credit cards, debit cards, and approved payment methods. Prices are subject to change without prior notice. Additional fees may apply for wait time, tolls, or extra stops. All payments are processed securely through our payment provider.',
  },
  {
    num: '07',
    title: 'Limitation of Liability',
    content: 'Delta Care Transport shall not be liable for delays caused by traffic, weather, or other circumstances beyond our control. We are not responsible for lost or damaged personal belongings. Our liability for any claim arising from the use of our services is limited to the amount paid for the specific ride in question. We do not accept liability for indirect or consequential damages.',
  },
  {
    num: '08',
    title: 'Wheelchair & Accessibility',
    content: 'We offer wheelchair-accessible vehicles upon request, subject to availability. Passengers requiring accessibility accommodations should notify us at the time of booking. We reserve the right to deny service if the required vehicle type is unavailable. We strive to accommodate all passengers regardless of ability.',
  },
  {
    num: '09',
    title: 'Privacy',
    content: 'Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to the collection and use of your personal information as described in our Privacy Policy. We take the protection of your personal data seriously.',
  },
  {
    num: '10',
    title: 'Governing Law',
    content: 'These Terms of Service shall be governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts located in Atlanta, Georgia.',
  },
]

export default function TermsOfServicePage() {
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const [ref3, inView3] = useInView()

  return (
    <>
      <PageBanner
        title="Terms of Service"
        subtitle="Please read these terms carefully before using Delta Care Transport's services. By using our services, you agree to these terms."
      />

      {/* Last Updated */}
      <div style={{ background: '#f8faff', borderBottom: '1px solid #e8eef8', padding: '14px 20px' }}>
        <div className="mx-auto flex items-center justify-between flex-wrap gap-2" style={{ maxWidth: '1000px' }}>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            <span style={{ fontWeight: 700, color: '#0a2558' }}>Effective Date:</span> June 1, 2025
          </p>
          <div className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#64748b' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
            Currently in effect
          </div>
        </div>
      </div>

      {/* Intro */}
      <section ref={ref1} style={{ background: '#fff', padding: '70px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <div className={`anim-fade-up ${inView1 ? 'anim-in' : ''}`}>
            <p className="font-bold tracking-widest uppercase mb-3" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Legal Agreement</p>
            <h2 className="font-black text-[#0a2558] mb-5" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              Our Agreement With You
            </h2>
            <div className="rounded-2xl p-6 mb-8" style={{ background: 'linear-gradient(135deg,#fff8f5,#fff)', border: '1.5px solid #fed7aa' }}>
              <div className="flex items-start gap-4">
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg,#f97316,#ea580c)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="20" height="20">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                  </svg>
                </div>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '14.5px' }}>
                  These Terms of Service constitute a legally binding agreement between you and Delta Care Transport regarding your use of our transportation services. By booking a ride or creating an account, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>

            {/* Key points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '📋', title: '10 Key Terms', desc: 'Clear and straightforward conditions' },
                { icon: '⚖️', title: 'Georgia Law', desc: 'Governed by the State of Georgia' },
                { icon: '📞', title: 'Questions?', desc: 'Contact us anytime for clarification' },
              ].map((c) => (
                <div key={c.title} className="text-center rounded-2xl p-5" style={{ background: '#f8faff', border: '1.5px solid #e8eef8' }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{c.icon}</div>
                  <p className="font-black text-[#0a2558] mb-1" style={{ fontSize: '14px' }}>{c.title}</p>
                  <p className="text-gray-500" style={{ fontSize: '12.5px' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms List */}
      <section ref={ref2} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '70px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="flex flex-col gap-5">
            {terms.map((t, i) => (
              <div key={t.num} className={`rounded-2xl p-7 anim-fade-up ${inView2 ? 'anim-in' : ''}`}
                style={{ background: '#fff', border: '1.5px solid #e8eef8', transitionDelay: `${i * 0.05}s` }}>
                <div className="flex items-start gap-5">
                  <p className="font-black shrink-0 leading-none" style={{ fontSize: '38px', color: '#e8eef8', lineHeight: 1 }}>{t.num}</p>
                  <div className="pt-1">
                    <h3 className="font-black text-[#0a2558] mb-3" style={{ fontSize: '17px' }}>{t.title}</h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontSize: '14.5px' }}>{t.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ref3} style={{ background: '#fff', padding: '70px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <div className={`anim-fade-up ${inView3 ? 'anim-in' : ''}`}>
            <div className="rounded-3xl p-8 md:p-10 text-center" style={{ background: 'linear-gradient(135deg,#0a2558,#0d3070)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10">
                <p className="font-bold tracking-widest uppercase mb-3" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Need Help?</p>
                <h3 className="font-black text-white mb-4" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)' }}>
                  Have Questions About Our Terms?
                </h3>
                <p className="text-blue-200 mb-6 mx-auto leading-relaxed" style={{ fontSize: '14.5px', maxWidth: '480px' }}>
                  Our team is available 24/7 to answer any questions you have about our terms, services, or policies.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="tel:+14703367475"
                    style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', color: 'white', fontWeight: 800, fontSize: '13.5px', padding: '13px 28px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 6px 20px rgba(249,115,22,0.4)' }}>
                    Call (470) 336-7475
                  </a>
                  <Link to="/contact"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: '13.5px', padding: '13px 28px', borderRadius: '12px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
