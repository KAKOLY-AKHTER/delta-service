import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import emailjs from '@emailjs/browser'
import {
  getAllBookings, getAllUsers, getAllTickets,
  updateTicketStatus, adminUpdateBooking, adminAddPayment,
  getAllContactRequests, updateContactRequestStatus, addNotification,
} from '../services/firestoreService'

/* ── EmailJS helper ── */
const EJS_SERVICE  = 'service_j8h9vok'
const EJS_TEMPLATE = 'template_k6pk0ux'
const EJS_KEY      = 'B8ny8gwXCigFq_Sa7'

const sendUserEmail = (to, subject, params) => {
  if (!to) return Promise.resolve()
  return emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
    to_email:     to,
    subject:      subject,
    to_name:      params.to_name     || 'Customer',
    message:      params.message     || '',
    booking_id:   params.booking_id  || '—',
    service_type: params.service_type|| '—',
    from_loc:     params.from_loc    || '—',
    to_loc:       params.to_loc      || '—',
    date:         params.date        || '—',
    time:         params.time        || '—',
  }, EJS_KEY).catch(() => {})
}

/* ── Constants ── */
const STATUS_OPTS = ['Pending','Confirmed','In Progress','Completed','Cancelled']
const STATUS_STYLE = {
  Pending:       { bg:'#fef3c7', color:'#b45309', dot:'#f59e0b', glow:'rgba(245,158,11,0.2)' },
  Confirmed:     { bg:'#dbeafe', color:'#1d4ed8', dot:'#3b82f6', glow:'rgba(59,130,246,0.2)' },
  'In Progress': { bg:'#ede9fe', color:'#7c3aed', dot:'#8b5cf6', glow:'rgba(139,92,246,0.2)' },
  Completed:     { bg:'#d1fae5', color:'#065f46', dot:'#10b981', glow:'rgba(16,185,129,0.2)' },
  Cancelled:     { bg:'#fee2e2', color:'#b91c1c', dot:'#ef4444', glow:'rgba(239,68,68,0.2)'  },
}
const TICKET_STATUS_OPTS = ['Open','In Progress','Resolved','Closed']
const TICKET_BADGE = {
  Open:          { bg:'#fef3c7', color:'#b45309', border:'#fcd34d' },
  'In Progress': { bg:'#dbeafe', color:'#1d4ed8', border:'#93c5fd' },
  Resolved:      { bg:'#d1fae5', color:'#065f46', border:'#6ee7b7' },
  Closed:        { bg:'#f1f5f9', color:'#64748b', border:'#cbd5e1' },
}

const NAV = [
  { key:'overview',  label:'Overview',          icon:'grid'     },
  { key:'bookings',  label:'All Bookings',       icon:'calendar' },
  { key:'contacts',  label:'Contact Requests',   icon:'mail'     },
  { key:'users',     label:'Users',              icon:'users'    },
  { key:'tickets',   label:'Support Tickets',    icon:'help'     },
  { key:'payments',  label:'Add Payment',        icon:'card'     },
]

const CONTACT_STATUS_OPTS = ['New', 'Called', 'Booked', 'Closed']
const CONTACT_BADGE = {
  New:    { bg:'#fef3c7', color:'#b45309', border:'#fcd34d' },
  Called: { bg:'#dbeafe', color:'#1d4ed8', border:'#93c5fd' },
  Booked: { bg:'#d1fae5', color:'#065f46', border:'#6ee7b7' },
  Closed: { bg:'#f1f5f9', color:'#64748b', border:'#cbd5e1' },
}

const INP = {
  width:'100%', padding:'11px 14px', borderRadius:'10px',
  border:'1.5px solid #e2e8f0', fontSize:'13.5px', outline:'none',
  background:'white', boxSizing:'border-box', fontFamily:'inherit',
  transition:'border-color 0.15s',
}

/* ── NavIcon ── */
function NavIcon({ type, active }) {
  const c = active ? '#f97316' : 'rgba(255,255,255,0.4)'
  const icons = {
    grid:     <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    mail:     <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    users:    <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    help:     <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></>,
    card:     <><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></>,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" width="17" height="17" style={{ flexShrink:0 }}>
      {icons[type]}
    </svg>
  )
}

/* ── Card ── */
function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background:'white', border:'1px solid #eaeff8', boxShadow:'0 4px 24px rgba(10,37,88,0.07), 0 1px 4px rgba(0,0,0,0.02)' }}>
      {children}
    </div>
  )
}

/* ── SectionTitle ── */
function SectionTitle({ children, sub }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div style={{ width:'4px', height:'22px', background:'linear-gradient(180deg,#f97316,#ea580c)', borderRadius:'3px', boxShadow:'0 2px 8px rgba(249,115,22,0.35)', flexShrink:0 }} />
      <div>
        <p className="font-black text-[#0a2558]" style={{ fontSize:'15px', letterSpacing:'-0.01em' }}>{children}</p>
        {sub && <p className="text-gray-400" style={{ fontSize:'11.5px', marginTop:'1px' }}>{sub}</p>}
      </div>
    </div>
  )
}

/* ── StatusBadge ── */
function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || { bg:'#f1f5f9', color:'#64748b', dot:'#94a3b8', glow:'transparent' }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold"
      style={{ background:s.bg, color:s.color, fontSize:'11px', whiteSpace:'nowrap', boxShadow:`0 0 0 1px ${s.glow}` }}>
      <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:s.dot, flexShrink:0, boxShadow:`0 0 4px ${s.dot}` }} />
      {status}
    </span>
  )
}

/* ── TicketBadge ── */
function TicketBadge({ status }) {
  const s = TICKET_BADGE[status] || TICKET_BADGE.Open
  return (
    <span className="px-2.5 py-1 rounded-full font-bold"
      style={{ background:s.bg, color:s.color, border:`1px solid ${s.border}`, fontSize:'11px', whiteSpace:'nowrap' }}>
      {status}
    </span>
  )
}

