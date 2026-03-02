import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './EmberHero.module.css'

/* ========================================
   TUNABLE CONSTANTS
   ======================================== */
const PARTICLE_COUNT = 50000
const HOVER_RADIUS = 0.16       // fraction of text width (~1 letter)
const DESTROY_RADIUS = 0.4      // fraction of text width (~2-3 letters)
const REBUILD_TIME = 12000      // ms to rebuild after destroy
const DRIFT_SPEED = 0.0003      // upward drift speed
const PULSE_SPEED = 0.5         // pulsation speed
const SPARK_FRACTION = 0.05     // fraction of particles that become rising sparks
const SPARK_MAX_RISE = 0.12     // max rise distance (normalized) for sparks

/* ========================================
   COLOR PALETTE
   ======================================== */
interface ColorEntry {
  r: number
  g: number
  b: number
  weight: number
}

const COLOR_PALETTE: ColorEntry[] = [
  { r: 0.545, g: 0.145, b: 0.0,   weight: 0.15 }, // dark orange / reddish #8B2500
  { r: 0.969, g: 0.498, b: 0.039, weight: 0.50 }, // orange #F77F0A (accent)
  { r: 1.0,   g: 0.722, b: 0.0,   weight: 0.25 }, // yellow #FFB800
  { r: 1.0,   g: 0.894, b: 0.710, weight: 0.10 }, // whitish yellow #FFE4B5
]

function pickColor(): [number, number, number] {
  const rand = Math.random()
  let cumulative = 0
  for (const c of COLOR_PALETTE) {
    cumulative += c.weight
    if (rand <= cumulative) {
      // Add slight variation (±8%)
      const vary = () => 0.92 + Math.random() * 0.16
      return [
        Math.min(1, c.r * vary()),
        Math.min(1, c.g * vary()),
        Math.min(1, c.b * vary()),
      ]
    }
  }
  const last = COLOR_PALETTE[COLOR_PALETTE.length - 1]
  return [last.r, last.g, last.b]
}

/* ========================================
   PIXEL SAMPLING
   ======================================== */
function sampleTextPositions(
  text: string,
  width: number,
  height: number,
): { x: number; y: number }[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  // Use a high-res sampling canvas for better detail
  const scale = 2
  canvas.width = width * scale
  canvas.height = height * scale

  // Calculate font size relative to viewport width — large, prominent text
  const fontSize = Math.round(width * scale * 0.19)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `800 ${fontSize}px Syne`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  const positions: { x: number; y: number }[] = []

  // Sample every Nth pixel for performance
  const step = 2
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const i = (y * canvas.width + x) * 4
      if (pixels[i + 3] > 0) {
        // Normalize to [-0.5, 0.5] range centered at origin
        positions.push({
          x: (x / canvas.width - 0.5),
          y: -(y / canvas.height - 0.5), // flip Y for Three.js
        })
      }
    }
  }

  return positions
}

/* ========================================
   SHADERS
   ======================================== */
