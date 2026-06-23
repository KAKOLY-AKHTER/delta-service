import { useState } from 'react'
import useInView from '../hooks/useInView'

const faqs = [
  {
    q: 'What is non-medical transportation?',
    a: 'Non-medical transportation (NEMT) provides rides to and from medical appointments, therapy sessions, dialysis centers, and other health-related destinations — without requiring medical staff in the vehicle. We focus on comfort, safety, and reliability for every passenger.',
  },
  {
    q: 'How do I book a ride with Delta Care Transport?',
    a: 'You can book a ride by calling us directly, or by filling out our online booking form on this website. We recommend booking at least 24 hours in advance for scheduled appointments, though we do accommodate same-day requests based on availability.',
  },
  {
    q: 'What areas do you currently serve?',
    a: "We serve Lathrop and surrounding areas including Stockton, Manteca, Tracy, Modesto, Ripon, Lodi, Turlock, and more. Contact us if your location isn't listed — we may still be able to help.",
  },
  {
    q: 'Do you accept Medicaid or insurance?',
    a: 'We work with various Medicaid transportation programs and insurance plans. Please contact us directly with your insurance details so we can verify coverage and coordinate your rides accordingly.',
  },
  {
    q: 'Are your drivers trained and background-checked?',
    a: 'Absolutely. All Delta Care Transport drivers are fully licensed, professionally trained, and have passed thorough background checks. They are also trained in passenger assistance, ensuring a safe and respectful experience for every rider.',
  },
  {
    q: 'Can you accommodate wheelchair users?',
    a: 'Yes. We have wheelchair-accessible vehicles equipped with proper securing systems. When booking, simply let us know your accessibility requirements and we will assign the appropriate vehicle for your needs.',
  },
  {
    q: 'How far in advance should I schedule my ride?',
    a: 'We recommend scheduling 24–48 hours in advance to guarantee availability, especially for routine medical appointments. For urgent or same-day transportation needs, please call us and we will do our best to accommodate you.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We understand that plans can change, especially for medical appointments. Please notify us as soon as possible if you need to cancel or reschedule. Cancellations made at least 2 hours before your scheduled pickup are generally free of charge.',
  },
]

function Item({ faq, isOpen, onToggle }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: isOpen ? '1.5px solid #0a2558' : '1.5px solid #e8eef8',
        transition: 'border-color 0.25s',
        background: isOpen ? '#f8faff' : 'white',
      }}
    >
      <button
        className="w-full flex items-center justify-between text-left"
        style={{ padding: '16px 20px', gap: '12px' }}
        onClick={onToggle}
      >
        <span
          className="font-bold text-[#0a2558]"
          style={{ fontSize: '14px', lineHeight: '1.5' }}
        >
          {faq.q}
        </span>
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{
            width: '28px', height: '28px',
            background: isOpen ? '#0a2558' : '#f1f5f9',
            transition: 'background 0.25s',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? 'white' : '#0a2558'}
            strokeWidth="2.5"
            width="14"
            height="14"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <div style={{ padding: '0 20px 18px', borderTop: '1px solid #e8eef8' }}>
          <p className="text-gray-500 leading-relaxed" style={{ fontSize: '13.5px', paddingTop: '14px' }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const [ref, inView] = useInView()

  return (
    <section
      ref={ref}
      className="py-14 lg:py-20 px-5 md:px-10 lg:px-13 overflow-hidden"
      style={{ background: '#fff' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1100px' }}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left panel */}
          <div className={`lg:w-[38%] anim-fade-up ${inView ? 'anim-in' : ''}`}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
              style={{ background: '#fff4ec', border: '1px solid #fed7aa' }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
              <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">FAQ</span>
            </div>
            <h2
              className="font-black text-[#0a2558] leading-tight mb-4"
              style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}
            >
              Frequently Asked<br />
              <span style={{ color: '#f97316' }}>Questions</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8" style={{ fontSize: '14.5px', maxWidth: '360px' }}>
              Have a question? We've got answers. If you don't see what you're looking for, feel free to reach out directly.
            </p>

            {/* Contact CTA */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'linear-gradient(135deg, #0a2558, #0d3070)', boxShadow: '0 10px 30px rgba(10,37,88,0.2)' }}
            >
              <p className="text-white font-bold mb-1" style={{ fontSize: '15px' }}>Still have questions?</p>
              <p className="text-blue-200 mb-4" style={{ fontSize: '13px' }}>Our team is happy to help.</p>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{ width: '42px', height: '42px', background: '#f97316' }}
                >
                  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-200 text-[11px]">Call Us Anytime</p>
                  <p className="text-white font-black" style={{ fontSize: '14px' }}>(470) 336-7475</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="flex-1 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`anim-fade-up ${inView ? 'anim-in' : ''}`}
                style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
              >
                <Item
                  faq={faq}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
