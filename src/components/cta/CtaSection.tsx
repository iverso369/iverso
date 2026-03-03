import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ChatBubble from '../ui/ChatBubble'
import styles from './CtaSection.module.css'

/* ── Amelia placeholder avatar (SVG thin-line icon) ── */

function AmeliaAvatar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const AMELIA_COUNT = 5

export default function CtaSection() {
  const { t } = useTranslation()

  const randomMessage = useMemo(() => {
    const idx = Math.floor(Math.random() * AMELIA_COUNT)
    return t(`cta.amelia.${idx}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  return (
    <section className={styles.section}>
      {/* heading */}
      <div className={styles.heading}>
        <h2 className={styles.title}>{t('cta.title')}</h2>
        <p className={styles.subtitle}>{t('cta.subtitle')}</p>
      </div>

      {/* Amelia chat bubble */}
      <div className={styles.bubbleWrap}>
        <ChatBubble
          role="bot"
          name="Amelia"
          message={randomMessage}
          avatar={<AmeliaAvatar />}
        />
      </div>

      {/* CTA button */}
      <Link to="/kapcsolat" className={styles.button}>
        {t('cta.button')}
      </Link>
    </section>
  )
}
