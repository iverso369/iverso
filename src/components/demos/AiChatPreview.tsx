import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
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
  const sectionRef = useRef<HTMLElement>(null)
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
    const el = sectionRef.current
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

  // Start/restart when in view (or when reset to step 0 on desktop)
  useEffect(() => {
    if (!inView) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      // Show all messages immediately
      setStep(5)
      setStarted(false)
      return
    }

    if (!started || (isDesktop && step === 0 && !fading)) {
      setStarted(true)
      // Trigger advance from step 0
      if (step === 0) {
        advance(0)
      }
    }
  }, [inView, step, fading, isDesktop, started, advance])

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2 className={styles.title}>{t('demos.ai.title')}</h2>
      <p className={styles.description}>{t('demos.ai.description')}</p>

      <MiniWebsite className={styles.browser}>
        <div className={`${styles.chatArea} ${fading ? styles.fading : ''}`}>
          {/* Step 1: bot typing */}
          {step === 1 && (
            <ChatBubble
              role="bot"
              typing
              name={t('demos.ai.botName')}
              avatar={botAvatar}
            />
          )}

          {/* Step 2+: bot greeting */}
          {step >= 2 && (
            <ChatBubble
              role="bot"
              message={t('demos.ai.greeting')}
              name={t('demos.ai.botName')}
              avatar={botAvatar}
            />
          )}

          {/* Step 3+: user question */}
          {step >= 3 && (
            <ChatBubble
              role="user"
              message={t('demos.ai.userQuestion')}
            />
          )}

          {/* Step 4: bot typing answer */}
          {step === 4 && (
            <ChatBubble
              role="bot"
              typing
              name={t('demos.ai.botName')}
              avatar={botAvatar}
            />
          )}

          {/* Step 5: bot answer */}
          {step >= 5 && (
            <ChatBubble
              role="bot"
              message={t('demos.ai.botAnswer')}
              name={t('demos.ai.botName')}
              avatar={botAvatar}
            />
          )}
        </div>
      </MiniWebsite>

      <Link to="/ai" className={styles.moreLink}>
        {t('demos.more')}
      </Link>
    </section>
  )
}
