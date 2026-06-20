import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'Home',         to: '/'             },
  { label: 'About Us',     to: '/about'        },
  { label: 'Services',     to: '/services'     },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Our Fleet',    to: '/fleet'        },
  { label: 'Contact Us',   to: '/contact'      },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [user, setUser]         = useState(null)
  const [dropdown, setDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }            = useLocation()
  const navigate                = useNavigate()
  const dropRef                 = useRef(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setDropdown(false)
    navigate('/')
  }

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to)

  const initials = user
    ? (user.displayName || user.email || '?')
        .split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    : ''

  return (
    <>
      <nav
        className="sticky top-0 z-50 nav-anim"
        style={{
          background: scrolled ? 'rgba(241,247,254,0.96)' : '#f1f7fe',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled ? '0 4px 28px rgba(10,37,88,0.10)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(10,37,88,0.05)' : 'none',
          transition: 'background 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease',
        }}
      >
        <div className="flex items-center h-[76px] px-5 lg:px-[52px]">

          {/* Logo */}
          <Link to="/" className="relative shrink-0 mr-6 lg:mr-10"
            style={{ width: '130px', height: '76px', display: 'block' }}>
            <div style={{
              position: 'absolute', top: '2px', left: '-4px', zIndex: 9,
              width: '132px', height: '132px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316, #ea580c)', opacity: 0.25,
            }} />
            <div style={{
              position: 'absolute', top: '6px', left: 0, zIndex: 10,
              width: '124px', height: '124px', borderRadius: '50%',
              background: 'white',
              boxShadow: '0 6px 32px rgba(10,37,88,0.22), 0 0 0 3px #f97316',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
              <img src={logo} alt="Delta Medical Care Transport"
                style={{ width: '114px', height: '114px', objectFit: 'contain' }} />
            </div>
          </Link>

          {/* Nav links — desktop */}
          <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
            {navLinks.map(({ label, to }) => {
              const active = isActive(to)
              return (
                <li key={to}>
                  <Link to={to}
                    className={`nav-link-anim text-sm font-medium transition-colors whitespace-nowrap${active ? ' nav-active' : ''}`}
                    style={{
                      color: active ? '#f97316' : '#374151',
                      paddingBottom: '2px', textDecoration: 'none',
                    }}>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right — desktop */}
          <div className="ml-auto hidden lg:flex items-center gap-4">

            {/* Phone */}
            <a href="tel:+14703367475" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
              <div className="bg-orange-500 rounded-full p-2 text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 leading-tight">24/7 Support</p>
                <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: '15px' }}>(470) 336-7475</p>
              </div>
            </a>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', background: '#d1dce8' }} />

            {/* Auth section */}
            {user ? (
              <div className="relative" ref={dropRef}>
                <button onClick={() => setDropdown(d => !d)}
                  className="flex items-center gap-2.5"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>

                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #f97316' }} />
                  ) : (
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#0a2558,#1e40af)', border: '2.5px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-white font-black" style={{ fontSize: '13px' }}>{initials}</span>
                    </div>
                  )}

                  <div className="text-left">
                    <p className="font-bold text-[#0a2558] leading-tight" style={{ fontSize: '13px' }}>
                      {user.displayName ? user.displayName.split(' ')[0] : 'My Account'}
                    </p>
                    <p className="text-gray-400 leading-tight" style={{ fontSize: '11px' }}>
                      {user.email?.length > 22 ? user.email.slice(0, 22) + '…' : user.email}
                    </p>
                  </div>

                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" width="14" height="14"
                    style={{ transform: dropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown */}
                {dropdown && (
                  <div className="absolute right-0 top-[calc(100%+10px)] rounded-xl overflow-hidden"
                    style={{ minWidth: '200px', background: 'white', boxShadow: '0 12px 40px rgba(10,37,88,0.15)', border: '1px solid #e8eef8', zIndex: 100 }}>

                    <div className="px-4 py-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <p className="font-bold text-[#0a2558]" style={{ fontSize: '13.5px' }}>
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-gray-400" style={{ fontSize: '11.5px' }}>{user.email}</p>
                    </div>

                    <div className="py-1.5">
                      <Link to="/dashboard" onClick={() => setDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5"
                        style={{ textDecoration: 'none', color: '#374151', fontSize: '13px' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15">
                          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        My Dashboard
                      </Link>
                      <Link to="/contact" onClick={() => setDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5"
                        style={{ textDecoration: 'none', color: '#374151', fontSize: '13px' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        Book a Ride
                      </Link>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9' }} className="py-1.5">
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '13px', textAlign: 'left' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="15" height="15">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login"
                  className="font-semibold"
                  style={{ fontSize: '13.5px', color: '#0a2558', textDecoration: 'none', padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #dce8f8', background: 'white' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a2558' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#dce8f8' }}>
                  Log In
                </Link>
                <Link to="/signup"
                  className="font-bold text-white"
                  style={{ fontSize: '13.5px', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 14px rgba(249,115,22,0.35)' }}>
                  Sign Up
                </Link>
              </>
            )}
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
        <div className="lg:hidden bg-white z-40 relative shadow-lg menu-slide-down" style={{ borderTop: '2px solid #f97316' }}>
          <ul className="flex flex-col py-3">
            {navLinks.map(({ label, to }) => {
              const active = isActive(to)
              return (
                <li key={to}>
                  <Link to={to} onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-sm font-semibold"
                    style={{ color: active ? '#f97316' : '#374151', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </li>
              )
            })}

            <li className="px-6 py-3 flex items-center gap-3" style={{ borderTop: '1px solid #f1f7fe' }}>
              <div className="bg-orange-500 rounded-full p-2 text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
                </svg>
              </div>
              <p className="font-bold text-gray-900 text-sm">(470) 336-7475</p>
            </li>

            {user ? (
              <li className="px-6 py-3" style={{ borderTop: '1px solid #f1f7fe' }}>
                <div className="flex items-center gap-3 mb-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f97316' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#0a2558,#1e40af)', border: '2px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="text-white font-black" style={{ fontSize: '14px' }}>{initials}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#0a2558]" style={{ fontSize: '13.5px' }}>{user.displayName || 'User'}</p>
                    <p className="text-gray-400" style={{ fontSize: '11.5px' }}>{user.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 mb-2"
                  style={{ background: '#e8eef8', color: '#0a2558', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}>
                  My Dashboard
                </Link>
                <button onClick={() => { handleLogout(); setOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5"
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="15" height="15">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                  Log Out
                </button>
              </li>
            ) : (
              <li className="px-6 py-3 flex gap-3" style={{ borderTop: '1px solid #f1f7fe' }}>
                <Link to="/login" onClick={() => setOpen(false)}
                  className="flex-1 text-center font-semibold rounded-lg py-2.5"
                  style={{ fontSize: '13.5px', color: '#0a2558', border: '1.5px solid #dce8f8', background: 'white', textDecoration: 'none' }}>
                  Log In
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}
                  className="flex-1 text-center font-bold text-white rounded-lg py-2.5"
                  style={{ fontSize: '13.5px', background: 'linear-gradient(135deg, #f97316, #ea580c)', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  )
}
