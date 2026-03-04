import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './DashboardPreview.module.css'

/*
  Animation phases:
  0 — reset (everything hidden)
  1 — KPI count-up (~1.5s)
  2 — bar chart grows
  3 — table rows fade in (stagger)
  4 — hold
  then fade → reset to 0 → loop
*/

const BAR_HEIGHTS = [45, 65, 38, 80, 55, 72, 60] // % heights for 7 bars

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/* ── SVG icons (thin line, 1.5px stroke) ── */

function LayoutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ChecklistIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  )
}

/* ── Table row data ── */

const TABLE_ROWS = [
  { clientKey: 'row1Client', projectKey: 'row1Project', valueKey: 'row1Value', status: 'active' },
  { clientKey: 'row2Client', projectKey: 'row2Project', valueKey: 'row2Value', status: 'active' },
  { clientKey: 'row3Client', projectKey: 'row3Project', valueKey: 'row3Value', status: 'progress' },
  { clientKey: 'row4Client', projectKey: 'row4Project', valueKey: 'row4Value', status: 'planning' },
] as const

const STATUS_STYLE_MAP: Record<string, string> = {
  active: 'statusActive',
  progress: 'statusProgress',
  planning: 'statusPlanning',
}

const STATUS_KEY_MAP: Record<string, string> = {
  active: 'statusActive',
  progress: 'statusProgress',
  planning: 'statusPlanning',
}

/* ── Component ── */

