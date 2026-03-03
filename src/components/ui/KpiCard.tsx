import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import styles from './KpiCard.module.css';

type KpiFormat = 'currency' | 'percent' | 'number' | 'change';

interface KpiCardProps {
  icon?: ReactNode;
  value: number;
  format: KpiFormat;
  label: string;
  /** Positive = increase, negative = decrease */
  change?: number;
  /** 0–1 for the donut ring */
  progress?: number;
  size?: 'small' | 'large';
}

/* ── helpers ── */

function formatValue(raw: number, format: KpiFormat): string {
  switch (format) {
    case 'currency': {
      // €12.450 – pont ezres szeparátor
      const abs = Math.abs(Math.round(raw));
      const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `€${formatted}`;
    }
    case 'percent':
      return `${raw.toFixed(1).replace('.', ',')}%`;
    case 'number': {
      const abs = Math.abs(Math.round(raw));
      return abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    case 'change':
      return `${raw >= 0 ? '+' : ''}${raw.toFixed(1).replace('.', ',')}%`;
  }
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ── donut ring (canvas) ── */

const RING_BG = '#1A1A20';

function drawDonut(
  ctx: CanvasRenderingContext2D,
  size: number,
  dpr: number,
  fraction: number,
) {
  const w = size * dpr;
  const cx = w / 2;
  const cy = w / 2;
  const lineWidth = 6 * dpr;
  const radius = cx - lineWidth;

  ctx.clearRect(0, 0, w, w);

  // track
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = RING_BG;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // value arc (narancs gradient)
  if (fraction > 0) {
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + Math.PI * 2 * Math.min(fraction, 1);

    const grad = ctx.createLinearGradient(0, 0, w, w);
    grad.addColorStop(0, '#F77F0A');
    grad.addColorStop(1, '#FFB347');

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = grad;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}

/* ── component ── */

export default function KpiCard({
  icon,
  value,
  format,
  label,
  change,
  progress,
  size = 'large',
}: KpiCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasAnimated = useRef(false);

  const [displayValue, setDisplayValue] = useState(0);
  const [donutFraction, setDonutFraction] = useState(0);
  const [visible, setVisible] = useState(false);

  /* ── count-up + donut animation ── */
  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    setVisible(true);

    const duration = 1800; // ms
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);

      setDisplayValue(value * eased);

      if (progress !== undefined) {
        setDonutFraction(progress * eased);
      }

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
        if (progress !== undefined) setDonutFraction(progress);
      }
    }

    requestAnimationFrame(tick);
  }, [value, progress]);

  /* ── intersection observer ── */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      setDisplayValue(value);
      if (progress !== undefined) setDonutFraction(progress);
      setVisible(true);
      hasAnimated.current = true;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [animate, value, progress]);

  /* ── draw donut canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || progress === undefined) return;

    const dpr = window.devicePixelRatio || 1;
    const cssSize = size === 'small' ? 56 : 80;
    canvas.width = cssSize * dpr;
    canvas.height = cssSize * dpr;
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawDonut(ctx, cssSize, dpr, donutFraction);
  }, [donutFraction, progress, size]);

  /* ── formatted strings ── */
  const formattedValue = formatValue(displayValue, format);

  const donutPercent =
    progress !== undefined
      ? `${Math.round(donutFraction * 100)}%`
      : null;

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[size]} ${visible ? styles.visible : ''}`}
    >
      {/* donut ring */}
      {progress !== undefined && (
        <div className={styles.donut}>
          <canvas ref={canvasRef} className={styles.donutCanvas} />
          <span className={styles.donutPercent}>{donutPercent}</span>
        </div>
      )}

      {/* icon */}
      {icon && <div className={styles.icon}>{icon}</div>}

      {/* value */}
      <span className={styles.value}>{formattedValue}</span>

      {/* label */}
      <span className={styles.label}>{label}</span>

      {/* change indicator */}
      {change !== undefined && (
        <span
          className={`${styles.change} ${change >= 0 ? styles.positive : styles.negative}`}
        >
          {change >= 0 ? '▲' : '▼'}{' '}
          {change >= 0 ? '+' : ''}
          {change.toFixed(1).replace('.', ',')}%
        </span>
      )}
    </div>
  );
}
