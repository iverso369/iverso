import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Nav.module.css'

interface NavProps {
  /** ID of the hero element to observe. When provided, nav hides at hero and shows on scroll past it. */
  heroElementId?: string
}

export default function Nav({ heroElementId }: NavProps) {
  const { t } = useTranslation()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const scrollAware = isHome && !!heroElementId

  const [navVisible, setNavVisible] = useState(!scrollAware)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll-aware: observe hero element with IntersectionObserver
  useEffect(() => {
    if (!scrollAware) {
      setNavVisible(true)
      return
    }

    const heroEl = document.getElementById(heroElementId!)
    if (!heroEl) {
      setNavVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero visible → hide nav; hero gone → show nav
        setNavVisible(!entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [scrollAware, heroElementId])

  // Close services dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close mobile overlay on route change
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile overlay open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleServicesEnter = useCallback(() => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
    setServicesOpen(true)
  }, [])

  const handleServicesLeave = useCallback(() => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 150)
  }, [])

  const serviceLinks = [
    { path: '/dashboardok', key: 'nav.dashboards' },
    { path: '/ai', key: 'nav.ai' },
    { path: '/automatizacio', key: 'nav.automation' },
    { path: '/weboldalak', key: 'nav.websites' },
  ]

  return (
    <>
      {/* Standalone language switcher — visible when nav is hidden (hero state) */}
      {scrollAware && !navVisible && (
        <div className={styles.standaloneLang}>
          <LanguageSwitcher />
        </div>
      )}

      {/* Desktop + mobile nav bar */}
      <nav
        className={`${styles.nav} ${navVisible ? styles.navVisible : styles.navHidden}`}
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            IVERSO
          </Link>

          {/* Desktop links */}
          <div className={styles.desktopLinks}>
            {/* Services dropdown */}
            <div
              className={styles.servicesWrapper}
              ref={servicesRef}
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className={styles.navLink}
                onClick={() => setServicesOpen(prev => !prev)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                {t('nav.services')}
                <svg
                  className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ''}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" />
                </svg>
              </button>

              {servicesOpen && (
                <ul className={styles.dropdown}>
                  {serviceLinks.map(link => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`${styles.dropdownLink} ${location.pathname === link.path ? styles.dropdownLinkActive : ''}`}
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              to="/folyamat"
              className={`${styles.navLink} ${location.pathname === '/folyamat' ? styles.navLinkActive : ''}`}
            >
              {t('nav.process')}
            </Link>

            <Link
              to="/kapcsolat"
              className={`${styles.navLink} ${location.pathname === '/kapcsolat' ? styles.navLinkActive : ''}`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Desktop language switcher */}
          <div className={styles.desktopLang}>
            <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {mobileOpen && (
        <div className={styles.overlay}>
          <button
            className={styles.closeBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          </button>

          <nav className={styles.overlayNav} aria-label="Mobile navigation">
            {/* Services — listed flat, not dropdown */}
            <span className={styles.overlayLabel}>{t('nav.services')}</span>
            {serviceLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.overlayLink} ${styles.overlaySubLink} ${location.pathname === link.path ? styles.overlayLinkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}

            <div className={styles.overlaySeparator} />

            <Link
              to="/folyamat"
              className={`${styles.overlayLink} ${location.pathname === '/folyamat' ? styles.overlayLinkActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.process')}
            </Link>

            <Link
              to="/kapcsolat"
              className={`${styles.overlayLink} ${location.pathname === '/kapcsolat' ? styles.overlayLinkActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.contact')}
            </Link>

            <div className={styles.overlaySeparator} />

            <div className={styles.overlayLangWrapper}>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
