import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { onAuthStateChanged, signOut, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { auth } from '../firebase'
import {
  getBookings, addBooking, updateBooking, cancelBooking, rateBooking,
  getNotifications, markNotifRead, markAllNotifsRead, seedNotifications,
  saveProfile, getProfile,
  getSettings, saveSettings,
  getPayments, addTicket,
} from '../services/firestoreService'
import logo from '../assets/logo.png'



const STATUS_STYLE = {
  Confirmed: { bg:'#dcfce7', color:'#15803d', dot:'#22c55e' },
  Pending:   { bg:'#fef9c3', color:'#a16207', dot:'#eab308' },
  Completed: { bg:'#dbeafe', color:'#1d4ed8', dot:'#3b82f6' },
  Cancelled: { bg:'#fee2e2', color:'#b91c1c', dot:'#ef4444' },
}

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { key:'overview',      label:'Overview',          icon:'grid'     },
      { key:'book',          label:'Book a Ride',       icon:'clock'    },
      { key:'bookings',      label:'My Bookings',       icon:'calendar' },
      { key:'notifications', label:'Notifications',     icon:'bell'     },
    ]
  },
  {
    label: 'History & Finance',
    items: [
      { key:'history',       label:'Ride History',      icon:'history'  },
      { key:'payments',      label:'Payment History',   icon:'card'     },
    ]
  },
  {
    label: 'Account',
    items: [
      { key:'profile',       label:'My Profile',        icon:'user'     },
      { key:'support',       label:'Support',           icon:'help'     },
      { key:'settings',      label:'Account Settings',  icon:'settings' },
    ]
  },
]

const NAV = NAV_GROUPS.flatMap(g => g.items)

