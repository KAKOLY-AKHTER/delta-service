import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import FloatingContact from './components/FloatingContact'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import FleetPage from './pages/FleetPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'

const AUTH_ROUTES = ['/login', '/signup', '/dashboard', '/admin']

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const isAuth = AUTH_ROUTES.includes(pathname)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAuth && <Navbar />}
      <main key={pathname} className="flex-1 page-enter">
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/services"     element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/fleet"        element={<FleetPage />} />
          <Route path="/contact"      element={<ContactPage />} />
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/signup"       element={<SignUpPage />} />
          <Route path="/dashboard"    element={<DashboardPage />} />
          <Route path="/admin"        element={<AdminPage />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
      {!isAuth && <ScrollToTop />}
      {!isAuth && <FloatingContact />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate />
      <Layout />
    </BrowserRouter>
  )
}
