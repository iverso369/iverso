import type { ReactNode } from 'react'
import styles from './TextSection.module.css'

interface TextSectionProps {
  children: ReactNode
}

export default function TextSection({ children }: TextSectionProps) {
  return (
    <div className={styles.textSection}>
      <div className={styles.lineTop} />
      <div className={styles.lineBottom} />
      <div className={styles.textInner}>
        <div className={styles.accentLine} />
        <div className={styles.textContent}>
          {children}
        </div>
      </div>
    </div>
  )
}
