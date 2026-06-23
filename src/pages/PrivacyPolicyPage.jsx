import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Information We Collect',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    items: [
      'Full name, phone number, and email address when you register or book a ride.',
      'Pickup and drop-off locations to fulfill your transportation request.',
      'Payment information processed securely through our payment provider.',
      'Device information and usage data when you use our website or app.',
      'Communication history when you contact our support team.',
    ],
  },
  {
    title: 'How We Use Your Information',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    items: [
      'To schedule, confirm, and fulfill your transportation bookings.',
      'To communicate with you about your rides, account, and our services.',
      'To process payments and send receipts.',
      'To improve our services, website, and customer experience.',
      'To comply with legal obligations and protect our legal rights.',
    ],
  },
  {
    title: 'Information Sharing',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
    items: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'We may share information with drivers assigned to your ride for fulfillment purposes only.',
      'We may share data with service providers who help us operate our business (e.g., payment processors).',
      'We may disclose information when required by law or to protect our rights and safety.',
      'In the event of a business transfer, your information may be transferred as part of that transaction.',
    ],
  },
  {
    title: 'Data Security',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    items: [
      'We use industry-standard SSL encryption to protect data transmitted through our website.',
      'Access to personal information is restricted to authorized personnel only.',
      'We regularly review and update our security practices.',
      'We store your data on secure servers with access controls.',
      'Despite our best efforts, no method of transmission over the internet is 100% secure.',
    ],
  },
  {
    title: 'Your Rights',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    items: [
      'You may access and update your personal information at any time through your account.',
      'You may request deletion of your account and associated data by contacting us.',
      'You may opt out of marketing communications at any time.',
      'You may request a copy of the personal data we hold about you.',
      'You have the right to lodge a complaint with a supervisory authority.',
    ],
  },
  {
    title: 'Cookies',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    items: [
      'We use cookies to enhance your browsing experience on our website.',
      'Session cookies are deleted when you close your browser.',
      'Persistent cookies remain on your device to remember your preferences.',
      'You can control cookie settings through your browser preferences.',
      'Disabling cookies may affect the functionality of certain features.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const [ref3, inView3] = useInView()

  return (
    <>
      <PageBanner
        title="Privacy Policy"
        subtitle="Your privacy matters to us. Learn how Delta Care Transport collects, uses, and protects your personal information."
      />

      {/* Last Updated */}
      <div style={{ background: '#f8faff', borderBottom: '1px solid #e8eef8', padding: '14px 20px' }}>
        <div className="mx-auto flex items-center justify-between flex-wrap gap-2" style={{ maxWidth: '1000px' }}>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            <span style={{ fontWeight: 700, color: '#0a2558' }}>Last Updated:</span> June 1, 2025
          </p>
          <div className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#64748b' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
            This policy is current and up to date
          </div>
        </div>
      </div>

      {/* Intro */}
      <section ref={ref1} style={{ background: '#fff', padding: '70px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <div className={`anim-fade-up ${inView1 ? 'anim-in' : ''}`}>
            <p className="font-bold tracking-widest uppercase mb-3" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Our Commitment</p>
            <h2 className="font-black text-[#0a2558] mb-5" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              We Take Your Privacy Seriously
            </h2>
            <div className="rounded-2xl p-6 mb-8" style={{ background: 'linear-gradient(135deg, #f8faff, #fff)', border: '1.5px solid #e8eef8' }}>
              <p className="text-gray-600 leading-relaxed" style={{ fontSize: '15.5px' }}>
                Delta Care Transport ("we," "our," or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our transportation services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our services.
              </p>
            </div>

            {/* Quick summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🔒', title: 'Secure Storage', desc: 'Your data is encrypted and stored securely' },
                { icon: '🚫', title: 'Never Sold', desc: 'We never sell your data to third parties' },
                { icon: '✋', title: 'Your Control', desc: 'You can access, update, or delete your data anytime' },
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

      {/* Main Sections */}
      <section ref={ref2} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '70px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((s, i) => (
              <div key={s.title} className={`rounded-2xl p-7 anim-fade-up ${inView2 ? 'anim-in' : ''}`}
                style={{ background: '#fff', border: '1.5px solid #e8eef8', transitionDelay: `${i * 0.07}s` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 4px 12px rgba(249,115,22,0.3)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="18" height="18">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <h3 className="font-black text-[#0a2558]" style={{ fontSize: '16px' }}>{s.title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', marginTop: '7px', flexShrink: 0 }} />
                      <p className="text-gray-600 leading-relaxed" style={{ fontSize: '13.5px' }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + CTA */}
      <section ref={ref3} style={{ background: '#fff', padding: '70px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <div className={`anim-fade-up ${inView3 ? 'anim-in' : ''}`}>
            <div className="rounded-3xl p-8 md:p-10 text-center" style={{ background: 'linear-gradient(135deg,#0a2558,#0d3070)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10">
                <p className="font-bold tracking-widest uppercase mb-3" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Questions?</p>
                <h3 className="font-black text-white mb-4" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)' }}>
                  Contact Our Privacy Team
                </h3>
                <p className="text-blue-200 mb-6 mx-auto leading-relaxed" style={{ fontSize: '14.5px', maxWidth: '480px' }}>
                  If you have questions or concerns about this Privacy Policy or our data practices, please reach out to us.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="mailto:info@dmctransport.us"
                    style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', color: 'white', fontWeight: 800, fontSize: '13.5px', padding: '13px 28px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 6px 20px rgba(249,115,22,0.4)' }}>
                    Email Us
                  </a>
                  <Link to="/contact"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: '13.5px', padding: '13px 28px', borderRadius: '12px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                    Contact Page
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
