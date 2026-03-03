import { useRef, useCallback, type PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CompanySizeSlider.module.css';

const LEVEL_COUNT = 4;

interface CompanySizeSliderProps {
  value: number;
  onChange: (level: number) => void;
  className?: string;
}

export default function CompanySizeSlider({
  value,
  onChange,
  className,
}: CompanySizeSliderProps) {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const levels = t('companySize.levels', {
    returnObjects: true,
  }) as string[];

  /* ── resolve pointer position to nearest snap index ── */
  const snapFromX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return value;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(ratio * (LEVEL_COUNT - 1));
    },
    [value],
  );

  /* ── pointer events (mouse + touch via pointer) ── */
  const onPointerDown = (e: PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const next = snapFromX(e.clientX);
    if (next !== value) onChange(next);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current) return;
    const next = snapFromX(e.clientX);
    if (next !== value) onChange(next);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  /* ── derived values ── */
  const pct = (value / (LEVEL_COUNT - 1)) * 100;

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      {/* question */}
      <span className={styles.question}>{t('companySize.question')}</span>

      {/* active level name */}
      <span className={styles.activeLevel}>{levels[value]}</span>

      {/* slider track */}
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* filled portion */}
        <div className={styles.fill} style={{ width: `${pct}%` }} />

        {/* thumb */}
        <div className={styles.thumb} style={{ left: `${pct}%` }} />

        {/* snap dots */}
        {levels.map((_, i) => {
          const dotPct = (i / (LEVEL_COUNT - 1)) * 100;
          return (
            <div
              key={i}
              className={`${styles.dot} ${i <= value ? styles.dotActive : ''}`}
              style={{ left: `${dotPct}%` }}
            />
          );
        })}
      </div>

      {/* level labels under snap points */}
      <div className={styles.labels}>
        {levels.map((label, i) => (
          <span
            key={i}
            className={`${styles.label} ${i === value ? styles.labelActive : ''}`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
