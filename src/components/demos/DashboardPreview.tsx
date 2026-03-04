import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './DashboardPreview.module.css'

/*
  Dashboard cycles through 5 "pages" (one per sidebar menu item).
  Each page: fade in → count-up KPIs → bar chart (if applicable) → table rows → hold 7s → fade out → next page.
  After page 4, loops back to page 0.
*/

const BAR_HEIGHTS = [45, 65, 38, 80, 55, 72, 60]
const MENU_KEYS = ['menuOverview', 'menuClients', 'menuTasks', 'menuCalendar', 'menuReports'] as const
const PAGE_COUNT = 5
const HOLD_MS = 7000

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/* ── SVG icons (thin line, 1.5px stroke) ── */

function LayoutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ChecklistIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
    </svg>
  )
}

const MENU_ICONS = [<LayoutIcon />, <UsersIcon />, <ChecklistIcon />, <CalendarIcon />, <ChartIcon />]

/* ── Page configs ── */

interface KpiConfig {
  label: string; value: string; change?: string; positive?: boolean; barChart?: boolean
}

interface RowConfig {
  cells: [string, string, string, string]
  badge?: 'active' | 'progress' | 'planning'
}

interface PageConfig {
  kpis: [KpiConfig, KpiConfig, KpiConfig]
  cols: [string, string, string, string]
  rows: [RowConfig, RowConfig, RowConfig, RowConfig]
  badgeCol: number
}

const PAGES: PageConfig[] = [
  { // p0: Áttekintés
    kpis: [
      { label: 'p0.kpi1Label', value: 'p0.kpi1Value', change: 'p0.kpi1Change', positive: true },
      { label: 'p0.kpi2Label', value: 'p0.kpi2Value', change: 'p0.kpi2Change', positive: true },
      { label: 'p0.kpi3Label', value: 'p0.kpi3Value', change: 'p0.kpi3Change', positive: false, barChart: true },
    ],
    cols: ['p0.col1', 'p0.col2', 'p0.col3', 'p0.col4'],
    rows: [
      { cells: ['p0.r1c1', 'p0.r1c2', 'p0.r1c3', 'p0.r1c4'], badge: 'active' },
      { cells: ['p0.r2c1', 'p0.r2c2', 'p0.r2c3', 'p0.r2c4'], badge: 'active' },
      { cells: ['p0.r3c1', 'p0.r3c2', 'p0.r3c3', 'p0.r3c4'], badge: 'progress' },
      { cells: ['p0.r4c1', 'p0.r4c2', 'p0.r4c3', 'p0.r4c4'], badge: 'planning' },
    ],
    badgeCol: 2,
  },
  { // p1: Ügyfelek
    kpis: [
      { label: 'p1.kpi1Label', value: 'p1.kpi1Value', change: 'p1.kpi1Change', positive: true },
      { label: 'p1.kpi2Label', value: 'p1.kpi2Value', change: 'p1.kpi2Change', positive: true },
      { label: 'p1.kpi3Label', value: 'p1.kpi3Value', change: 'p1.kpi3Change', positive: true },
    ],
    cols: ['p1.col1', 'p1.col2', 'p1.col3', 'p1.col4'],
    rows: [
      { cells: ['p1.r1c1', 'p1.r1c2', 'p1.r1c3', 'p1.r1c4'], badge: 'active' },
      { cells: ['p1.r2c1', 'p1.r2c2', 'p1.r2c3', 'p1.r2c4'], badge: 'progress' },
      { cells: ['p1.r3c1', 'p1.r3c2', 'p1.r3c3', 'p1.r3c4'], badge: 'progress' },
      { cells: ['p1.r4c1', 'p1.r4c2', 'p1.r4c3', 'p1.r4c4'], badge: 'planning' },
    ],
    badgeCol: 2,
  },
  { // p2: Feladatok
    kpis: [
      { label: 'p2.kpi1Label', value: 'p2.kpi1Value' },
      { label: 'p2.kpi2Label', value: 'p2.kpi2Value', change: 'p2.kpi2Change', positive: true },
      { label: 'p2.kpi3Label', value: 'p2.kpi3Value' },
    ],
    cols: ['p2.col1', 'p2.col2', 'p2.col3', 'p2.col4'],
    rows: [
      { cells: ['p2.r1c1', 'p2.r1c2', 'p2.r1c3', 'p2.r1c4'], badge: 'active' },
      { cells: ['p2.r2c1', 'p2.r2c2', 'p2.r2c3', 'p2.r2c4'], badge: 'progress' },
      { cells: ['p2.r3c1', 'p2.r3c2', 'p2.r3c3', 'p2.r3c4'], badge: 'active' },
      { cells: ['p2.r4c1', 'p2.r4c2', 'p2.r4c3', 'p2.r4c4'], badge: 'planning' },
    ],
    badgeCol: 2,
  },
  { // p3: Naptár
    kpis: [
      { label: 'p3.kpi1Label', value: 'p3.kpi1Value' },
      { label: 'p3.kpi2Label', value: 'p3.kpi2Value' },
      { label: 'p3.kpi3Label', value: 'p3.kpi3Value' },
    ],
    cols: ['p3.col1', 'p3.col2', 'p3.col3', 'p3.col4'],
    rows: [
      { cells: ['p3.r1c1', 'p3.r1c2', 'p3.r1c3', 'p3.r1c4'], badge: 'progress' },
      { cells: ['p3.r2c1', 'p3.r2c2', 'p3.r2c3', 'p3.r2c4'], badge: 'progress' },
      { cells: ['p3.r3c1', 'p3.r3c2', 'p3.r3c3', 'p3.r3c4'], badge: 'progress' },
      { cells: ['p3.r4c1', 'p3.r4c2', 'p3.r4c3', 'p3.r4c4'], badge: 'active' },
    ],
    badgeCol: 3,
  },
  { // p4: Riportok
    kpis: [
      { label: 'p4.kpi1Label', value: 'p4.kpi1Value', change: 'p4.kpi1Change', positive: true },
      { label: 'p4.kpi2Label', value: 'p4.kpi2Value', change: 'p4.kpi2Change', positive: true },
      { label: 'p4.kpi3Label', value: 'p4.kpi3Value', change: 'p4.kpi3Change', positive: true },
    ],
    cols: ['p4.col1', 'p4.col2', 'p4.col3', 'p4.col4'],
    rows: [
      { cells: ['p4.r1c1', 'p4.r1c2', 'p4.r1c3', 'p4.r1c4'], badge: 'active' },
      { cells: ['p4.r2c1', 'p4.r2c2', 'p4.r2c3', 'p4.r2c4'], badge: 'progress' },
      { cells: ['p4.r3c1', 'p4.r3c2', 'p4.r3c3', 'p4.r3c4'], badge: 'active' },
      { cells: ['p4.r4c1', 'p4.r4c2', 'p4.r4c3', 'p4.r4c4'], badge: 'planning' },
    ],
    badgeCol: 2,
  },
]

