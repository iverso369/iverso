import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <Link to="/impressum" className={styles.link}>
        {t('footer.impressum')}
      </Link>
      <Link to="/adatvedelem" className={styles.link}>
        {t('footer.privacy')}
      </Link>
      <span className={styles.copyright}>{t('common.copyright')}</span>
    </footer>
  )
}
