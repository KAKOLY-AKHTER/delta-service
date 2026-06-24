import { useState } from 'react'

const contacts = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/12096848359',
    bg: '#25D366',
    shadow: 'rgba(37,211,102,0.45)',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M11.998 2C6.474 2 2 6.476 2 12.001a9.949 9.949 0 0 0 1.404 5.142L2.003 22l4.978-1.378A9.945 9.945 0 0 0 12 22c5.523 0 10-4.477 10-10S17.521 2 11.998 2zm.002 18.168a8.163 8.163 0 0 1-4.158-1.134l-.298-.177-3.083.854.853-3.07-.194-.315A8.168 8.168 0 0 1 3.835 12C3.835 7.491 7.49 3.836 12 3.836c4.512 0 8.165 3.654 8.165 8.164 0 4.511-3.653 8.168-8.165 8.168z" />
      </svg>
    ),
  },
  {
    label: 'Call',
    href: 'tel:+12096848359',
    bg: '#0a2558',
    shadow: 'rgba(10,37,88,0.40)',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:info@dmctransport.us',
    bg: '#EA4335',
    shadow: 'rgba(234,67,53,0.40)',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '26px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      {/* Main toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Contact us"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: open ? '#64748b' : 'linear-gradient(135deg, #25D366, #1ebe5d)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: open
            ? '0 6px 20px rgba(100,116,139,0.35)'
            : '0 8px 24px rgba(37,211,102,0.50)',
          transition: 'background 0.25s, box-shadow 0.25s, transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M11.998 2C6.474 2 2 6.476 2 12.001a9.949 9.949 0 0 0 1.404 5.142L2.003 22l4.978-1.378A9.945 9.945 0 0 0 12 22c5.523 0 10-4.477 10-10S17.521 2 11.998 2zm.002 18.168a8.163 8.163 0 0 1-4.158-1.134l-.298-.177-3.083.854.853-3.07-.194-.315A8.168 8.168 0 0 1 3.835 12C3.835 7.491 7.49 3.836 12 3.836c4.512 0 8.165 3.654 8.165 8.164 0 4.511-3.653 8.168-8.165 8.168z" />
          </svg>
        )}
      </button>

      {/* Expandable icon column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '8px',
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.28s ease',
        }}
      >
        {contacts.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target={c.target || '_self'}
            rel={c.target === '_blank' ? 'noopener noreferrer' : undefined}
            aria-label={c.label}
            title={c.label}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: c.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 5px 16px ${c.shadow}`,
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              transitionDelay: open ? `${i * 0.04}s` : '0s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 10px 24px ${c.shadow}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = `0 5px 16px ${c.shadow}`
            }}
          >
            {c.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