function NavIcon({ type, active }) {
  const c = active ? '#f97316' : 'rgba(255,255,255,0.4)'
  const icons = {
    grid:     <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    clock:    <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    history:  <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>,
    heart:    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    card:     <><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></>,
    user:     <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    help:     <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></>,
    bell:     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>,
    map:      <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    stats:    <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    tag:      <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    shield:   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    family:   <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    gift:     <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" width="18" height="18">{icons[type]}</svg>
}

/* ── Main component ── */
export default function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser]                   = useState(null)
  const [loading, setLoading]             = useState(true)
  const [dataLoading, setDataLoading]     = useState(true)
  const [active, setActive]               = useState('overview')
  const [sidebar, setSidebar]             = useState(false)
  const [bookings, setBookings]           = useState([])
  const [notifs, setNotifs]               = useState([])
  const [payments, setPayments]           = useState([])
  const [settings, setSettings]           = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async u => {
      if (!u) { navigate('/login'); return }
      setUser(u)
      setLoading(false)
      saveProfile(u.uid, { email: u.email || '', displayName: u.displayName || '' })
      try {
        await seedNotifications(u.uid)
        const [b, n, pay, setts] = await Promise.all([
          getBookings(u.uid),
          getNotifications(u.uid),
          getPayments(u.uid),
          getSettings(u.uid),
        ])
        setBookings(b); setNotifs(n)
        setPayments(pay); setSettings(setts)
      } catch (e) {
        console.error('Firestore load error:', e)
      } finally {
        setDataLoading(false)
      }
    })
    return () => unsub()
  }, [navigate])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'linear-gradient(135deg,#0b1a3d,#0a2558)' }}>
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background:'white', boxShadow:'0 8px 32px rgba(249,115,22,0.3)', border:'2px solid #f97316' }}>
          <img src={logo} alt="Delta" style={{ width:'40px', objectFit:'contain' }} />
        </div>
        <div style={{ width:'36px', height:'36px', borderRadius:'50%', border:'3px solid rgba(255,255,255,0.1)', borderTop:'3px solid #f97316', animation:'spin 0.8s linear infinite', margin:'0 auto' }} />
      </div>
    </div>
  )

  const initials = (user.displayName || user.email || '?').split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()
  const unread   = notifs.filter(n => !n.read).length
  const upcoming = bookings.filter(b => b.status==='Confirmed' || b.status==='Pending')

  const goTo = (key) => { setActive(key); setSidebar(false) }

  return (
    <div className="min-h-screen flex" style={{ background:'linear-gradient(160deg,#eef2ff 0%,#f5f8ff 50%,#fff8f5 100%)' }}>

      {/* Sidebar overlay (mobile) */}
      {sidebar && <div className="fixed inset-0 z-40 lg:hidden" style={{ background:'rgba(5,15,40,0.55)', backdropFilter:'blur(4px)' }} onClick={() => setSidebar(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ${sidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}
        style={{ width:'264px', minWidth:'264px', background:'linear-gradient(175deg,#0b1a3d 0%,#0a2558 50%,#0d2870 100%)', flexShrink:0, boxShadow:'4px 0 32px rgba(5,15,50,0.25)' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:'white', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 0 2px #f97316, 0 4px 16px rgba(249,115,22,0.3)', flexShrink:0 }}>
            <img src={logo} alt="Delta" style={{ width:'36px', objectFit:'contain' }} />
          </div>
          <div>
            <p className="text-white font-black" style={{ fontSize:'14px', lineHeight:1.2, letterSpacing:'-0.01em' }}>Delta Care</p>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'11px', letterSpacing:'0.02em' }}>Transport Services</p>
          </div>
          <button className="ml-auto lg:hidden p-1.5 rounded-lg" onClick={() => setSidebar(false)}
            style={{ background:'rgba(255,255,255,0.08)', border:'none', cursor:'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* User card */}
        <div className="mx-4 my-4 rounded-2xl p-3.5 flex items-center gap-3"
          style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(8px)' }}>
          {user.photoURL
            ? <img src={user.photoURL} alt="avatar" style={{ width:'42px', height:'42px', borderRadius:'12px', objectFit:'cover', border:'2px solid #f97316', flexShrink:0 }} />
            : <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'linear-gradient(135deg,#f97316,#dc2626)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 12px rgba(249,115,22,0.4)' }}>
                <span className="text-white font-black" style={{ fontSize:'15px' }}>{initials}</span>
              </div>
          }
          <div className="overflow-hidden flex-1">
            <p className="text-white font-bold truncate" style={{ fontSize:'13px', letterSpacing:'-0.01em' }}>{user.displayName || 'User'}</p>
            <p className="truncate" style={{ color:'rgba(255,255,255,0.35)', fontSize:'11px' }}>{user.email}</p>
          </div>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22c55e', flexShrink:0, boxShadow:'0 0 0 2px rgba(34,197,94,0.25)' }} />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 flex flex-col overflow-y-auto pb-2" style={{ gap:'2px' }}>
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 pt-5 pb-2 font-black uppercase"
                style={{ fontSize:'9px', color:'rgba(255,255,255,0.2)', letterSpacing:'0.15em' }}>
                {group.label}
              </p>
              {group.items.map(({ key, label, icon }) => {
                const isA = active === key
                return (
                  <button key={key} onClick={() => goTo(key)}
                    className={`dash-nav-btn w-full flex items-center gap-3 py-2.5 text-left ${isA ? 'dash-nav-active' : ''}`}
                    style={{
                      background: isA ? 'linear-gradient(90deg,rgba(249,115,22,0.2),rgba(249,115,22,0.06))' : 'transparent',
                      color: isA ? '#fb923c' : 'rgba(255,255,255,0.55)',
                      border: 'none',
                      borderLeft: isA ? '3px solid #f97316' : '3px solid transparent',
                      borderRadius: isA ? '0 12px 12px 0' : '12px',
                      paddingLeft: '14px', paddingRight: '12px',
                      fontSize:'13px', fontWeight: isA ? 700 : 500,
                      cursor:'pointer', marginBottom:'1px',
                    }}>
                    <NavIcon type={icon} active={isA} />
                    {label}
                    {key === 'notifications' && unread > 0 && (
                      <span className="notif-badge ml-auto text-white font-black rounded-full flex items-center justify-center"
                        style={{ minWidth:'19px', height:'19px', background:'linear-gradient(135deg,#f97316,#ea580c)', fontSize:'10px', padding:'0 5px', boxShadow:'0 2px 8px rgba(249,115,22,0.5)' }}>
                        {unread}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5" style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'14px', marginTop:'4px' }}>
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1"
            style={{ textDecoration:'none', color:'rgba(255,255,255,0.45)', fontSize:'13px', fontWeight:500, transition:'all 0.15s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.color='white';e.currentTarget.style.background='rgba(255,255,255,0.08)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.45)';e.currentTarget.style.background='transparent'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
            Back to Website
          </Link>
          <button onClick={async () => { await signOut(auth); navigate('/') }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left"
            style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(239,68,68,0.6)', fontSize:'13px', fontWeight:500, transition:'all 0.15s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.color='#ef4444';e.currentTarget.style.background='rgba(239,68,68,0.08)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(239,68,68,0.6)';e.currentTarget.style.background='none'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="flex items-center gap-4 px-5 lg:px-8 h-16 sticky top-0 z-30"
          style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', borderBottom:'1px solid rgba(232,238,248,0.8)', boxShadow:'0 2px 20px rgba(10,37,88,0.06)' }}>
          <button className="lg:hidden p-2 rounded-lg" onClick={() => setSidebar(true)}
            style={{ background:'#f1f7fe', border:'none', cursor:'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2.5" width="20" height="20"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <div>
            <p className="font-black text-[#0a2558]" style={{ fontSize:'16px', lineHeight:1.2 }}>{NAV.find(n=>n.key===active)?.label}</p>
            <p className="text-gray-400" style={{ fontSize:'12px' }}>{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => goTo('notifications')} className="relative p-2 rounded-lg" style={{ background:'#f1f7fe', border:'none', cursor:'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2" width="18" height="18"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-black" style={{ background:'#f97316', fontSize:'9px' }}>{unread}</span>}
            </button>
            <button onClick={() => goTo('book')} className="dash-btn-primary hidden sm:flex items-center gap-2 font-bold text-white rounded-xl px-4 py-2.5"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'13px', boxShadow:'0 4px 16px rgba(249,115,22,0.35)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="14" height="14"><path d="M12 5v14M5 12h14"/></svg>
              Book a Ride
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8 overflow-y-auto">
          {dataLoading && (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" width="32" height="32">
                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/>
              </svg>
            </div>
          )}
          {!dataLoading && <>
            {active === 'overview'      && <OverviewSection user={user} bookings={bookings} upcoming={upcoming} goTo={goTo} />}
            {active === 'bookings'      && <BookingsSection bookings={bookings} setBookings={setBookings} uid={user.uid} />}
            {active === 'book'          && <BookRideSection uid={user.uid} userEmail={user.email} userName={user.displayName||''} setBookings={setBookings} />}
            {active === 'history'       && <HistorySection bookings={bookings} setBookings={setBookings} uid={user.uid} />}
            {active === 'payments'      && <PaymentsSection payments={payments} />}
            {active === 'profile'       && <ProfileSection user={user} setUser={setUser} />}
            {active === 'support'       && <SupportSection user={user} />}
            {active === 'notifications' && <NotificationsSection notifs={notifs} setNotifs={setNotifs} uid={user.uid} />}
            {active === 'settings'      && <SettingsSection user={user} settings={settings} setSettings={setSettings} />}
          </>}
        </main>
      </div>
    </div>
  )
}

/* ── Shared components ── */
function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || { bg:'#f1f5f9', color:'#64748b', dot:'#94a3b8' }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold" style={{ background:s.bg, color:s.color, fontSize:'11.5px', letterSpacing:'0.01em', boxShadow:`0 1px 4px ${s.dot}30` }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:s.dot, flexShrink:0, boxShadow:`0 0 4px ${s.dot}` }} />{status}
    </span>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`dash-card rounded-2xl ${className}`}
      style={{ background:'white', border:'1px solid #eaeff8', boxShadow:'0 2px 16px rgba(10,37,88,0.06), 0 1px 4px rgba(0,0,0,0.02)' }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div style={{ width:'4px', height:'22px', background:'linear-gradient(180deg,#f97316,#ea580c)', borderRadius:'3px', boxShadow:'0 2px 8px rgba(249,115,22,0.4)' }} />
      <p className="font-black text-[#0a2558]" style={{ fontSize:'15px', letterSpacing:'-0.01em' }}>{children}</p>
    </div>
  )
}

function EmptyState({ emoji, label }) {
  return (
    <div className="text-center py-16 rounded-2xl" style={{ background:'linear-gradient(135deg,#f8faff,#fff8f5)', border:'1.5px dashed #dde6f5' }}>
      <div className="text-5xl mb-4" style={{ filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{emoji}</div>
      <p className="font-semibold text-gray-400" style={{ fontSize:'14px' }}>{label}</p>
    </div>
  )
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4"
      style={{ background:'rgba(5,15,50,0.5)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}
      onClick={onClose}>
      <div className="w-full rounded-2xl overflow-hidden" style={{ maxWidth:'480px', background:'white', boxShadow:'0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.8)', animation:'dashScaleIn 0.2s ease both' }} onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom:'1px solid #f1f5f9', background:'linear-gradient(135deg,#f8faff,#ffffff)' }}>
          <p className="font-black text-[#0a2558]" style={{ fontSize:'16px', letterSpacing:'-0.01em' }}>{title}</p>
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ background:'#f1f5f9', border:'none', cursor:'pointer', color:'#64748b', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.background='#fee2e2';e.currentTarget.style.color='#ef4444'}}
            onMouseLeave={e=>{e.currentTarget.style.background='#f1f5f9';e.currentTarget.style.color='#64748b'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button" onClick={() => onChange && onChange(s)}
          style={{ background:'none', border:'none', cursor: onChange ? 'pointer' : 'default', padding:'2px', fontSize:'24px', color: s <= value ? '#f97316' : '#e2e8f0', transition:'color 0.1s' }}>
          ★
        </button>
      ))}
    </div>
  )
}

const INP = { width:'100%', borderRadius:'10px', padding:'11px 14px', fontSize:'14px', color:'#1e293b', border:'1.5px solid #e2e8f0', background:'white', outline:'none', transition:'border-color 0.2s' }
const focus = e => e.target.style.borderColor = '#f97316'
const blur  = e => e.target.style.borderColor = '#e2e8f0'

function timeAgo(createdAt) {
  if (!createdAt) return ''
  const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt)
  if (isNaN(date)) return ''
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs} hour${hrs > 1 ? 's' : ''} ago`
  const days = Math.floor(hrs / 24)
  if (days < 7)  return `${days} day${days > 1 ? 's' : ''} ago`
  return date.toLocaleDateString('en-US', { month:'short', day:'numeric' })
}

/* ── OVERVIEW ── */
function OverviewSection({ user, bookings, upcoming, goTo }) {
  const completed = bookings.filter(b=>b.status==='Completed')
  const cancelled = bookings.filter(b=>b.status==='Cancelled')
  const next = upcoming[0]

  const stats = [
    { label:'Total Trips',  value:bookings.length,   emoji:'🚐', color:'#0a2558', bg:'#e8eef8' },
    { label:'Upcoming',     value:upcoming.length,   emoji:'📅', color:'#d97706', bg:'#fef9c3' },
    { label:'Completed',    value:completed.length,  emoji:'✅', color:'#15803d', bg:'#dcfce7' },
    { label:'Cancelled',    value:cancelled.length,  emoji:'❌', color:'#b91c1c', bg:'#fee2e2' },
  ]

  return (
    <div className="dash-section">
      {/* Welcome banner */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0b1a3d 0%,#0a2558 45%,#1a3a8f 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize:'22px 22px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background:'radial-gradient(circle at top right, rgba(249,115,22,0.12), transparent 70%)' }} />
        <div className="relative z-10 flex items-center flex-wrap gap-4">
          <div>
            <p className="text-white font-black" style={{ fontSize:'22px', letterSpacing:'-0.02em' }}>
              Welcome back, {user.displayName ? user.displayName.split(' ')[0] : 'there'}! 👋
            </p>
            <p className="mt-1.5" style={{ color:'rgba(255,255,255,0.55)', fontSize:'14px' }}>
              {upcoming.length > 0
                ? `You have ${upcoming.length} upcoming ride${upcoming.length>1?'s':''} scheduled.`
                : 'No upcoming rides. Ready to book one?'}
            </p>
          </div>
          <button onClick={() => goTo('book')} className="dash-btn-primary ml-auto font-bold text-white rounded-xl px-5 py-2.5 relative z-10 shrink-0 flex items-center gap-2"
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'13.5px', boxShadow:'0 6px 20px rgba(249,115,22,0.4)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="14" height="14"><path d="M12 5v14M5 12h14"/></svg>
            Book a Ride
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="dash-stat rounded-2xl overflow-hidden" style={{ background:'white', border:'1px solid #eaeff8', boxShadow:'0 4px 20px rgba(10,37,88,0.07)' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg,${s.color},${s.color}80)` }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background:s.bg }}>
                  {s.emoji}
                </div>
                <span className="font-black" style={{ fontSize:'32px', lineHeight:1, color:s.color, letterSpacing:'-0.04em' }}>{s.value}</span>
              </div>
              <p className="font-bold text-gray-400" style={{ fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.07em' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next ride */}
      {next && (
        <Card className="p-5 mb-6">
          <SectionTitle>Next Upcoming Ride</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            {[['Booking ID', next.invoiceId || next.id], ['Date & Time', `${next.date} · ${next.time}`], ['Pickup', next.from], ['Drop-off', next.to], ['Service', next.type], ['Driver', next.driver]].map(([label, val]) => (
              <div key={label}>
                <p className="text-gray-400 mb-0.5" style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</p>
                {label === 'Booking ID'
                  ? <p className="font-black text-[#0a2558]" style={{ fontSize:'14px' }}>{val}</p>
                  : label === 'Status'
                    ? <StatusBadge status={val} />
                    : <p className="font-semibold text-gray-700" style={{ fontSize:'13.5px' }}>{val}</p>
                }
              </div>
            ))}
            <div>
              <p className="text-gray-400 mb-0.5" style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>Status</p>
              <StatusBadge status={next.status} />
            </div>
          </div>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label:'Book a Ride',   emoji:'🚐', desc:'Schedule a new trip',  key:'book',      color:'#f97316', bg:'#fff7ed' },
          { label:'View Bookings', emoji:'📋', desc:'See all your rides',   key:'bookings',  color:'#0a2558', bg:'#e8eef8' },
          { label:'Ride History',  emoji:'🕓', desc:'Past & cancelled rides',key:'history',  color:'#16a34a', bg:'#dcfce7' },
        ].map(a => (
          <button key={a.key} onClick={() => goTo(a.key)} className="text-left p-4 rounded-2xl flex items-center gap-4 dash-card"
            style={{ background:'white', border:'1.5px solid #e8eef8', cursor:'pointer', boxShadow:'0 2px 10px rgba(10,37,88,0.05)' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=a.color; e.currentTarget.style.background=a.bg }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='#e8eef8'; e.currentTarget.style.background='white' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background:a.bg }}>
              {a.emoji}
            </div>
            <div>
              <p className="font-bold text-[#0a2558]" style={{ fontSize:'13.5px' }}>{a.label}</p>
              <p className="text-gray-400" style={{ fontSize:'12px' }}>{a.desc}</p>
            </div>
            <svg className="ml-auto flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── MY BOOKINGS ── */
function BookingsSection({ bookings, setBookings, uid }) {
  const [tab, setTab]             = useState('Upcoming')
  const [cancelModal, setCancelModal] = useState(null)
  const [reschedModal, setReschedModal] = useState(null)
  const [cancelReason, setCancelReason] = useState('')
  const [reschedForm, setReschedForm]   = useState({ date:'', time:'' })
  const [ratingModal, setRatingModal]   = useState(null)
  const [ratingVal, setRatingVal]       = useState(0)
  const [ratingText, setRatingText]     = useState('')

  const filtered = bookings.filter(b => {
    if (tab === 'Upcoming')  return b.status === 'Confirmed' || b.status === 'Pending'
    if (tab === 'Past')      return b.status === 'Completed'
    if (tab === 'Cancelled') return b.status === 'Cancelled'
    return true
  })

  const doCancel = async () => {
    await cancelBooking(uid, cancelModal)
    setBookings(prev => prev.map(b => b.id === cancelModal ? { ...b, status:'Cancelled' } : b))
    setCancelModal(null); setCancelReason('')
  }

  const doReschedule = async () => {
    const updates = { date: reschedForm.date || '', time: reschedForm.time || '' }
    await updateBooking(uid, reschedModal, updates)
    setBookings(prev => prev.map(b => b.id === reschedModal ? { ...b, ...updates } : b))
    setReschedModal(null); setReschedForm({ date:'', time:'' })
  }

  const doRate = async () => {
    await rateBooking(uid, ratingModal, ratingVal)
    setBookings(prev => prev.map(b => b.id === ratingModal ? { ...b, rating: ratingVal } : b))
    setRatingModal(null); setRatingVal(0); setRatingText('')
  }

  return (
    <div className="dash-section">
      <div className="flex gap-2 mb-6 flex-wrap">
        {['Upcoming','Past','Cancelled'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2 rounded-xl font-bold text-sm"
            style={{ background: tab===t ? 'linear-gradient(135deg,#0a2558,#1e40af)' : 'white', color: tab===t ? 'white' : '#64748b', border: tab===t ? 'none' : '1px solid #e2e8f0', cursor:'pointer', boxShadow: tab===t ? '0 4px 14px rgba(10,37,88,0.25)' : 'none', transition:'all 0.15s ease' }}>
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0
        ? <EmptyState emoji="📭" label={`No ${tab.toLowerCase()} bookings`} />
        : <div className="flex flex-col gap-4">
            {filtered.map(b => {
              const statusAccent = { Confirmed:'#22c55e', Pending:'#f59e0b', Completed:'#3b82f6', Cancelled:'#ef4444' }
              const accent = statusAccent[b.status] || '#e2e8f0'
              return (
              <div key={b.id} className="rounded-2xl overflow-hidden dash-card"
                style={{ background:'white', border:'1px solid #eaeff8', borderLeft:`4px solid ${accent}`, boxShadow:'0 2px 16px rgba(10,37,88,0.06)' }}>
              <div className="p-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-black text-[#0a2558]" style={{ fontSize:'14px' }}>{b.invoiceId || b.id}</p>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="text-gray-400 font-medium" style={{ fontSize:'12.5px' }}>{b.date} · {b.time}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {[['Pickup', b.from, '#22c55e'], ['Drop-off', b.to, '#f97316']].map(([lbl, val, dot]) => (
                    <div key={lbl} className="flex items-start gap-2">
                      <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:dot, marginTop:'5px', flexShrink:0 }} />
                      <div>
                        <p className="text-gray-400" style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' }}>{lbl}</p>
                        <p className="text-gray-700 font-semibold" style={{ fontSize:'13px' }}>{val}</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    <p className="text-gray-400" style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' }}>Service Type</p>
                    <p className="text-gray-700 font-semibold" style={{ fontSize:'13px' }}>{b.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-400" style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' }}>Driver</p>
                    <p className="text-gray-700 font-semibold" style={{ fontSize:'13px' }}>{b.driver}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 flex-wrap" style={{ borderTop:'1px solid #f1f5f9', paddingTop:'12px' }}>
                  {(b.status === 'Confirmed' || b.status === 'Pending') && <>
                    <button onClick={() => setReschedModal(b.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold"
                      style={{ background:'#f0f7ff', color:'#1d4ed8', border:'none', cursor:'pointer', fontSize:'12.5px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      Reschedule
                    </button>
                    <button onClick={() => setCancelModal(b.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold"
                      style={{ background:'#fef2f2', color:'#ef4444', border:'none', cursor:'pointer', fontSize:'12.5px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                      Cancel Ride
                    </button>
                  </>}
                  {b.status === 'Completed' && (
                    b.rating
                      ? <div className="flex items-center gap-2">
                          <Stars value={b.rating} />
                          <span className="text-gray-400" style={{ fontSize:'12px' }}>Your rating</span>
                        </div>
                      : <button onClick={() => { setRatingModal(b.id); setRatingVal(0) }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold"
                          style={{ background:'#fffbeb', color:'#d97706', border:'none', cursor:'pointer', fontSize:'12.5px' }}>
                          ⭐ Rate this ride
                        </button>
                  )}
                </div>
              </div>
              </div>
            )})}
          </div>
      }

      {/* Cancel modal */}
      <Modal open={!!cancelModal} onClose={() => setCancelModal(null)} title="Cancel Booking">
        <p className="text-gray-600 mb-4" style={{ fontSize:'14px' }}>Are you sure you want to cancel <strong>{cancelModal}</strong>?</p>
        <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Reason for cancellation</label>
        <select value={cancelReason} onChange={e=>setCancelReason(e.target.value)} style={{ ...INP, marginBottom:'16px' }}>
          <option value="">Select a reason</option>
          {['Appointment rescheduled','No longer needed','Found alternative transport','Emergency','Other'].map(r=><option key={r} value={r}>{r}</option>)}
        </select>
        <div className="flex gap-3">
          <button onClick={() => setCancelModal(null)} className="flex-1 py-2.5 rounded-xl font-semibold" style={{ background:'#f1f5f9', color:'#64748b', border:'none', cursor:'pointer', fontSize:'13.5px' }}>Keep Booking</button>
          <button onClick={doCancel} className="flex-1 py-2.5 rounded-xl font-bold text-white" style={{ background:'#ef4444', border:'none', cursor:'pointer', fontSize:'13.5px' }}>Yes, Cancel</button>
        </div>
      </Modal>

      {/* Reschedule modal */}
      <Modal open={!!reschedModal} onClose={() => setReschedModal(null)} title="Reschedule Booking">
        <p className="text-gray-600 mb-4" style={{ fontSize:'14px' }}>Choose a new date and time for <strong>{reschedModal}</strong>.</p>
        <div className="flex flex-col gap-4 mb-5">
          <div>
            <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>New Date</label>
            <input type="date" value={reschedForm.date} onChange={e=>setReschedForm(f=>({...f,date:e.target.value}))} style={INP} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>New Time</label>
            <input type="time" value={reschedForm.time} onChange={e=>setReschedForm(f=>({...f,time:e.target.value}))} style={INP} onFocus={focus} onBlur={blur} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setReschedModal(null)} className="flex-1 py-2.5 rounded-xl font-semibold" style={{ background:'#f1f5f9', color:'#64748b', border:'none', cursor:'pointer', fontSize:'13.5px' }}>Cancel</button>
          <button onClick={doReschedule} className="flex-1 py-2.5 rounded-xl font-bold text-white" style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'13.5px' }}>Confirm Reschedule</button>
        </div>
      </Modal>

      {/* Rating modal */}
      <Modal open={!!ratingModal} onClose={() => setRatingModal(null)} title="Rate Your Ride">
        <p className="text-gray-600 mb-4" style={{ fontSize:'14px' }}>How was your experience for <strong>{ratingModal}</strong>?</p>
        <div className="flex justify-center mb-4">
          <Stars value={ratingVal} onChange={setRatingVal} />
        </div>
        <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Leave a comment (optional)</label>
        <textarea value={ratingText} onChange={e=>setRatingText(e.target.value)} placeholder="Tell us about your experience…" rows={3}
          style={{ ...INP, resize:'none', marginBottom:'16px' }} onFocus={focus} onBlur={blur} />
        <button onClick={doRate} disabled={ratingVal === 0}
          className="w-full py-3 rounded-xl font-bold text-white"
          style={{ background: ratingVal === 0 ? '#d1dce8' : 'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor: ratingVal===0?'not-allowed':'pointer', fontSize:'14px' }}>
          Submit Rating
        </button>
      </Modal>
    </div>
  )
}

/* ── BOOK A RIDE ── */
function BookRideSection({ uid, userEmail, userName, setBookings }) {
  const [form, setForm] = useState({ from:'', to:'', date:'', time:'', type:'Medical Appointment', passengers:'1', notes:'', recurring:false, recurringFreq:'Weekly' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true)
    try {
      const year = new Date().getFullYear()
      const rand = String(Math.floor(Math.random() * 9000) + 1000)
      const invoiceId = `DCT-${year}-${rand}`
      await addBooking(uid, { ...form, invoiceId, status:'Pending', driver:'Assigned soon', rating:null, userEmail, userName })
      const updated = await getBookings(uid)
      setBookings(updated)
      setDone(true)
    } catch (err) { console.error('Booking error:', err) }
    finally { setLoading(false) }
  }

  if (done) return (
    <div className="dash-section max-w-md mx-auto text-center py-12">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{ background:'linear-gradient(135deg,#d1fae5,#a7f3d0)', border:'2px solid #6ee7b7', boxShadow:'0 8px 28px rgba(16,185,129,0.2)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" width="38" height="38"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <p className="font-black text-[#0a2558] mb-2" style={{ fontSize:'22px', letterSpacing:'-0.02em' }}>Booking Request Sent!</p>
      <p className="text-gray-500 mb-6" style={{ fontSize:'14px', lineHeight:'1.7' }}>
        Our team will confirm your ride shortly.<br/>Check <strong>My Bookings</strong> for updates.
      </p>
      <button onClick={() => setDone(false)} className="font-bold text-white rounded-xl px-7 py-3"
        style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px', boxShadow:'0 4px 16px rgba(249,115,22,0.35)' }}>
        Book Another Ride
      </button>
    </div>
  )

  return (
    <div className="dash-section max-w-2xl">
      {/* Banner */}
      <div className="rounded-2xl p-5 mb-5 relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0b1a3d 0%,#0a2558 55%,#1a3a8f 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'20px 20px' }} />
        <div className="absolute right-0 top-0 w-52 h-full pointer-events-none" style={{ background:'radial-gradient(ellipse at right, rgba(249,115,22,0.12), transparent 70%)' }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background:'rgba(249,115,22,0.18)', border:'1px solid rgba(249,115,22,0.3)' }}>🚐</div>
          <div>
            <p className="text-white font-black" style={{ fontSize:'17px', letterSpacing:'-0.01em' }}>Book a Ride</p>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'13px', marginTop:'2px' }}>Fill in the details below and we'll confirm your ride shortly.</p>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Pickup Location *</label>
              <input required value={form.from} onChange={e=>set('from',e.target.value)} placeholder="Enter pickup address" style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Drop-off Location *</label>
              <input required value={form.to} onChange={e=>set('to',e.target.value)} placeholder="Enter destination" style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Date *</label>
              <input required type="date" value={form.date} onChange={e=>set('date',e.target.value)} style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Time *</label>
              <input required type="time" value={form.time} onChange={e=>set('time',e.target.value)} style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Service Type *</label>
              <select required value={form.type} onChange={e=>set('type',e.target.value)} style={INP}>
                {['Medical Appointment','Dialysis','Rehabilitation','Airport Transfer','Discharge Transport','Non-Medical Trip'].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Passengers</label>
              <select value={form.passengers} onChange={e=>set('passengers',e.target.value)} style={INP}>
                {['1','2','3','4'].map(n=><option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* Recurring */}
          <div className="rounded-xl p-4" style={{ background:'#f8fafc', border:'1px solid #e8eef8' }}>
            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input type="checkbox" checked={form.recurring} onChange={e=>set('recurring',e.target.checked)} className="w-4 h-4 accent-orange-500" />
              <div>
                <p className="font-bold text-[#0a2558]" style={{ fontSize:'13.5px' }}>Recurring Ride</p>
                <p className="text-gray-400" style={{ fontSize:'12px' }}>Book this same trip on a regular schedule</p>
              </div>
            </label>
            {form.recurring && (
              <select value={form.recurringFreq} onChange={e=>set('recurringFreq',e.target.value)} style={{ ...INP, width:'auto', minWidth:'180px' }}>
                {['Daily','Every 2 days','Weekly','Every 2 weeks','Monthly'].map(f=><option key={f}>{f}</option>)}
              </select>
            )}
          </div>

          <div>
            <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Special Notes</label>
            <textarea value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Wheelchair, oxygen, special assistance needs…"
              rows={3} style={{ ...INP, resize:'none' }} onFocus={focus} onBlur={blur} />
          </div>

          <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 font-black text-white rounded-xl py-3.5"
            style={{ background: loading ? '#d1dce8' : 'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor: loading?'not-allowed':'pointer', fontSize:'14px', boxShadow: loading?'none':'0 8px 22px rgba(249,115,22,0.3)' }}>
            {loading ? <><svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg> Submitting…</> : 'Submit Booking Request'}
          </button>
        </form>
      </Card>
    </div>
  )
}

/* ── RIDE HISTORY ── */
function HistorySection({ bookings, setBookings, uid }) {
  const [ratingModal, setRatingModal] = useState(null)
  const [ratingVal, setRatingVal]     = useState(0)
  const [ratingText, setRatingText]   = useState('')
  const past = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled')

  const doRate = async () => {
    await rateBooking(uid, ratingModal, ratingVal)
    setBookings(prev => prev.map(b => b.id === ratingModal ? { ...b, rating: ratingVal } : b))
    setRatingModal(null); setRatingVal(0); setRatingText('')
  }

  const downloadReceipt = (b) => {
    const text = `DELTA CARE TRANSPORT — RECEIPT\n${'─'.repeat(36)}\nBooking ID : ${b.id}\nDate       : ${b.date} at ${b.time}\nPickup     : ${b.from}\nDrop-off   : ${b.to}\nService    : ${b.type}\nDriver     : ${b.driver}\nStatus     : ${b.status}\n${'─'.repeat(36)}\nThank you for choosing Delta Care Transport!\n(470) 336-7475`
    const blob = new Blob([text], { type:'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `${b.id}-receipt.txt`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="dash-section">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'linear-gradient(135deg,#f8fafc,#f1f5ff)' }}>
                {['Booking ID','Date','From','To','Type','Status','Rating','Receipt'].map(h => (
                  <th key={h} style={{ padding:'13px 16px', textAlign:'left', fontSize:'10.5px', fontWeight:800, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap', borderBottom:'1px solid #e8eef8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {past.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < past.length-1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding:'12px 14px', fontSize:'12.5px', fontWeight:700, color:'#0a2558', whiteSpace:'nowrap' }}>{b.invoiceId || b.id}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12.5px', color:'#374151', whiteSpace:'nowrap' }}>{b.date}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12.5px', color:'#374151', maxWidth:'140px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.from}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12.5px', color:'#374151', maxWidth:'140px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.to}</td>
                  <td style={{ padding:'12px 14px', fontSize:'12.5px', color:'#374151', whiteSpace:'nowrap' }}>{b.type}</td>
                  <td style={{ padding:'12px 14px', whiteSpace:'nowrap' }}><StatusBadge status={b.status} /></td>
                  <td style={{ padding:'12px 14px', whiteSpace:'nowrap' }}>
                    {b.status === 'Completed' && (
                      b.rating
                        ? <Stars value={b.rating} />
                        : <button onClick={() => { setRatingModal(b.id); setRatingVal(0) }}
                            className="text-xs px-2.5 py-1 rounded-full font-semibold"
                            style={{ background:'#fffbeb', color:'#d97706', border:'none', cursor:'pointer' }}>Rate</button>
                    )}
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    {b.status === 'Completed' && (
                      <button onClick={() => downloadReceipt(b)}
                        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background:'#f0f7ff', color:'#1d4ed8', border:'none', cursor:'pointer', whiteSpace:'nowrap' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                        Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={!!ratingModal} onClose={() => setRatingModal(null)} title="Rate Your Ride">
        <p className="text-gray-600 mb-4" style={{ fontSize:'14px' }}>How was your experience for <strong>{ratingModal}</strong>?</p>
        <div className="flex justify-center mb-4"><Stars value={ratingVal} onChange={setRatingVal} /></div>
        <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Comment (optional)</label>
        <textarea value={ratingText} onChange={e=>setRatingText(e.target.value)} rows={3} placeholder="Tell us about your experience…"
          style={{ ...INP, resize:'none', marginBottom:'16px' }} onFocus={focus} onBlur={blur} />
        <button onClick={doRate} disabled={ratingVal===0} className="w-full py-3 rounded-xl font-bold text-white"
          style={{ background: ratingVal===0?'#d1dce8':'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor: ratingVal===0?'not-allowed':'pointer', fontSize:'14px' }}>
          Submit Rating
        </button>
      </Modal>
    </div>
  )
}

/* ── FAVORITE LOCATIONS ── */
function FavoritesSection({ uid, favorites, setFavorites }) {
  const [modal, setModal] = useState(false)
  const [form, setForm]   = useState({ label:'', address:'', icon:'📍' })
  const [editId, setEditId] = useState(null)

  const ICONS = ['🏠','🏥','💊','🏢','🎓','✈️','⛪','🛒','📍']

  const openAdd = () => { setForm({ label:'', address:'', icon:'📍' }); setEditId(null); setModal(true) }
  const openEdit = loc => { setForm({ label:loc.label, address:loc.address, icon:loc.icon }); setEditId(loc.id); setModal(true) }

  const save = async () => {
    if (!form.label || !form.address) return
    if (editId) {
      await updateFavorite(uid, editId, form)
      setFavorites(prev => prev.map(l => l.id === editId ? { ...l, ...form } : l))
    } else {
      const ref = await addFavorite(uid, form)
      setFavorites(prev => [...prev, { id: ref.id, ...form }])
    }
    setModal(false)
  }

  return (
    <div className="dash-section max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle>Saved Locations</SectionTitle>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white"
          style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'13px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="13" height="13"><path d="M12 5v14M5 12h14"/></svg>
          Add Location
        </button>
      </div>

      {favorites.length === 0
        ? <EmptyState emoji="📍" label="No saved locations yet" />
        : <div className="flex flex-col gap-3">
            {favorites.map(l => (
              <Card key={l.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-2xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background:'#f1f7fe' }}>{l.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0a2558]" style={{ fontSize:'14px' }}>{l.label}</p>
                    <p className="text-gray-500 truncate" style={{ fontSize:'12.5px' }}>{l.address}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEdit(l)} className="p-2 rounded-lg" style={{ background:'#f1f7fe', border:'none', cursor:'pointer' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button onClick={async () => { await deleteFavorite(uid, l.id); setFavorites(prev => prev.filter(x=>x.id!==l.id)) }} className="p-2 rounded-lg" style={{ background:'#fef2f2', border:'none', cursor:'pointer' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
      }

      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Edit Location' : 'Add Location'}>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Label *</label>
            <input value={form.label} onChange={e=>setForm(f=>({...f,label:e.target.value}))} placeholder="e.g. Home, Doctor's Office" style={INP} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Full Address *</label>
            <input value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} placeholder="123 Main St, Atlanta, GA" style={INP} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label className="block font-semibold text-[#0a2558] mb-2" style={{ fontSize:'13px' }}>Icon</label>
            <div className="flex gap-2 flex-wrap">
              {ICONS.map(ic => (
                <button key={ic} type="button" onClick={() => setForm(f=>({...f,icon:ic}))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
                  style={{ border: form.icon===ic ? '2px solid #f97316' : '1.5px solid #e2e8f0', background: form.icon===ic ? '#fff7ed' : 'white', cursor:'pointer' }}>
                  {ic}
                </button>
              ))}
            </div>
          </div>
          <button onClick={save} className="w-full py-3 rounded-xl font-bold text-white mt-1"
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
            {editId ? 'Save Changes' : 'Add Location'}
          </button>
        </div>
      </Modal>
    </div>
  )
}

/* ── PAYMENT HISTORY ── */
function PaymentsSection({ payments }) {
  const PAY_STATUS = {
    Paid:     { bg:'#dcfce7', color:'#15803d' },
    Refunded: { bg:'#dbeafe', color:'#1d4ed8' },
    Pending:  { bg:'#fef9c3', color:'#a16207' },
  }
  const total    = payments.filter(p=>p.status==='Paid').reduce((s,p)=>s+parseFloat((p.amount||'0').replace('$','')||0),0)
  const lastPay  = payments.find(p=>p.status==='Paid')

  return (
    <div className="dash-section max-w-3xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label:'Total Paid', value:`$${total.toFixed(2)}`, emoji:'💰', bg:'#dcfce7', color:'#15803d' },
          { label:'Invoices',   value:payments.length,         emoji:'🧾', bg:'#e8eef8', color:'#0a2558' },
          { label:'Last Payment', value:lastPay ? lastPay.date : '—', emoji:'📅', bg:'#fef9c3', color:'#d97706', small:true },
        ].map(s => (
          <div key={s.label} className="dash-stat rounded-2xl overflow-hidden" style={{ background:'white', border:'1px solid #eaeff8', boxShadow:'0 4px 20px rgba(10,37,88,0.07)' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg,${s.color},${s.color}80)` }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background:s.bg }}>{s.emoji}</div>
              </div>
              <p className="font-black" style={{ fontSize: s.small?'15px':'26px', color:s.color, letterSpacing:'-0.03em' }}>{s.value}</p>
              <p className="font-bold text-gray-400 mt-0.5" style={{ fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.07em' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {payments.length === 0
        ? <EmptyState emoji="💳" label="No payment records yet. Admin will add payment records here." />
        : <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ background:'linear-gradient(135deg,#f8fafc,#f1f5ff)' }}>
                    {['Invoice','Date','Description','Amount','Method','Status'].map(h=>(
                      <th key={h} style={{ padding:'13px 16px', textAlign:'left', fontSize:'10.5px', fontWeight:800, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e8eef8', whiteSpace:'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p,i) => (
                    <tr key={p.id} style={{ borderBottom: i<payments.length-1?'1px solid #f1f5f9':'none' }}>
                      <td style={{ padding:'12px 14px', fontSize:'12.5px', fontWeight:700, color:'#0a2558', whiteSpace:'nowrap' }}>{p.invoiceId || p.id}</td>
                      <td style={{ padding:'12px 14px', fontSize:'12.5px', color:'#374151', whiteSpace:'nowrap' }}>{p.date}</td>
                      <td style={{ padding:'12px 14px', fontSize:'12.5px', color:'#374151' }}>{p.desc}</td>
                      <td style={{ padding:'12px 14px', fontSize:'12.5px', fontWeight:700, color:'#0a2558', whiteSpace:'nowrap' }}>{p.amount}</td>
                      <td style={{ padding:'12px 14px', fontSize:'12.5px', color:'#374151', whiteSpace:'nowrap' }}>{p.method}</td>
                      <td style={{ padding:'12px 14px', whiteSpace:'nowrap' }}>
                        <span className="px-2.5 py-1 rounded-full font-bold" style={{ fontSize:'11.5px', background: PAY_STATUS[p.status]?.bg || '#f1f5f9', color: PAY_STATUS[p.status]?.color || '#64748b' }}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
      }
    </div>
  )
}

/* ── MY PROFILE ── */
function ProfileSection({ user, setUser }) {
  const [form, setForm]     = useState({ displayName: user.displayName||'', phone:'', address:'', emergencyName:'', emergencyPhone:'', emergencyRel:'' })
  const [medical, setMedical] = useState({ wheelchair:false, oxygen:false, stretcher:false, visualImpaired:false, hearingImpaired:false, notes:'' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [error, setError]   = useState('')
  const [tab, setTab]       = useState('personal')

  const initials = (user.displayName||user.email||'?').split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()

  useEffect(() => {
    if (!user?.uid) return
    getProfile(user.uid).then(data => {
      if (data.phone || data.address || data.emergencyName) {
        setForm(f => ({ ...f, phone: data.phone||'', address: data.address||'', emergencyName: data.emergencyName||'', emergencyPhone: data.emergencyPhone||'', emergencyRel: data.emergencyRel||'' }))
      }
      if (data.medical) setMedical(data.medical)
    })
  }, [user?.uid])

  const handleSave = async e => {
    e.preventDefault(); setSaving(true); setSaved(false); setError('')
    try {
      await updateProfile(auth.currentUser, { displayName: form.displayName })
      await saveProfile(user.uid, { displayName: form.displayName, phone: form.phone, address: form.address, emergencyName: form.emergencyName, emergencyPhone: form.emergencyPhone, emergencyRel: form.emergencyRel })
      setUser({ ...user, displayName: form.displayName })
      setSaved(true); setTimeout(()=>setSaved(false), 3000)
    } catch { setError('Failed to update. Please try again.') }
    finally { setSaving(false) }
  }

  const handleSaveMedical = async () => {
    await saveProfile(user.uid, { medical })
    setSaved(true); setTimeout(()=>setSaved(false), 3000)
  }

  return (
    <div className="dash-section max-w-xl">
      {/* Avatar card */}
      <div className="rounded-2xl p-5 mb-5 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0b1a3d,#0a2558)', boxShadow:'0 8px 32px rgba(10,37,88,0.2)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'20px 20px' }} />
        <div className="absolute right-0 bottom-0 w-40 h-40 pointer-events-none" style={{ background:'radial-gradient(circle at bottom right, rgba(249,115,22,0.15), transparent 70%)' }} />
        <div className="relative flex items-center gap-4">
          {user.photoURL
            ? <img src={user.photoURL} alt="avatar" style={{ width:'72px', height:'72px', borderRadius:'50%', objectFit:'cover', border:'3px solid #f97316', boxShadow:'0 4px 16px rgba(249,115,22,0.4)' }} />
            : <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'linear-gradient(135deg,#f97316,#ea580c)', border:'3px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 16px rgba(249,115,22,0.4)' }}>
                <span className="text-white font-black" style={{ fontSize:'22px' }}>{initials}</span>
              </div>
          }
          <div>
            <p className="font-black text-white" style={{ fontSize:'18px', letterSpacing:'-0.01em' }}>{user.displayName||'User'}</p>
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'13px' }}>{user.email}</p>
            <span className="inline-block mt-1.5 text-xs font-bold rounded-full px-2.5 py-0.5" style={{ background:'rgba(249,115,22,0.2)', color:'#fed7aa', border:'1px solid rgba(249,115,22,0.3)' }}>Active Member</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[['personal','Personal Info'],['emergency','Emergency Contact'],['medical','Medical Needs']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            className="px-5 py-2 rounded-xl font-bold text-sm"
            style={{ background: tab===k?'linear-gradient(135deg,#0a2558,#1e40af)':'white', color: tab===k?'white':'#64748b', border: tab===k?'none':'1px solid #e2e8f0', cursor:'pointer', boxShadow: tab===k?'0 4px 14px rgba(10,37,88,0.25)':'none', transition:'all 0.15s ease' }}>
            {l}
          </button>
        ))}
      </div>

      {saved && <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4" style={{ background:'#dcfce7', border:'1px solid #86efac' }}><svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg><p className="text-green-700 font-semibold" style={{ fontSize:'13px' }}>Saved successfully!</p></div>}
      {error && <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4" style={{ background:'#fef2f2', border:'1px solid #fecaca' }}><p className="text-red-600 font-medium" style={{ fontSize:'13px' }}>{error}</p></div>}

      <Card className="p-6">
        {tab === 'personal' && (
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            {[['Full Name','displayName','text','Your full name'],['Phone Number','phone','tel','(470) 000-0000'],['Home Address','address','text','123 Main St, Atlanta, GA']].map(([lbl,key,type,ph])=>(
              <div key={key}>
                <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>{lbl}</label>
                <input type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} style={INP} onFocus={focus} onBlur={blur} />
              </div>
            ))}
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Email Address</label>
              <input value={user.email} disabled style={{ ...INP, background:'#f8fafc', color:'#94a3b8', cursor:'not-allowed' }} />
              <p className="text-gray-400 mt-1" style={{ fontSize:'11.5px' }}>Email cannot be changed here.</p>
            </div>
            <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 font-black text-white rounded-xl py-3 mt-1"
              style={{ background: saving?'#d1dce8':'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor: saving?'not-allowed':'pointer', fontSize:'14px' }}>
              {saving ? <><svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg> Saving…</> : 'Save Changes'}
            </button>
          </form>
        )}

        {tab === 'emergency' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-xl p-3 mb-1" style={{ background:'#fff7ed', border:'1px solid #fed7aa' }}>
              <span style={{ fontSize:'18px' }}>⚠️</span>
              <p style={{ fontSize:'13px', color:'#9a3412' }}>This person will be contacted in case of an emergency during your transport.</p>
            </div>
            {[['Contact Name','emergencyName','text','Full name'],['Phone Number','emergencyPhone','tel','(470) 000-0000'],['Relationship','emergencyRel','text','e.g. Spouse, Child, Friend']].map(([lbl,key,type,ph])=>(
              <div key={key}>
                <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>{lbl}</label>
                <input type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} style={INP} onFocus={focus} onBlur={blur} />
              </div>
            ))}
            <button onClick={async () => {
                setSaving(true)
                await saveProfile(user.uid, { emergencyName: form.emergencyName, emergencyPhone: form.emergencyPhone, emergencyRel: form.emergencyRel })
                setSaved(true); setTimeout(()=>setSaved(false), 3000); setSaving(false)
              }} disabled={saving} className="flex items-center justify-center gap-2 font-black text-white rounded-xl py-3 mt-1"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
              Save Emergency Contact
            </button>
          </div>
        )}

        {tab === 'medical' && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-500" style={{ fontSize:'13.5px' }}>These needs will be automatically included with every booking request.</p>
            <div className="flex flex-col gap-3">
              {[['wheelchair','Wheelchair Required'],['oxygen','Oxygen Equipment'],['stretcher','Stretcher Transport'],['visualImpaired','Visual Impairment'],['hearingImpaired','Hearing Impairment']].map(([key,label])=>(
                <label key={key} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl" style={{ border:'1.5px solid', borderColor: medical[key]?'#f97316':'#e2e8f0', background: medical[key]?'#fff7ed':'white' }}>
                  <input type="checkbox" checked={medical[key]} onChange={e=>setMedical(m=>({...m,[key]:e.target.checked}))} className="w-4 h-4 accent-orange-500" />
                  <span className="font-semibold text-[#0a2558]" style={{ fontSize:'13.5px' }}>{label}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Additional Medical Notes</label>
              <textarea value={medical.notes} onChange={e=>setMedical(m=>({...m,notes:e.target.value}))} rows={3} placeholder="Any other medical or mobility notes for our drivers…"
                style={{ ...INP, resize:'none' }} onFocus={focus} onBlur={blur} />
            </div>
            <button onClick={handleSaveMedical} className="font-black text-white rounded-xl py-3"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
              Save Medical Info
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

/* ── SUPPORT ── */
function SupportSection({ user }) {
  const [form, setForm] = useState({ subject:'', category:'Booking Issue', message:'' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const FAQS = [
    { q:'How do I cancel a booking?',         a:'Go to My Bookings, find your upcoming ride, and click "Cancel Ride". You can also contact us by phone or WhatsApp.' },
    { q:'Can I reschedule my ride?',           a:'Yes! In My Bookings, click "Reschedule" on any upcoming booking and choose a new date and time.' },
    { q:'How far in advance should I book?',   a:'We recommend booking at least 24-48 hours in advance. For recurring rides, book at least 72 hours before your first trip.' },
    { q:'Do you provide wheelchair transport?', a:'Yes. Mark "Wheelchair Required" in My Profile → Medical Needs and our wheelchair-accessible vehicles will be assigned.' },
    { q:'What areas do you serve?',            a:'We serve Metro Atlanta and surrounding areas including Fulton, DeKalb, Gwinnett, Cobb, and Clayton counties.' },
  ]

  const submit = async e => {
    e.preventDefault(); setLoading(true)
    try {
      await addTicket(user.uid, user.email, {
        subject:  form.subject,
        category: form.category,
        message:  form.message,
        userName: user.displayName || '',
      })
      setDone(true)
      setForm({ subject:'', category:'Booking Issue', message:'' })
    } catch (err) {
      console.error('Ticket error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dash-section max-w-2xl">
      {/* Contact cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-7">
        {[
          { icon:'📞', label:'Call Us',     val:'(470) 336-7475', href:'tel:+14703367475', color:'#0a2558', bg:'#e8eef8', accent:'#0a2558' },
          { icon:'💬', label:'WhatsApp',    val:'Chat Now',        href:'https://wa.me/14703367475', color:'#15803d', bg:'#dcfce7', accent:'#22c55e' },
          { icon:'✉️', label:'Email',       val:'Send Email',      href:'mailto:info@deltacare.com', color:'#1d4ed8', bg:'#dbeafe', accent:'#3b82f6' },
        ].map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
            className="rounded-2xl overflow-hidden no-underline dash-card"
            style={{ background:'white', border:'1px solid #e8eef8', textDecoration:'none', boxShadow:'0 4px 16px rgba(10,37,88,0.06)' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=c.accent; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 24px rgba(10,37,88,0.1)` }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='#e8eef8'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 16px rgba(10,37,88,0.06)' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg,${c.accent},${c.accent}60)` }} />
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background:c.bg }}>{c.icon}</div>
              <div>
                <p className="font-black text-[#0a2558]" style={{ fontSize:'13px' }}>{c.label}</p>
                <p style={{ color:c.color, fontSize:'12px', fontWeight:600 }}>{c.val}</p>
              </div>
              <svg className="ml-auto shrink-0" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" width="13" height="13"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </a>
        ))}
      </div>

      {/* Ticket form */}
      <Card className="p-6 mb-7">
        <SectionTitle>Submit a Support Ticket</SectionTitle>
        {done ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background:'#dcfce7', border:'2px solid #86efac' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="24" height="24"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <p className="font-black text-[#0a2558] mb-1" style={{ fontSize:'16px' }}>Ticket Submitted!</p>
            <p className="text-gray-500" style={{ fontSize:'13px' }}>We'll respond within 24 hours.</p>
            <button onClick={()=>setDone(false)} className="mt-4 px-4 py-2 rounded-lg font-semibold text-sm" style={{ background:'#f1f7fe', color:'#0a2558', border:'none', cursor:'pointer' }}>Submit Another</button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Category</label>
              <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={INP}>
                {['Booking Issue','Payment Question','Driver Complaint','Service Area','Account Help','Other'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Subject *</label>
              <input required value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="Brief description of your issue" style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Message *</label>
              <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Describe your issue in detail…" rows={4} style={{ ...INP, resize:'none' }} onFocus={focus} onBlur={blur} />
            </div>
            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 font-black text-white rounded-xl py-3"
              style={{ background: loading?'#d1dce8':'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor: loading?'not-allowed':'pointer', fontSize:'14px' }}>
              {loading ? <><svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg> Sending…</> : 'Submit Ticket'}
            </button>
          </form>
        )}
      </Card>

      {/* FAQ */}
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <div className="flex flex-col gap-2">
        {FAQS.map((f,i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ border:'1px solid #e8eef8' }}>
            <button onClick={() => setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              style={{ background: openFaq===i?'#fff7ed':'white', border:'none', cursor:'pointer' }}>
              <span className="font-bold text-[#0a2558]" style={{ fontSize:'13.5px' }}>{f.q}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" width="16" height="16"
                style={{ transform: openFaq===i?'rotate(180deg)':'rotate(0deg)', transition:'transform 0.2s', flexShrink:0 }}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {openFaq===i && <div className="px-4 py-3" style={{ background:'#fffbf7', borderTop:'1px solid #fed7aa' }}><p className="text-gray-600" style={{ fontSize:'13.5px', lineHeight:1.6 }}>{f.a}</p></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── SERVICE AREA MAP ── */
function ServiceAreaSection() {
  const [activeCounty, setActiveCounty] = useState(null)

  const counties = [
    { name:'Fulton County',   color:'#f97316', cities:'Atlanta, Sandy Springs, Alpharetta, Roswell, Johns Creek',        hospitals:'Grady Memorial, Piedmont Atlanta, Northside Hospital' },
    { name:'DeKalb County',   color:'#0a2558', cities:'Decatur, Tucker, Dunwoody, Chamblee, Stone Mountain',             hospitals:'Emory University Hospital, Children\'s Healthcare' },
    { name:'Gwinnett County', color:'#1d4ed8', cities:'Lawrenceville, Duluth, Norcross, Snellville, Buford',             hospitals:'Northside Hospital Gwinnett, Emory Johns Creek' },
    { name:'Cobb County',     color:'#15803d', cities:'Marietta, Smyrna, Kennesaw, Acworth, Powder Springs',             hospitals:'WellStar Kennestone, Piedmont Marietta' },
    { name:'Clayton County',  color:'#7c3aed', cities:'Jonesboro, Forest Park, Riverdale, Morrow, Lake City',            hospitals:'Southern Regional Medical, Piedmont Fayette' },
    { name:'Henry County',    color:'#b91c1c', cities:'McDonough, Stockbridge, Hampton, Locust Grove',                   hospitals:'Piedmont Henry, Wellstar Spalding' },
  ]

  const stats = [
    { label:'Counties Served',    value:'6+',   emoji:'🗺️' },
    { label:'Cities Covered',     value:'30+',  emoji:'🏙️' },
    { label:'Partner Hospitals',  value:'15+',  emoji:'🏥' },
    { label:'Service Radius',     value:'50mi', emoji:'📍' },
  ]

  const hours = [
    { day:'Monday – Friday', time:'5:00 AM – 10:00 PM' },
    { day:'Saturday',        time:'6:00 AM – 8:00 PM'  },
    { day:'Sunday',          time:'7:00 AM – 6:00 PM'  },
    { day:'Holidays',        time:'By appointment only' },
  ]

  return (
    <div className="dash-section">
      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl">{s.emoji}</span>
              <span className="font-black text-[#0a2558]" style={{ fontSize:'26px' }}>{s.value}</span>
            </div>
            <p className="font-semibold text-gray-500" style={{ fontSize:'12.5px' }}>{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Map — left 2/3 */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="overflow-hidden">
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom:'1px solid #f1f5f9' }}>
              <div style={{ width:'4px', height:'20px', background:'#f97316', borderRadius:'2px' }} />
              <p className="font-black text-[#0a2558]" style={{ fontSize:'15px' }}>Metro Atlanta Service Area</p>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:'#dcfce7', color:'#15803d' }}>● Live Coverage</span>
            </div>
            <div style={{ position:'relative', height:'420px', background:'#f1f7fe' }}>
              <iframe
                title="Delta Care Transport Service Area"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-84.8%2C33.4%2C-83.8%2C34.15&layer=mapnik&marker=33.749%2C-84.388"
                style={{ width:'100%', height:'100%', border:'none' }}
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-3 left-3 rounded-xl px-3 py-2 flex items-center gap-2"
                style={{ background:'white', boxShadow:'0 4px 16px rgba(0,0,0,0.15)', border:'1px solid #e8eef8' }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#f97316' }} />
                <span className="font-bold text-[#0a2558]" style={{ fontSize:'12px' }}>Atlanta, GA — Home Base</span>
              </div>
            </div>
          </Card>

          {/* County cards */}
          <div>
            <SectionTitle>Covered Counties</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-3">
              {counties.map(c => (
                <button key={c.name} onClick={() => setActiveCounty(activeCounty === c.name ? null : c.name)}
                  className="text-left rounded-xl p-4"
                  style={{ background:'white', border:`1.5px solid ${activeCounty === c.name ? c.color : '#e8eef8'}`, cursor:'pointer', transition:'all 0.15s' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:c.color, flexShrink:0 }} />
                    <p className="font-bold text-[#0a2558]" style={{ fontSize:'13.5px' }}>{c.name}</p>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" width="14" height="14"
                      className="ml-auto"
                      style={{ transform: activeCounty===c.name?'rotate(180deg)':'rotate(0deg)', transition:'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                  <p className="text-gray-500" style={{ fontSize:'12px' }}>{c.cities}</p>
                  {activeCounty === c.name && (
                    <div className="mt-3 pt-3" style={{ borderTop:'1px solid #f1f5f9' }}>
                      <p className="text-gray-400 mb-1" style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>Partner Hospitals</p>
                      <p className="font-semibold" style={{ fontSize:'12.5px', color:c.color }}>{c.hospitals}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">

          {/* Service hours */}
          <Card className="p-5">
            <SectionTitle>Service Hours</SectionTitle>
            <div className="flex flex-col gap-2.5">
              {hours.map(h => (
                <div key={h.day} className="flex items-center justify-between py-2" style={{ borderBottom:'1px solid #f8fafc' }}>
                  <p className="font-semibold text-gray-700" style={{ fontSize:'13px' }}>{h.day}</p>
                  <p className="font-bold text-[#0a2558]" style={{ fontSize:'12.5px' }}>{h.time}</p>
                </div>
              ))}
              <div className="mt-1 rounded-xl p-3 flex items-center gap-2" style={{ background:'#fff7ed', border:'1px solid #fed7aa' }}>
                <span style={{ fontSize:'16px' }}>🚨</span>
                <p style={{ fontSize:'12px', color:'#9a3412', fontWeight:600 }}>Emergency rides available 24/7 — call (470) 336-7475</p>
              </div>
            </div>
          </Card>

          {/* Outside area? */}
          <Card className="p-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background:'#e8eef8' }}>
                <span style={{ fontSize:'22px' }}>📍</span>
              </div>
              <p className="font-black text-[#0a2558] mb-1" style={{ fontSize:'15px' }}>Outside Our Area?</p>
              <p className="text-gray-500 mb-4" style={{ fontSize:'13px', lineHeight:1.5 }}>
                We may still be able to help. Contact us and we'll check availability for your location.
              </p>
              <a href="tel:+14703367475"
                className="flex items-center justify-center gap-2 font-bold text-white rounded-xl py-2.5 w-full no-underline"
                style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', fontSize:'13.5px', textDecoration:'none' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z"/>
                </svg>
                Call Us Now
              </a>
            </div>
          </Card>

          {/* Quick book */}
          <Card className="p-5" style={{ background:'linear-gradient(135deg,#0a2558,#1e40af)', border:'none' }}>
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'20px 20px' }} />
            <p className="text-white font-black mb-1 relative z-10" style={{ fontSize:'15px' }}>Ready to Book?</p>
            <p className="mb-4 relative z-10" style={{ color:'rgba(255,255,255,0.6)', fontSize:'13px' }}>We serve your area. Schedule your ride today.</p>
            <button onClick={() => window.history.back()}
              className="w-full font-bold text-white rounded-xl py-2.5 relative z-10"
              style={{ background:'#f97316', border:'none', cursor:'pointer', fontSize:'13.5px' }}>
              Book a Ride →
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ── TRIP STATISTICS ── */
function StatisticsSection({ bookings }) {
  const completed = bookings.filter(b => b.status === 'Completed').length
  const cancelled = bookings.filter(b => b.status === 'Cancelled').length
  const total     = bookings.length
  const avgRating = (() => {
    const rated = bookings.filter(b => b.rating)
    return rated.length ? (rated.reduce((s,b) => s + b.rating, 0) / rated.length).toFixed(1) : '—'
  })()

  // Last 6 months from real booking dates
  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const MONTHS = Array.from({ length:6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const trips = bookings.filter(b => {
      const bd = new Date(b.date)
      return !isNaN(bd) && bd.getMonth() === d.getMonth() && bd.getFullYear() === d.getFullYear()
    }).length
    return { month: MONTH_NAMES[d.getMonth()], trips }
  })
  const maxTrips = Math.max(...MONTHS.map(m => m.trips), 1)

  // Service breakdown from real booking types
  const SERVICE_COLORS = { 'Medical Appointment':'#f97316', 'Dialysis':'#0a2558', 'Rehabilitation':'#1d4ed8', 'Airport Transfer':'#7c3aed', 'Discharge Transport':'#15803d', 'Non-Medical Trip':'#0891b2' }
  const typeCount = bookings.reduce((acc, b) => { if (b.type) acc[b.type] = (acc[b.type]||0)+1; return acc }, {})
  const SERVICE_BREAKDOWN = Object.entries(typeCount)
    .map(([type, count]) => ({ type, count, color: SERVICE_COLORS[type] || '#94a3b8' }))
    .sort((a, b) => b.count - a.count)
  const totalServices = SERVICE_BREAKDOWN.reduce((s,x) => s + x.count, 0) || 1

  const estMiles = completed * 15
  const estHours = Math.round(completed * 1.5)

  const statCards = [
    { label:'Total Trips',  value:total,              emoji:'🚐', color:'#0a2558', bg:'#e8eef8' },
    { label:'Completed',    value:completed,           emoji:'✅', color:'#15803d', bg:'#dcfce7' },
    { label:'Cancelled',    value:cancelled,           emoji:'❌', color:'#b91c1c', bg:'#fee2e2' },
    { label:'Avg Rating',   value:avgRating,           emoji:'⭐', color:'#d97706', bg:'#fef9c3' },
    { label:'Est. Miles',   value:`${estMiles} mi`,    emoji:'📍', color:'#1d4ed8', bg:'#dbeafe' },
    { label:'Hours Saved',  value:`~${estHours} hrs`,  emoji:'⏱️', color:'#7c3aed', bg:'#ede9fe' },
  ]

  return (
    <div className="dash-section max-w-3xl">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-7">
        {statCards.map(s => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.emoji}</span>
              <span className="font-black" style={{ fontSize:'26px', color:s.color }}>{s.value}</span>
            </div>
            <p className="font-semibold text-gray-500" style={{ fontSize:'12.5px' }}>{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        {/* Bar chart — trips per month */}
        <Card className="p-5">
          <SectionTitle>Trips Per Month</SectionTitle>
          <div className="flex items-end gap-3 h-36">
            {MONTHS.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-bold text-[#0a2558]" style={{ fontSize:'11px' }}>{m.trips || ''}</span>
                <div className="w-full rounded-t-lg" style={{
                  height: `${(m.trips / maxTrips) * 100}%`,
                  minHeight: m.trips ? '8px' : '4px',
                  background: m.trips ? 'linear-gradient(180deg,#f97316,#ea580c)' : '#e8eef8',
                  transition: 'height 0.4s ease',
                }} />
                <span className="text-gray-400 font-medium" style={{ fontSize:'11px' }}>{m.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Service breakdown */}
        <Card className="p-5">
          <SectionTitle>Service Breakdown</SectionTitle>
          <div className="flex flex-col gap-3">
            {SERVICE_BREAKDOWN.length === 0 && <p className="text-gray-400 text-sm">No trips yet.</p>}
            {SERVICE_BREAKDOWN.map(s => (
              <div key={s.type}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-700" style={{ fontSize:'12.5px' }}>{s.type}</p>
                  <p className="font-bold text-[#0a2558]" style={{ fontSize:'12.5px' }}>{s.count} trip{s.count > 1 ? 's' : ''}</p>
                </div>
                <div className="w-full rounded-full" style={{ height:'8px', background:'#f1f5f9' }}>
                  <div className="rounded-full" style={{ height:'8px', width:`${(s.count / totalServices) * 100}%`, background:s.color, transition:'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="p-5">
        <SectionTitle>Milestones</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { emoji:'🥇', label:'First Ride',  desc:'Completed your first trip',      done: completed >= 1  },
            { emoji:'🔟', label:'10 Rides',    desc:'Complete 10 trips to unlock',    done: completed >= 10 },
            { emoji:'⭐', label:'Top Rider',   desc:'Rate 5 rides to earn this',      done: bookings.filter(b=>b.rating).length >= 5 },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: m.done ? '#dcfce7' : '#f8fafc', border:`1px solid ${m.done ? '#86efac' : '#e8eef8'}` }}>
              <span className="text-2xl">{m.emoji}</span>
              <div>
                <p className="font-bold" style={{ fontSize:'13px', color: m.done ? '#15803d' : '#94a3b8' }}>{m.label}</p>
                <p style={{ fontSize:'11.5px', color: m.done ? '#166534' : '#94a3b8' }}>{m.done ? 'Achieved!' : m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

/* ── PROMO & COUPONS ── */
function PromoSection({ uid, userPromos }) {
  const [code, setCode]         = useState('')
  const [applied, setApplied]   = useState(null)
  const [error, setError]       = useState('')
  const [checking, setChecking] = useState(false)

  const handleApply = async () => {
    if (!code.trim()) { setError('Please enter a promo code.'); return }
    setChecking(true); setError(''); setApplied(null)
    const found = await validatePromoCode(code)
    if (found) { setApplied(found) }
    else        { setError('Invalid or expired code. Please try again.') }
    setChecking(false)
  }

  return (
    <div className="dash-section max-w-2xl">
      {/* Enter code */}
      <Card className="p-6 mb-6">
        <SectionTitle>Enter Promo Code</SectionTitle>
        <div className="flex gap-3">
          <input value={code} onChange={e => { setCode(e.target.value); setError(''); setApplied(null) }}
            onKeyDown={e => e.key === 'Enter' && handleApply()}
            placeholder="e.g. DELTA10" style={{ ...INP, flex:1, textTransform:'uppercase', fontWeight:700, letterSpacing:'0.08em' }}
            onFocus={focus} onBlur={blur} />
          <button onClick={handleApply} disabled={checking}
            className="px-5 rounded-xl font-bold text-white shrink-0 flex items-center gap-2"
            style={{ background: checking ? '#d1dce8' : 'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor: checking?'not-allowed':'pointer', fontSize:'13.5px', minWidth:'100px', justifyContent:'center' }}>
            {checking
              ? <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg>
              : 'Apply'}
          </button>
        </div>

        {/* Success */}
        {applied && (
          <div className="flex items-center gap-3 mt-4 p-4 rounded-xl" style={{ background:'#dcfce7', border:'1px solid #86efac' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="20" height="20"><path d="M20 6L9 17l-5-5"/></svg>
            <div>
              <p className="font-black text-green-800" style={{ fontSize:'14px' }}>Code Applied — {applied.discount}!</p>
              <p className="text-green-700" style={{ fontSize:'12.5px' }}>{applied.desc}</p>
            </div>
            <button onClick={() => { setApplied(null); setCode('') }} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', color:'#16a34a' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 mt-4 p-3 rounded-xl" style={{ background:'#fef2f2', border:'1px solid #fecaca' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <p className="text-red-600 font-medium" style={{ fontSize:'13px' }}>{error}</p>
          </div>
        )}

        <p className="text-gray-400 mt-3" style={{ fontSize:'12px' }}>Try: <strong>DELTA10</strong>, <strong>WELCOME5</strong>, <strong>CARE20</strong>, or <strong>DIALYSIS5</strong></p>
      </Card>

      {/* Active offers */}
      <SectionTitle>Your Active Offers</SectionTitle>
      {userPromos.length === 0 && <p className="text-gray-400 text-sm mb-4">No active offers right now.</p>}
      <div className="flex flex-col gap-3">
        {userPromos.map(o => (
          <div key={o.code} className="rounded-xl p-4 flex items-center gap-4"
            style={{ background:o.bg, border:`1.5px solid ${o.border}` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background:'white', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
              <span style={{ fontSize:'22px' }}>🎟️</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black" style={{ fontSize:'14px', color:o.color }}>{o.title}</p>
              <p className="text-gray-600" style={{ fontSize:'12.5px' }}>{o.desc}</p>
              <p className="text-gray-400 mt-0.5" style={{ fontSize:'11.5px' }}>Expires: {o.expiry}</p>
            </div>
            <div className="shrink-0">
              <div className="px-3 py-1.5 rounded-lg text-center" style={{ background:'white', border:`1px solid ${o.border}` }}>
                <p className="font-black" style={{ fontSize:'12px', color:o.color, letterSpacing:'0.05em' }}>{o.code}</p>
              </div>
              <button onClick={() => { setCode(o.code); setApplied(null); setError('') }}
                className="w-full mt-1.5 text-center font-semibold"
                style={{ background:'none', border:'none', cursor:'pointer', color:o.color, fontSize:'11.5px', textDecoration:'underline' }}>
                Use this code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── INSURANCE / MEDICAID ── */
function InsuranceSection({ uid }) {
  const [tab, setTab]       = useState('primary')
  const [saved, setSaved]   = useState(false)
  const [primary, setPrimary] = useState({ provider:'', memberId:'', groupNum:'', planName:'', planType:'', phone:'' })
  const [medicaid, setMedicaid] = useState({ state:'Georgia', medicaidId:'', medicareId:'', type:'Medicaid' })
  const [secondary, setSecondary] = useState({ provider:'', memberId:'', groupNum:'', planName:'' })

  useEffect(() => {
    if (!uid) return
    getInsurance(uid).then(data => {
      if (data.primary) setPrimary(data.primary)
      if (data.medicaid) setMedicaid(data.medicaid)
      if (data.secondary) setSecondary(data.secondary)
    })
  }, [uid])

  const handleSave = async () => {
    await saveInsurance(uid, { primary, medicaid, secondary })
    setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  const PLAN_TYPES  = ['HMO','PPO','EPO','POS','HDHP','Medicaid Managed Care','Medicare Advantage','Other']
  const STATES      = ['Georgia','Alabama','Florida','Tennessee','South Carolina','North Carolina']

  const Field = ({ label, value, onChange, placeholder, type='text', options }) => (
    <div>
      <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>{label}</label>
      {options
        ? <select value={value} onChange={e=>onChange(e.target.value)} style={INP} onFocus={focus} onBlur={blur}>
            <option value="">Select…</option>
            {options.map(o=><option key={o}>{o}</option>)}
          </select>
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={INP} onFocus={focus} onBlur={blur} />
      }
    </div>
  )

  return (
    <div className="dash-section max-w-xl">
      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-xl p-4 mb-6" style={{ background:'#eff6ff', border:'1px solid #bfdbfe' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" width="18" height="18" style={{ flexShrink:0, marginTop:'1px' }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        <p style={{ fontSize:'13px', color:'#1e40af', lineHeight:1.6 }}>
          Your insurance information is used to process billing and ensure you qualify for covered transport. This data is stored securely and never shared without your consent.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[['primary','Primary Insurance'],['medicaid','Medicaid / Medicare'],['secondary','Secondary Insurance']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            className="px-4 py-2 rounded-xl font-bold text-sm"
            style={{ background:tab===k?'linear-gradient(135deg,#0a2558,#1e40af)':'white', color:tab===k?'white':'#64748b', border:tab===k?'none':'1px solid #e2e8f0', cursor:'pointer', boxShadow:tab===k?'0 4px 14px rgba(10,37,88,0.25)':'none', transition:'all 0.15s ease' }}>
            {l}
          </button>
        ))}
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4" style={{ background:'#dcfce7', border:'1px solid #86efac' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
          <p className="text-green-700 font-semibold" style={{ fontSize:'13px' }}>Insurance information saved!</p>
        </div>
      )}

      <Card className="p-6">
        {tab === 'primary' && (
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Insurance Provider *" value={primary.provider} onChange={v=>setPrimary(p=>({...p,provider:v}))} placeholder="e.g. Blue Cross Blue Shield" />
              <Field label="Plan Name" value={primary.planName} onChange={v=>setPrimary(p=>({...p,planName:v}))} placeholder="e.g. BlueSelect Gold" />
              <Field label="Member ID *" value={primary.memberId} onChange={v=>setPrimary(p=>({...p,memberId:v}))} placeholder="e.g. XYZ123456789" />
              <Field label="Group Number" value={primary.groupNum} onChange={v=>setPrimary(p=>({...p,groupNum:v}))} placeholder="e.g. 987654" />
              <Field label="Plan Type" value={primary.planType} onChange={v=>setPrimary(p=>({...p,planType:v}))} placeholder="" options={PLAN_TYPES} />
              <Field label="Insurance Phone" value={primary.phone} onChange={v=>setPrimary(p=>({...p,phone:v}))} placeholder="(800) 000-0000" type="tel" />
            </div>

            {/* Upload card */}
            <div className="rounded-xl p-4 text-center" style={{ border:'2px dashed #e2e8f0', background:'#f8fafc' }}>
              <span style={{ fontSize:'28px', display:'block', marginBottom:'8px' }}>📄</span>
              <p className="font-bold text-[#0a2558] mb-1" style={{ fontSize:'13.5px' }}>Upload Insurance Card</p>
              <p className="text-gray-400 mb-3" style={{ fontSize:'12.5px' }}>Front & back — JPG, PNG or PDF</p>
              <label className="px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer inline-block"
                style={{ background:'#e8eef8', color:'#0a2558' }}>
                Choose File
                <input type="file" accept="image/*,.pdf" style={{ display:'none' }} />
              </label>
            </div>

            <button onClick={handleSave} className="font-black text-white rounded-xl py-3"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
              Save Primary Insurance
            </button>
          </div>
        )}

        {tab === 'medicaid' && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 mb-1">
              {['Medicaid','Medicare','Both'].map(t=>(
                <button key={t} onClick={()=>setMedicaid(m=>({...m,type:t}))}
                  className="flex-1 py-2 rounded-lg font-semibold text-sm"
                  style={{ background:medicaid.type===t?'#0a2558':'white', color:medicaid.type===t?'white':'#64748b', border:medicaid.type===t?'none':'1px solid #e2e8f0', cursor:'pointer' }}>
                  {t}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="State" value={medicaid.state} onChange={v=>setMedicaid(m=>({...m,state:v}))} placeholder="" options={STATES} />
              {(medicaid.type==='Medicaid'||medicaid.type==='Both') && (
                <Field label="Medicaid ID *" value={medicaid.medicaidId} onChange={v=>setMedicaid(m=>({...m,medicaidId:v}))} placeholder="e.g. GA1234567890" />
              )}
              {(medicaid.type==='Medicare'||medicaid.type==='Both') && (
                <Field label="Medicare ID *" value={medicaid.medicareId} onChange={v=>setMedicaid(m=>({...m,medicareId:v}))} placeholder="e.g. 1EG4-TE5-MK72" />
              )}
            </div>

            {/* NEMT note */}
            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background:'#fff7ed', border:'1px solid #fed7aa' }}>
              <span style={{ fontSize:'18px', flexShrink:0 }}>ℹ️</span>
              <p style={{ fontSize:'12.5px', color:'#9a3412', lineHeight:1.6 }}>
                Delta Care Transport is an approved Non-Emergency Medical Transportation (NEMT) provider. Medicaid/Medicare may cover your eligible rides. Contact us to verify coverage.
              </p>
            </div>

            <button onClick={handleSave} className="font-black text-white rounded-xl py-3"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
              Save Medicaid / Medicare Info
            </button>
          </div>
        )}

        {tab === 'secondary' && (
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Insurance Provider" value={secondary.provider} onChange={v=>setSecondary(s=>({...s,provider:v}))} placeholder="e.g. Aetna" />
              <Field label="Plan Name" value={secondary.planName} onChange={v=>setSecondary(s=>({...s,planName:v}))} placeholder="e.g. Aetna Gold" />
              <Field label="Member ID" value={secondary.memberId} onChange={v=>setSecondary(s=>({...s,memberId:v}))} placeholder="e.g. AET987654321" />
              <Field label="Group Number" value={secondary.groupNum} onChange={v=>setSecondary(s=>({...s,groupNum:v}))} placeholder="e.g. 112233" />
            </div>

            <div className="rounded-xl p-4 text-center" style={{ border:'2px dashed #e2e8f0', background:'#f8fafc' }}>
              <span style={{ fontSize:'28px', display:'block', marginBottom:'8px' }}>📄</span>
              <p className="font-bold text-[#0a2558] mb-1" style={{ fontSize:'13.5px' }}>Upload Secondary Insurance Card</p>
              <p className="text-gray-400 mb-3" style={{ fontSize:'12.5px' }}>Front & back — JPG, PNG or PDF</p>
              <label className="px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer inline-block"
                style={{ background:'#e8eef8', color:'#0a2558' }}>
                Choose File
                <input type="file" accept="image/*,.pdf" style={{ display:'none' }} />
              </label>
            </div>

            <button onClick={handleSave} className="font-black text-white rounded-xl py-3"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
              Save Secondary Insurance
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

/* ── FAMILY MEMBERS ── */
function FamilySection({ uid, family, setFamily }) {
  const [modal, setModal]   = useState(false)
  const [editId, setEditId] = useState(null)
  const [bookModal, setBookModal] = useState(null)
  const [form, setForm]     = useState({ name:'', relation:'', dob:'', phone:'', needs:[] })
  const [saved, setSaved]   = useState(false)

  const RELATIONS = ['Spouse','Mother','Father','Child','Sibling','Grandparent','Friend','Other']
  const NEEDS_OPT = ['Wheelchair','Oxygen','Stretcher','Visual Impairment','Hearing Impairment']

  const openAdd  = () => { setForm({ name:'', relation:'', dob:'', phone:'', needs:[] }); setEditId(null); setModal(true) }
  const openEdit = m  => { setForm({ name:m.name, relation:m.relation, dob:m.dob, phone:m.phone, needs:[...(m.needs||[])] }); setEditId(m.id); setModal(true) }

  const toggleNeed = need => setForm(f => ({
    ...f, needs: f.needs.includes(need) ? f.needs.filter(n=>n!==need) : [...f.needs, need]
  }))

  const save = async () => {
    if (!form.name || !form.relation) return
    if (editId) {
      await updateFamilyMember(uid, editId, form)
      setFamily(prev => prev.map(m => m.id===editId ? { ...m, ...form } : m))
    } else {
      const ref = await addFamilyMember(uid, { ...form, active:true })
      setFamily(prev => [...prev, { id: ref.id, ...form, active:true }])
    }
    setModal(false); setSaved(true); setTimeout(()=>setSaved(false), 2500)
  }

  const remove = async id => {
    await deleteFamilyMember(uid, id)
    setFamily(prev => prev.filter(m => m.id !== id))
  }

  const calcAge = dob => {
    if (!dob) return '—'
    const diff = Date.now() - new Date(dob).getTime()
    return Math.floor(diff / (1000*60*60*24*365.25)) + ' yrs'
  }

  return (
    <div className="dash-section max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle>Family Members</SectionTitle>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white"
          style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'13px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="13" height="13"><path d="M12 5v14M5 12h14"/></svg>
          Add Member
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4" style={{ background:'#dcfce7', border:'1px solid #86efac' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
          <p className="text-green-700 font-semibold" style={{ fontSize:'13px' }}>Family member saved!</p>
        </div>
      )}

      {family.length === 0
        ? <EmptyState emoji="👨‍👩‍👧" label="No family members added yet" />
        : <div className="flex flex-col gap-4">
            {family.map(m => (
              <Card key={m.id} className="p-5">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:'linear-gradient(135deg,#0a2558,#1e40af)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span className="text-white font-black" style={{ fontSize:'16px' }}>{m.name.split(' ').slice(0,2).map(w=>w[0]).join('')}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-black text-[#0a2558]" style={{ fontSize:'15px' }}>{m.name}</p>
                      <span className="px-2.5 py-0.5 rounded-full font-bold" style={{ background:'#e8eef8', color:'#0a2558', fontSize:'11.5px' }}>{m.relation}</span>
                    </div>
                    <div className="flex gap-4 mt-1.5 flex-wrap">
                      <span className="text-gray-500" style={{ fontSize:'12.5px' }}>Age: {calcAge(m.dob)}</span>
                      <span className="text-gray-500" style={{ fontSize:'12.5px' }}>📞 {m.phone}</span>
                    </div>
                    {m.needs.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {m.needs.map(n => (
                          <span key={n} className="px-2.5 py-0.5 rounded-full font-semibold" style={{ background:'#fff7ed', color:'#f97316', border:'1px solid #fed7aa', fontSize:'11.5px' }}>{n}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setBookModal(m)}
                      className="px-3 py-1.5 rounded-lg font-bold text-white"
                      style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'12px' }}>
                      Book Ride
                    </button>
                    <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg" style={{ background:'#f1f7fe', border:'none', cursor:'pointer' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button onClick={() => remove(m.id)} className="p-1.5 rounded-lg" style={{ background:'#fef2f2', border:'none', cursor:'pointer' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
      }

      {/* Add/Edit modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editId ? 'Edit Member' : 'Add Family Member'}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Full Name *</label>
              <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Full name" style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Relationship *</label>
              <select value={form.relation} onChange={e=>setForm(f=>({...f,relation:e.target.value}))} style={INP} onFocus={focus} onBlur={blur}>
                <option value="">Select…</option>
                {RELATIONS.map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Date of Birth</label>
              <input type="date" value={form.dob} onChange={e=>setForm(f=>({...f,dob:e.target.value}))} style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div className="col-span-2">
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Phone Number</label>
              <input type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="(470) 000-0000" style={INP} onFocus={focus} onBlur={blur} />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-[#0a2558] mb-2" style={{ fontSize:'13px' }}>Special Needs</label>
            <div className="flex flex-wrap gap-2">
              {NEEDS_OPT.map(n => (
                <button key={n} type="button" onClick={() => toggleNeed(n)}
                  className="px-3 py-1.5 rounded-full font-semibold text-sm"
                  style={{ background: form.needs.includes(n)?'#fff7ed':'#f1f5f9', color: form.needs.includes(n)?'#f97316':'#64748b', border: form.needs.includes(n)?'1.5px solid #f97316':'1.5px solid transparent', cursor:'pointer' }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button onClick={save} className="w-full py-3 rounded-xl font-bold text-white"
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
            {editId ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </Modal>

      {/* Book ride for member */}
      <Modal open={!!bookModal} onClose={() => setBookModal(null)} title={`Book Ride for ${bookModal?.name}`}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'#f8fafc', border:'1px solid #e8eef8' }}>
            <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:'linear-gradient(135deg,#0a2558,#1e40af)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span className="text-white font-black" style={{ fontSize:'14px' }}>{bookModal?.name.split(' ').slice(0,2).map(w=>w[0]).join('')}</span>
            </div>
            <div>
              <p className="font-bold text-[#0a2558]" style={{ fontSize:'13.5px' }}>{bookModal?.name}</p>
              <p className="text-gray-400" style={{ fontSize:'12px' }}>{bookModal?.relation} · {bookModal?.needs.join(', ') || 'No special needs'}</p>
            </div>
          </div>
          {['Pickup Location','Drop-off Location'].map(lbl=>(
            <div key={lbl}>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>{lbl} *</label>
              <input placeholder="Enter address" style={INP} onFocus={focus} onBlur={blur} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Date *</label>
              <input type="date" style={INP} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Time *</label>
              <input type="time" style={INP} onFocus={focus} onBlur={blur} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setBookModal(null)} className="flex-1 py-2.5 rounded-xl font-semibold" style={{ background:'#f1f5f9', color:'#64748b', border:'none', cursor:'pointer', fontSize:'13.5px' }}>Cancel</button>
            <button onClick={() => setBookModal(null)} className="flex-1 py-2.5 rounded-xl font-bold text-white" style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'13.5px' }}>Submit Booking</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

/* ── REFERRAL & LOYALTY ── */
function ReferralSection({ uid, loyalty, setLoyalty, loyaltyHistory, setLoyaltyHistory }) {
  const [copied, setCopied] = useState(false)
  const [redeeming, setRedeeming] = useState(null)

  const REFERRAL_CODE = loyalty.referralCode || ('DELTA-' + uid.slice(0,6).toUpperCase())
  const REFERRAL_LINK = `deltacaretransport.com/signup?ref=${REFERRAL_CODE}`

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(()=>setCopied(false), 2000) })
  }

  const totalPoints = loyalty.points
  const nextReward  = totalPoints < 500 ? 500 : totalPoints < 1000 ? 1000 : totalPoints < 2000 ? 2000 : 5000
  const progress    = Math.min((totalPoints / nextReward) * 100, 100)

  const REWARDS = [
    { pts:500,  label:'$5 Off Next Ride'       },
    { pts:1000, label:'$10 Off Next Ride'      },
    { pts:2000, label:'Free Ride (up to $40)'  },
    { pts:5000, label:'VIP Member Status'      },
  ]

  const handleRedeem = async (reward) => {
    setRedeeming(reward.pts)
    const ok = await redeemReward(uid, reward.pts, reward.label)
    if (ok) {
      setLoyalty(prev => ({
        ...prev,
        points: Math.max(0, prev.points - reward.pts),
        redeemedRewards: [...(prev.redeemedRewards||[]), reward.pts],
      }))
      setLoyaltyHistory(prev => [{
        id: Date.now(), desc: `Redeemed: ${reward.label}`, pts: -reward.pts,
        date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'}), color:'#b91c1c'
      }, ...prev])
    }
    setRedeeming(null)
  }

  return (
    <div className="dash-section max-w-2xl">

      {/* Points banner */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0a2558,#1e40af)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'22px 22px' }} />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold mb-1" style={{ color:'rgba(255,255,255,0.6)', fontSize:'13px' }}>Your Loyalty Points</p>
            <p className="text-white font-black" style={{ fontSize:'40px', lineHeight:1 }}>{totalPoints.toLocaleString()}</p>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'12.5px', marginTop:'4px' }}>{nextReward - totalPoints} pts to next reward</p>
          </div>
          <div className="text-center">
            <span style={{ fontSize:'52px' }}>⭐</span>
            <p className="text-white font-bold" style={{ fontSize:'13px' }}>{loyalty.tier} Member</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="relative z-10 mt-5">
          <div className="w-full rounded-full" style={{ height:'8px', background:'rgba(255,255,255,0.15)' }}>
            <div className="rounded-full" style={{ height:'8px', width:`${progress}%`, background:'#f97316', transition:'width 0.6s ease' }} />
          </div>
          <div className="flex justify-between mt-1">
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px' }}>0</p>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px' }}>{nextReward} pts</p>
          </div>
        </div>
      </div>

      {/* Referral card */}
      <Card className="p-5 mb-5">
        <SectionTitle>Refer a Friend — Earn 150 Points</SectionTitle>
        <p className="text-gray-500 mb-4" style={{ fontSize:'13.5px' }}>Share your code or link. When a friend signs up and completes their first ride, you both get rewarded.</p>

        {/* Code box */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 rounded-xl px-4 py-3 flex items-center justify-between" style={{ background:'#f8fafc', border:'1.5px dashed #e2e8f0' }}>
            <span className="font-black text-[#0a2558]" style={{ fontSize:'16px', letterSpacing:'0.08em' }}>{REFERRAL_CODE}</span>
          </div>
          <button onClick={() => copy(REFERRAL_CODE)}
            className="px-4 py-3 rounded-xl font-bold flex items-center gap-2"
            style={{ background: copied ? '#dcfce7' : '#f1f7fe', color: copied ? '#15803d' : '#0a2558', border:'none', cursor:'pointer', fontSize:'13px', whiteSpace:'nowrap', transition:'all 0.2s' }}>
            {copied
              ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M20 6L9 17l-5-5"/></svg> Copied!</>
              : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Code</>
            }
          </button>
        </div>

        {/* Share link */}
        <div className="flex items-center gap-3">
          <input readOnly value={REFERRAL_LINK} style={{ ...INP, flex:1, color:'#94a3b8', fontSize:'12.5px' }} />
          <button onClick={() => copy(REFERRAL_LINK)}
            className="px-4 py-2.5 rounded-xl font-bold text-white"
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'13px', whiteSpace:'nowrap' }}>
            Copy Link
          </button>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { step:'1', label:'Share your code',      emoji:'📤' },
            { step:'2', label:'Friend signs up',       emoji:'👤' },
            { step:'3', label:'Both earn 150 pts',     emoji:'🎁' },
          ].map(s => (
            <div key={s.step} className="text-center p-3 rounded-xl" style={{ background:'#f8fafc', border:'1px solid #e8eef8' }}>
              <span style={{ fontSize:'22px' }}>{s.emoji}</span>
              <p className="font-black text-[#0a2558] mt-1" style={{ fontSize:'11px' }}>STEP {s.step}</p>
              <p className="text-gray-500" style={{ fontSize:'11.5px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Rewards */}
      <Card className="p-5 mb-5">
        <SectionTitle>Redeem Rewards</SectionTitle>
        <div className="flex flex-col gap-3">
          {REWARDS.map(r => {
            const isRedeemed = (loyalty.redeemedRewards||[]).includes(r.pts)
            const canRedeem  = totalPoints >= r.pts && !isRedeemed
            return (
              <div key={r.pts} className="flex items-center gap-4 p-3 rounded-xl"
                style={{ background: isRedeemed ? '#f0fdf4' : canRedeem ? '#fff7ed' : '#f8fafc', border:`1px solid ${isRedeemed?'#86efac':canRedeem?'#fed7aa':'#e8eef8'}` }}>
                <div className="text-2xl">🎟️</div>
                <div className="flex-1">
                  <p className="font-bold text-[#0a2558]" style={{ fontSize:'13.5px' }}>{r.label}</p>
                  <p className="font-semibold" style={{ fontSize:'12px', color: canRedeem?'#f97316':'#94a3b8' }}>{r.pts.toLocaleString()} points</p>
                </div>
                {isRedeemed
                  ? <span className="px-3 py-1 rounded-full font-bold text-green-700" style={{ background:'#dcfce7', fontSize:'12px' }}>✓ Redeemed</span>
                  : <button disabled={!canRedeem || redeeming === r.pts} onClick={() => handleRedeem(r)}
                      className="px-3 py-1.5 rounded-lg font-bold"
                      style={{ background: canRedeem?'linear-gradient(135deg,#f97316,#ea580c)':'#f1f5f9', color: canRedeem?'white':'#94a3b8', border:'none', cursor: canRedeem?'pointer':'not-allowed', fontSize:'12.5px' }}>
                      {redeeming === r.pts ? '…' : 'Redeem'}
                    </button>
                }
              </div>
            )
          })}
        </div>
      </Card>

      {/* Points history */}
      <Card className="p-5">
        <SectionTitle>Points History</SectionTitle>
        {loyaltyHistory.length === 0
          ? <p className="text-gray-400 text-sm">No history yet.</p>
          : <div className="flex flex-col">
              {loyaltyHistory.map((h,i) => (
                <div key={h.id||i} className="flex items-center justify-between py-3" style={{ borderBottom: i<loyaltyHistory.length-1?'1px solid #f8fafc':'none' }}>
                  <div className="flex items-center gap-3">
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:h.color, flexShrink:0 }} />
                    <p className="text-gray-700 font-medium" style={{ fontSize:'13px' }}>{h.desc}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="font-black" style={{ fontSize:'14px', color:h.color }}>{h.pts > 0 ? `+${h.pts}` : h.pts}</p>
                    <p className="text-gray-400" style={{ fontSize:'11px' }}>{h.date}</p>
                  </div>
                </div>
              ))}
            </div>
        }
      </Card>
    </div>
  )
}

/* ── ACCOUNT SETTINGS ── */
function SettingsSection({ user, settings, setSettings }) {
  const DEFAULT_NOTIF = { bookingConfirmed:true, driverAssigned:true, rideReminder:true, rideCompleted:true, promoOffers:false, smsAlerts:true, emailAlerts:true, appPush:false }
  const [notifSettings, setNotifSettings] = useState({ ...DEFAULT_NOTIF })
  const [privacy, setPrivacy] = useState({ shareData:false, analytics:true })
  const [pwForm, setPwForm]   = useState({ current:'', newPw:'', confirm:'' })
  const [pwSaved, setPwSaved] = useState(false)
  const [pwError, setPwError] = useState('')
  const [tab, setTab]         = useState('notifications')
  const [saved, setSaved]     = useState(false)

  useEffect(() => {
    if (Object.keys(settings).length === 0) return
    setNotifSettings(s => ({ ...s, ...settings }))
    setPrivacy({ shareData: settings.shareData ?? false, analytics: settings.analytics ?? true })
  }, [settings])

  const Toggle = ({ value, onChange }) => (
    <button type="button" onClick={() => onChange(!value)}
      className="relative inline-flex items-center rounded-full transition-colors shrink-0"
      style={{ width:'44px', height:'24px', background: value?'#f97316':'#e2e8f0', border:'none', cursor:'pointer', padding:'2px' }}>
      <span style={{ width:'20px', height:'20px', borderRadius:'50%', background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.15)', transform: value?'translateX(20px)':'translateX(0)', transition:'transform 0.2s', display:'block' }} />
    </button>
  )

  const setN = (key, val) => setNotifSettings(s => ({ ...s, [key]: val }))

  const handlePwSave = async (e) => {
    e.preventDefault(); setPwError('')
    if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match.'); return }
    if (pwForm.newPw.length < 6) { setPwError('Password must be at least 6 characters.'); return }
    try {
      const credential = EmailAuthProvider.credential(user.email, pwForm.current)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, pwForm.newPw)
      setPwSaved(true); setPwForm({ current:'', newPw:'', confirm:'' })
      setTimeout(() => setPwSaved(false), 3000)
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') setPwError('Current password is incorrect.')
      else if (err.code === 'auth/too-many-requests') setPwError('Too many attempts. Please try again later.')
      else if (err.code === 'auth/requires-recent-login') setPwError('Please log out and log back in before changing your password.')
      else setPwError('Password change failed. If you signed up with Google, use Google to manage your password.')
    }
  }

  const notifGroups = [
    {
      title: 'Ride Notifications',
      items: [
        { key:'bookingConfirmed', label:'Booking Confirmed',  desc:'When a ride is confirmed by our team' },
        { key:'driverAssigned',   label:'Driver Assigned',    desc:'When a driver is assigned to your ride' },
        { key:'rideReminder',     label:'Ride Reminder',      desc:'24 hours before your scheduled ride' },
        { key:'rideCompleted',    label:'Ride Completed',     desc:'After your ride is marked complete' },
      ]
    },
    {
      title: 'Promotions & Offers',
      items: [
        { key:'promoOffers', label:'Promo & Coupon Alerts', desc:'New discounts and limited-time offers' },
      ]
    },
    {
      title: 'Delivery Channel',
      items: [
        { key:'smsAlerts',   label:'SMS / Text Messages', desc:'Receive alerts via text message' },
        { key:'emailAlerts', label:'Email Notifications', desc:'Receive alerts via email' },
        { key:'appPush',     label:'Push Notifications',  desc:'Browser push notifications (when supported)' },
      ]
    },
  ]

  return (
    <div className="dash-section max-w-xl">
      {/* Tab nav */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[['notifications','Notifications'],['password','Password'],['privacy','Privacy']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            className="px-5 py-2 rounded-xl font-bold text-sm"
            style={{ background:tab===k?'linear-gradient(135deg,#0a2558,#1e40af)':'white', color:tab===k?'white':'#64748b', border:tab===k?'none':'1px solid #e2e8f0', cursor:'pointer', boxShadow:tab===k?'0 4px 14px rgba(10,37,88,0.25)':'none', transition:'all 0.15s ease' }}>
            {l}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {tab === 'notifications' && (
        <div className="flex flex-col gap-4">
          {notifGroups.map(group => (
            <Card key={group.title} className="overflow-hidden">
              <div className="px-5 pt-4 pb-3" style={{ borderBottom:'1px solid #f8fafc' }}>
                <p className="font-black text-[#0a2558]" style={{ fontSize:'13.5px', letterSpacing:'-0.01em' }}>{group.title}</p>
              </div>
              <div className="p-5">
              <div className="flex flex-col gap-4">
                {group.items.map(item => (
                  <div key={item.key} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800" style={{ fontSize:'13.5px' }}>{item.label}</p>
                      <p className="text-gray-400" style={{ fontSize:'12px' }}>{item.desc}</p>
                    </div>
                    <Toggle value={notifSettings[item.key]} onChange={v=>setN(item.key,v)} />
                  </div>
                ))}
              </div>
            </div>
            </Card>
          ))}
          <button onClick={async () => { await saveSettings(user.uid, notifSettings); setSettings(s=>({...s,...notifSettings})); setSaved(true); setTimeout(()=>setSaved(false),2500) }}
            className="font-black text-white rounded-xl py-3"
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
            {saved ? '✓ Preferences Saved!' : 'Save Preferences'}
          </button>
        </div>
      )}

      {/* Password */}
      {tab === 'password' && (
        <Card className="p-6">
          <p className="font-black text-[#0a2558] mb-1" style={{ fontSize:'15px' }}>Change Password</p>
          <p className="text-gray-400 mb-5" style={{ fontSize:'13px' }}>Logged in as <strong>{user.email}</strong></p>

          {pwSaved && (
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4" style={{ background:'#dcfce7', border:'1px solid #86efac' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>
              <p className="text-green-700 font-semibold" style={{ fontSize:'13px' }}>Password updated successfully!</p>
            </div>
          )}
          {pwError && (
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4" style={{ background:'#fef2f2', border:'1px solid #fecaca' }}>
              <p className="text-red-600 font-medium" style={{ fontSize:'13px' }}>{pwError}</p>
            </div>
          )}

          <form onSubmit={handlePwSave} className="flex flex-col gap-4">
            {[['Current Password','current'],['New Password','newPw'],['Confirm New Password','confirm']].map(([lbl,key])=>(
              <div key={key}>
                <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>{lbl}</label>
                <input required type="password" value={pwForm[key]} onChange={e=>setPwForm(f=>({...f,[key]:e.target.value}))}
                  placeholder="••••••••" style={INP} onFocus={focus} onBlur={blur} />
              </div>
            ))}
            <div className="rounded-xl p-3 flex items-start gap-2" style={{ background:'#fff7ed', border:'1px solid #fed7aa' }}>
              <span style={{ fontSize:'16px', flexShrink:0 }}>💡</span>
              <p style={{ fontSize:'12px', color:'#9a3412' }}>If you signed up with Google, you may not have a password. Use Google Sign-In to log in.</p>
            </div>
            <button type="submit" className="font-black text-white rounded-xl py-3"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
              Update Password
            </button>
          </form>
        </Card>
      )}

      {/* Privacy */}
      {tab === 'privacy' && (
        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <p className="font-black text-[#0a2558] mb-4" style={{ fontSize:'14px' }}>Privacy Settings</p>
            <div className="flex flex-col gap-5">
              {[
                { key:'shareData',  label:'Share data with partners', desc:'Allow anonymized trip data to be used for service improvements' },
                { key:'analytics',  label:'Usage analytics',          desc:'Help us improve by sharing how you use the dashboard' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-800" style={{ fontSize:'13.5px' }}>{item.label}</p>
                    <p className="text-gray-400" style={{ fontSize:'12px' }}>{item.desc}</p>
                  </div>
                  <button type="button" onClick={() => setPrivacy(p=>({...p,[item.key]:!p[item.key]}))}
                    className="relative inline-flex items-center rounded-full transition-colors shrink-0"
                    style={{ width:'44px', height:'24px', background: privacy[item.key]?'#f97316':'#e2e8f0', border:'none', cursor:'pointer', padding:'2px' }}>
                    <span style={{ width:'20px', height:'20px', borderRadius:'50%', background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.15)', transform: privacy[item.key]?'translateX(20px)':'translateX(0)', transition:'transform 0.2s', display:'block' }} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="font-black text-[#0a2558] mb-3" style={{ fontSize:'14px' }}>Danger Zone</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background:'#fef2f2', border:'1px solid #fecaca' }}>
                <div>
                  <p className="font-bold text-red-700" style={{ fontSize:'13.5px' }}>Delete Account</p>
                  <p className="text-red-400" style={{ fontSize:'12px' }}>Permanently remove your account and all data</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg font-bold text-red-600"
                  style={{ background:'white', border:'1px solid #fecaca', cursor:'pointer', fontSize:'12.5px' }}>
                  Delete
                </button>
              </div>
            </div>
          </Card>

          <button onClick={async () => { await saveSettings(user.uid, privacy); setSettings(s=>({...s,...privacy})); setSaved(true); setTimeout(()=>setSaved(false),2500) }}
            className="font-black text-white rounded-xl py-3"
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px' }}>
            {saved ? '✓ Saved!' : 'Save Privacy Settings'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── NOTIFICATIONS ── */
function NotificationsSection({ notifs, setNotifs, uid }) {
  const unread = notifs.filter(n=>!n.read).length
  return (
    <div className="dash-section max-w-2xl flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1 pb-3" style={{ borderBottom:'1px solid #f1f5f9' }}>
        <div className="flex items-center gap-2.5">
          <div style={{ width:'4px', height:'22px', background:'linear-gradient(180deg,#f97316,#ea580c)', borderRadius:'3px', boxShadow:'0 2px 8px rgba(249,115,22,0.35)' }} />
          <div>
            <p className="font-black text-[#0a2558]" style={{ fontSize:'15px', letterSpacing:'-0.01em' }}>Notifications</p>
            {unread > 0 && <p className="text-gray-400" style={{ fontSize:'11.5px', marginTop:'1px' }}>{unread} unread message{unread > 1 ? 's' : ''}</p>}
          </div>
          {unread > 0 && (
            <span className="notif-badge w-6 h-6 rounded-full flex items-center justify-center font-black text-white"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', fontSize:'11px', boxShadow:'0 2px 8px rgba(249,115,22,0.4)' }}>{unread}</span>
          )}
        </div>
        <button onClick={async () => { await markAllNotifsRead(uid); setNotifs(n=>n.map(x=>({...x,read:true}))) }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold"
          style={{ background:'#fff7ed', border:'1px solid #fed7aa', color:'#ea580c', fontSize:'12.5px', cursor:'pointer' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M20 6L9 17l-5-5"/></svg>
          Mark all read
        </button>
      </div>
      {notifs.map(n => (
        <div key={n.id} onClick={async () => { if (!n.read) { await markNotifRead(uid, n.id); setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x)) } }}
          className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer"
          style={{ background: n.read?'white':'linear-gradient(135deg,#f0f7ff,#eff6ff)', border:`1px solid ${n.read?'#e8eef8':'#bfdbfe'}`, transition:'all 0.18s ease', boxShadow: n.read?'none':'0 2px 12px rgba(10,37,88,0.07)' }}
          onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 6px 20px rgba(10,37,88,0.1)'; e.currentTarget.style.borderColor='#93c5fd' }}
          onMouseLeave={e=>{ e.currentTarget.style.boxShadow=n.read?'none':'0 2px 12px rgba(10,37,88,0.07)'; e.currentTarget.style.borderColor=n.read?'#e8eef8':'#bfdbfe' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: n.read?'#f1f5f9':'#dbeafe', fontSize:'18px' }}>{n.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-[#0a2558]" style={{ fontSize:'13.5px' }}>{n.title}</p>
              {!n.read && <span className="px-2 py-0.5 rounded-full font-bold" style={{ fontSize:'10px', background:'#fef9c3', color:'#a16207', letterSpacing:'0.05em' }}>NEW</span>}
            </div>
            <p className="text-gray-500 mt-0.5" style={{ fontSize:'13px', lineHeight:'1.5' }}>{n.msg}</p>
            <p className="text-gray-400 mt-1.5" style={{ fontSize:'11px', fontWeight:600 }}>{n.time || timeAgo(n.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
