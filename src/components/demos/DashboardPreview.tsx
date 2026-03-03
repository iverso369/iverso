import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import KpiCard from '../ui/KpiCard'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './DashboardPreview.module.css'

/* ── SVG thin-line icons (1.5px stroke) ── */

function TrendingUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function PackageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

/* ── component ── */

export default function DashboardPreview() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const [isDesktop, setIsDesktop] = useState(false)
  const [inView, setInView] = useState(false)
  const [loopKey, setLoopKey] = useState(0)
  const [fading, setFading] = useState(false)

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
    const el = sectionRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Loop animation on desktop while in view
  useEffect(() => {
    if (!isDesktop || !inView) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setLoopKey(k => k + 1)
        setFading(false)
      }, 400)
    }, 6000)

    return () => clearInterval(interval)
  }, [isDesktop, inView])

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2 className={styles.title}>{t('demos.dashboard.title')}</h2>
      <p className={styles.description}>{t('demos.dashboard.description')}</p>

      <MiniWebsite className={styles.browser}>
        <div className={`${styles.cardGrid} ${fading ? styles.fading : ''}`}>
          <KpiCard
            key={`rev-${loopKey}`}
            icon={<TrendingUpIcon />}
            value={24850}
            format="currency"
            label={t('demos.dashboard.revenue')}
            change={12.5}
            progress={0.78}
            size="small"
          />
          <KpiCard
            key={`ord-${loopKey}`}
            icon={<PackageIcon />}
            value={1284}
            format="number"
            label={t('demos.dashboard.orders')}
            change={8.2}
            progress={0.64}
            size="small"
          />
          <KpiCard
            key={`sat-${loopKey}`}
            icon={<StarIcon />}
            value={94.5}
            format="percent"
            label={t('demos.dashboard.satisfaction')}
            change={2.3}
            progress={0.95}
            size="small"
          />
        </div>
      </MiniWebsite>

      <Link to="/dashboardok" className={styles.moreLink}>
        {t('demos.more')}
      </Link>
    </section>
  )
}
