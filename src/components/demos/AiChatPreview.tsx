import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ChatBubble from '../ui/ChatBubble'
import styles from './AiChatPreview.module.css'

/*
  Extended chat conversations:
  - ext: 7 messages (restaurant booking flow)
  - int: 7 messages (internal analytics assistant)
  Each bot message has a typing phase before it.
  Action buttons appear after the first bot answer in ext mode.
*/

/* ── Message sequence definitions ── */

interface MsgDef {
  role: 'bot' | 'user'
  key: string
  showActions?: boolean
}

const EXT_MESSAGES: MsgDef[] = [
  { role: 'bot', key: 'greeting' },
  { role: 'user', key: 'q1' },
  { role: 'bot', key: 'a1', showActions: true },
  { role: 'user', key: 'q2' },
  { role: 'bot', key: 'a2' },
  { role: 'user', key: 'q3' },
  { role: 'bot', key: 'a3' },
]

const INT_MESSAGES: MsgDef[] = [
  { role: 'bot', key: 'greeting' },
  { role: 'user', key: 'q1' },
  { role: 'bot', key: 'a1' },
  { role: 'user', key: 'q2' },
  { role: 'bot', key: 'a2' },
  { role: 'user', key: 'q3' },
  { role: 'bot', key: 'a3' },
]

/* Precompute render slots: for each message, at which step does typing start / message appear */
interface RenderSlot {
  role: 'bot' | 'user'
  key: string
  typingAtStep: number
  messageAtStep: number
  showActions?: boolean
}

function buildSlots(messages: MsgDef[]): { slots: RenderSlot[]; totalSteps: number } {
  const slots: RenderSlot[] = []
  let step = 1 // start at 1 (step 0 = empty)

  for (const msg of messages) {
    if (msg.role === 'bot') {
      slots.push({
        role: 'bot',
        key: msg.key,
        typingAtStep: step,
        messageAtStep: step + 1,
        showActions: msg.showActions,
      })
      step += 2
    } else {
      slots.push({
        role: 'user',
        key: msg.key,
        typingAtStep: -1,
        messageAtStep: step,
      })
      step += 1
    }
  }

  return { slots, totalSteps: step } // totalSteps = last step + 1 (the hold step)
}

const EXT_SLOTS = buildSlots(EXT_MESSAGES)
const INT_SLOTS = buildSlots(INT_MESSAGES)

/* Step delays per mode */
// ext: 12 steps → 0(empty), 1(typing), 2(greeting), 3(q1), 4(typing), 5(a1+actions), 6(q2), 7(typing), 8(a2), 9(q3), 10(typing), 11(a3)
const EXT_DELAYS = [
  800,   // 0→1  pause before first typing
  1000,  // 1→2  typing→greeting
  1800,  // 2→3  greeting visible → q1
  1500,  // 3→4  q1 visible → typing
  1000,  // 4→5  typing→a1+actions
  3500,  // 5→6  hold (actions, user reads)
  1500,  // 6→7  q2 visible → typing
  1000,  // 7→8  typing→a2
  1800,  // 8→9  a2 visible → q3
  1500,  // 9→10 q3 visible → typing
  1000,  // 10→11 typing→a3
  4000,  // 11→hold final
]

// int: 12 steps → same structure without action button hold
const INT_DELAYS = [
  800,   // 0→1  pause before first typing
  1000,  // 1→2  typing→greeting
  1800,  // 2→3  greeting visible → q1
  1500,  // 3→4  q1 visible → typing
  1000,  // 4→5  typing→a1
  1800,  // 5→6  a1 visible → q2
  1500,  // 6→7  q2 visible → typing
  1000,  // 7→8  typing→a2
  1800,  // 8→9  a2 visible → q3
  1500,  // 9→10 q3 visible → typing
  1000,  // 10→11 typing→a3
  4000,  // 11→hold final
]

/* ── SVG icons ── */

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
      <path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" />
      <path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  )
}

function CalendarIconSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" />
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
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

/* ── ChatPanel ── */

interface ChatPanelProps {
  mode: 'ext' | 'int'
  active: boolean
  onComplete: () => void
}

