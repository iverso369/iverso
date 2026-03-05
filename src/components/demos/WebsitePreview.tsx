import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import MiniWebsite from '../ui/MiniWebsite'
import styles from './WebsitePreview.module.css'

/* ── Load Lora font for the bakery demo (not Iverso's font) ── */
const LORA_HREF = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap'

function ensureLora() {
  if (document.querySelector(`link[href="${LORA_HREF}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = LORA_HREF
  document.head.appendChild(link)
}

/* ── Animation steps: nav, hero, heroSub, sectionLabel, product0, product1, product2, bottomBar ── */
const STEP_COUNT = 8
const STEP_DELAY = 250
const HOLD_MS = 4000
const FADE_MS = 400

export default function WebsitePreview() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const unmountedRef = useRef(false)

  const [inView, setInView] = useState(false)
  const [started, setStarted] = useState(false)
  const [visibleStep, setVisibleStep] = useState(-1)
  const [fading, setFading] = useState(false)

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
    return id
  }, [])

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  // Load Lora font on mount
  useEffect(() => { ensureLora() }, [])

  // Detect in-view
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Run one cycle: stagger in all steps, hold, fade out, restart
  const runCycle = useCallback(() => {
    if (unmountedRef.current) return

    setVisibleStep(-1)
    setFading(false)

    // Stagger each step
    for (let i = 0; i < STEP_COUNT; i++) {
      schedule(() => {
        if (unmountedRef.current) return
        setVisibleStep(i)
      }, i * STEP_DELAY)
    }

    // After all steps + hold → fade out → restart
    const totalStepTime = STEP_COUNT * STEP_DELAY
    schedule(() => {
      if (unmountedRef.current) return
      setFading(true)
      schedule(() => {
        if (unmountedRef.current) return
        cleanup()
        runCycle()
      }, FADE_MS)
    }, totalStepTime + HOLD_MS)
  }, [schedule, cleanup])

  // Start when in view
  useEffect(() => {
    if (!inView || started) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) {
      setVisibleStep(STEP_COUNT - 1)
      return
    }

    setStarted(true)
    runCycle()
  }, [inView, started, runCycle])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unmountedRef.current = true
      cleanup()
    }
  }, [cleanup])

  const products = [
    {
      name: t('demos.websites.product1Name'),
      desc: t('demos.websites.product1Desc'),
      price: t('demos.websites.product1Price'),
    },
    {
      name: t('demos.websites.product2Name'),
      desc: t('demos.websites.product2Desc'),
      price: t('demos.websites.product2Price'),
    },
    {
      name: t('demos.websites.product3Name'),
      desc: t('demos.websites.product3Desc'),
      price: t('demos.websites.product3Price'),
    },
  ]

  function vis(step: number) {
    return visibleStep >= step ? styles.visible : ''
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <MiniWebsite className={styles.browser}>
        <div className={`${styles.page} ${fading ? styles.fading : ''}`}>
          {/* nav */}
          <div className={`${styles.miniNav} ${styles.element} ${vis(0)}`}>
            <span className={styles.bakeryName}>
              {t('demos.websites.bakeryName')}
            </span>
            <div className={styles.navLinks}>
              <span className={styles.navLink}>{t('demos.websites.navProducts')}</span>
              <span className={styles.navLink}>{t('demos.websites.navAbout')}</span>
            </div>
          </div>

          {/* hero */}
          <div className={`${styles.hero} ${styles.element} ${vis(1)}`}>
            <div className={styles.heroOverlay} />
            <h3 className={styles.heroTitle}>
              {t('demos.websites.heroTitle')}
            </h3>
            <p className={`${styles.heroSubtitle} ${styles.element} ${vis(2)}`}>
              {t('demos.websites.heroSubtitle')}
            </p>
          </div>

          {/* products */}
          <div className={styles.productSection}>
            <p className={`${styles.sectionLabel} ${styles.element} ${vis(3)}`}>
              {t('demos.websites.sectionLabel')}
            </p>
            <div className={styles.productList}>
              {products.map((product, i) => (
                <div
                  key={i}
                  className={`${styles.productItem} ${styles.element} ${vis(4 + i)}`}
                >
                  <div className={styles.productLeft}>
                    <div className={styles.productDot} />
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productDesc}>{product.desc}</div>
                    </div>
                  </div>
                  <div className={styles.productPrice}>{product.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div className={`${styles.bottomBar} ${styles.element} ${vis(7)}`}>
            <div className={styles.hoursWrapper}>
              <span className={styles.clockIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className={styles.hoursText}>{t('demos.websites.hours')}</span>
            </div>
            <span className={styles.orderBtn}>{t('demos.websites.orderButton')}</span>
          </div>
        </div>
      </MiniWebsite>
    </div>
  )
}
