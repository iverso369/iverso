import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.css'

const LANGUAGES = [
  { code: 'hu', label: 'HU' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
] as const

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation()

  return (
    <div className={`${styles.langSwitcher} ${className || ''}`}>
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          className={`${styles.langBtn} ${i18n.language.startsWith(lang.code) ? styles.langActive : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