const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aFreq;
  attribute vec3 aColor;
  attribute float aSpark;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHoverRadius;
  uniform float uTextWidth;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vOpacity;
  varying float vHoverEffect;

  void main() {
    vec3 pos = position;

    // Pulsation — size and brightness oscillate
    float pulse = sin(uTime * aFreq + aPhase);
    float sizePulse = 1.0 + pulse * 0.2;
    float opacityPulse = 0.8 + pulse * 0.15;

    // Subtle drift noise
    float noiseX = sin(pos.x * 13.7 + uTime * 0.3 + aPhase) * 0.001;
    float noiseY = cos(pos.y * 17.3 + uTime * 0.25 + aPhase * 1.3) * 0.001;
    pos.x += noiseX;
    pos.y += noiseY;

    // Upward drift for non-spark particles
    if (aSpark < 0.5) {
      pos.y += sin(uTime * 0.2 + aPhase) * ${DRIFT_SPEED.toFixed(6)};
    }

    // Hover interaction
    float dist = distance(pos.xy, uMouse);
    float hoverEffect = 1.0 - smoothstep(0.0, uHoverRadius * uTextWidth, dist);
    float hoverSizeBoost = 1.0 + hoverEffect * 0.5;

    // Color pulsation (subtle time-based variation)
    vec3 particleColor = aColor;
    float colorShift = sin(uTime * 0.3 + aPhase * 2.0) * 0.05;
    particleColor.r = clamp(particleColor.r + colorShift, 0.0, 1.0);
    particleColor.g = clamp(particleColor.g + colorShift * 0.5, 0.0, 1.0);

    vColor = particleColor;
    vOpacity = opacityPulse;
    vHoverEffect = hoverEffect;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * sizePulse * hoverSizeBoost * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vOpacity;
  varying float vHoverEffect;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    // 3-layer glow system (coal/ember aesthetic)
    float outerGlow = exp(-dist * 4.0);
    float midGlow = exp(-dist * 10.0);
    float coreGlow = exp(-dist * 25.0);

    // Coal/ember coloring from particle color
    vec3 coalColor = vColor * 0.3;
    vec3 emberHot = vColor;
    vec3 hotCore = vec3(1.0, 0.92, 0.8);

    // Build color from glow layers
    vec3 color = coalColor;
    color = mix(color, emberHot, midGlow * 0.5 + coreGlow * 0.3);
    color += hotCore * coreGlow * 0.15;

    // Edge glow — thin bright rim
    float edgeBrightness = smoothstep(0.35, 0.47, dist) * smoothstep(0.5, 0.47, dist) * 0.4;
    color += emberHot * edgeBrightness;

    // Soft edge falloff
    float softEdge = smoothstep(0.5, 0.03, dist);
    float alpha = softEdge * 0.22 * vOpacity;

    // Hover glow boost
    color = mix(color, emberHot * 1.3, vHoverEffect * 0.5);
    alpha *= 1.0 + vHoverEffect * 1.5;

    if (alpha < 0.005) discard;

    gl_FragColor = vec4(color, alpha);
  }
