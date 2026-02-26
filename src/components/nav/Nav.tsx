import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

const LANGUAGES = ['HU', 'DE', 'EN'] as const
const SCROLL_THRESHOLD = typeof window !== 'undefined' ? window.innerHeight : 800

const MENU_ITEMS = [
  { label: 'Dashboardok', to: '/dashboardok' },
  { label: 'AI', to: '/ai' },
  { label: 'Automatizacio', to: '/automatizacio' },
  { label: 'Weboldalak', to: '/weboldalak' },
  { label: 'Folyamat', to: '/folyamat' },
  { label: 'Kapcsolat', to: '/kapcsolat' },
] as const

export default function Nav() {
  const [navVisible, setNavVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLang, setActiveLang] = useState<typeof LANGUAGES[number]>('HU')
  const location = useLocation()

  const isHome = location.pathname === '/'

  const handleScroll = useCallback(() => {
    if (!isHome) return
    setNavVisible(window.scrollY > SCROLL_THRESHOLD)
  }, [isHome])

  useEffect(() => {
    if (!isHome) {
      setNavVisible(true)
      return
    }

    setNavVisible(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome, handleScroll])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const langSwitcher = (
    <div className="lang-switcher">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`lang-switcher__btn${lang === activeLang ? ' lang-switcher__btn--active' : ''}`}
          onClick={() => setActiveLang(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  )

  return (
    <>
      {/* Hero language switcher — only on home, only when nav is hidden */}
      {isHome && !navVisible && (
        <div className="hero-lang">
          {langSwitcher}
        </div>
      )}

      {/* Main nav bar */}
      <nav className={`nav${navVisible ? ' nav--visible' : ''}`}>
        <Link to="/" className="nav__logo font-display">IVERSO</Link>

        <div className="nav__right">
          <div className="nav__lang-desktop">
            {langSwitcher}
          </div>

          <button
            type="button"
            className="nav__hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu megnyitasa"
          >
            <span className="nav__hamburger-line" />
            <span className="nav__hamburger-line" />
            <span className="nav__hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile menu overlay */}
      {menuOpen && (
        <div className="menu-overlay">
          <div className="menu-overlay__header">
            <Link to="/" className="nav__logo font-display" onClick={() => setMenuOpen(false)}>IVERSO</Link>
            <button
              type="button"
              className="menu-overlay__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Menu bezarasa"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <div className="menu-overlay__links">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="menu-overlay__link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="menu-overlay__lang">
            {langSwitcher}
          </div>
        </div>
      )}
    </>
  )
}
