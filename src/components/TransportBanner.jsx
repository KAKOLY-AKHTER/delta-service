import logo from '../assets/logo.png'
import useInView from '../hooks/useInView'

const features = [
  {
    label: 'On Time Every Time',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0d3b6e" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Safe & Dependable',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0d3b6e" strokeWidth="2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Compassionate Service',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0d3b6e" strokeWidth="2" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

const GAP = '3px'
const ROW1 = '320px'
const ROW2 = '260px'
const ROW3 = '220px'

export default function TransportBanner() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="overflow-hidden w-full">

      {/* ═══════════ DESKTOP GRID ═══════════ */}
      <div
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: `${ROW1} ${ROW2} ${ROW3}`,
          gap: GAP,
        }}
      >

        {/* ── R1C1+C2: Main hero image with text overlay ── */}
        <div
          className={`relative overflow-hidden anim-fade-left ${inView ? 'anim-in' : ''}`}
          style={{ gridColumn: 'span 2', gridRow: '1' }}
        >
          <img
            src="https://images.unsplash.com/photo-1576669801820-a9ab287ac2d0?w=1600&q=95"
            alt="Driver helping passenger"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
          {/* Navy gradient left overlay */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(13,38,71,0.96) 0%, rgba(13,38,71,0.88) 32%, rgba(13,38,71,0.45) 55%, transparent 75%)',
          }} />
          {/* Text */}
          <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: '36px 40px', maxWidth: '400px' }}>
            <h2 className="font-black text-white leading-tight" style={{ fontSize: '32px', lineHeight: 1.15 }}>
              Reliable<br />
              <span style={{ color: '#5bb3e8' }}>Non-Medical</span><br />
              Transportation
            </h2>
            <div style={{ width: '52px', height: '2px', background: '#5bb3e8', margin: '14px 0' }} />
            <p className="text-white font-semibold mb-2" style={{ fontSize: '14px' }}>Safe. Comfortable. On Time.</p>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '13px', lineHeight: 1.6 }}>
              We provide dependable rides so you can<br />focus on what matters most.
            </p>
          </div>
        </div>

        {/* ── R1C3: Delta Van ── */}
        <div
          className={`relative overflow-hidden anim-fade-right ${inView ? 'anim-in' : ''}`}
          style={{ gridColumn: '3', gridRow: '1', transitionDelay: '0.1s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=95"
            alt="Transport vehicle"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </div>

        {/* ── R2C1: Driver + passenger in car ── */}
        <div
          className={`relative overflow-hidden anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{ gridColumn: '1', gridRow: '2', transitionDelay: '0.15s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=95"
            alt="Passenger in transport vehicle"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </div>

        {/* ── R2C2: Feature list ── */}
        <div
          className={`flex flex-col justify-center gap-5 anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{
            gridColumn: '2', gridRow: '2',
            background: '#eef4fb',
            padding: '28px 32px',
            transitionDelay: '0.2s',
          }}
        >
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: '#daeaf7', border: '2px solid #b8d8ef' }}>
                {f.icon}
              </div>
              <span className="font-bold" style={{ color: '#0d2647', fontSize: '14px' }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* ── R2C3: Driver helping elderly man ── */}
        <div
          className={`relative overflow-hidden anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{ gridColumn: '3', gridRow: '2', transitionDelay: '0.25s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=1200&q=95"
            alt="Driver assisting passenger"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </div>

        {/* ── R3C1: Car with Delta logo ── */}
        <div
          className={`relative overflow-hidden anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{ gridColumn: '1', gridRow: '3', transitionDelay: '0.3s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=95"
            alt="Delta transport vehicle"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
          {/* Logo overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center"
              style={{ width: '90px', height: '90px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', padding: '6px' }}>
              <img src={logo} alt="Delta" style={{ width: '78px', height: '78px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        {/* ── R3C2: Walking to appointment ── */}
        <div
          className={`relative overflow-hidden anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{ gridColumn: '2', gridRow: '3', transitionDelay: '0.35s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=95"
            alt="Arriving at appointment"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(13,38,71,0.18)' }} />
        </div>

        {/* ── R3C3: We Drive. You Thrive. ── */}
        <div
          className={`flex flex-col items-center justify-center gap-3 anim-fade-up ${inView ? 'anim-in' : ''}`}
          style={{
            gridColumn: '3', gridRow: '3',
            background: '#eef4fb',
            padding: '28px',
            transitionDelay: '0.4s',
          }}
        >
          <svg viewBox="0 0 48 32" fill="#0d3b6e" className="w-12 h-8 mb-1">
            <circle cx="12" cy="10" r="6" opacity="0.5" />
            <circle cx="24" cy="8" r="7" />
            <circle cx="36" cy="10" r="6" opacity="0.5" />
            <path d="M0 28c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12" />
          </svg>
          <h3 className="font-black text-center" style={{ color: '#0d2647', fontSize: '20px', lineHeight: 1.2 }}>
            We Drive.<br />You Thrive.
          </h3>
          <div style={{ width: '40px', height: '2px', background: '#4199d4' }} />
          <p className="text-center" style={{ color: '#475569', fontSize: '12px', lineHeight: 1.6 }}>
            Rides for appointments, errands,<br />social events and more.
          </p>
        </div>

      </div>

      {/* ═══════════ MOBILE: stacked ═══════════ */}
      <div className="lg:hidden">
        {/* Main image with text */}
        <div className="relative overflow-hidden" style={{ height: '300px' }}>
          <img
            src="https://images.unsplash.com/photo-1576669801820-a9ab287ac2d0?w=1200&q=95"
            alt="Driver helping passenger"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(13,38,71,0.82)' }} />
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <h2 className="font-black text-white leading-tight mb-3" style={{ fontSize: '28px' }}>
              Reliable <span style={{ color: '#5bb3e8' }}>Non-Medical</span> Transportation
            </h2>
            <p className="text-white font-semibold text-sm mb-1">Safe. Comfortable. On Time.</p>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '13px' }}>
              We provide dependable rides so you can focus on what matters most.
            </p>
          </div>
        </div>

        {/* Feature list */}
        <div className="flex flex-col gap-4 px-6 py-8" style={{ background: '#eef4fb' }}>
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: '#daeaf7', border: '2px solid #b8d8ef' }}>
                {f.icon}
              </div>
              <span className="font-bold" style={{ color: '#0d2647', fontSize: '14px' }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* We Drive You Thrive */}
        <div className="flex flex-col items-center py-8 gap-3" style={{ background: '#eef4fb' }}>
          <h3 className="font-black text-center" style={{ color: '#0d2647', fontSize: '22px' }}>
            We Drive. You Thrive.
          </h3>
          <div style={{ width: '40px', height: '2px', background: '#4199d4' }} />
          <p className="text-center px-6" style={{ color: '#475569', fontSize: '13px', lineHeight: 1.6 }}>
            Rides for appointments, errands, social events and more.
          </p>
        </div>
      </div>

    </section>
  )
}
