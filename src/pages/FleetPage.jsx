import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'
import deltaCar from '../assets/delta-car.png'
import deltaCar1 from '../assets/delta-car1.png'

const vehicles = [
  {
    img: deltaCar1,
    name: 'Delta Medical Transport Van',
    type: 'Wheelchair Accessible Van',
    badge: 'ADA COMPLIANT',
    badgeColor: '#f97316',
    about: 'Our fully accessible medical transport van is purpose-built for passengers who require wheelchair access, extra assistance, or specialized equipment. This vehicle meets all ADA requirements and is equipped for maximum passenger safety and comfort.',
    specs: [
      { label: 'Passenger Capacity', val: 'Up to 6 passengers' },
      { label: 'Wheelchair Access', val: 'Hydraulic lift & ramp' },
      { label: 'Restraint System', val: 'Certified 4-point tie-down' },
      { label: 'Climate Control', val: 'Full A/C & heating' },
      { label: 'Flooring', val: 'Anti-slip safety flooring' },
      { label: 'Compliance', val: 'ADA & DOT compliant' },
    ],
    features: ['Hydraulic wheelchair lift & ramp', 'Certified 4-point securing restraints', 'Extra headroom & interior space', 'Emergency equipment onboard', 'Rear-entry for easy boarding', 'Anti-slip safety flooring throughout'],
  },
  {
    img: deltaCar,
    name: 'Delta Care Comfort Minivan',
    type: 'Comfort & Group Minivan',
    badge: 'COMFORT CLASS',
    badgeColor: '#0a2558',
    about: 'Our spacious comfort minivan is ideal for passengers who need a reliable, comfortable ride to appointments, airports, or social events. With generous seating and cargo space, it handles groups and extra luggage with ease.',
    specs: [
      { label: 'Passenger Capacity', val: 'Up to 7 passengers' },
      { label: 'Luggage Space', val: 'Generous rear cargo area' },
      { label: 'Climate Control', val: 'Dual-zone A/C & heating' },
      { label: 'Seating', val: 'Captain-style individual seats' },
      { label: 'Entertainment', val: 'Quiet, smooth ride quality' },
      { label: 'Best For', val: 'Groups, families, airport runs' },
    ],
    features: ['Spacious captain-style seating', 'Dual-zone climate control', 'Generous cargo & luggage space', 'Smooth & quiet ride quality', 'Ideal for group or family trips', 'USB charging ports available'],
  },
]

const standards = [
  { title: 'Daily Pre-Trip Inspection', desc: 'Every vehicle is mechanically inspected by our driver before each trip — brakes, tires, lights, and safety equipment are checked without exception.' },
  { title: 'Regular Deep Cleaning', desc: 'Vehicles are professionally sanitized and deep-cleaned on a scheduled basis, maintaining a hygienic interior for every passenger.' },
  { title: 'Full Commercial Insurance', desc: 'All vehicles carry comprehensive commercial insurance coverage, giving every passenger complete protection on every ride.' },
  { title: 'GPS Monitoring', desc: 'Every vehicle is tracked in real time so our dispatch team can monitor routes, ensure punctuality, and respond quickly if needed.' },
  { title: 'Certified Mechanic Maintenance', desc: 'Routine maintenance and repairs are handled by licensed mechanics to keep every vehicle in peak working condition at all times.' },
  { title: 'DOT & ADA Compliance', desc: 'Our fleet is maintained to meet all Department of Transportation and ADA accessibility requirements for commercial passenger vehicles.' },
]

