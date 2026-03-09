import { useEffect, useRef } from 'react'
import styles from './BackgroundParticles.module.css'

interface Particle {
  x: number
  y: number
  radius: number
  baseRadius: number
  opacity: number
  baseOpacity: number
  spriteIndex: number
  vx: number
  vy: number
  phase: number
  phaseSpeed: number
}

const SPRITE_SIZE = 64
// Synced with EmberHero.tsx volcanic lava palette
const SPRITE_COLORS = [
  { r: 139, g: 26, b: 0, weight: 0.25 },   // #8b1a00 deep core
  { r: 170, g: 34, b: 0, weight: 0.20 },   // #aa2200 dark red
  { r: 204, g: 68, b: 0, weight: 0.20 },   // #cc4400 mid orange
  { r: 255, g: 102, b: 0, weight: 0.20 },  // #ff6600 bright orange
  { r: 255, g: 136, b: 0, weight: 0.10 },  // #ff8800 hot
  { r: 255, g: 170, b: 0, weight: 0.05 },  // #ffaa00 hot yellow
]

function buildSprites(): HTMLCanvasElement[] {
  return SPRITE_COLORS.map(({ r, g, b }) => {
    const offscreen = document.createElement('canvas')
    offscreen.width = SPRITE_SIZE
    offscreen.height = SPRITE_SIZE
    const octx = offscreen.getContext('2d')!
    const half = SPRITE_SIZE / 2
    const grad = octx.createRadialGradient(half, half, 0, half, half, half)
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`)
    grad.addColorStop(0.4, `rgba(${r},${g},${b},0.3)`)
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
    octx.fillStyle = grad
    octx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)
    return offscreen
  })
}

function pickSpriteIndex(): number {
  const r = Math.random()
  let cumulative = 0
  for (let i = 0; i < SPRITE_COLORS.length; i++) {
    cumulative += SPRITE_COLORS[i].weight
    if (r < cumulative) return i
  }
  return 1
}

function createParticle(w: number, h: number): Particle {
  const centerBias = Math.random() < 0.4
  const x = centerBias
    ? w * 0.25 + Math.random() * w * 0.5
    : Math.random() * w
  const y = Math.random() * h

  const baseRadius = 2 + Math.random() * 8
  const baseOpacity = 0.03 + Math.random() * 0.12

  return {
    x,
    y,
    radius: baseRadius,
    baseRadius,
    opacity: baseOpacity,
    baseOpacity,
    spriteIndex: pickSpriteIndex(),
    vx: (Math.random() - 0.5) * 0.47,
    vy: (Math.random() - 0.5) * 0.47,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.008 + Math.random() * 0.016,
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
    const sprites = buildSprites()

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

    const count = Math.min(800, Math.max(600, Math.floor(w * h / 2800)))
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(w, h))
    }

    let rafId: number

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      ctx!.globalCompositeOperation = 'lighter'

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.phase += p.phaseSpeed

          p.radius = p.baseRadius + Math.sin(p.phase) * 1.5
          p.opacity = p.baseOpacity + Math.sin(p.phase * 0.7) * 0.02

          if (p.x < -20) p.x = w + 20
          if (p.x > w + 20) p.x = -20
          if (p.y < -20) p.y = h + 20
          if (p.y > h + 20) p.y = -20
        }

        const drawSize = p.radius * 2
        ctx!.globalAlpha = p.opacity
        ctx!.drawImage(
          sprites[p.spriteIndex],
          p.x - drawSize / 2,
          p.y - drawSize / 2,
          drawSize,
          drawSize
        )
      }

      ctx!.globalAlpha = 1
      ctx!.globalCompositeOperation = 'source-over'

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
