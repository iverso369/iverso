import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.css'

const LANGUAGES = [
  { code: 'hu', label: 'HU' },
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
] as const

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLang = LANGUAGES.find(l => i18n.language.startsWith(l.code))?.label ?? 'HU'

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleChange(code: string) {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Language switcher"
        aria-expanded={open}
      >
        {currentLang}
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label="Select language">
          {LANGUAGES.map(lang => (
            <li key={lang.code}>
              <button
                className={`${styles.option} ${i18n.language.startsWith(lang.code) ? styles.active : ''}`}
                onClick={() => handleChange(lang.code)}
                role="option"
                aria-selected={i18n.language.startsWith(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