export default function FleetPage() {
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()

  return (
    <>
      <PageBanner title="Our Fleet" subtitle="Every vehicle is clean, safe, and fully prepared before it carries a single passenger." />

      {/* Intro */}
      <section style={{ background: '#fff', padding: '64px 20px 48px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto text-center" style={{ maxWidth: '680px' }}>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: '16px' }}>
            Our fleet is purpose-selected to meet the needs of our passengers — from wheelchair accessibility to group comfort. Each vehicle undergoes strict safety checks and is maintained to the highest standards before every trip.
          </p>
          <div style={{ width: '60px', height: '3px', background: '#f97316', borderRadius: '2px', margin: '28px auto 0' }} />
        </div>
      </section>

      {/* Vehicles */}
      <section ref={ref1} style={{ background: '#fff', padding: '20px 20px 80px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto flex flex-col gap-10" style={{ maxWidth: '1100px' }}>
          {vehicles.map((v, i) => (
            <div key={v.name}
              className={`rounded-3xl overflow-hidden anim-fade-up ${inView1 ? 'anim-in' : ''}`}
              style={{
                transitionDelay: `${0.1 + i * 0.14}s`,
                border: v.badgeColor === '#f97316' ? '2px solid #fed7aa' : '1.5px solid #dce8f8',
                boxShadow: v.badgeColor === '#f97316' ? '0 12px 40px rgba(249,115,22,0.1)' : '0 8px 32px rgba(10,37,88,0.07)',
              }}>
              <div className="flex flex-col lg:flex-row">

                {/* Image */}
                <div className="relative lg:w-2/5 shrink-0 overflow-hidden" style={{ minHeight: '300px', background: '#eef2f9' }}>
                  <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', position: 'absolute', inset: 0, padding: '16px 16px 60px' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,37,88,0.55) 0%, transparent 45%)' }} />
                  <div className="absolute top-5 left-5 rounded-full font-black tracking-widest"
                    style={{ background: v.badgeColor, color: 'white', padding: '5px 14px', fontSize: '9.5px', letterSpacing: '0.08em' }}>
                    {v.badge}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-black" style={{ fontSize: '18px' }}>{v.name}</p>
                    <p className="text-blue-200" style={{ fontSize: '12.5px' }}>{v.type}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-7 lg:p-9">
                  <p className="text-gray-600 leading-relaxed mb-6" style={{ fontSize: '14.5px' }}>{v.about}</p>

                  {/* Specs table */}
                  <p className="font-black text-[#0a2558] mb-3" style={{ fontSize: '13px', letterSpacing: '0.04em' }}>VEHICLE SPECIFICATIONS</p>
                  <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid #e8eef8' }}>
                    {v.specs.map((sp, j) => (
                      <div key={sp.label} className="flex items-center gap-4 px-5 py-2.5"
                        style={{ background: j % 2 === 0 ? '#f8faff' : '#fff', borderTop: j > 0 ? '1px solid #f0f4fb' : 'none' }}>
                        <span className="font-semibold text-[#0a2558] shrink-0" style={{ fontSize: '12.5px', minWidth: '160px' }}>{sp.label}</span>
                        <span className="text-gray-500" style={{ fontSize: '12.5px' }}>{sp.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <p className="font-black text-[#0a2558] mb-3" style={{ fontSize: '13px', letterSpacing: '0.04em' }}>KEY FEATURES</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
                    {v.features.map(f => (
                      <div key={f} className="flex items-center gap-2.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke={v.badgeColor} strokeWidth="2.5" width="13" height="13">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span className="text-gray-600" style={{ fontSize: '13px' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact"
                    className="inline-flex items-center gap-2 font-bold text-white rounded-xl"
                    style={{
                      padding: '12px 22px', fontSize: '13px', textDecoration: 'none',
                      background: v.badgeColor === '#f97316' ? 'linear-gradient(135deg,#f97316,#ea580c)' : '#0a2558',
                      boxShadow: v.badgeColor === '#f97316' ? '0 6px 18px rgba(249,115,22,0.32)' : '0 6px 18px rgba(10,37,88,0.2)',
                    }}>
                    Book This Vehicle
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="13" height="13">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Standards */}
      <section ref={ref2} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <p className="font-bold tracking-widest uppercase mb-2 text-center" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Fleet Safety</p>
          <h2 className="font-black text-[#0a2558] text-center mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Our Safety Standards</h2>
          <p className="text-gray-500 text-center mx-auto mb-10" style={{ fontSize: '14.5px', maxWidth: '520px' }}>
            Every vehicle in our fleet must meet these standards before it carries any passenger.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standards.map((item, i) => (
              <div key={item.title}
                className={`rounded-2xl p-6 anim-fade-up ${inView2 ? 'anim-in' : ''}`}
                style={{ background: '#fff', border: '1px solid #e8eef8', transitionDelay: `${0.06 + i * 0.08}s` }}>
                <div style={{ width: '32px', height: '3px', background: i % 2 === 0 ? '#f97316' : '#0a2558', borderRadius: '2px', marginBottom: '16px' }} />
                <p className="font-black text-[#0a2558] mb-2" style={{ fontSize: '14.5px' }}>{item.title}</p>
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: '13px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
