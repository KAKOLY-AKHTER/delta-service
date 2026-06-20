import PageBanner from '../components/PageBanner'
import useInView from '../hooks/useInView'
import CountUp from '../components/CountUp'
import deltaService from '../assets/delta-service.png'

const values = [
  { num: '01', title: 'Safety First', desc: 'Every vehicle is inspected before each trip. Our drivers are background-checked, trained, and fully licensed to operate commercial passenger vehicles.' },
  { num: '02', title: 'Punctuality', desc: 'We show up on time, every time. Your schedule matters — late pickups are simply not acceptable to us, and we take this commitment seriously.' },
  { num: '03', title: 'Compassionate Care', desc: 'We treat every passenger with dignity and genuine respect. Many of our riders depend on us daily, and we take that responsibility to heart.' },
  { num: '04', title: 'Community Focus', desc: 'Proudly serving Metro Atlanta and its communities — we are not just a service, we are your neighbors and advocates for accessible transportation.' },
]

const stats = [
  { val: '5+', label: 'Years in Service', desc: 'Proudly operating since 2019' },
  { val: '10K+', label: 'Rides Completed', desc: 'Across Metro Atlanta' },
  { val: '500+', label: 'Regular Clients', desc: 'Who trust us every week' },
  { val: '4.9★', label: 'Average Rating', desc: 'From verified passengers' },
]

export default function AboutPage() {
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const [ref3, inView3] = useInView()

  return (
    <>
      <PageBanner title="About Us" subtitle="More than a transportation company — a trusted partner for those who need it most." />

      {/* ── Our Story ── */}
      <section ref={ref1} style={{ background: '#fff', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto flex flex-col lg:flex-row gap-14 items-center" style={{ maxWidth: '1100px' }}>

          <div className={`lg:w-[46%] anim-fade-up ${inView1 ? 'anim-in' : ''}`}>
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '440px', boxShadow: '0 24px 64px rgba(10,37,88,0.14)' }}>
              <img src={deltaService} alt="Delta Care Transport" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,37,88,0.55) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-black" style={{ fontSize: '18px' }}>Delta Care Transport</p>
                <p className="text-blue-200" style={{ fontSize: '13px' }}>Serving Metro Atlanta, Georgia — Since 2019</p>
              </div>
            </div>
          </div>

          <div className={`flex-1 anim-fade-up ${inView1 ? 'anim-in' : ''}`} style={{ transitionDelay: '0.12s' }}>
            <p className="font-bold tracking-widest uppercase mb-3" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>Our Story</p>
            <h2 className="font-black text-[#0a2558] leading-tight mb-6" style={{ fontSize: 'clamp(28px, 3.8vw, 44px)' }}>
              Built on Trust,<br />Driven by Purpose
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4" style={{ fontSize: '15.5px' }}>
              Delta Care Transport was founded with one mission: ensure that no one misses an important appointment or life event due to a lack of reliable transportation. We specialize in non-medical transportation — providing safe, punctual, and compassionate rides to medical appointments, dialysis centers, therapy sessions, airports, and more.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6" style={{ fontSize: '15.5px' }}>
              Based in Metro Atlanta, Georgia, we proudly serve seniors, individuals with disabilities, and anyone who needs dependable transportation. Our drivers are more than just drivers — they are trained, caring professionals who treat every passenger with dignity and respect.
            </p>
            <div style={{ borderTop: '2px solid #f0f4fb', paddingTop: '24px' }}>
              <p className="font-semibold text-[#0a2558] mb-3" style={{ fontSize: '13.5px' }}>What sets us apart:</p>
              <div className="flex flex-col gap-2">
                {['Licensed, insured & fully compliant', 'All drivers background-checked & trained', 'Wheelchair-accessible vehicles available', 'Available 24/7 for scheduling & support'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                    <span className="text-gray-600" style={{ fontSize: '14px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={ref2} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', borderBottom: '1px solid #e8eef8', padding: '60px 20px' }}
        className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8" style={{ maxWidth: '1000px' }}>
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center anim-fade-up ${inView2 ? 'anim-in' : ''}`} style={{ transitionDelay: `${i * 0.09}s` }}>
              <p className="font-black" style={{ fontSize: 'clamp(38px, 5vw, 56px)', color: '#0a2558', lineHeight: 1 }}><CountUp value={s.val} inView={inView2} /></p>
              <p className="font-bold text-[#0a2558] mt-1" style={{ fontSize: '14px' }}>{s.label}</p>
              <p className="text-gray-400 mt-0.5" style={{ fontSize: '12px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section style={{ background: '#fff', padding: '80px 20px' }} className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                label: 'Our Mission',
                color: '#f97316',
                text: 'To provide safe, reliable, and compassionate non-medical transportation that empowers individuals to access the healthcare and services they need — without barriers, without stress, and without compromise.',
              },
              {
                label: 'Our Vision',
                color: '#0a2558',
                text: "To be the most trusted non-medical transportation provider in Georgia — recognized for our consistency, care, and commitment to every passenger's wellbeing and independence.",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl p-8"
                style={{ background: '#f8faff', border: '1.5px solid #e8eef8' }}>
                <div style={{ width: '40px', height: '4px', background: item.color, borderRadius: '2px', marginBottom: '20px' }} />
                <p className="font-black text-[#0a2558] mb-3" style={{ fontSize: '20px' }}>{item.label}</p>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: '15px' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section ref={ref3} style={{ background: '#f8faff', borderTop: '1px solid #e8eef8', padding: '80px 20px' }}
        className="px-5 md:px-10 lg:px-[52px]">
        <div className="mx-auto" style={{ maxWidth: '1000px' }}>
          <p className="font-bold tracking-widest uppercase mb-2 text-center" style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.16em' }}>What We Stand For</p>
          <h2 className="font-black text-[#0a2558] text-center mb-12" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={v.title}
                className={`flex gap-5 anim-fade-up ${inView3 ? 'anim-in' : ''}`}
                style={{ transitionDelay: `${0.07 + i * 0.09}s` }}>
                <p className="font-black shrink-0 leading-none" style={{ fontSize: '40px', color: '#e8eef8', lineHeight: 1 }}>{v.num}</p>
                <div className="pt-1">
                  <p className="font-black text-[#0a2558] mb-1.5" style={{ fontSize: '16px' }}>{v.title}</p>
                  <p className="text-gray-500 leading-relaxed" style={{ fontSize: '14px' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
