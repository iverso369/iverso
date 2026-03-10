import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './DemoCard.module.css'

interface DemoCardProps {
  titleKey: string
  subtitleKey: string
  descriptionKey: string
  linkTo: string
  layout: 'info-left' | 'info-right'
  ratio: 'wide-demo' | 'normal'
  children: React.ReactNode
}

export default function DemoCard({
  titleKey,
  subtitleKey,
  descriptionKey,
  linkTo,
  layout,
  ratio,
  children,
}: DemoCardProps) {
  const { t } = useTranslation()

  const gridClass = `${styles.grid} ${
    layout === 'info-left' ? styles.infoLeft : styles.infoRight
  } ${ratio === 'wide-demo' ? styles.wideDemo : styles.normalDemo}`

  const infoBlock = (
    <div className={styles.info}>
      <h2 className={styles.title}>{t(titleKey)}</h2>
      <p className={styles.subtitle}>{t(subtitleKey)}</p>
      <p className={styles.description}>{t(descriptionKey)}</p>
      <Link to={linkTo} className={styles.link}>
        {t('common.more')}
      </Link>
    </div>
  )

  const demoBlock = (
    <div className={`${styles.demo} ${
      layout === 'info-left' ? styles.borderLeft : styles.borderRight
    }`}>
      {children}
    </div>
  )

  return (
    <div className={styles.card}>
      <div className={gridClass}>
        {layout === 'info-left' ? (
          <>
            {infoBlock}
            {demoBlock}
          </>
        ) : (
          <>
            {demoBlock}
            {infoBlock}
          </>
        )}
      </div>
    </div>
  )
}
