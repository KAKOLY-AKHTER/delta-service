import heroImg from '../assets/hero.png'

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '545px', background: '#f1f7fe' }}>

      {/* ── Background photo ── */}
      <img
        src={heroImg}
        alt="Delta Care Transport"
        className="absolute inset-0 w-full h-full hero-anim"
        style={{ objectFit: 'cover', objectPosition: '65% 28%', animationDelay: '0.1s' }}
      />

      {/* ── Gradient: white left → transparent right ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #f1f7fe 0%, #f1f7fe 14%, rgba(241,247,254,0.60) 22%, rgba(241,247,254,0.0) 32%, transparent 32%)',
        }}
      />

      {/* ── Text content ── */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{
          maxWidth: '510px',
          minHeight: '545px',
          paddingLeft: '52px',
          paddingRight: '28px',
          paddingTop: '96px',
          paddingBottom: '52px',
        }}
      >
        <p className="text-orange-500 font-bold text-[13px] tracking-[0.18em] uppercase mb-5 hero-anim"
          style={{ animationDelay: '0.2s' }}>
          Non-Medical Transportation Services
        </p>

        <h1 className="font-black leading-[1.06] text-[#0a2558] hero-anim" style={{ fontSize: '52px', animationDelay: '0.35s' }}>
          Safe Rides.
        </h1>
        <h1 className="font-black leading-[1.06] text-[#0a2558] mb-3 hero-anim" style={{ fontSize: '52px', animationDelay: '0.45s' }}>
          Reliable Care.
        </h1>

        <p
          className="text-orange-500 leading-tight mb-4 hero-anim"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            fontSize: '40px',
            animationDelay: '0.55s',
          }}
        >
          We'll Take You There.
        </p>

        <div className="w-10 bg-orange-500 rounded mb-7 hero-anim" style={{ height: '3px', animationDelay: '0.65s' }} />

        <p className="text-gray-700 leading-relaxed mb-9 hero-anim" style={{ fontSize: '16px', maxWidth: '340px', animationDelay: '0.72s' }}>
          Delta Care Transport provides safe, reliable and comfortable non-medical
          transportation for your everyday travel needs.
        </p>

        <div className="flex gap-4 hero-anim" style={{ animationDelay: '0.82s' }}>
          <button className="flex items-center gap-2.5 bg-[#0a2558] text-white rounded-md font-bold tracking-widest hover:bg-[#0d3070] transition-colors"
            style={{ padding: '14px 28px', fontSize: '13px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            BOOK A RIDE
          </button>
          <button className="flex items-center gap-2.5 border-2 border-[#0a2558] text-[#0a2558] rounded-md font-bold tracking-widest hover:bg-gray-50 transition-colors"
            style={{ padding: '14px 28px', fontSize: '13px' }}>
            <svg viewBox="0 0 24 24" fill="#f97316" className="w-4 h-4">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
            </svg>
            CALL NOW
          </button>
        </div>
      </div>

    </section>
  )
}