/* ── Modal ── */
function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:'rgba(5,15,50,0.55)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)' }}
      onClick={onClose}>
      <div className="w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: wide ? '620px' : '460px', background:'white', boxShadow:'0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.5)', animation:'dashScaleIn 0.2s ease both' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom:'1px solid #f1f5f9', background:'linear-gradient(135deg,#fafbff,#fff)' }}>
          <p className="font-black text-[#0a2558]" style={{ fontSize:'15px', letterSpacing:'-0.01em' }}>{title}</p>
          <button onClick={onClose}
            style={{ background:'#f1f5f9', border:'none', borderRadius:'8px', width:'30px', height:'30px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

/* ── EmptyState ── */
function EmptyState({ emoji, label }) {
  return (
    <div className="text-center py-16 rounded-2xl flex flex-col items-center"
      style={{ background:'linear-gradient(135deg,#f8faff 0%,#fff8f5 100%)', border:'1.5px dashed #dde6f5' }}>
      <div className="text-4xl mb-3" style={{ filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.08))' }}>{emoji}</div>
      <p className="font-semibold text-gray-400" style={{ fontSize:'13.5px' }}>{label}</p>
    </div>
  )
}

/* ── timeAgo ── */
function timeAgo(ts) {
  if (!ts) return '—'
  const date = ts.toDate ? ts.toDate() : new Date(ts)
  if (isNaN(date)) return '—'
  const diff = Date.now() - date.getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'Just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

/* ── Table wrapper ── */
function Table({ headers, children, empty }) {
  if (empty) return empty
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'linear-gradient(135deg,#f8fafc,#f1f5ff)' }}>
              {headers.map(h => (
                <th key={h} style={{ padding:'13px 16px', textAlign:'left', fontSize:'10.5px', fontWeight:800, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e8eef8', whiteSpace:'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </Card>
  )
}

/* ── PrimaryBtn ── */
function PrimaryBtn({ onClick, disabled, loading, children, small }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="dash-btn-primary flex items-center justify-center gap-2 font-black text-white rounded-xl"
      style={{
        background: disabled ? '#d1dce8' : 'linear-gradient(135deg,#f97316,#ea580c)',
        border:'none', cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: small ? '13px' : '14px',
        padding: small ? '8px 18px' : '12px 24px',
        boxShadow: disabled ? 'none' : '0 4px 16px rgba(249,115,22,0.3)',
      }}>
      {loading && <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg>}
      {children}
    </button>
  )
}

/* ══════════════════════════════════
   PIN LOCKSCREEN
══════════════════════════════════ */
function PinGate({ onPass }) {
  const [pin, setPin]       = useState('')
  const [show, setShow]     = useState(false)
  const [error, setError]   = useState(false)
  const [shake, setShake]   = useState(false)

  const CORRECT = import.meta.env.VITE_ADMIN_PIN || 'Delta@2026'

  const check = () => {
    if (pin === CORRECT) {
      onPass()
    } else {
      setError(true)
      setShake(true)
      setPin('')
      setTimeout(() => { setError(false); setShake(false) }, 1800)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background:'linear-gradient(135deg,#0b1a3d 0%,#0a2558 60%,#0c2a6b 100%)' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
      <div style={{ position:'absolute', right:0, top:0, width:'50%', height:'100%', background:'radial-gradient(ellipse at top right, rgba(249,115,22,0.08), transparent 60%)', pointerEvents:'none' }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden"
            style={{ background:'white', boxShadow:'0 8px 32px rgba(10,37,88,0.25)' }}>
            <img src={logo} alt="Delta Care" style={{ width:'100%', height:'100%', objectFit:'contain' }} />
          </div>
          <p className="text-white font-black" style={{ fontSize:'22px', letterSpacing:'-0.02em' }}>Delta Care Admin</p>
          <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'13px', marginTop:'4px' }}>Enter password to continue</p>
        </div>

        {/* Card */}
        <div className={`rounded-2xl p-8 ${shake ? 'animate-[dashScaleIn_0.1s_ease_both]' : ''}`}
          style={{
            background:'rgba(255,255,255,0.06)',
            border: error ? '1.5px solid rgba(239,68,68,0.5)' : '1.5px solid rgba(255,255,255,0.1)',
            backdropFilter:'blur(20px)',
            WebkitBackdropFilter:'blur(20px)',
            transition:'border-color 0.2s',
            animation: shake ? 'pinShake 0.4s ease' : 'none',
          }}>
          <div className="mb-5">
            <label style={{ color:'rgba(255,255,255,0.5)', fontSize:'11.5px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:'10px' }}>
              Admin Password
            </label>
            <div style={{ position:'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                value={pin}
                onChange={e => setPin(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && check()}
                placeholder="••••••••"
                autoFocus
                style={{
                  width:'100%', padding:'14px 48px 14px 16px', borderRadius:'12px', fontSize:'16px',
                  background:'rgba(255,255,255,0.08)', border: error ? '1.5px solid rgba(239,68,68,0.6)' : '1.5px solid rgba(255,255,255,0.15)',
                  color:'white', outline:'none', boxSizing:'border-box', fontFamily:'inherit',
                  letterSpacing: show ? '0' : '0.1em', transition:'border-color 0.2s',
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = 'rgba(249,115,22,0.6)' }}
                onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(255,255,255,0.15)' }}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', padding:'4px', color:'rgba(255,255,255,0.4)', display:'flex', alignItems:'center' }}
              >
                {show ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {error && (
              <p style={{ color:'#fca5a5', fontSize:'12.5px', marginTop:'8px', fontWeight:600 }}>
                ✗ Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button onClick={check}
            style={{
              width:'100%', padding:'14px', borderRadius:'12px', background:'linear-gradient(135deg,#f97316,#ea580c)',
              border:'none', color:'white', fontWeight:800, fontSize:'14.5px', cursor:'pointer',
              boxShadow:'0 6px 20px rgba(249,115,22,0.4)', transition:'opacity 0.15s', letterSpacing:'0.02em',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Enter Admin Panel →
          </button>
        </div>

        <p className="text-center mt-6" style={{ color:'rgba(255,255,255,0.18)', fontSize:'11.5px' }}>
          Authorized personnel only
        </p>
      </div>

      <style>{`
        @keyframes pinShake {
          0%,100% { transform: translateX(0) }
          15%      { transform: translateX(-8px) }
          30%      { transform: translateX(8px) }
          45%      { transform: translateX(-6px) }
          60%      { transform: translateX(6px) }
          75%      { transform: translateX(-3px) }
          90%      { transform: translateX(3px) }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════
   MAIN ADMIN PAGE
══════════════════════════════════ */
export default function AdminPage() {
  const navigate = useNavigate()
  const [pinPassed, setPinPassed]     = useState(false)
  const [user, setUser]               = useState(null)
  const [isAdmin, setIsAdmin]         = useState(null)
  const [active, setActive]           = useState('overview')
  const [sidebar, setSidebar]         = useState(false)
  const [bookings, setBookings]       = useState([])
  const [users, setUsers]             = useState([])
  const [tickets, setTickets]         = useState([])
  const [contacts, setContacts]       = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!pinPassed) return
    setIsAdmin(true)
    ;(async () => {
      try {
        const [b, us, t, cr] = await Promise.all([getAllBookings(), getAllUsers(), getAllTickets(), getAllContactRequests()])
        setBookings(b); setUsers(us); setTickets(t); setContacts(cr)
      } catch (e) { console.error('Admin load error:', e) }
      finally { setDataLoading(false) }
    })()
  }, [pinPassed])

  if (!pinPassed) return <PinGate onPass={() => setPinPassed(true)} />

  /* Loading */
  if (isAdmin === null) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'linear-gradient(135deg,#0b1a3d,#0a2558)' }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg mx-auto mb-4"
          style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', boxShadow:'0 8px 24px rgba(249,115,22,0.4)' }}>Δ</div>
        <div style={{ width:'36px', height:'36px', borderRadius:'50%', border:'3px solid rgba(255,255,255,0.1)', borderTop:'3px solid #f97316', animation:'spin 0.8s linear infinite', margin:'0 auto' }} />
      </div>
    </div>
  )

  /* Access Denied */
  if (isAdmin === false) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background:'linear-gradient(135deg,#0b1a3d,#0a2558)' }}>
      <div className="text-center p-8 rounded-2xl max-w-md w-full"
        style={{ background:'white', boxShadow:'0 32px 80px rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.1)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
          style={{ background:'linear-gradient(135deg,#fee2e2,#fecaca)', border:'1px solid #fca5a5' }}>🔒</div>
        <p className="font-black text-[#0a2558] mb-2" style={{ fontSize:'22px', letterSpacing:'-0.02em' }}>Admin Access Only</p>
        <p className="text-gray-500 mb-6" style={{ fontSize:'13.5px', lineHeight:'1.7' }}>
          You do not have permission to access this area.<br />Please contact the system administrator.
        </p>
        <button onClick={() => navigate('/')}
          className="w-full font-bold text-white rounded-xl py-3"
          style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px', boxShadow:'0 4px 16px rgba(249,115,22,0.35)' }}>
          Go to Home
        </button>
      </div>
    </div>
  )

  const goTo = k => { setActive(k); setSidebar(false) }
  const openTickets = tickets.filter(t => t.status === 'Open').length
  const todayStr = new Date().toISOString().split('T')[0]
  const todayLabel = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })

  return (
    <div className="min-h-screen flex" style={{ background:'linear-gradient(160deg,#eef2ff 0%,#f5f8ff 55%,#fff8f5 100%)' }}>
      {sidebar && <div className="fixed inset-0 z-30 lg:hidden" style={{ background:'rgba(5,15,50,0.5)', backdropFilter:'blur(4px)' }} onClick={() => setSidebar(false)} />}

      {/* ══ Sidebar ══ */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col transition-transform duration-300 ${sidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ width:'248px', minWidth:'248px', background:'linear-gradient(180deg,#0b1a3d 0%,#0a2558 60%,#0c2a6b 100%)', flexShrink:0, boxShadow:'4px 0 40px rgba(5,15,50,0.3)' }}>

        {/* Logo */}
        <div className="p-5 flex items-center gap-3" style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden"
            style={{ background:'white', boxShadow:'0 4px 12px rgba(10,37,88,0.22)' }}>
            <img src={logo} alt="Delta Care" style={{ width:'100%', height:'100%', objectFit:'contain' }} />
          </div>
          <div>
            <p className="text-white font-black" style={{ fontSize:'14px', letterSpacing:'-0.01em' }}>Delta Care</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e' }} />
              <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'9.5px', fontWeight:700, letterSpacing:'0.1em' }}>ADMIN PANEL</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <p style={{ color:'rgba(255,255,255,0.2)', fontSize:'9px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', padding:'8px 12px 6px' }}>Navigation</p>
          {NAV.map(item => {
            const on = active === item.key
            return (
              <button key={item.key} onClick={() => goTo(item.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left relative overflow-hidden"
                style={{
                  background: on ? 'rgba(249,115,22,0.12)' : 'transparent',
                  color: on ? '#fb923c' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  borderLeft: on ? '3px solid #f97316' : '3px solid transparent',
                  cursor:'pointer', fontSize:'13px', fontWeight: on ? 700 : 400,
                  transition:'all 0.15s ease',
                  boxShadow: on ? 'inset 0 0 20px rgba(249,115,22,0.05)' : 'none',
                }}
                onMouseEnter={e => { if (!on) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' } }}
                onMouseLeave={e => { if (!on) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' } }}>
                <NavIcon type={item.icon} active={on} />
                <span className="flex-1">{item.label}</span>
                {item.key === 'tickets' && openTickets > 0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-white"
                    style={{ background:'#ef4444', fontSize:'9px', boxShadow:'0 0 8px rgba(239,68,68,0.5)' }}>{openTickets}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User card */}
        <div className="m-3 rounded-xl p-3" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background:'linear-gradient(135deg,#f97316,#dc2626)', boxShadow:'0 4px 12px rgba(249,115,22,0.4)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="18" height="18">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-bold truncate" style={{ fontSize:'12.5px' }}>{user?.displayName || 'Admin'}</p>
              <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'10px' }}>Administrator</p>
            </div>
          </div>
          <button onClick={async () => { await signOut(auth); navigate('/') }}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2 font-semibold"
            style={{ background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.45)', border:'1px solid rgba(255,255,255,0.08)', cursor:'pointer', fontSize:'12px', transition:'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#fca5a5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ══ Main ══ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="flex items-center gap-4 px-5 lg:px-7 py-4 sticky top-0 z-20"
          style={{ background:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid rgba(232,238,248,0.9)', boxShadow:'0 2px 24px rgba(10,37,88,0.07)' }}>
          <button className="lg:hidden p-2 rounded-xl" style={{ background:'#f1f7fe', border:'1px solid #e0eaff', cursor:'pointer' }} onClick={() => setSidebar(s => !s)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#0a2558" strokeWidth="2.5" width="18" height="18"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-black text-[#0a2558]" style={{ fontSize:'16px', letterSpacing:'-0.02em' }}>
                {NAV.find(n => n.key === active)?.label}
              </p>
              <span className="px-2 py-0.5 rounded-full font-bold" style={{ background:'#fff7ed', color:'#ea580c', fontSize:'10px', border:'1px solid #fed7aa' }}>ADMIN</span>
            </div>
            <p className="text-gray-400" style={{ fontSize:'11.5px', marginTop:'1px' }}>{todayLabel}</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Quick stats */}
            <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-xl" style={{ background:'#f8faff', border:'1px solid #e8eef8' }}>
              {[
                { label:'Bookings', value:bookings.length, color:'#0a2558' },
                { label:'Users',    value:users.length,    color:'#15803d' },
                { label:'Open',     value:openTickets,     color:'#b91c1c' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-black" style={{ fontSize:'14px', color:s.color, lineHeight:1 }}>{s.value}</p>
                  <p style={{ fontSize:'9.5px', color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold"
              style={{ background:'white', color:'#0a2558', border:'1.5px solid #dde6f5', cursor:'pointer', fontSize:'13px', boxShadow:'0 2px 8px rgba(10,37,88,0.06)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              View Site
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 lg:p-7 overflow-y-auto">
          {dataLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div style={{ width:'40px', height:'40px', borderRadius:'50%', border:'3px solid #e8eef8', borderTop:'3px solid #f97316', animation:'spin 0.8s linear infinite' }} />
              <p className="text-gray-400 font-medium" style={{ fontSize:'13.5px' }}>Loading admin data…</p>
            </div>
          ) : (
            <>
              {active === 'overview'  && <AdminOverview bookings={bookings} users={users} tickets={tickets} goTo={goTo} todayStr={todayStr} />}
              {active === 'bookings'  && <AdminBookings bookings={bookings} setBookings={setBookings} />}
              {active === 'contacts'  && <AdminContacts contacts={contacts} setContacts={setContacts} />}
              {active === 'users'     && <AdminUsers users={users} />}
              {active === 'tickets'   && <AdminTickets tickets={tickets} setTickets={setTickets} />}
              {active === 'payments'  && <AdminPayments users={users} />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   OVERVIEW
══════════════════════════════════ */
function AdminOverview({ bookings, users, tickets, goTo, todayStr }) {
  const todayRides  = bookings.filter(b => b.date === todayStr)
  const pending     = bookings.filter(b => b.status === 'Pending')
  const confirmed   = bookings.filter(b => b.status === 'Confirmed' || b.status === 'In Progress')
  const completed   = bookings.filter(b => b.status === 'Completed')
  const openTickets = tickets.filter(t => t.status === 'Open')

  const stats = [
    { label:'Total Bookings',     value:bookings.length,   emoji:'📋', bg:'#e8eef8', color:'#0a2558', accent:'#0a2558' },
    { label:'Registered Users',   value:users.length,      emoji:'👥', bg:'#d1fae5', color:'#065f46', accent:'#10b981' },
    { label:"Today's Rides",      value:todayRides.length, emoji:'🚐', bg:'#fff7ed', color:'#c2410c', accent:'#f97316' },
    { label:'Pending Rides',      value:pending.length,    emoji:'⏳', bg:'#fef3c7', color:'#b45309', accent:'#f59e0b' },
    { label:'Active / Confirmed', value:confirmed.length,  emoji:'✅', bg:'#dbeafe', color:'#1d4ed8', accent:'#3b82f6' },
    { label:'Open Tickets',       value:openTickets.length,emoji:'🎫', bg:'#fee2e2', color:'#b91c1c', accent:'#ef4444' },
  ]

  return (
    <div className="dash-section">
      {/* Welcome banner */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0b1a3d 0%,#0a2558 50%,#1a3a8f 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'22px 22px' }} />
        <div className="absolute right-0 top-0 w-72 h-full pointer-events-none" style={{ background:'radial-gradient(ellipse at right, rgba(249,115,22,0.12), transparent 70%)' }} />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px #22c55e', display:'inline-block' }} />
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'11.5px', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>Admin Dashboard</p>
            </div>
            <p className="text-white font-black" style={{ fontSize:'22px', letterSpacing:'-0.02em' }}>Delta Care Transport</p>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'13.5px', marginTop:'4px' }}>
              {bookings.length} total bookings · {completed.length} completed · {pending.length} pending
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => goTo('bookings')}
              className="dash-btn-primary px-4 py-2.5 rounded-xl font-bold text-white text-sm flex items-center gap-2"
              style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.15)', cursor:'pointer', backdropFilter:'blur(8px)' }}>
              View Bookings
            </button>
            <button onClick={() => goTo('payments')}
              className="dash-btn-primary px-4 py-2.5 rounded-xl font-bold text-white text-sm"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(249,115,22,0.4)' }}>
              + Add Payment
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="dash-stat rounded-2xl overflow-hidden"
            style={{ background:'white', border:'1px solid #eaeff8', boxShadow:'0 4px 20px rgba(10,37,88,0.07)' }}>
            <div style={{ height:'3px', background:`linear-gradient(90deg,${s.accent},${s.accent}80)` }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background:s.bg }}>{s.emoji}</div>
                <span className="font-black" style={{ fontSize:'34px', lineHeight:1, color:s.color, letterSpacing:'-0.04em' }}>{s.value}</span>
              </div>
              <p className="font-bold text-gray-400" style={{ fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.07em' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Recent Bookings */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-4">
            <SectionTitle sub={`${bookings.length} total`}>Recent Bookings</SectionTitle>
            <button onClick={() => goTo('bookings')}
              style={{ background:'#fff7ed', border:'1px solid #fed7aa', color:'#ea580c', fontSize:'12px', fontWeight:700, cursor:'pointer', padding:'5px 12px', borderRadius:'8px' }}>
              View all →
            </button>
          </div>
          {bookings.length === 0 ? <EmptyState emoji="📋" label="No bookings yet" /> : (
            <div>
              {bookings.slice(0, 6).map((b, i) => (
                <div key={b.id} className="flex items-center gap-3 py-3"
                  style={{ borderBottom: i < Math.min(5, bookings.length-1) ? '1px solid #f8fafc' : 'none' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs shrink-0"
                    style={{ background:'linear-gradient(135deg,#0a2558,#1e40af)' }}>
                    {(b.userName||b.userEmail||'U')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0a2558]" style={{ fontSize:'13px' }}>{b.invoiceId || b.id.slice(0,10)}</p>
                    <p className="text-gray-400 truncate" style={{ fontSize:'11.5px' }}>{b.userName || b.userEmail || b.uid?.slice(0,8)} · {b.date}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Open Tickets */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-4">
            <SectionTitle sub={`${openTickets.length} need attention`}>Open Tickets</SectionTitle>
            <button onClick={() => goTo('tickets')}
              style={{ background:'#fff7ed', border:'1px solid #fed7aa', color:'#ea580c', fontSize:'12px', fontWeight:700, cursor:'pointer', padding:'5px 12px', borderRadius:'8px' }}>
              View all →
            </button>
          </div>
          {openTickets.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-semibold text-gray-400" style={{ fontSize:'13.5px' }}>All tickets resolved!</p>
            </div>
          ) : (
            <div>
              {openTickets.slice(0, 6).map((t, i) => (
                <div key={t.id} className="flex items-center gap-3 py-3"
                  style={{ borderBottom: i < Math.min(5, openTickets.length-1) ? '1px solid #f8fafc' : 'none' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background:'#fef3c7' }}>🎫</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0a2558] truncate" style={{ fontSize:'13px' }}>{t.subject || '(No subject)'}</p>
                    <p className="text-gray-400" style={{ fontSize:'11.5px' }}>{t.email || t.uid?.slice(0,10)} · {timeAgo(t.createdAt)}</p>
                  </div>
                  <TicketBadge status={t.status} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Today's schedule */}
      {todayRides.length > 0 && (
        <Card className="overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <SectionTitle sub={`${todayRides.length} ride${todayRides.length > 1 ? 's' : ''} scheduled today`}>
              Today's Schedule
            </SectionTitle>
          </div>
          <div className="px-5 pb-5 flex flex-col gap-2">
            {[...todayRides].sort((a, b) => (a.time||'').localeCompare(b.time||'')).map(b => (
              <div key={b.id} className="flex items-center gap-4 p-3.5 rounded-xl"
                style={{ background:'linear-gradient(135deg,#f8faff,#fff)', border:'1px solid #e8eef8' }}>
                <div className="text-center px-2 shrink-0">
                  <p className="font-black text-[#0a2558]" style={{ fontSize:'15px', lineHeight:1 }}>{b.time || '—'}</p>
                  <p style={{ color:'#94a3b8', fontSize:'10px', fontWeight:600 }}>AM/PM</p>
                </div>
                <div className="w-px self-stretch rounded" style={{ background:'linear-gradient(180deg,transparent,#e2e8f0,transparent)' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0a2558]" style={{ fontSize:'13px' }}>{b.userName || b.userEmail || 'Unknown user'}</p>
                  <p className="text-gray-500 truncate" style={{ fontSize:'12px' }}>{b.from} → {b.to}</p>
                </div>
                <p className="hidden sm:block text-gray-400 shrink-0" style={{ fontSize:'12px' }}>{b.type}</p>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

/* ══════════════════════════════════
   ALL BOOKINGS
══════════════════════════════════ */
function AdminBookings({ bookings, setBookings }) {
  const [tab, setTab]             = useState('All')
  const [search, setSearch]       = useState('')
  const [editModal, setEditModal] = useState(null)
  const [editForm, setEditForm]   = useState({ status:'', driver:'' })
  const [saving, setSaving]       = useState(false)

  const TABS = ['All','Pending','Confirmed','In Progress','Completed','Cancelled']

  const filtered = bookings.filter(b => {
    const matchTab = tab === 'All' || b.status === tab
    const q = search.toLowerCase()
    const matchQ = !q || (b.invoiceId||b.id).toLowerCase().includes(q) ||
      (b.userName||'').toLowerCase().includes(q) || (b.userEmail||'').toLowerCase().includes(q) ||
      (b.from||'').toLowerCase().includes(q) || (b.to||'').toLowerCase().includes(q)
    return matchTab && matchQ
  })

  const openEdit = b => { setEditModal(b); setEditForm({ status: b.status, driver: b.driver || '' }) }

  const doSave = async () => {
    setSaving(true)
    await adminUpdateBooking(editModal.uid, editModal.id, editForm)
    setBookings(prev => prev.map(b => b.id === editModal.id ? { ...b, ...editForm } : b))
    try {
      const statusIcons = { Confirmed: '✅', 'In Progress': '🚐', Completed: '🎉', Cancelled: '❌', Pending: '⏳' }
      await addNotification(editModal.uid, {
        icon: statusIcons[editForm.status] || '📋',
        title: `Booking ${editForm.status}`,
        msg: `Your ride booking status has been updated to "${editForm.status}".${editForm.driver ? ` Driver: ${editForm.driver}.` : ''}`,
      })
    } catch {}
    const userEmail = editModal.email || editModal.userEmail
    const statusLines = {
      Confirmed:     `Great news! Your ${editModal.type || 'ride'} on ${editModal.date} at ${editModal.time} has been confirmed.${editForm.driver ? ` Your driver is ${editForm.driver}.` : ''}`,
      'In Progress': `Your driver is on the way! Your ${editModal.type || 'ride'} on ${editModal.date} is now in progress.`,
      Completed:     `Your ${editModal.type || 'ride'} on ${editModal.date} has been completed. Thank you for choosing Delta Care Transport!`,
      Cancelled:     `Your ${editModal.type || 'ride'} on ${editModal.date} has been cancelled. Please call us to rebook at (209) 684-8359.`,
      Pending:       `Your ride booking is currently pending confirmation. We will update you shortly.`,
    }
    sendUserEmail(
      userEmail,
      `Booking ${editForm.status} — Delta Care Transport`,
      {
        to_name:      editModal.userName || editModal.name || 'Customer',
        message:      statusLines[editForm.status] || `Your booking status has been updated to "${editForm.status}".`,
        booking_id:   editModal.invoiceId || editModal.id,
        service_type: editModal.type || '—',
        from_loc:     editModal.from || '—',
        to_loc:       editModal.to   || '—',
        date:         editModal.date || '—',
        time:         editModal.time || '—',
      }
    )
    setSaving(false); setEditModal(null)
  }

  return (
    <div className="dash-section">
      {/* Search + tabs */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by booking ID, user, or location…"
            style={{ ...INP, paddingLeft:'40px' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {TABS.map(t => {
            const count = t === 'All' ? bookings.length : bookings.filter(b => b.status === t).length
            return (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  background: tab===t ? 'linear-gradient(135deg,#0a2558,#1e40af)' : 'white',
                  color: tab===t ? 'white' : '#64748b',
                  border: tab===t ? 'none' : '1px solid #e2e8f0',
                  borderRadius:'10px', cursor:'pointer', fontSize:'12.5px', fontWeight: tab===t ? 700 : 500,
                  padding:'7px 14px', boxShadow: tab===t ? '0 4px 14px rgba(10,37,88,0.22)' : 'none',
                  transition:'all 0.15s', whiteSpace:'nowrap',
                }}>
                {t}
                <span style={{ marginLeft:'5px', opacity: tab===t ? 0.7 : 0.5, fontSize:'11px' }}>({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      <Table
        headers={['Booking ID','User','Date / Time','Route','Type','Status','Driver','Action']}
        empty={filtered.length === 0 ? <EmptyState emoji="📭" label="No bookings found" /> : null}>
        {filtered.map((b, i) => (
          <tr key={b.id} style={{ borderBottom: i < filtered.length-1 ? '1px solid #f8fafc' : 'none', transition:'background 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fbff'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <td style={{ padding:'13px 16px', whiteSpace:'nowrap' }}>
              <p style={{ fontWeight:800, color:'#0a2558', fontSize:'12.5px' }}>{b.invoiceId || b.id.slice(0,10)}</p>
            </td>
            <td style={{ padding:'13px 16px', maxWidth:'130px' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background:'linear-gradient(135deg,#0a2558,#1e40af)' }}>
                  {(b.userName||b.userEmail||'?')[0].toUpperCase()}
                </div>
                <p style={{ fontSize:'12.5px', color:'#374151', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {b.userName || b.userEmail || b.uid?.slice(0,8) || '—'}
                </p>
              </div>
            </td>
            <td style={{ padding:'13px 16px', whiteSpace:'nowrap' }}>
              <p style={{ fontSize:'12.5px', color:'#374151', fontWeight:600 }}>{b.date}</p>
              <p style={{ fontSize:'11px', color:'#94a3b8' }}>{b.time}</p>
            </td>
            <td style={{ padding:'13px 16px', maxWidth:'180px' }}>
              <p style={{ fontSize:'12px', color:'#374151', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.from}</p>
              <p style={{ fontSize:'11px', color:'#94a3b8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>→ {b.to}</p>
            </td>
            <td style={{ padding:'13px 16px', fontSize:'12px', color:'#64748b', whiteSpace:'nowrap' }}>{b.type}</td>
            <td style={{ padding:'13px 16px', whiteSpace:'nowrap' }}><StatusBadge status={b.status} /></td>
            <td style={{ padding:'13px 16px', fontSize:'12.5px', color:'#374151', whiteSpace:'nowrap' }}>
              {b.driver
                ? <span style={{ fontWeight:600 }}>{b.driver}</span>
                : <span style={{ color:'#cbd5e1' }}>—</span>
              }
            </td>
            <td style={{ padding:'13px 16px', whiteSpace:'nowrap' }}>
              <button onClick={() => openEdit(b)}
                style={{ background:'#f0f7ff', color:'#1d4ed8', border:'1px solid #bfdbfe', borderRadius:'8px', padding:'5px 12px', cursor:'pointer', fontSize:'12px', fontWeight:700, transition:'all 0.12s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#dbeafe' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f0f7ff' }}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {filtered.length > 0 && (
        <p className="text-center mt-3" style={{ fontSize:'12px', color:'#94a3b8' }}>
          Showing {filtered.length} of {bookings.length} bookings
        </p>
      )}

      {/* Edit Modal */}
      <Modal open={!!editModal} onClose={() => setEditModal(null)}
        title={`Edit Booking — ${editModal?.invoiceId || editModal?.id?.slice(0,10)}`}>
        <div className="flex flex-col gap-4">
          {editModal && (
            <div className="rounded-xl p-3.5" style={{ background:'linear-gradient(135deg,#f8faff,#fff)', border:'1px solid #e8eef8' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background:'linear-gradient(135deg,#0a2558,#1e40af)' }}>
                  {(editModal.userName||editModal.userEmail||'?')[0].toUpperCase()}
                </div>
                <p style={{ fontSize:'12.5px', fontWeight:700, color:'#0a2558' }}>{editModal.userName || editModal.userEmail || 'Unknown user'}</p>
                <StatusBadge status={editModal.status} />
              </div>
              <p style={{ fontSize:'12.5px', color:'#64748b' }}>{editModal.date} {editModal.time} · {editModal.from} → {editModal.to}</p>
            </div>
          )}
          <div>
            <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Update Status</label>
            <select value={editForm.status} onChange={e => setEditForm(f => ({...f, status:e.target.value}))} style={INP}>
              {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Assign Driver</label>
            <input value={editForm.driver} onChange={e => setEditForm(f => ({...f, driver:e.target.value}))}
              placeholder="Enter driver name…" style={INP}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <div className="flex gap-3 mt-1">
            <button onClick={() => setEditModal(null)}
              className="flex-1 py-2.5 rounded-xl font-semibold"
              style={{ background:'#f1f5f9', color:'#64748b', border:'none', cursor:'pointer', fontSize:'13.5px' }}>
              Cancel
            </button>
            <button onClick={doSave} disabled={saving}
              className="flex-1 py-2.5 rounded-xl font-black text-white"
              style={{ background: saving ? '#d1dce8' : 'linear-gradient(135deg,#0a2558,#1e40af)', border:'none', cursor: saving?'not-allowed':'pointer', fontSize:'13.5px', boxShadow: saving ? 'none' : '0 4px 14px rgba(10,37,88,0.25)' }}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

/* ══════════════════════════════════
   USERS
══════════════════════════════════ */
function AdminUsers({ users }) {
  const [search, setSearch] = useState('')
  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    return !q || (u.displayName||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q) || u.id.toLowerCase().includes(q)
  })
  const TIER = { VIP:'#f59e0b', Platinum:'#8b5cf6', Gold:'#ca8a04', Silver:'#94a3b8', Bronze:'#b45309' }
  const TIER_BG = { VIP:'#fef3c7', Platinum:'#ede9fe', Gold:'#fef9c3', Silver:'#f1f5f9', Bronze:'#fef3c7' }

  return (
    <div className="dash-section">
      <div className="relative mb-5">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="15" height="15"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search users by name or email…"
          style={{ ...INP, paddingLeft:'40px' }} />
      </div>

      <Table
        headers={['User','Email','Points']}
        empty={filtered.length === 0 ? <EmptyState emoji="👥" label="No users found" /> : null}>
        {filtered.map((u, i) => (
          <tr key={u.id} style={{ borderBottom: i < filtered.length-1 ? '1px solid #f8fafc' : 'none', transition:'background 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fbff'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <td style={{ padding:'13px 16px' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                  style={{ background:'linear-gradient(135deg,#0a2558,#1e40af)', boxShadow:'0 2px 8px rgba(10,37,88,0.2)' }}>
                  {(u.displayName||u.email||'?')[0].toUpperCase()}
                </div>
                <p style={{ fontSize:'13px', fontWeight:700, color:'#0a2558', whiteSpace:'nowrap' }}>{u.displayName || '—'}</p>
              </div>
            </td>
            <td style={{ padding:'13px 16px', fontSize:'12.5px', color:'#374151' }}>{u.email || '—'}</td>
            <td style={{ padding:'13px 16px' }}>
              <span className="font-black" style={{ fontSize:'14px', color:'#0a2558' }}>{(u.loyaltyPoints||0).toLocaleString()}</span>
              <span style={{ fontSize:'11px', color:'#94a3b8', marginLeft:'3px' }}>pts</span>
            </td>
          </tr>
        ))}
      </Table>
      {filtered.length > 0 && (
        <p className="text-center mt-3" style={{ fontSize:'12px', color:'#94a3b8' }}>{filtered.length} user{filtered.length !== 1 ? 's' : ''} found</p>
      )}
    </div>
  )
}

/* ══════════════════════════════════
   SUPPORT TICKETS
══════════════════════════════════ */
function AdminTickets({ tickets, setTickets }) {
  const [tab, setTab]             = useState('All')
  const [viewModal, setViewModal] = useState(null)
  const [updating, setUpdating]   = useState(false)

  const TABS = ['All','Open','In Progress','Resolved','Closed']
  const filtered = tickets.filter(t => tab === 'All' || t.status === tab)

  const doStatus = async (id, status) => {
    setUpdating(true)
    await updateTicketStatus(id, status)
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    if (viewModal?.id === id) setViewModal(v => ({...v, status}))
    setUpdating(false)
  }

  const ACCENT = { Open:'#f59e0b', 'In Progress':'#3b82f6', Resolved:'#10b981', Closed:'#94a3b8' }

  return (
    <div className="dash-section">
      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map(t => {
          const count = t === 'All' ? tickets.length : tickets.filter(x => x.status === t).length
          return (
            <button key={t} onClick={() => setTab(t)}
              style={{
                background: tab===t ? 'linear-gradient(135deg,#0a2558,#1e40af)' : 'white',
                color: tab===t ? 'white' : '#64748b',
                border: tab===t ? 'none' : '1px solid #e2e8f0',
                borderRadius:'10px', padding:'7px 14px',
                cursor:'pointer', fontSize:'12.5px', fontWeight: tab===t ? 700 : 500,
                boxShadow: tab===t ? '0 4px 14px rgba(10,37,88,0.22)' : 'none',
                transition:'all 0.15s',
              }}>
              {t} <span style={{ opacity:0.65, marginLeft:'3px', fontSize:'11px' }}>({count})</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0
        ? <EmptyState emoji="🎫" label={`No ${tab.toLowerCase()} tickets`} />
        : (
          <div className="flex flex-col gap-3">
            {filtered.map(t => (
              <div key={t.id} className="rounded-2xl overflow-hidden"
                style={{ background:'white', border:'1px solid #eaeff8', boxShadow:'0 2px 12px rgba(10,37,88,0.05)', borderLeft:`4px solid ${ACCENT[t.status] || '#e2e8f0'}` }}>
                <div className="p-4 flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <p className="font-black text-[#0a2558]" style={{ fontSize:'13.5px' }}>{t.subject || '(No subject)'}</p>
                      <TicketBadge status={t.status} />
                      {t.category && (
                        <span style={{ background:'#f1f5f9', color:'#64748b', border:'1px solid #e2e8f0', fontSize:'10.5px', fontWeight:600, padding:'2px 8px', borderRadius:'6px' }}>{t.category}</span>
                      )}
                    </div>
                    <p className="text-gray-500 truncate" style={{ fontSize:'12.5px', lineHeight:'1.5' }}>{t.message}</p>
                    <p className="text-gray-400 mt-1.5 flex items-center gap-1.5" style={{ fontSize:'11.5px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {t.email || t.uid?.slice(0,12) || '—'}
                      <span style={{ color:'#e2e8f0' }}>·</span>
                      {timeAgo(t.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <select value={t.status} onChange={e => doStatus(t.id, e.target.value)} disabled={updating}
                      style={{ padding:'7px 10px', borderRadius:'9px', border:'1.5px solid #e2e8f0', fontSize:'12px', outline:'none', cursor:'pointer', background:'white', fontFamily:'inherit' }}>
                      {TICKET_STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <button onClick={() => setViewModal(t)}
                      style={{ background:'#f0f7ff', color:'#1d4ed8', border:'1px solid #bfdbfe', borderRadius:'9px', padding:'7px 14px', cursor:'pointer', fontSize:'12px', fontWeight:700 }}>
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }

      <Modal open={!!viewModal} onClose={() => setViewModal(null)} title="Ticket Details" wide>
        {viewModal && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[['From', viewModal.email || viewModal.uid?.slice(0,12) || '—'], ['Category', viewModal.category || '—'], ['Submitted', timeAgo(viewModal.createdAt)]].map(([k,v]) => (
                <div key={k} className="rounded-xl p-3" style={{ background:'#f8fafc' }}>
                  <p style={{ fontSize:'10.5px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'4px' }}>{k}</p>
                  <p className="font-semibold text-[#0a2558]" style={{ fontSize:'13px' }}>{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4" style={{ background:'linear-gradient(135deg,#f8fafc,#fff)', border:'1px solid #e8eef8' }}>
              <p className="font-black text-[#0a2558] mb-2.5" style={{ fontSize:'14px' }}>{viewModal.subject}</p>
              <p className="text-gray-600" style={{ fontSize:'13.5px', lineHeight:'1.8', whiteSpace:'pre-wrap' }}>{viewModal.message}</p>
            </div>
            <div>
              <p className="font-bold text-gray-500 mb-2" style={{ fontSize:'12px', textTransform:'uppercase', letterSpacing:'0.06em' }}>Update Status</p>
              <div className="flex items-center gap-2 flex-wrap">
                {TICKET_STATUS_OPTS.filter(s => s !== viewModal.status).map(s => {
                  const colors = { Resolved:'linear-gradient(135deg,#16a34a,#15803d)', Closed:'#f1f5f9', 'In Progress':'linear-gradient(135deg,#1d4ed8,#1e40af)', Open:'linear-gradient(135deg,#f97316,#ea580c)' }
                  return (
                    <button key={s} onClick={() => doStatus(viewModal.id, s)} disabled={updating}
                      className="px-4 py-2.5 rounded-xl font-bold text-sm"
                      style={{ background: colors[s]||'#f1f5f9', color: s==='Closed'?'#64748b':'white', border:'none', cursor:'pointer', transition:'opacity 0.15s' }}>
                      Mark {s}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

/* ══════════════════════════════════
   CONTACT REQUESTS
══════════════════════════════════ */
function AdminContacts({ contacts, setContacts }) {
  const [updating, setUpdating] = useState(false)
  const [viewModal, setViewModal] = useState(null)

  const doStatus = async (id, status) => {
    setUpdating(true)
    await updateContactRequestStatus(id, status)
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    setUpdating(false)
  }

  return (
    <div className="dash-section">
      <SectionTitle sub={`${contacts.length} total submissions`}>Contact Requests</SectionTitle>

      {contacts.length === 0 ? (
        <EmptyState emoji="📬" label="No contact requests yet" />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
              <thead>
                <tr style={{ borderBottom:'1.5px solid #f1f5f9' }}>
                  {['Name','Phone','Service','Date','Pickup → Drop-off','Source','Status','Actions'].map(h => (
                    <th key={h} style={{ padding:'12px 16px', textAlign:'left', color:'#94a3b8', fontWeight:700, fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.06em', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => {
                  const badge = CONTACT_BADGE[c.status] || CONTACT_BADGE.New
                  return (
                    <tr key={c.id} style={{ borderBottom: i < contacts.length - 1 ? '1px solid #f8fafc' : 'none', background: i % 2 === 0 ? 'white' : '#fafbff' }}>
                      <td style={{ padding:'13px 16px', fontWeight:700, color:'#0a2558', whiteSpace:'nowrap' }}>{c.name || '—'}</td>
                      <td style={{ padding:'13px 16px', whiteSpace:'nowrap' }}>
                        <a href={`tel:${c.phone}`} style={{ color:'#f97316', fontWeight:700, textDecoration:'none' }}>{c.phone || '—'}</a>
                      </td>
                      <td style={{ padding:'13px 16px', color:'#374151', whiteSpace:'nowrap' }}>{c.serviceType || '—'}</td>
                      <td style={{ padding:'13px 16px', color:'#374151', whiteSpace:'nowrap' }}>{c.date || '—'} {c.time || ''}</td>
                      <td style={{ padding:'13px 16px', color:'#374151', maxWidth:'200px' }}>
                        <p style={{ fontSize:'12px' }} className="truncate">{c.pickup || '—'}</p>
                        <p style={{ fontSize:'12px', color:'#94a3b8' }} className="truncate">→ {c.destination || '—'}</p>
                      </td>
                      <td style={{ padding:'13px 16px' }}>
                        <span style={{ background: c.source === 'homepage-form' ? '#f0fdf4' : '#eff6ff', color: c.source === 'homepage-form' ? '#16a34a' : '#1d4ed8', border: `1px solid ${c.source === 'homepage-form' ? '#bbf7d0' : '#bfdbfe'}`, borderRadius:'999px', padding:'3px 8px', fontSize:'11px', fontWeight:700 }}>
                          {c.source === 'homepage-form' ? 'Homepage' : 'Contact Page'}
                        </span>
                      </td>
                      <td style={{ padding:'13px 16px' }}>
                        <select value={c.status || 'New'} onChange={e => doStatus(c.id, e.target.value)} disabled={updating}
                          style={{ padding:'7px 10px', borderRadius:'9px', border:`1.5px solid ${badge.border}`, background:badge.bg, color:badge.color, fontSize:'12px', outline:'none', cursor:'pointer', fontWeight:700, fontFamily:'inherit' }}>
                          {CONTACT_STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding:'13px 16px' }}>
                        <button onClick={() => setViewModal(c)}
                          style={{ background:'#f0f7ff', color:'#1d4ed8', border:'1px solid #bfdbfe', borderRadius:'9px', padding:'7px 14px', cursor:'pointer', fontSize:'12px', fontWeight:700 }}>
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Detail Modal */}
      {viewModal && (
        <Modal open title="Contact Request Details" onClose={() => setViewModal(null)}>
          <div className="flex flex-col gap-3" style={{ fontSize:'13.5px' }}>
            {[
              ['Name', viewModal.name],
              ['Phone', viewModal.phone],
              ['Email', viewModal.email],
              ['Service Type', viewModal.serviceType],
              ['Date & Time', `${viewModal.date || ''} ${viewModal.time || ''}`],
              ['Passengers', viewModal.passengers],
              ['Pickup', viewModal.pickup],
              ['Drop-off', viewModal.destination],
              ['Special Reqs', viewModal.specialReqs],
              ['Notes', viewModal.notes],
            ].map(([label, val]) => val ? (
              <div key={label} style={{ borderBottom:'1px solid #f1f5f9', paddingBottom:'10px' }}>
                <p style={{ fontSize:'11px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'3px' }}>{label}</p>
                <p style={{ color:'#0a2558', fontWeight:600 }}>{val}</p>
              </div>
            ) : null)}
            <div className="flex gap-2 mt-2">
              <a href={`tel:${viewModal.phone}`}
                style={{ flex:1, textAlign:'center', padding:'11px', borderRadius:'10px', background:'linear-gradient(135deg,#f97316,#ea580c)', color:'white', fontWeight:700, fontSize:'13px', textDecoration:'none' }}>
                Call Now
              </a>
              <button onClick={() => setViewModal(null)}
                style={{ flex:1, padding:'11px', borderRadius:'10px', background:'#f1f5f9', color:'#374151', fontWeight:700, fontSize:'13px', border:'none', cursor:'pointer' }}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ══════════════════════════════════
   ADD PAYMENT
══════════════════════════════════ */
function AdminPayments({ users }) {
  const [form, setForm] = useState({ userSearch:'', selectedUid:'', selectedName:'', amount:'', desc:'', date:'', method:'Insurance', status:'Paid', invoiceId:'' })
  const [done, setDone]     = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')
  const [showList, setShowList] = useState(false)

  const set = (k, v) => setForm(f => ({...f, [k]:v}))

  const matches = form.userSearch.length > 1
    ? users.filter(u => (u.displayName||'').toLowerCase().includes(form.userSearch.toLowerCase()) || (u.email||'').toLowerCase().includes(form.userSearch.toLowerCase()))
    : []

  const selectUser = u => {
    setForm(f => ({ ...f, userSearch: u.displayName||u.email||u.id, selectedUid:u.id, selectedName:u.displayName||u.email||u.id }))
    setShowList(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.selectedUid) { setError('Please select a user first.'); return }
    setSaving(true); setError('')
    try {
      const invoiceId = form.invoiceId || `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9000)+1000)}`
      const amount = form.amount.startsWith('$') ? form.amount : `$${form.amount}`
      await adminAddPayment(form.selectedUid, {
        invoiceId,
        amount, desc: form.desc, date: form.date, method: form.method, status: form.status, userName: form.selectedName,
      })
      try {
        await addNotification(form.selectedUid, {
          icon: '💳',
          title: 'Payment Record Added',
          msg: `A payment of ${amount} has been recorded (${form.status}) via ${form.method}. Invoice: ${invoiceId}.`,
        })
      } catch {}
      const selectedUser = users.find(u => u.id === form.selectedUid)
      sendUserEmail(
        selectedUser?.email,
        `Payment Record Added — Delta Care Transport`,
        {
          to_name:      form.selectedName || 'Customer',
          message:      `A payment of ${amount} has been recorded on your account.\n\nPayment Details:\n  Amount: ${amount}\n  Description: ${form.desc}\n  Date: ${form.date}\n  Method: ${form.method}\n  Status: ${form.status}`,
          booking_id:   invoiceId,
          service_type: form.desc || '—',
          from_loc:     '—',
          to_loc:       '—',
          date:         form.date || '—',
          time:         '—',
        }
      )
      setDone(true)
    } catch { setError('Failed to add payment. Please try again.') }
    finally { setSaving(false) }
  }

  if (done) return (
    <div className="dash-section max-w-md mx-auto text-center py-16">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{ background:'linear-gradient(135deg,#d1fae5,#a7f3d0)', border:'2px solid #6ee7b7', boxShadow:'0 8px 24px rgba(16,185,129,0.2)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" width="36" height="36"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <p className="font-black text-[#0a2558] mb-1" style={{ fontSize:'22px', letterSpacing:'-0.02em' }}>Payment Added!</p>
      <p className="text-gray-500 mb-6" style={{ fontSize:'14px' }}>
        Successfully added payment to <strong>{form.selectedName}</strong>'s account.
      </p>
      <button onClick={() => { setDone(false); setForm({ userSearch:'', selectedUid:'', selectedName:'', amount:'', desc:'', date:'', method:'Insurance', status:'Paid', invoiceId:'' }) }}
        className="font-bold text-white rounded-xl px-6 py-3"
        style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', cursor:'pointer', fontSize:'14px', boxShadow:'0 4px 16px rgba(249,115,22,0.35)' }}>
        Add Another Payment
      </button>
    </div>
  )

  return (
    <div className="dash-section max-w-lg">
      <Card className="overflow-hidden">
        <div className="px-6 pt-6 pb-0">
          <SectionTitle sub="This will appear in the user's Payment History">Add Payment Record</SectionTitle>
        </div>
        {error && (
          <div className="mx-6 mb-4 rounded-xl px-4 py-3" style={{ background:'#fef2f2', border:'1px solid #fecaca' }}>
            <p className="text-red-600 font-medium" style={{ fontSize:'13px' }}>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-6 pt-4 flex flex-col gap-4">
          {/* User search */}
          <div className="relative">
            <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Select User *</label>
            <input value={form.userSearch}
              onChange={e => { set('userSearch', e.target.value); set('selectedUid',''); set('selectedName',''); setShowList(true) }}
              onFocus={() => setShowList(true)}
              placeholder="Type name or email to search…" style={INP}
              onBlurCapture={() => setTimeout(() => setShowList(false), 150)} />
            {showList && matches.length > 0 && (
              <div className="absolute z-10 w-full mt-1 rounded-xl shadow-2xl overflow-hidden"
                style={{ background:'white', border:'1px solid #e2e8f0', maxHeight:'200px', overflowY:'auto' }}>
                {matches.map(u => (
                  <button key={u.id} type="button" onClick={() => selectUser(u)}
                    className="w-full text-left px-4 py-3 flex items-center gap-3"
                    style={{ background:'none', border:'none', borderBottom:'1px solid #f8fafc', cursor:'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                      style={{ background:'linear-gradient(135deg,#0a2558,#1e40af)' }}>
                      {(u.displayName||u.email||'?')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#0a2558]" style={{ fontSize:'13px' }}>{u.displayName||'—'}</p>
                      <p className="text-gray-400" style={{ fontSize:'11.5px' }}>{u.email||u.id.slice(0,14)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {form.selectedUid && (
              <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background:'#d1fae5', border:'1px solid #6ee7b7' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" width="13" height="13"><path d="M20 6L9 17l-5-5"/></svg>
                <p style={{ fontSize:'12.5px', color:'#065f46', fontWeight:700 }}>{form.selectedName}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Amount *</label>
              <input required value={form.amount} onChange={e => set('amount', e.target.value)}
                placeholder="e.g. 45.00" style={INP}
                onFocus={e => e.target.style.borderColor = '#f97316'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>
            <div>
              <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Invoice ID</label>
              <input value={form.invoiceId} onChange={e => set('invoiceId', e.target.value)}
                placeholder="Auto-generated" style={INP}
                onFocus={e => e.target.style.borderColor = '#f97316'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>
            <div>
              <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Date *</label>
              <input required type="date" value={form.date} onChange={e => set('date', e.target.value)} style={INP} />
            </div>
            <div>
              <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Method</label>
              <select value={form.method} onChange={e => set('method', e.target.value)} style={INP}>
                {['Insurance','Medicaid','Medicare','Credit Card','Cash','Other'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Description *</label>
            <input required value={form.desc} onChange={e => set('desc', e.target.value)}
              placeholder="e.g. Medical Appointment Transport – June 20" style={INP}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>

          <div>
            <label className="block font-bold text-[#0a2558] mb-1.5" style={{ fontSize:'13px' }}>Payment Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} style={INP}>
              {['Paid','Pending','Refunded'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <PrimaryBtn disabled={saving} loading={saving}>
            {saving ? 'Adding Payment…' : 'Add Payment Record'}
          </PrimaryBtn>
        </form>
      </Card>
    </div>
  )
}
