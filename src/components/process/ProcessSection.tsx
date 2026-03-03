import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProcessSection.module.css'

/* ── SVG thin-line icons (1.5px stroke) ── */

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

function HammerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

/* ── Connector between nodes ── */

function Connector({ visible, vertical }: { visible: boolean; vertical: boolean }) {
  if (vertical) {
    return (
      <svg
        className={`${styles.connector} ${styles.connectorVertical} ${visible ? styles.connectorVisible : ''}`}
        viewBox="0 0 24 40"
        preserveAspectRatio="none"
      >
        <line x1="12" y1="0" x2="12" y2="32" className={styles.connectorLine} />
        <polyline points="7 28 12 34 17 28" className={styles.connectorArrow} />
      </svg>
    )
  }

  return (
    <svg
      className={`${styles.connector} ${styles.connectorHorizontal} ${visible ? styles.connectorVisible : ''}`}
      viewBox="0 0 48 24"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="12" x2="40" y2="12" className={styles.connectorLine} />
      <polyline points="36 7 42 12 36 17" className={styles.connectorArrow} />
    </svg>
  )
}

/* ── Step definitions ── */

const STEPS = [
  { key: 'step1', icon: <ChatIcon /> },
  { key: 'step2', icon: <PenIcon /> },
  { key: 'step3', icon: <HammerIcon /> },
  { key: 'step4', icon: <CheckCircleIcon /> },
] as const

/* ── Props ── */

interface ProcessSectionProps {
  animated?: boolean
}

/* ── Component ── */

export default function ProcessSection({ animated = false }: ProcessSectionProps) {
  const { t } = useTranslation()

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    setIsDesktop(mq.matches)
    function handler(e: MediaQueryListEvent) {
      setIsDesktop(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const showAll = !animated

  return (
    <section className={styles.section}>
      <div className={`${styles.track} ${animated ? styles.animated : ''}`}>
        {STEPS.map((step, i) => (
          <div key={step.key} className={styles.stepGroup}>
            {/* node */}
            <div
              className={`${styles.node} ${showAll ? styles.nodeVisible : ''}`}
              style={{ transitionDelay: animated ? `${i * 200}ms` : '0ms' }}
            >
              <div className={styles.iconWrap}>{step.icon}</div>
              <span className={styles.stepTitle}>
                {t(`process.${step.key}.title`)}
              </span>
              <p className={styles.stepDesc}>
                {t(`process.${step.key}.description`)}
              </p>
            </div>

            {/* connector (not after the last node) */}
            {i < STEPS.length - 1 && (
              <Connector visible={showAll} vertical={!isDesktop} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
