import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

const TRAIL_LENGTH = 6

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Skip on touch devices
    const isTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    document.body.style.cursor = 'none'

    let mouseX = -100
    let mouseY = -100
    const trail: { x: number; y: number }[] = Array.from(
      { length: TRAIL_LENGTH },
      () => ({ x: -100, y: -100 }),
    )

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function handleMouseLeave() {
      mouseX = -100
      mouseY = -100
    }

    let rafId = 0

    function update() {
      // Main dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }

      // Trail follows with lerp (each dot follows the previous)
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const target =
          i === 0 ? { x: mouseX, y: mouseY } : trail[i - 1]
        const lerpSpeed = 0.35 - i * 0.04
        trail[i].x += (target.x - trail[i].x) * lerpSpeed
        trail[i].y += (target.y - trail[i].y) * lerpSpeed

        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate(${trail[i].x - 2}px, ${trail[i].y - 2}px)`
        }
      }

      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(update)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          className={styles.trail}
          style={{ opacity: 1 - (i + 1) / (TRAIL_LENGTH + 1) }}
        />
      ))}
    </>
  )
}
