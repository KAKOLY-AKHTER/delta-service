import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import logo from '../assets/logo.png'

export default function LoginPage() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setError('')
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate('/')
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

  return (
    <div className="min-h-screen flex" style={{ background: '#f1f7fe' }}>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a2558 0%, #0d3070 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />

        <div className="relative z-10 flex items-center gap-3">
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 3px #f97316' }}>
            <img src={logo} alt="Delta Care Transport" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </div>
          <div>
            <p className="text-white font-black" style={{ fontSize: '15px', lineHeight: 1.2 }}>Delta Care</p>
            <p className="text-blue-300 font-medium" style={{ fontSize: '12px' }}>Transport Services</p>
          </div>
        </div>

        <div className="relative z-10">
          <div style={{ width: '40px', height: '4px', background: '#f97316', borderRadius: '2px', marginBottom: '24px' }} />
          <h2 className="text-white font-black leading-tight mb-4" style={{ fontSize: '36px' }}>
            Welcome<br />Back.
          </h2>
          <p className="text-blue-200 leading-relaxed" style={{ fontSize: '15px', maxWidth: '320px' }}>
            Log in to manage your bookings, track your rides, and access your full trip history.
          </p>
          <div className="flex flex-col gap-3 mt-8">
            {['View and manage all your bookings', 'Track your driver in real time', 'Access full ride history', 'Update your profile & preferences'].map(item => (
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
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full" style={{ maxWidth: '420px' }}>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2.5px #f97316' }}>
              <img src={logo} alt="Delta Care Transport" style={{ width: '38px', objectFit: 'contain' }} />
            </div>
            <p className="font-black text-[#0a2558]" style={{ fontSize: '15px' }}>Delta Care Transport</p>
          </div>

          <h1 className="font-black text-[#0a2558] mb-1" style={{ fontSize: '28px' }}>Log In</h1>
          <p className="text-gray-500 mb-7" style={{ fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#f97316', fontWeight: 700, textDecoration: 'none' }}>Sign Up</Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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

            {/* Email */}
            <div>
              <label className="block font-semibold text-[#0a2558] mb-1.5" style={{ fontSize: '13px' }}>
                Email Address <span style={{ color: '#f97316' }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute flex items-center pointer-events-none" style={{ left: '13px', top: '50%', transform: 'translateY(-50%)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <input
                  required type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="your@email.com"
                  style={{ ...inp, paddingLeft: '38px' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#0a2558]" style={{ fontSize: '13px' }}>
                  Password <span style={{ color: '#f97316' }}>*</span>
                </label>
                <Link to="#" style={{ fontSize: '12.5px', color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="absolute flex items-center pointer-events-none" style={{ left: '13px', top: '50%', transform: 'translateY(-50%)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  required type={show ? 'text' : 'password'} name="password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password"
                  style={{ ...inp, paddingLeft: '38px', paddingRight: '40px' }}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute flex items-center"
                  style={{ right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {show
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Remember */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-orange-500" />
              <span className="text-gray-600" style={{ fontSize: '13.5px' }}>Remember me on this device</span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-black text-white rounded-xl"
              style={{ padding: '14px', fontSize: '14px', background: loading ? '#d1dce8' : 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: loading ? 'none' : '0 8px 22px rgba(249,115,22,0.35)', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
              {loading
                ? <><svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18"><circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/></svg> Logging in…</>
                : 'Log In to My Account'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div style={{ flex: 1, height: '1px', background: '#e8eef8' }} />
              <span className="text-gray-400" style={{ fontSize: '12px' }}>or continue with</span>
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
              {gLoading ? 'Signing in…' : 'Continue with Google'}
            </button>

          </form>

          <p className="text-center text-gray-400 mt-8" style={{ fontSize: '12.5px' }}>
            By logging in you agree to our{' '}
            <Link to="#" style={{ color: '#0a2558', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</Link>
            {' '}&{' '}
            <Link to="#" style={{ color: '#0a2558', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function friendlyError(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/invalid-credential':    return 'Email or password is incorrect. Please try again.'
    case 'auth/wrong-password':        return 'Incorrect password. Please try again.'
    case 'auth/invalid-email':         return 'Please enter a valid email address.'
    case 'auth/too-many-requests':     return 'Too many failed attempts. Please try again later.'
    case 'auth/user-disabled':         return 'This account has been disabled. Please contact support.'
    default:                           return 'Something went wrong. Please try again.'
  }
}
