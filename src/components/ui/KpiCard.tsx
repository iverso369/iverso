import { useEffect, useState, useRef } from 'react'
import './KpiCard.css'

interface KpiCardProps {
  value: string | number
  label: string
  color: string
  animated?: boolean
}

export default function KpiCard({ value, label, color, animated = false }: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(animated ? 0 : value)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!animated || hasAnimated.current) return

    const numericValue = typeof value === 'number' ? value : parseFloat(value)
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    hasAnimated.current = true
    const duration = 1200
    const startTime = performance.now()
    const isFloat = numericValue % 1 !== 0

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericValue * eased

      setDisplayValue(isFloat ? Math.round(current * 10) / 10 : Math.round(current))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [animated, value])

  return (
    <div className="kpi-card" ref={ref}>
      <span className="kpi-card__value font-display" style={{ color }}>
        {displayValue}
      </span>
      <span className="kpi-card__label">
        {label}
      </span>
    </div>
  )
}
