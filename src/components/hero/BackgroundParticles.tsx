import { useEffect, useRef } from 'react'
import styles from './BackgroundParticles.module.css'

interface Particle {
  x: number
  y: number
  size: number
  baseSize: number
  glowSize: number
  opacity: number
  baseOpacity: number
  color: string
  glowColor: string
  vx: number
  vy: number
  phase: number
  phaseSpeed: number
}

// 30% sötét vörös, 40% narancs, 20% sárgás, 10% fehéres
const COLORS: Array<{ core: string; glow: string; weight: number }> = [
  { core: 'rgba(139,37,0,',  glow: 'rgba(139,37,0,',  weight: 0.30 },  // sötét vörös
  { core: 'rgba(217,106,8,', glow: 'rgba(217,106,8,', weight: 0.20 },  // sötét narancs
  { core: 'rgba(247,127,10,', glow: 'rgba(247,127,10,', weight: 0.20 }, // narancs
  { core: 'rgba(255,179,71,', glow: 'rgba(255,179,71,', weight: 0.20 }, // sárgás
  { core: 'rgba(255,228,181,', glow: 'rgba(255,228,181,', weight: 0.10 }, // fehéres
]

function pickColor() {
  const r = Math.random()
  let cumulative = 0
  for (const c of COLORS) {
    cumulative += c.weight
    if (r < cumulative) return c
  }
  return COLORS[1]
}

function createParticle(w: number, h: number): Particle {
  const centerBias = Math.random() < 0.4
  const x = centerBias
    ? w * 0.25 + Math.random() * w * 0.5
    : Math.random() * w
  const y = Math.random() * h

  const baseSize = 0.5 + Math.random() * 1.0
  const glowSize = 4 + Math.random() * 4
  const baseOpacity = 0.1 + Math.random() * 0.4
  const color = pickColor()

  return {
    x,
    y,
    size: baseSize,
    baseSize,
    glowSize,
    opacity: baseOpacity,
    baseOpacity,
    color: color.core,
    glowColor: color.glow,
    vx: (Math.random() - 0.5) * 0.375,
    vy: (Math.random() - 0.5) * 0.375,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.00625 + Math.random() * 0.0125,
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

    const count = Math.min(500, Math.max(400, Math.floor(w * h / 4000)))
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

          p.size = p.baseSize + Math.sin(p.phase) * 0.3
          p.opacity = p.baseOpacity + Math.sin(p.phase * 0.7) * 0.08

          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }

        // Glow — halvány, nagy kör
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2)
        ctx!.fillStyle = `${p.glowColor}${Math.min(p.opacity * 0.15, 0.1)})`
        ctx!.fill()

        // Core — kisebb, erősebb mag
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