export default function DashboardPreview() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const rafRef = useRef<number | null>(null)
  const unmountedRef = useRef(false)

  const [inView, setInView] = useState(false)
  const [started, setStarted] = useState(false)
  const [fading, setFading] = useState(false)

  // Count-up state
  const [countProgress, setCountProgress] = useState(0) // 0..1

  // Bar chart animated
  const [barsAnimated, setBarsAnimated] = useState(false)

  // Table rows visible count
  const [visibleRows, setVisibleRows] = useState(0)

  // Helper: schedule a timeout (tracked for cleanup)
  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
    return id
  }, [])

  // Cleanup all timers + RAF
  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // Detect in-view
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const isFirstRunRef = useRef(true)

  // Run the full animation sequence, then loop
  const runSequence = useCallback(() => {
    if (unmountedRef.current) return

    // Reset state (fading stays true from previous loop — content invisible)
    setCountProgress(0)
    setBarsAnimated(false)
    setVisibleRows(0)

    const startCountUp = () => {
      if (unmountedRef.current) return

      const countDuration = 1500
      const countStart = performance.now()

      function tick(now: number) {
        if (unmountedRef.current) return
        const elapsed = now - countStart
        const p = Math.min(elapsed / countDuration, 1)
        setCountProgress(easeOutCubic(p))

        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setCountProgress(1)
          // Phase 2: bar chart
          setBarsAnimated(true)
          schedule(() => {
            if (unmountedRef.current) return
            // Phase 3: table rows stagger
            for (let r = 1; r <= 4; r++) {
              schedule(() => {
                if (unmountedRef.current) return
                setVisibleRows(r)
              }, (r - 1) * 200)
            }
            // Phase 4: hold then fade and loop
            schedule(() => {
              if (unmountedRef.current) return
              setFading(true)
              schedule(() => {
                if (unmountedRef.current) return
                cleanup()
                runSequence()
              }, 400)
            }, 4 * 200 + 5000)
          }, 600)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    if (isFirstRunRef.current) {
      // First run: no fade-in needed, start immediately
      isFirstRunRef.current = false
      setFading(false)
      startCountUp()
    } else {
      // Loop restart: wait for reset to render while hidden, then fade in
      rafRef.current = requestAnimationFrame(() => {
        if (unmountedRef.current) return
        setFading(false)
        // Wait for fade-in transition before starting count-up
        schedule(startCountUp, 420)
      })
    }
  }, [schedule, cleanup])

  // Start when in view
  useEffect(() => {
    if (!inView || started) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      setCountProgress(1)
      setBarsAnimated(true)
      setVisibleRows(4)
      return
    }

    setStarted(true)
    runSequence()
  }, [inView, started, runSequence])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unmountedRef.current = true
      cleanup()
    }
  }, [cleanup])

  // Formatted KPI values using count-up progress
  const revenueDisplay = interpolateValue(t('demos.dashboard.revenueValue'), countProgress)
  const clientsDisplay = interpolateNumber(847, countProgress)
  const conversionDisplay = interpolateNumber(68, countProgress) + '%'

  const menuItems = [
    { key: 'menuOverview', icon: <LayoutIcon />, active: true },
    { key: 'menuClients', icon: <UsersIcon />, active: false },
    { key: 'menuTasks', icon: <ChecklistIcon />, active: false },
    { key: 'menuCalendar', icon: <CalendarIcon />, active: false },
    { key: 'menuReports', icon: <ChartIcon />, active: false },
  ]

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MiniWebsite className={styles.browser}>
        <div className={`${styles.layout} ${fading ? styles.fading : ''}`}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
              {t('demos.dashboard.companyLogo')}
            </div>
            {menuItems.map((item) => (
              <div
                key={item.key}
                className={item.active ? styles.menuItemActive : styles.menuItem}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                {t(`demos.dashboard.${item.key}`)}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className={styles.main}>
            {/* Header */}
            <div className={styles.header}>
              <span className={styles.headerTitle}>
                {t('demos.dashboard.menuOverview')}
              </span>
              <div className={styles.tabs}>
                <span className={styles.tabActive}>
                  {t('demos.dashboard.tabWeek')}
                </span>
                <span className={styles.tab}>
                  {t('demos.dashboard.tabMonth')}
                </span>
                <span className={styles.tab}>
                  {t('demos.dashboard.tabYear')}
                </span>
              </div>
            </div>

            {/* KPI cards */}
            <div className={styles.kpiRow}>
              {/* Revenue */}
              <div className={styles.kpiCard}>
                <span className={styles.kpiLabel}>
                  {t('demos.dashboard.revenueLabel')}
                </span>
                <span className={styles.kpiValue}>{revenueDisplay}</span>
                <span className={`${styles.kpiChange} ${styles.kpiPositive}`}>
                  ▲ {t('demos.dashboard.revenueChange')}
                </span>
              </div>

              {/* Clients */}
              <div className={styles.kpiCard}>
                <span className={styles.kpiLabel}>
                  {t('demos.dashboard.clientsLabel')}
                </span>
                <span className={styles.kpiValue}>{clientsDisplay}</span>
                <span className={`${styles.kpiChange} ${styles.kpiPositive}`}>
                  ▲ {t('demos.dashboard.clientsChange')}
                </span>
              </div>

              {/* Conversion */}
              <div className={styles.kpiCard}>
                <span className={styles.kpiLabel}>
                  {t('demos.dashboard.conversionLabel')}
                </span>
                <span className={styles.kpiValue}>{conversionDisplay}</span>
                <span className={`${styles.kpiChange} ${styles.kpiNegative}`}>
                  ▼ {t('demos.dashboard.conversionChange')}
                </span>
                <div className={styles.barChart}>
                  {BAR_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className={`${styles.bar} ${barsAnimated ? styles.barAnimated : ''}`}
                      style={{
                        height: `${h}%`,
                        transitionDelay: barsAnimated ? `${i * 0.1}s` : '0s',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('demos.dashboard.colClient')}</th>
                  <th>{t('demos.dashboard.colProject')}</th>
                  <th>{t('demos.dashboard.colStatus')}</th>
                  <th>{t('demos.dashboard.colValue')}</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={row.clientKey}
                    className={`${styles.tableRow} ${i < visibleRows ? styles.tableRowVisible : ''}`}
                  >
                    <td>{t(`demos.dashboard.${row.clientKey}`)}</td>
                    <td>{t(`demos.dashboard.${row.projectKey}`)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[STATUS_STYLE_MAP[row.status]]}`}>
                        {t(`demos.dashboard.${STATUS_KEY_MAP[row.status]}`)}
                      </span>
                    </td>
                    <td>{t(`demos.dashboard.${row.valueKey}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MiniWebsite>
    </div>
  )
}

/* ── Helpers ── */

/** Interpolate a number from 0 to target based on progress (0..1) */
function interpolateNumber(target: number, progress: number): string {
  return Math.round(target * progress).toString()
}

/** Interpolate a localized value string — extracts the number, animates it */
function interpolateValue(finalStr: string, progress: number): string {
  // Match patterns like "9,2M Ft", "€24.8k", "68%"
  const match = finalStr.match(/([€$]?)([0-9.,]+)\s*([A-Za-z%]*\s*[A-Za-z]*)/)
  if (!match) return finalStr

  const prefix = match[1]
  const numStr = match[2]
  const suffix = match[3].trim()

  // Parse the number (handle both , and . as decimal separator)
  const num = parseFloat(numStr.replace(',', '.'))
  if (isNaN(num)) return finalStr

  const current = num * progress

  // Format back with original style
  if (numStr.includes(',')) {
    // Comma decimal (e.g. "9,2")
    const formatted = current.toFixed(1).replace('.', ',')
    return `${prefix}${formatted}${suffix ? ' ' + suffix : ''}`
  } else {
    // Dot decimal (e.g. "24.8")
    const formatted = current.toFixed(1)
    return `${prefix}${formatted}${suffix}`
  }
}
