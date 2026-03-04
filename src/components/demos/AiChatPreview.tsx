import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ChatBubble from '../ui/ChatBubble'
import styles from './AiChatPreview.module.css'

/*
  Animation steps (per panel):
  0 — empty
  1 — bot typing
  2 — bot greeting shown
  3 — user question shown (slides in from right)
  4 — bot typing (answer)
  5 — bot answer shown
  then pause → fade → reset to 0 → loop
*/

const STEP_DELAYS = [
  400,   // 0→1  brief pause then bot starts typing
  1200,  // 1→2  typing → greeting appears
  800,   // 2→3  pause then user question
  1000,  // 3→4  pause then bot starts typing answer
  1600,  // 4→5  typing → answer appears
  3000,  // 5→0  hold, then loop reset
] as const

/* ── SVG icons (thin line, 1.5px stroke) ── */

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

/* ── ChatPanel — one chat widget with its own animation ── */

interface ChatPanelProps {
  mode: 'ext' | 'int'
  staggerDelay: number
}

function ChatPanel({ mode, staggerDelay }: ChatPanelProps) {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [inView, setInView] = useState(false)
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const [started, setStarted] = useState(false)

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

  // Advance to next step
  const advance = useCallback((currentStep: number) => {
    if (currentStep >= 5) {
      timeoutRef.current = setTimeout(() => {
        setFading(true)
        timeoutRef.current = setTimeout(() => {
          setStep(0)
          setFading(false)
        }, 400)
      }, STEP_DELAYS[5])
      return
    }

    timeoutRef.current = setTimeout(() => {
      setStep(currentStep + 1)
    }, STEP_DELAYS[currentStep])
  }, [])

  // Drive the sequence when step changes
  useEffect(() => {
    if (!started) return
    advance(step)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [step, started, advance])

  // Start when in view (with stagger delay)
  useEffect(() => {
    if (!inView) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      setStep(5)
      setStarted(false)
      return
    }

    if (!started) {
      const timer = setTimeout(() => setStarted(true), staggerDelay)
      return () => clearTimeout(timer)
    }
  }, [inView, started, staggerDelay])

  const prefix = `demos.ai.${mode}`

  return (
    <div ref={wrapperRef} className={styles.widget}>
      {/* Widget header */}
      <div className={styles.widgetHeader}>
        <span className={styles.statusDot} />
        <span className={styles.botName}>{t('demos.ai.botName')}</span>
        <span className={styles.statusText}>{t('demos.ai.statusOnline')}</span>
      </div>

      {/* Messages area */}
      <div className={`${styles.messages} ${fading ? styles.fading : ''}`}>
        {/* Slot 0: bot greeting (typing → message) */}
        <div className={step >= 1 ? styles.msgVisible : styles.msgHidden}>
          <div className={styles.messageStack}>
            <div className={step >= 1 && step < 2 ? styles.stackShow : styles.stackHide}>
              <ChatBubble role="bot" typing />
            </div>
            <div className={step >= 2 ? styles.stackShow : styles.stackHide}>
              <ChatBubble role="bot" message={t(`${prefix}.greeting`)} />
            </div>
          </div>
        </div>

        {/* Slot 1: user question — slides from right */}
        <div className={step >= 3 ? styles.userMsgVisible : styles.userMsgHidden}>
          <ChatBubble role="user" message={t(`${prefix}.userQuestion`)} />
        </div>

        {/* Slot 2: bot answer (typing → message) */}
        <div className={step >= 4 ? styles.msgVisible : styles.msgHidden}>
          <div className={styles.messageStack}>
            <div className={step >= 4 && step < 5 ? styles.stackShow : styles.stackHide}>
              <ChatBubble role="bot" typing />
            </div>
            <div className={step >= 5 ? styles.stackShow : styles.stackHide}>
              <ChatBubble role="bot" message={t(`${prefix}.botAnswer`)} />
            </div>
          </div>
        </div>

        {/* Slot 3: action buttons (ext only) — appear with delay after answer */}
        {mode === 'ext' && (
          <div className={step >= 5 ? styles.actionsVisible : styles.actionsHidden}>
            <div className={styles.actionButtons}>
              <span className={styles.actionBtn}>
                <CalendarIcon />
                {t(`${prefix}.actionBook`)}
              </span>
              <span className={styles.actionBtn}>
                <PhoneIcon />
                {t(`${prefix}.actionCall`)}
              </span>
              <span className={styles.actionBtn}>
                <LinkIcon />
                {t(`${prefix}.actionHours`)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Decorative input bar */}
      <div className={styles.widgetInput}>
        <span className={styles.inputPlaceholder}>{t('demos.ai.inputPlaceholder')}</span>
        <span className={styles.sendButton}>
          <SendIcon />
        </span>
      </div>
    </div>
  )
}

/* ── Main component — two panels side by side ── */

export default function AiChatPreview() {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <div className={styles.badge}>
            <GlobeIcon />
            <span>{t('demos.ai.extLabel')}</span>
          </div>
          <ChatPanel mode="ext" staggerDelay={0} />
        </div>
        <div className={styles.column}>
          <div className={styles.badge}>
            <BuildingIcon />
            <span>{t('demos.ai.intLabel')}</span>
          </div>
          <ChatPanel mode="int" staggerDelay={600} />
        </div>
      </div>
    </div>
  )
}
