import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './CtaSection.module.css'

const SET_COUNT = 10

export default function CtaSection() {
  const { t } = useTranslation()
  const chatBodyRef = useRef<HTMLDivElement>(null)

  const setIdx = useMemo(() => Math.floor(Math.random() * SET_COUNT), [])

  const bubbles = useMemo(() => {
    const raw = t(`amelia.cta.set${setIdx}`, { returnObjects: true })
    return Array.isArray(raw) ? (raw as string[]) : []
  }, [t, setIdx])

  useEffect(() => {
    if (chatBodyRef.current && (window as unknown as Record<string, unknown>).twemoji) {
      const twemoji = (window as unknown as Record<string, { parse: (el: HTMLElement, opts: Record<string, string>) => void }>).twemoji
      twemoji.parse(chatBodyRef.current, {
        folder: 'svg',
        ext: '.svg',
      })
    }
  }, [bubbles])

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{t('cta.title')}</h2>
        <p className={styles.subtitle}>{t('cta.subtitle')}</p>
      </div>

      <div className={styles.chatWindow}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.avatar}>A</div>
          <div className={styles.headerInfo}>
            <span className={styles.headerName}>{t('amelia.name')}</span>
            <span className={styles.headerStatus}>Online</span>
          </div>
        </div>

        {/* Body */}
        <div ref={chatBodyRef} className={styles.chatBody}>
          {bubbles.map((msg, i) => (
            <div key={i} className={styles.bubble} style={{ animationDelay: `${i * 1.5}s` }}>
              {msg}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.chatFooter}>
          <Link to="/kapcsolat" className={styles.ctaButton}>
            {t('cta.button')}
          </Link>
        </div>
      </div>
    </section>
  )
}
