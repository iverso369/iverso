import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Nav.module.css'

interface NavProps {
  heroElementId?: string
}

const serviceLinks = [
  { path: '/dashboardok', key: 'nav.dashboards' },
  { path: '/ai', key: 'nav.ai' },
  { path: '/automatizacio', key: 'nav.automation' },
  { path: '/weboldalak', key: 'nav.websites' },
]

export default function Nav({ heroElementId: _heroElementId }: NavProps) {
  const { t } = useTranslation()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile overlay on route change
  useEffect(() => {
    setMobileOpen(false)
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

  return (
    <>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            IVERSO
          </Link>

          {/* Desktop links — flat, no dropdown */}
          <div className={styles.desktopLinks}>
            {serviceLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${location.pathname === link.path ? styles.navLinkActive : ''}`}
              >
                {t(link.key)}
              </Link>
            ))}

            {/* Dot separator */}
            <span className={styles.dotSeparator} />

            <Link
              to="/tudnivalok"
              className={`${styles.navLink} ${location.pathname === '/tudnivalok' ? styles.navLinkActive : ''}`}
            >
              {t('nav.process')}
            </Link>
          </div>

          {/* Right side: Contact + separator + Language */}
          <div className={styles.rightGroup}>
            <Link to="/kapcsolat" className={styles.contactBtn}>
              {t('nav.contact')}
            </Link>

            <span className={styles.lineSeparator} />

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
              to="/tudnivalok"
              className={`${styles.overlayLink} ${location.pathname === '/tudnivalok' ? styles.overlayLinkActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.process')}
            </Link>

            <Link
              to="/kapcsolat"
              className={`${styles.overlayLink} ${styles.overlayContactBtn} ${location.pathname === '/kapcsolat' ? styles.overlayLinkActive : ''}`}
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
