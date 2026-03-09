import { useEffect, useRef } from 'react'
import styles from './BackgroundParticles.module.css'

interface Particle {
  x: number
  y: number
  size: number
  baseSize: number
  opacity: number
  baseOpacity: number
  color: string
  vx: number
  vy: number
  phase: number
  phaseSpeed: number
}

const COLORS = [
  'rgba(217,106,8,',   // sötét narancs
  'rgba(247,127,10,',  // narancs (#F77F0A)
  'rgba(255,160,50,',  // világos narancs
  'rgba(255,190,80,',  // halvány sárga
  'rgba(180,70,5,',    // mély narancs
]

function createParticle(w: number, h: number): Particle {
  const centerBias = Math.random() < 0.4
  const x = centerBias
    ? w * 0.25 + Math.random() * w * 0.5
    : Math.random() * w
  const y = Math.random() * h

  const baseSize = 1 + Math.random() * 2
  const baseOpacity = 0.2 + Math.random() * 0.4

  return {
    x,
    y,
    size: baseSize,
    baseSize,
    opacity: baseOpacity,
    baseOpacity,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.005 + Math.random() * 0.01,
  }
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = window.innerWidth
    let h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(200, Math.max(100, Math.floor(w * h / 10000)))
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(w, h))
    }

    let rafId: number

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.phase += p.phaseSpeed

          p.size = p.baseSize + Math.sin(p.phase) * 0.5
          p.opacity = p.baseOpacity + Math.sin(p.phase * 0.7) * 0.1

          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `${p.color}${p.opacity})`
        ctx!.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
