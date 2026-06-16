import logo from '../assets/logo.png'

const navLinks = ['Home', 'About Us', 'Services', 'How It Works', 'Our Fleet', 'Contact Us']

export default function Navbar() {
  return (
    <nav
      className="relative z-50 overflow-visible nav-anim"
      style={{ height: '76px', paddingLeft: '52px', paddingRight: '52px', background: '#f1f7fe' }}
    >
      <div className="relative flex items-center h-full">

        {/* Logo — extends below navbar into hero */}
        <div className="relative shrink-0 mr-6" style={{ width: '130px', height: '76px' }}>
          <img
            src={logo}
            alt="Delta Medical Care Transport"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '136px',
              width: 'auto',
              zIndex: 10,
            }}
          />
        </div>

        {/* Nav links — absolutely centered */}
        <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  link === 'Home'
                    ? 'text-orange-500 border-b-2 border-orange-500 pb-0.5'
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Phone — right */}
        <div className="ml-auto flex items-center gap-3">
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

      </div>
    </nav>
  )
}
