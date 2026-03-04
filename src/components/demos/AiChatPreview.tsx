import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ChatBubble from '../ui/ChatBubble'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './AiChatPreview.module.css'

/* ── Bot avatar — thin-line SVG ── */

function BotIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M12 2v4" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="8" cy="16" r="1" />
      <circle cx="16" cy="16" r="1" />
    </svg>
  )
}

/*
  Animation steps (desktop):
  0 — empty
  1 — bot typing
  2 — bot greeting shown
  3 — user question shown
  4 — bot typing (answer)
  5 — bot answer shown
  then pause → fade → reset to 0
*/

const STEP_DELAYS = [
  400,   // 0→1  brief pause then bot starts typing
  1200,  // 1→2  typing → greeting appears
  800,   // 2→3  pause then user question
  1000,  // 3→4  pause then bot starts typing answer
  1600,  // 4→5  typing → answer appears
  3000,  // 5→0  hold, then loop reset
] as const

export default function AiChatPreview() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isDesktop, setIsDesktop] = useState(false)
  const [inView, setInView] = useState(false)
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const [started, setStarted] = useState(false)

  const botAvatar = <BotIcon />

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

  // Advance to next step
  const advance = useCallback((currentStep: number) => {
    if (currentStep >= 5) {
      // Last step — fade out then reset (desktop) or stop (mobile)
      if (isDesktop) {
        timeoutRef.current = setTimeout(() => {
          setFading(true)
          timeoutRef.current = setTimeout(() => {
            setStep(0)
            setFading(false)
          }, 400)
        }, STEP_DELAYS[5])
      }
      return
    }

    timeoutRef.current = setTimeout(() => {
      setStep(currentStep + 1)
    }, STEP_DELAYS[currentStep])
  }, [isDesktop])

  // Drive the sequence when step changes
  useEffect(() => {
    if (!started) return
    advance(step)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [step, started, advance])

  // Start when in view (drive effect handles all advance calls)
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
      setStarted(true)
    }
  }, [inView, started])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MiniWebsite className={styles.browser}>
        <div className={styles.chatWindow}>
          {/* ── chat header ── */}
          <div className={styles.chatHeader}>
            <div className={styles.headerAvatar}>{botAvatar}</div>
            <div className={styles.headerInfo}>
              <span className={styles.headerName}>{t('demos.ai.botName')}</span>
              <span className={styles.headerStatus}>
                <span className={styles.statusDot} />
                Online
              </span>
            </div>
          </div>

          {/* ── messages ── */}
          <div className={`${styles.chatArea} ${fading ? styles.fading : ''}`}>
            {/* Slot 0: bot greeting (typing at step 1, message at step >= 2) */}
          <div className={step >= 1 ? styles.msgVisible : styles.msgHidden}>
            <div className={styles.messageStack}>
              <div className={step >= 1 && step < 2 ? styles.stackShow : styles.stackHide}>
                <ChatBubble
                  role="bot"
                  typing
                  name={t('demos.ai.botName')}
                  avatar={botAvatar}
                />
              </div>
              <div className={step >= 2 ? styles.stackShow : styles.stackHide}>
                <ChatBubble
                  role="bot"
                  message={t('demos.ai.greeting')}
                  name={t('demos.ai.botName')}
                  avatar={botAvatar}
                />
              </div>
            </div>
          </div>

          {/* Slot 1: user question */}
          <div className={step >= 3 ? styles.msgVisible : styles.msgHidden}>
            <ChatBubble
              role="user"
              message={t('demos.ai.userQuestion')}
            />
          </div>

          {/* Slot 2: bot answer (typing at step 4, message at step >= 5) */}
          <div className={step >= 4 ? styles.msgVisible : styles.msgHidden}>
            <div className={styles.messageStack}>
              <div className={step >= 4 && step < 5 ? styles.stackShow : styles.stackHide}>
                <ChatBubble
                  role="bot"
                  typing
                  name={t('demos.ai.botName')}
                  avatar={botAvatar}
                />
              </div>
              <div className={step >= 5 ? styles.stackShow : styles.stackHide}>
                <ChatBubble
                  role="bot"
                  message={t('demos.ai.botAnswer')}
                  name={t('demos.ai.botName')}
                  avatar={botAvatar}
                />
              </div>
            </div>
          </div>
          </div>

          {/* ── input bar (decorative) ── */}
          <div className={styles.chatInput}>
            <span className={styles.inputField}>{t('demos.ai.inputPlaceholder')}</span>
            <div className={styles.sendButton}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
        </div>
      </MiniWebsite>
    </div>
  )
}
