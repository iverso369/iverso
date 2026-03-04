import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './WebsitePreview.module.css'

/* ── SVG thin-line icons (1.5px stroke) ── */

function UtensilsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

/* ── Animation step count (0-based indices for each element) ── */
const STEP_COUNT = 7 // nav, heroTitle, heroSub, cta, card0, card1, card2

export default function WebsitePreview() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [isDesktop, setIsDesktop] = useState(false)
  const [inView, setInView] = useState(false)
  const [visibleStep, setVisibleStep] = useState(-1)
  const [fading, setFading] = useState(false)
  const [mobileRan, setMobileRan] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Detect desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    setIsDesktop(mq.matches)
    function handler(e: MediaQueryListEvent) {
      setIsDesktop(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Detect in-view
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Drive progressive load animation
  useEffect(() => {
    if (!inView) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) {
      setVisibleStep(STEP_COUNT - 1)
      return
    }

    // Mobile: run once, then static
    if (!isDesktop) {
      if (mobileRan) return
      setMobileRan(true)
      setVisibleStep(-1)
      let i = 0
      function step() {
        timeoutRef.current = setTimeout(() => {
          setVisibleStep(i)
          i++
          if (i < STEP_COUNT) step()
        }, 180)
      }
      step()
      return
    }

    // Desktop: progressive load loop
    if (visibleStep === -1 && !fading) {
      let i = 0
      function step() {
        timeoutRef.current = setTimeout(() => {
          setVisibleStep(i)
          i++
          if (i < STEP_COUNT) step()
        }, 250)
      }
      step()
    } else if (visibleStep === STEP_COUNT - 1 && !fading) {
      // Hold, then fade and restart
      timeoutRef.current = setTimeout(() => {
        setFading(true)
        timeoutRef.current = setTimeout(() => {
          setVisibleStep(-1)
          setFading(false)
        }, 400)
      }, 3000)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [inView, isDesktop, visibleStep, fading, mobileRan])

  const cards = [
    { icon: <UtensilsIcon />, label: t('demos.websites.card1') },
    { icon: <ClockIcon />, label: t('demos.websites.card2') },
    { icon: <PhoneIcon />, label: t('demos.websites.card3') },
  ]

  function vis(step: number) {
    return visibleStep >= step ? styles.visible : ''
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MiniWebsite className={styles.browser}>
        <div className={`${styles.page} ${fading ? styles.fading : ''}`}>
          {/* mini nav */}
          <div className={`${styles.miniNav} ${styles.element} ${vis(0)}`}>
            <span className={styles.restaurantName}>
              {t('demos.websites.restaurantName')}
            </span>
            <div className={styles.navLinks}>
              <span className={styles.navLink}>{t('demos.websites.card1')}</span>
              <span className={styles.navLink}>{t('demos.websites.card3')}</span>
            </div>
          </div>

          {/* hero */}
          <div className={styles.hero}>
            <h3 className={`${styles.heroTitle} ${styles.element} ${vis(1)}`}>
              {t('demos.websites.heroTitle')}
            </h3>
            <p className={`${styles.heroSubtitle} ${styles.element} ${vis(2)}`}>
              {t('demos.websites.heroSubtitle')}
            </p>
            <span className={`${styles.ctaButton} ${styles.element} ${vis(3)}`}>
              {t('demos.websites.ctaButton')}
            </span>
          </div>

          {/* 3 cards */}
          <div className={styles.cardRow}>
            {cards.map((card, i) => (
              <div
                key={i}
                className={`${styles.card} ${styles.element} ${vis(4 + i)}`}
              >
                <div className={styles.cardIcon}>{card.icon}</div>
                <span className={styles.cardLabel}>{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </MiniWebsite>
    </div>
  )
}
