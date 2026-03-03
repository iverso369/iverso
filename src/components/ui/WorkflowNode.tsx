import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import styles from './WorkflowNode.module.css';

interface ConnectionRects {
  input: DOMRect | null;
  output: DOMRect | null;
}

interface WorkflowNodeProps {
  icon: ReactNode;
  title: string;
  /** Short description — shown on hover */
  tooltip?: string;
  /** Long description — revealed on click */
  detail?: string;
  /** Orange border + glow when true */
  active?: boolean;
  /** Callback that exposes connection point positions to the parent */
  onConnectionRects?: (rects: ConnectionRects) => void;
}

export default function WorkflowNode({
  icon,
  title,
  tooltip,
  detail,
  active = false,
  onConnectionRects,
}: WorkflowNodeProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  /* ── expose connection point rects to parent ── */
  const reportRects = useCallback(() => {
    if (!onConnectionRects) return;
    onConnectionRects({
      input: inputRef.current?.getBoundingClientRect() ?? null,
      output: outputRef.current?.getBoundingClientRect() ?? null,
    });
  }, [onConnectionRects]);

  useEffect(() => {
    reportRects();
    window.addEventListener('resize', reportRects);
    return () => window.removeEventListener('resize', reportRects);
  }, [reportRects]);

  /* ── click handler ── */
  const toggle = () => {
    if (detail) setOpen((prev) => !prev);
  };

  return (
    <div
      className={`${styles.node} ${active ? styles.active : ''} ${open ? styles.open : ''}`}
      onClick={toggle}
      title={tooltip}
      role={detail ? 'button' : undefined}
      tabIndex={detail ? 0 : undefined}
      onKeyDown={
        detail
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
              }
            }
          : undefined
      }
    >
      {/* input connection point */}
      <div ref={inputRef} className={`${styles.point} ${styles.pointIn}`} />

      {/* main body */}
      <div className={styles.body}>
        <div className={styles.icon}>{icon}</div>
        <span className={styles.title}>{title}</span>
      </div>

      {/* detail panel (click to reveal) */}
      {detail && (
        <div className={styles.detail}>
          <p className={styles.detailText}>{detail}</p>
        </div>
      )}

      {/* output connection point */}
      <div ref={outputRef} className={`${styles.point} ${styles.pointOut}`} />
    </div>
  );
}
