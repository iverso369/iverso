import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import WorkflowNode from '../ui/WorkflowNode'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './AutomationPreview.module.css'

/* ── SVG thin-line icons (1.5px stroke) ── */

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

/* ── Connector arrow between nodes ── */

function Connector({ active, vertical }: { active: boolean; vertical: boolean }) {
  if (vertical) {
    return (
      <svg
        className={`${styles.connector} ${styles.connectorVertical} ${active ? styles.connectorActive : ''}`}
        viewBox="0 0 24 40"
        preserveAspectRatio="none"
      >
        <line x1="12" y1="0" x2="12" y2="32" className={styles.connectorLine} />
        <polyline points="7 28 12 34 17 28" className={styles.connectorArrow} />
        {active && <circle cx="12" cy="0" r="3" className={styles.flowDot} />}
      </svg>
    )
  }

  return (
    <svg
      className={`${styles.connector} ${styles.connectorHorizontal} ${active ? styles.connectorActive : ''}`}
      viewBox="0 0 48 24"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="12" x2="40" y2="12" className={styles.connectorLine} />
      <polyline points="36 7 42 12 36 17" className={styles.connectorArrow} />
      {active && <circle cx="0" cy="12" r="3" className={styles.flowDot} />}
    </svg>
  )
}

/* ── Node definitions ── */

const NODE_DEFS = [
  { key: 'node1', icon: <EnvelopeIcon /> },
  { key: 'node2', icon: <GearIcon /> },
  { key: 'node3', icon: <DatabaseIcon /> },
  { key: 'node4', icon: <BellIcon /> },
] as const

/* ── Component ── */

export default function AutomationPreview() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [isDesktop, setIsDesktop] = useState(false)
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [fading, setFading] = useState(false)
  const [started, setStarted] = useState(false)
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
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Drive animation
  useEffect(() => {
    if (!inView) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      setActiveIndex(3)
      return
    }

    // Mobile: run once, activate all, stop
    if (!isDesktop) {
      if (!started) {
        setStarted(true)
        setActiveIndex(-1)
        let i = 0
        function step() {
          timeoutRef.current = setTimeout(() => {
            setActiveIndex(i)
            i++
            if (i <= 3) step()
          }, 600)
        }
        step()
      }
      return
    }

    // Desktop: continuous loop
    if (activeIndex === -1 && !fading) {
      setStarted(true)
      timeoutRef.current = setTimeout(() => setActiveIndex(0), 400)
    } else if (activeIndex >= 0 && activeIndex < 3) {
      timeoutRef.current = setTimeout(() => setActiveIndex(activeIndex + 1), 1000)
    } else if (activeIndex === 3) {
      // Hold at full, then reset
      timeoutRef.current = setTimeout(() => {
        setFading(true)
        timeoutRef.current = setTimeout(() => {
          setActiveIndex(-1)
          setFading(false)
        }, 400)
      }, 2500)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [inView, isDesktop, activeIndex, fading, started])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MiniWebsite className={styles.browser}>
        <div className={`${styles.workflow} ${fading ? styles.fading : ''}`}>
          {NODE_DEFS.map((def, i) => (
            <div key={def.key} className={styles.nodeGroup}>
              <WorkflowNode
                icon={def.icon}
                title={t(`demos.automation.${def.key}`)}
                active={activeIndex >= i}
              />
              {i < NODE_DEFS.length - 1 && (
                <Connector
                  active={activeIndex >= i + 1}
                  vertical={!isDesktop}
                />
              )}
            </div>
          ))}
        </div>
      </MiniWebsite>
    </div>
  )
}