`

/* ========================================
   COMPONENT
   ======================================== */
export default function EmberHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let animationId = 0

    // --- State for destroy/rebuild ---
    interface DestroyEvent {
      x: number
      y: number
      time: number
      radius: number
    }
    const destroyEvents: DestroyEvent[] = []

    // --- Per-particle state arrays (managed outside GPU for destroy logic) ---
    let currentPositions: Float32Array
    let homePositions: Float32Array
    let velocities: Float32Array
    let destroyedFlags: Float32Array // 0 = normal, >0 = timestamp destroyed
    let sparkFlags: Float32Array
    let sparkPhases: Float32Array
    let sparkBaseY: Float32Array

    // --- Three.js objects ---
    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let points: THREE.Points
    let geometry: THREE.BufferGeometry
    let material: THREE.ShaderMaterial
    let textWidth = 1 // will be computed

    const mouse = new THREE.Vector2(9999, 9999) // offscreen initially

    async function init() {
      if (disposed) return

      // Wait for Syne font to load
      await document.fonts.load('800 100px Syne')

      if (disposed) return

      const w = window.innerWidth
      const h = window.innerHeight

      // --- Renderer ---
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container!.appendChild(renderer.domElement)

      // --- Scene & Camera ---
      scene = new THREE.Scene()
      const aspect = w / h
      camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100)
      camera.position.z = 1

      // --- Pixel sampling ---
      const sampledPositions = sampleTextPositions('IVERSO', w, h)

      // Compute text bounding box for textWidth
      let minX = Infinity, maxX = -Infinity
      let minY = Infinity, maxY = -Infinity
      for (const p of sampledPositions) {
        if (p.x < minX) minX = p.x
        if (p.x > maxX) maxX = p.x
        if (p.y < minY) minY = p.y
        if (p.y > maxY) maxY = p.y
      }
      textWidth = maxX - minX

      // --- Build particle arrays ---
      const count = PARTICLE_COUNT
      const positions = new Float32Array(count * 3)
      homePositions = new Float32Array(count * 3)
      currentPositions = new Float32Array(count * 3)
      velocities = new Float32Array(count * 3)
      destroyedFlags = new Float32Array(count)
      sparkFlags = new Float32Array(count)
      sparkPhases = new Float32Array(count)
      sparkBaseY = new Float32Array(count)

      const sizes = new Float32Array(count)
      const phases = new Float32Array(count)
      const freqs = new Float32Array(count)
      const colors = new Float32Array(count * 3)
      const sparks = new Float32Array(count)

      const useSampled = sampledPositions.length >= count
        ? selectRandom(sampledPositions, count)
        : sampledPositions

      // Convert sampled to aspect-corrected coordinates
      const fovRad = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z
      const visibleWidth = visibleHeight * aspect

      for (let i = 0; i < useSampled.length; i++) {
        const x = useSampled[i].x * visibleWidth
        const y = useSampled[i].y * visibleHeight
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = 0
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
        homePositions[i * 3 + 2] = 0
      }

      // Extra particles — scattered around the text for glow halo
      for (let i = useSampled.length; i < count; i++) {
        // Pick a random sampled position and offset it for diffuse halo
        const base = useSampled[Math.floor(Math.random() * useSampled.length)]
        const angle = Math.random() * Math.PI * 2
        const dist = (Math.random() * 0.025 + 0.005)
        const x = (base.x + Math.cos(angle) * dist) * visibleWidth
        const y = (base.y + Math.sin(angle) * dist) * visibleHeight
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = 0
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
        homePositions[i * 3 + 2] = 0
      }

      // Copy to currentPositions
      currentPositions.set(positions)

      // Recompute textWidth in world coordinates
      textWidth = (maxX - minX) * visibleWidth

      // Assign spark particles — top ~fraction of text
      const textTop = maxY * visibleHeight
      const textMid = ((maxY + minY) / 2) * visibleHeight
      const topThreshold = textMid + (textTop - textMid) * 0.3
      const sparkCount = Math.floor(count * SPARK_FRACTION)
      let sparksAssigned = 0

      for (let i = 0; i < count; i++) {
        const py = homePositions[i * 3 + 1]
        if (sparksAssigned < sparkCount && py > topThreshold && Math.random() < 0.15) {
          sparkFlags[i] = 1
          sparks[i] = 1
          sparkPhases[i] = Math.random() * Math.PI * 2
          sparkBaseY[i] = py
          sparksAssigned++
        }

        // Size distribution: 70% tiny, 25% medium, 5% large
        const sizeRand = Math.random()
        if (sizeRand < 0.70) {
          sizes[i] = 1.0 + Math.random() * 2.0  // 1-3px — dense texture
        } else if (sizeRand < 0.95) {
          sizes[i] = 3.0 + Math.random() * 3.0  // 3-6px — medium glow
        } else {
          sizes[i] = 6.0 + Math.random() * 6.0  // 6-12px — large glow
        }

        // Phase & frequency for pulsation
        phases[i] = Math.random() * Math.PI * 2
        freqs[i] = PULSE_SPEED * (0.6 + Math.random() * 0.8) // ~2-4s period

        // Color
        const [r, g, b] = pickColor()
        colors[i * 3] = r
        colors[i * 3 + 1] = g
        colors[i * 3 + 2] = b
      }

      // --- Geometry ---
      geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
      geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
      geometry.setAttribute('aFreq', new THREE.BufferAttribute(freqs, 1))
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute('aSpark', new THREE.BufferAttribute(sparks, 1))

      // --- Material ---
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(9999, 9999) },
          uHoverRadius: { value: HOVER_RADIUS },
          uTextWidth: { value: textWidth },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      // --- Points ---
      points = new THREE.Points(geometry, material)
      scene.add(points)

      // --- Start animation ---
      const startTime = performance.now()
      animate(startTime)
    }

    function selectRandom<T>(arr: T[], n: number): T[] {
      const shuffled = arr.slice()
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled.slice(0, n)
    }

    /* --- Animation loop --- */
    function animate(startTime: number) {
      if (disposed) return

      const now = performance.now()
      const elapsed = (now - startTime) / 1000 // seconds

      material.uniforms.uTime.value = elapsed

      // Convert screen mouse to world coordinates
      const fovRad = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect
      const worldMouse = new THREE.Vector2(
        (mouse.x / window.innerWidth - 0.5) * visibleWidth,
        -(mouse.y / window.innerHeight - 0.5) * visibleHeight,
      )
      material.uniforms.uMouse.value.copy(worldMouse)

      // --- Update spark particles (rising + fading) ---
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Skip destroyed particles (handled below)
        if (destroyedFlags[i] > 0) continue

        if (sparkFlags[i] > 0) {
          // Spark: cycle upward, fade, reset
          const sparkTime = elapsed * 0.15 + sparkPhases[i]
          const cycle = (sparkTime % 1.0) // 0..1
          const riseAmount = cycle * SPARK_MAX_RISE * visibleHeight
          posArray[i * 3 + 1] = sparkBaseY[i] + riseAmount
          // We modulate opacity via size to simulate fade (shrink as it rises)
          // This is handled in the shader via aSpark attribute
        } else {
          // Normal particle: stay at home with minor drift
          posArray[i * 3] = homePositions[i * 3]
          posArray[i * 3 + 1] = homePositions[i * 3 + 1]
        }
      }

      // --- Process destroy events ---
      for (let i = destroyEvents.length - 1; i >= 0; i--) {
        const ev = destroyEvents[i]
        const age = now - ev.time

        if (age > REBUILD_TIME * 1.5) {
          // Event fully expired, remove
          destroyEvents.splice(i, 1)
          continue
        }
      }

      // Update destroyed particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (destroyedFlags[i] === 0) continue

        const age = now - destroyedFlags[i]

        if (age > REBUILD_TIME) {
          // Fully rebuilt
          destroyedFlags[i] = 0
          posArray[i * 3] = homePositions[i * 3]
          posArray[i * 3 + 1] = homePositions[i * 3 + 1]
          posArray[i * 3 + 2] = 0
          velocities[i * 3] = 0
          velocities[i * 3 + 1] = 0
          velocities[i * 3 + 2] = 0
          continue
        }

        // Phase 1: explosion (first 15% of rebuild time)
        // Phase 2: drift back (remaining 85%)
        const explosionDuration = REBUILD_TIME * 0.15
        if (age < explosionDuration) {
          // Apply velocity with damping
          const damping = 0.96
          velocities[i * 3] *= damping
          velocities[i * 3 + 1] *= damping
          velocities[i * 3 + 2] *= damping
          posArray[i * 3] += velocities[i * 3]
          posArray[i * 3 + 1] += velocities[i * 3 + 1]
          posArray[i * 3 + 2] += velocities[i * 3 + 2]
        } else {
          // Lerp back to home position with easing
          const rebuildProgress = (age - explosionDuration) / (REBUILD_TIME - explosionDuration)
          // Ease-in-out cubic
          const eased = rebuildProgress < 0.5
            ? 4 * rebuildProgress * rebuildProgress * rebuildProgress
            : 1 - Math.pow(-2 * rebuildProgress + 2, 3) / 2

          // Add slight organic wobble during rebuild
          const wobbleX = Math.sin(elapsed * 2.0 + i * 0.01) * 0.002 * (1 - eased)
          const wobbleY = Math.cos(elapsed * 1.7 + i * 0.013) * 0.002 * (1 - eased)

          const startX = posArray[i * 3]
          const startY = posArray[i * 3 + 1]

          // Only lerp if not yet very close
          if (eased < 0.99) {
            const dx = homePositions[i * 3] - startX + wobbleX
            const dy = homePositions[i * 3 + 1] - startY + wobbleY
            posArray[i * 3] += dx * 0.02
            posArray[i * 3 + 1] += dy * 0.02
          } else {
            posArray[i * 3] = homePositions[i * 3]
            posArray[i * 3 + 1] = homePositions[i * 3 + 1]
            posArray[i * 3 + 2] = 0
          }
        }
      }

      posAttr.needsUpdate = true

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(() => animate(startTime))
    }

    /* --- Destroy handler --- */
    function handleClick(e: MouseEvent) {
      const fovRad = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect

      const worldX = (e.clientX / window.innerWidth - 0.5) * visibleWidth
      const worldY = -(e.clientY / window.innerHeight - 0.5) * visibleHeight

      const destroyRadiusWorld = DESTROY_RADIUS * textWidth
      const now = performance.now()

      destroyEvents.push({ x: worldX, y: worldY, time: now, radius: destroyRadiusWorld })

      const posArray = (geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (destroyedFlags[i] > 0) continue // already destroyed

        const px = posArray[i * 3]
        const py = posArray[i * 3 + 1]
        const dx = px - worldX
        const dy = py - worldY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < destroyRadiusWorld) {
          destroyedFlags[i] = now

          // Random explosion velocity — all directions
          const angle = Math.random() * Math.PI * 2
          const upBias = Math.random() * 0.3 // slight upward bias
          const speed = 0.005 + Math.random() * 0.015
          // Particles closer to center get stronger push
          const distFactor = 1 - (dist / destroyRadiusWorld)
          velocities[i * 3] = Math.cos(angle) * speed * (0.5 + distFactor)
          velocities[i * 3 + 1] = (Math.sin(angle) * speed + upBias * speed) * (0.5 + distFactor)
          velocities[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.3
        }
      }
    }

    /* --- Mouse tracking --- */
    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function handleMouseLeave() {
      mouse.x = 9999
      mouse.y = 9999
    }

    /* --- Resize handler --- */
    let resizeTimeout: number
    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        if (disposed || !renderer) return

        const w = window.innerWidth
        const h = window.innerHeight

        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()

        // Re-sample and rebuild particles
        rebuildParticles(w, h)
      }, 200)
    }

    function rebuildParticles(w: number, h: number) {
      const sampledPositions = sampleTextPositions('IVERSO', w, h)

      let minX = Infinity, maxX = -Infinity
      let minY = Infinity, maxY = -Infinity
      for (const p of sampledPositions) {
        if (p.x < minX) minX = p.x
        if (p.x > maxX) maxX = p.x
        if (p.y < minY) minY = p.y
        if (p.y > maxY) maxY = p.y
      }

      const fovRad = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect

      const useSampled = sampledPositions.length >= PARTICLE_COUNT
        ? selectRandom(sampledPositions, PARTICLE_COUNT)
        : sampledPositions

      const posArray = (geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array

      for (let i = 0; i < useSampled.length; i++) {
        const x = useSampled[i].x * visibleWidth
        const y = useSampled[i].y * visibleHeight
        posArray[i * 3] = x
        posArray[i * 3 + 1] = y
        posArray[i * 3 + 2] = 0
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
        homePositions[i * 3 + 2] = 0
      }

      for (let i = useSampled.length; i < PARTICLE_COUNT; i++) {
        const base = useSampled[Math.floor(Math.random() * useSampled.length)]
        const angle = Math.random() * Math.PI * 2
        const dist = (Math.random() * 0.025 + 0.005)
        const x = (base.x + Math.cos(angle) * dist) * visibleWidth
        const y = (base.y + Math.sin(angle) * dist) * visibleHeight
        posArray[i * 3] = x
        posArray[i * 3 + 1] = y
        posArray[i * 3 + 2] = 0
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
        homePositions[i * 3 + 2] = 0
      }

      currentPositions.set(posArray);
      (geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true

      // Update textWidth
      textWidth = (maxX - minX) * visibleWidth
      material.uniforms.uTextWidth.value = textWidth
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)

      // Reset destroy state
      destroyedFlags.fill(0)
      velocities.fill(0)
      destroyEvents.length = 0

      // Re-assign sparks
      const textTop = maxY * visibleHeight
      const textMid = ((maxY + minY) / 2) * visibleHeight
      const topThreshold = textMid + (textTop - textMid) * 0.3
      const sparkCount = Math.floor(PARTICLE_COUNT * SPARK_FRACTION)
      let sparksAssigned = 0
      sparkFlags.fill(0)

      const sparkAttr = geometry.getAttribute('aSpark') as THREE.BufferAttribute
      const sparkArray = sparkAttr.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const py = homePositions[i * 3 + 1]
        if (sparksAssigned < sparkCount && py > topThreshold && Math.random() < 0.15) {
          sparkFlags[i] = 1
          sparkArray[i] = 1
          sparkPhases[i] = Math.random() * Math.PI * 2
          sparkBaseY[i] = py
          sparksAssigned++
        } else {
          sparkArray[i] = 0
        }
      }
      sparkAttr.needsUpdate = true
    }

    /* --- Event listeners --- */
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    container.addEventListener('click', handleClick)

    // Start
    init()

    /* --- Cleanup --- */
    return () => {
      disposed = true
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimeout)

      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('click', handleClick)

      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return <div ref={containerRef} className={styles.container} />
}
