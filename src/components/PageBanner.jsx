import { Link } from 'react-router-dom'

export default function PageBanner({ title, subtitle }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a2558 0%, #0d3070 60%, #0a2558 100%)',
        padding: '64px 20px 56px',
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Orange accent line */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '4px', background: 'linear-gradient(to bottom, #f97316, #ea580c)' }}
      />

      <div className="relative z-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 mb-4" style={{ fontSize: '13px' }}>
          <Link
            to="/"
            className="font-semibold transition-colors"
            style={{ color: '#f97316', textDecoration: 'none' }}
          >
            Home
          </Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" width="14" height="14">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{title}</span>
        </div>

        {/* Title */}
        <h1
          className="font-black text-white leading-tight"
          style={{ fontSize: 'clamp(30px, 5vw, 52px)' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="text-blue-200 mt-3 mx-auto" style={{ fontSize: '15px', maxWidth: '480px' }}>
            {subtitle}
          </p>
        )}

        {/* Orange underline */}
        <div
          className="mx-auto mt-5 rounded-full"
          style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #f97316, #ea580c)' }}
        />
      </div>
    </section>
  )
}
