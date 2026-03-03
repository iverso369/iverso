import type { ReactNode } from 'react';
import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  role: 'bot' | 'user';
  message?: string;
  /** Show typing indicator (3 pulsing dots) instead of message */
  typing?: boolean;
  /** Bot display name — only shown for role="bot" */
  name?: string;
  /** Avatar slot — ReactNode (SVG icon or <img>) — only shown for role="bot" */
  avatar?: ReactNode;
}

export default function ChatBubble({
  role,
  message,
  typing = false,
  name,
  avatar,
}: ChatBubbleProps) {
  const isBot = role === 'bot';

  return (
    <div className={`${styles.row} ${isBot ? styles.bot : styles.user}`}>
      {/* bot name above the bubble */}
      {isBot && name && <span className={styles.name}>{name}</span>}

      <div className={styles.bubble}>
        {/* avatar (bot only) */}
        {isBot && avatar && <div className={styles.avatar}>{avatar}</div>}

        {/* content: typing dots or message text */}
        {typing ? (
          <span className={styles.dots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </span>
        ) : (
          <span className={styles.text}>{message}</span>
        )}
      </div>
    </div>
  );
}
