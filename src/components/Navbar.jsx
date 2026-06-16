import { useState } from 'react'
import logo from '../assets/logo.png'

const navLinks = ['Home', 'About Us', 'Services', 'How It Works', 'Our Fleet', 'Contact Us']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className="relative z-50 nav-anim" style={{ background: '#f1f7fe' }}>
        <div className="flex items-center h-[76px] px-5 lg:px-[52px]">

          {/* Logo */}
          <div className="relative shrink-0 mr-6 lg:mr-10" style={{ width: '130px', height: '76px' }}>
            {/* Outer glow ring */}
            <div style={{
              position: 'absolute', top: '2px', left: '-4px', zIndex: 9,
              width: '132px', height: '132px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              opacity: 0.25,
            }} />
            <div style={{
              position: 'absolute', top: '6px', left: 0, zIndex: 10,
              width: '124px', height: '124px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 6px 32px rgba(10,37,88,0.22), 0 0 0 3px #f97316',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={logo}
                alt="Delta Medical Care Transport"
                style={{ width: '114px', height: '114px', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Nav links — desktop */}
          <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#" className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  link === 'Home'
                    ? 'text-orange-500 border-b-2 border-orange-500 pb-0.5'
                    : 'text-gray-700 hover:text-orange-500'
                }`}>{link}</a>
              </li>
            ))}
          </ul>

          {/* Phone — desktop */}
          <div className="ml-auto hidden lg:flex items-center gap-3">
            <div className="bg-orange-500 rounded-full p-2.5 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-600 leading-tight font-medium">24/7 Support</p>
              <p className="text-[18px] font-bold text-gray-900 leading-tight">(123) 456-7890</p>
            </div>
          </div>

          {/* Hamburger — mobile */}
          <button className="ml-auto lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2.5" className="w-6 h-6">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2.5" className="w-6 h-6">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden bg-white z-40 relative shadow-lg" style={{ borderTop: '2px solid #f97316' }}>
          <ul className="flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#" onClick={() => setOpen(false)}
                  className={`block px-6 py-3 text-sm font-semibold transition-colors ${
                    link === 'Home' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
                  }`}>
                  {link}
                </a>
              </li>
            ))}
            <li className="px-6 py-3 flex items-center gap-3" style={{ borderTop: '1px solid #f1f7fe' }}>
              <div className="bg-orange-500 rounded-full p-2 text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
                </svg>
              </div>
              <p className="font-bold text-gray-900 text-sm">(123) 456-7890</p>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
