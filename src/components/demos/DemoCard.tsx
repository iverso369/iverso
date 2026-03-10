import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './DemoCard.module.css'

interface DemoCardProps {
  titleKey: string
  subtitleKey: string
  linkTo: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function DemoCard({ titleKey, subtitleKey, linkTo, children, footer }: DemoCardProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t(titleKey)}</h2>
        <Link to={linkTo} className={styles.link}>
          {t('common.more')}
        </Link>
      </div>
      <p className={styles.subtitle}>{t(subtitleKey)}</p>

      <div className={styles.content}>
        {children}
      </div>

      {footer}
    </div>
  )
}
