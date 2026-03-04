import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ChatBubble from '../ui/ChatBubble'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './AiChatPreview.module.css'

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

  // Start when in view
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
        <div className={`${styles.chatArea} ${fading ? styles.fading : ''}`}>
          {/* Slot 0: bot greeting (typing → message) */}
          <div className={step >= 1 ? styles.msgVisible : styles.msgHidden}>
            <div className={styles.messageStack}>
              <div className={step >= 1 && step < 2 ? styles.stackShow : styles.stackHide}>
                <ChatBubble role="bot" typing />
              </div>
              <div className={step >= 2 ? styles.stackShow : styles.stackHide}>
                <ChatBubble role="bot" message={t('demos.ai.greeting')} />
              </div>
            </div>
          </div>

          {/* Slot 1: user question */}
          <div className={step >= 3 ? styles.msgVisible : styles.msgHidden}>
            <ChatBubble role="user" message={t('demos.ai.userQuestion')} />
          </div>

          {/* Slot 2: bot answer (typing → message) */}
          <div className={step >= 4 ? styles.msgVisible : styles.msgHidden}>
            <div className={styles.messageStack}>
              <div className={step >= 4 && step < 5 ? styles.stackShow : styles.stackHide}>
                <ChatBubble role="bot" typing />
              </div>
              <div className={step >= 5 ? styles.stackShow : styles.stackHide}>
                <ChatBubble role="bot" message={t('demos.ai.botAnswer')} />
              </div>
            </div>
          </div>
        </div>
      </MiniWebsite>
    </div>
  )
}