function ChatPanel({ mode, active, onComplete }: ChatPanelProps) {
  const { t } = useTranslation()
  const messagesRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const [started, setStarted] = useState(false)

  const { slots, totalSteps } = mode === 'ext' ? EXT_SLOTS : INT_SLOTS
  const delays = mode === 'ext' ? EXT_DELAYS : INT_DELAYS
  const lastStep = totalSteps - 1

  // Advance steps
  const advance = useCallback((currentStep: number) => {
    if (currentStep >= lastStep) {
      // Final hold → fade → reset → notify parent
      timeoutRef.current = setTimeout(() => {
        setFading(true)
        timeoutRef.current = setTimeout(() => {
          setStep(0)
          setFading(false)
          setStarted(false)
          if (messagesRef.current) {
            messagesRef.current.scrollTop = 0
          }
          onComplete()
        }, 400)
      }, delays[currentStep] || 4000)
      return
    }

    timeoutRef.current = setTimeout(() => {
      setStep(currentStep + 1)
    }, delays[currentStep] || 1000)
  }, [lastStep, delays, onComplete])

  // Drive sequence
  useEffect(() => {
    if (!started) return
    advance(step)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [step, started, advance])

  // Auto-scroll messages to bottom when step changes
  useEffect(() => {
    const el = messagesRef.current
    if (!el || step === 0) return
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    })
  }, [step])

  // Start when active becomes true
  useEffect(() => {
    if (!active || started) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      setStep(lastStep)
      return
    }

    const timer = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(timer)
  }, [active, started, lastStep])

  const prefix = `demos.ai.${mode}`

  return (
    <div className={styles.widget}>
      {/* Widget header */}
      <div className={styles.widgetHeader}>
        <span className={styles.statusDot} />
        <span className={styles.botName}>{t('demos.ai.botName')}</span>
        <span className={styles.statusText}>{t('demos.ai.statusOnline')}</span>
      </div>

      {/* Messages area */}
      <div ref={messagesRef} className={`${styles.messages} ${fading ? styles.fading : ''}`}>
        {slots.map((slot, i) => {
          if (slot.role === 'bot') {
            const visible = step >= slot.typingAtStep
            const showTyping = step >= slot.typingAtStep && step < slot.messageAtStep
            const showMessage = step >= slot.messageAtStep

            return (
              <div key={i} className={visible ? styles.msgVisible : styles.msgHidden}>
                <div className={styles.messageStack}>
                  <div className={showTyping ? styles.stackShow : styles.stackHide}>
                    <ChatBubble role="bot" typing />
                  </div>
                  <div className={showMessage ? styles.stackShow : styles.stackHide}>
                    <ChatBubble role="bot" message={t(`${prefix}.${slot.key}`)} />
                  </div>
                </div>
                {slot.showActions && mode === 'ext' && (
                  <div className={showMessage ? styles.actionsVisible : styles.actionsHidden}>
                    <div className={styles.actionButtons}>
                      <span className={styles.actionBtn}>
                        <CalendarIconSmall />
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
            )
          } else {
            const visible = step >= slot.messageAtStep
            return (
              <div key={i} className={visible ? styles.userMsgVisible : styles.userMsgHidden}>
                <ChatBubble role="user" message={t(`${prefix}.${slot.key}`)} />
              </div>
            )
          }
        })}
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

/* ── Main component ── */

export default function AiChatPreview() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [activePanel, setActivePanel] = useState<'ext' | 'int'>('ext')

  // Detect in-view (once)
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleComplete = useCallback(() => {
    setActivePanel(prev => prev === 'ext' ? 'int' : 'ext')
  }, [])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <div className={styles.badge}>
            <GlobeIcon />
            <span>{t('demos.ai.extLabel')}</span>
          </div>
          <ChatPanel
            mode="ext"
            active={inView && activePanel === 'ext'}
            onComplete={handleComplete}
          />
        </div>
        <div className={styles.column}>
          <div className={styles.badge}>
            <BuildingIcon />
            <span>{t('demos.ai.intLabel')}</span>
          </div>
          <ChatPanel
            mode="int"
            active={inView && activePanel === 'int'}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  )
}
