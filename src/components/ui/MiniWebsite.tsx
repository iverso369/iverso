import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MiniWebsite.module.css';

interface MiniWebsiteProps {
  children: ReactNode;
  /** Override the i18n-based domain shown in the URL bar */
  domain?: string;
  /** Extra CSS class from the parent (e.g. for sizing) */
  className?: string;
}

export default function MiniWebsite({
  children,
  domain,
  className,
}: MiniWebsiteProps) {
  const { t } = useTranslation();
  const displayDomain = domain ?? t('miniWebsite.domain');

  return (
    <div className={`${styles.frame} ${className ?? ''}`}>
      {/* browser chrome */}
      <div className={styles.chrome}>
        {/* macOS traffic lights */}
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>

        {/* URL bar */}
        <div className={styles.urlBar}>
          <svg
            className={styles.lock}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className={styles.domain}>{displayDomain}</span>
        </div>
      </div>

      {/* content area */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
