import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import logo from '../assets/logo.png'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [showPw, setShowPw]   = useState(false)
  const [showCpw, setShowCpw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [error, setError]     = useState('')
  const [done, setDone]       = useState(false)
  const [form, setForm]       = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', terms: false
  })

  const handleChange = (e) => {
    setError('')
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!form.terms) {
      setError('Please agree to the Terms & Privacy Policy to continue.')
      return
    }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(cred.user, { displayName: `${form.firstName} ${form.lastName}`.trim() })
      setDone(true)
      setTimeout(() => navigate('/'), 1800)
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setGLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/')
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setError(friendlyError(err.code))
    } finally {
      setGLoading(false)
    }
  }

  const inp = {
    width: '100%', borderRadius: '10px', padding: '12px 14px',
    fontSize: '14px', color: '#1e293b', outline: 'none',
    border: '1.5px solid #e2e8f0', background: '#fff',
    transition: 'border-color 0.2s',
  }

  const IconWrap = ({ children }) => (
    <span className="absolute flex items-center pointer-events-none" style={{ left: '13px', top: '50%', transform: 'translateY(-50%)' }}>
      {children}
    </span>
  )

  const EyeBtn = ({ show, toggle }) => (
    <button type="button" onClick={toggle}
      className="absolute flex items-center"
      style={{ right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      {show
        ? <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      }
    </button>
  )

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f1f7fe' }}>
        <div className="text-center p-10">
          <div className="mx-auto mb-5 flex items-center justify-center rounded-full"
            style={{ width: '72px', height: '72px', background: '#dcfce7', border: '2px solid #86efac' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="32" height="32">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-black text-[#0a2558] mb-2" style={{ fontSize: '24px' }}>Account Created!</h2>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>Welcome to Delta Care Transport. Redirecting you now…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f1f7fe' }}>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[42%] flex-col justify-between p-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a2558 0%, #0d3070 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />

        <div className="relative z-10 flex items-center gap-3">
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(10,37,88,0.25)' }}>
            <img src={logo} alt="Delta Care Transport" style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
          </div>
          <div>
            <p className="text-white font-black" style={{ fontSize: '15px', lineHeight: 1.2 }}>Delta Care</p>
            <p className="text-blue-300 font-medium" style={{ fontSize: '12px' }}>Transport Services</p>
          </div>
        </div>

        <div className="relative z-10">
          <div style={{ width: '40px', height: '4px', background: '#f97316', borderRadius: '2px', marginBottom: '24px' }} />
          <h2 className="text-white font-black leading-tight mb-4" style={{ fontSize: '34px' }}>
            Join Delta<br />Care Today.
          </h2>
          <p className="text-blue-200 leading-relaxed" style={{ fontSize: '14.5px', maxWidth: '310px' }}>
            Sign up to book rides, manage your appointments, and get priority scheduling — all in one place.
          </p>
          <div className="flex flex-col gap-3 mt-8">
            {[
              'Easy online booking 24/7',
              'Real-time driver tracking',
              'Secure payment & receipts',
              'Priority scheduling for members',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" width="11" height="11">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-blue-200" style={{ fontSize: '13.5px' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-blue-300" style={{ fontSize: '12.5px' }}>
          © 2025 Delta Care Transport. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 py-10">
        <div className="w-full" style={{ maxWidth: '440px' }}>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(10,37,88,0.22)' }}>
              <img src={logo} alt="Delta Care Transport" style={{ width: '42px', objectFit: 'contain' }} />
            </div>
            <p className="font-black text-[#0a2558]" style={{ fontSize: '15px' }}>Delta Care Transport</p>
          </div>

          <h1 className="font-black text-[#0a2558] mb-1" style={{ fontSize: '26px' }}>Create Account</h1>
          <p className="text-gray-500 mb-6" style={{ fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#f97316', fontWeight: 700, textDecoration: 'none' }}>Log In</Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl px-4 py-3"
                style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                <p className="text-red-600 font-medium" style={{ fontSize: '13px' }}>{error}</p>
              </div>
            )}

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
                  First Name <span style={{ color: '#f97316' }}>*</span>
                </label>
                <input required name="firstName" value={form.firstName} onChange={handleChange}
                  placeholder="John" style={inp}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div>
                <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
                  Last Name <span style={{ color: '#f97316' }}>*</span>
                </label>
                <input required name="lastName" value={form.lastName} onChange={handleChange}
                  placeholder="Doe" style={inp}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
                Email Address <span style={{ color: '#f97316' }}>*</span>
              </label>
              <div className="relative">
                <IconWrap>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </IconWrap>
                <input required type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  style={{ ...inp, paddingLeft: '38px' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
                Phone Number
              </label>
              <div className="relative">
                <IconWrap>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.25 2.46.7 3.57a1 1 0 0 1-.23 1.01l-2.35 2.21z" />
                  </svg>
                </IconWrap>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="(470) 000-0000"
                  style={{ ...inp, paddingLeft: '38px' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
                Password <span style={{ color: '#f97316' }}>*</span>
              </label>
              <div className="relative">
                <IconWrap>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </IconWrap>
                <input required type={showPw ? 'text' : 'password'} name="password" value={form.password}
                  onChange={handleChange} placeholder="Min. 6 characters"
                  style={{ ...inp, paddingLeft: '38px', paddingRight: '40px' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                <EyeBtn show={showPw} toggle={() => setShowPw(s => !s)} />
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
                Confirm Password <span style={{ color: '#f97316' }}>*</span>
              </label>
              <div className="relative">
                <IconWrap>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </IconWrap>
                <input required type={showCpw ? 'text' : 'password'} name="confirm" value={form.confirm}
                  onChange={handleChange} placeholder="Repeat your password"
                  style={{ ...inp, paddingLeft: '38px', paddingRight: '40px' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                <EyeBtn show={showCpw} toggle={() => setShowCpw(s => !s)} />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange}
                className="mt-0.5 w-4 h-4 accent-orange-500 shrink-0" />
              <span className="text-gray-600" style={{ fontSize: '12.5px', lineHeight: 1.5 }}>
                I agree to the{' '}
                <Link to="#" style={{ color: '#0a2558', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link to="#" style={{ color: '#0a2558', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-black text-white rounded-xl"
              style={{ padding: '14px', fontSize: '14px', background: loading ? '#d1dce8' : 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: loading ? 'none' : '0 8px 22px rgba(249,115,22,0.35)', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
              {loading
                ? <><svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg> Creating account…</>
                : 'Create My Account'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div style={{ flex: 1, height: '1px', background: '#e8eef8' }} />
              <span className="text-gray-400" style={{ fontSize: '12px' }}>or sign up with</span>
              <div style={{ flex: 1, height: '1px', background: '#e8eef8' }} />
            </div>

            {/* Google */}
            <button type="button" onClick={handleGoogle} disabled={gLoading}
              className="w-full flex items-center justify-center gap-3 font-semibold rounded-xl"
              style={{ padding: '12px', fontSize: '13.5px', color: '#374151', background: 'white', border: '1.5px solid #e2e8f0', cursor: gLoading ? 'not-allowed' : 'pointer', opacity: gLoading ? 0.7 : 1 }}>
              {gLoading
                ? <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" width="18" height="18"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg>
                : <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
              }
              {gLoading ? 'Signing up…' : 'Continue with Google'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

function friendlyError(code) {
  switch (code) {
    case 'auth/email-already-in-use':  return 'An account with this email already exists. Try logging in instead.'
    case 'auth/invalid-email':         return 'Please enter a valid email address.'
    case 'auth/weak-password':         return 'Password is too weak. Please use at least 6 characters.'
    case 'auth/too-many-requests':     return 'Too many attempts. Please try again later.'
    default:                           return 'Something went wrong. Please try again.'
  }
}
