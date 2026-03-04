import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './DemoCard.module.css'

interface DemoCardProps {
  titleKey: string
  subtitleKey: string
  linkTo: string
  children: React.ReactNode
}

export default function DemoCard({ titleKey, subtitleKey, linkTo, children }: DemoCardProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{t(titleKey)}</h2>
      <p className={styles.subtitle}>{t(subtitleKey)}</p>

      <div className={styles.content}>
        {children}
      </div>

      <div className={styles.footer}>
        <Link to={linkTo} className={styles.link}>
          {t('common.more')}
        </Link>
      </div>
    </div>
  )
}