const BADGE_STYLE: Record<string, string> = {
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
  const pageIndexRef = useRef(0)

  const [inView, setInView] = useState(false)
  const [started, setStarted] = useState(false)
  const [contentFading, setContentFading] = useState(false)
  const [activeMenu, setActiveMenu] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)

  // Animation state
  const [countProgress, setCountProgress] = useState(0)
  const [barsAnimated, setBarsAnimated] = useState(false)
  const [visibleRows, setVisibleRows] = useState(0)

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
    return id
  }, [])

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

  // Animate one page, then transition to next
  const animatePage = useCallback((isFirst: boolean) => {
    if (unmountedRef.current) return

    const pIdx = pageIndexRef.current

    // Reset animation state
    setCountProgress(0)
    setBarsAnimated(false)
    setVisibleRows(0)
    setActiveMenu(pIdx)
    setPageIndex(pIdx)

    const startContent = () => {
      if (unmountedRef.current) return

      // Fade in content
      setContentFading(false)

      // Count-up after fade-in settles
      const countDelay = isFirst ? 0 : 380
      schedule(() => {
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
            // Bar chart
            setBarsAnimated(true)
            schedule(() => {
              if (unmountedRef.current) return
              // Table rows stagger
              for (let r = 1; r <= 4; r++) {
                schedule(() => {
                  if (unmountedRef.current) return
                  setVisibleRows(r)
                }, (r - 1) * 200)
              }
              // Hold, then fade out and go to next page
              schedule(() => {
                if (unmountedRef.current) return
                setContentFading(true)
                schedule(() => {
                  if (unmountedRef.current) return
                  cleanup()
                  // Advance to next page
                  pageIndexRef.current = (pIdx + 1) % PAGE_COUNT
                  animatePage(false)
                }, 400)
              }, 4 * 200 + HOLD_MS)
            }, 600)
          }
        }

        rafRef.current = requestAnimationFrame(tick)
      }, countDelay)
    }

    if (isFirst) {
      startContent()
    } else {
      // Content is faded out — update page data while hidden, then fade in
      rafRef.current = requestAnimationFrame(() => {
        if (unmountedRef.current) return
        startContent()
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
    pageIndexRef.current = 0
    animatePage(true)
  }, [inView, started, animatePage])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unmountedRef.current = true
      cleanup()
    }
  }, [cleanup])

  // Current page data
  const page = PAGES[pageIndex]
  const pk = `demos.dashboard.p${pageIndex}`

  // Interpolated KPI values
  const kpiDisplays = page.kpis.map((kpi) => {
    const finalStr = t(`demos.dashboard.${kpi.value}`)
    return interpolateValue(finalStr, countProgress)
  })

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MiniWebsite className={styles.browser}>
        <div className={`${styles.layout} ${contentFading ? styles.contentFading : ''}`}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
              {t('demos.dashboard.companyLogo')}
            </div>
            {MENU_KEYS.map((key, i) => (
              <div
                key={key}
                className={i === activeMenu ? styles.menuItemActive : styles.menuItem}
              >
                <span className={styles.menuIcon}>{MENU_ICONS[i]}</span>
                {t(`demos.dashboard.${key}`)}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className={styles.main}>
            {/* Header */}
            <div className={styles.header}>
              <span className={styles.headerTitle}>
                {t(`demos.dashboard.${MENU_KEYS[pageIndex]}`)}
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
              {page.kpis.map((kpi, i) => (
                <div key={i} className={styles.kpiCard}>
                  <span className={styles.kpiLabel}>
                    {t(`demos.dashboard.${kpi.label}`)}
                  </span>
                  <span className={styles.kpiValue}>{kpiDisplays[i]}</span>
                  {kpi.change && (
                    <span className={`${styles.kpiChange} ${kpi.positive ? styles.kpiPositive : styles.kpiNegative}`}>
                      {kpi.positive ? '▲' : '▼'} {t(`demos.dashboard.${kpi.change}`)}
                    </span>
                  )}
                  {kpi.barChart && (
                    <div className={styles.barChart}>
                      {BAR_HEIGHTS.map((h, bi) => (
                        <div
                          key={bi}
                          className={`${styles.bar} ${barsAnimated ? styles.barAnimated : ''}`}
                          style={{
                            height: `${h}%`,
                            transitionDelay: barsAnimated ? `${bi * 0.1}s` : '0s',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Table */}
            <table className={styles.table}>
              <thead>
                <tr>
                  {page.cols.map((col, i) => (
                    <th key={i}>{t(`demos.dashboard.${col}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={`${styles.tableRow} ${ri < visibleRows ? styles.tableRowVisible : ''}`}
                  >
                    {row.cells.map((cell, ci) => (
                      <td key={ci}>
                        {ci === page.badgeCol && row.badge ? (
                          <span className={`${styles.statusBadge} ${styles[BADGE_STYLE[row.badge]]}`}>
                            {t(`${pk}.${cell.split('.')[1]}`)}
                          </span>
                        ) : (
                          t(`demos.dashboard.${cell}`)
                        )}
                      </td>
                    ))}
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

function interpolateValue(finalStr: string, progress: number): string {
  const match = finalStr.match(/([€$]?)([0-9.,]+)\s*([A-Za-z%]*\s*[A-Za-z]*)/)
  if (!match) return finalStr

  const prefix = match[1]
  const numStr = match[2]
  const suffix = match[3].trim()

  const num = parseFloat(numStr.replace(',', '.'))
  if (isNaN(num)) return finalStr

  const current = num * progress

  // If original has no decimal, format as integer
  const hasDecimal = numStr.includes(',') || (numStr.includes('.') && !Number.isInteger(num))

  if (!hasDecimal) {
    const formatted = Math.round(current).toString()
    return `${prefix}${formatted}${suffix ? (suffix.startsWith('%') ? suffix : ' ' + suffix) : ''}`
  }

  if (numStr.includes(',')) {
    const formatted = current.toFixed(1).replace('.', ',')
    return `${prefix}${formatted}${suffix ? ' ' + suffix : ''}`
  } else {
    const formatted = current.toFixed(1)
    return `${prefix}${formatted}${suffix}`
  }
}
