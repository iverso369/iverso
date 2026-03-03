import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './EmberHero.module.css'

/* ========================================
   CONSTANTS
   ======================================== */
const PARTICLE_COUNT = 50000
const CAMERA_Z = 35
const CAMERA_FOV = 75

const DESTROY_RADIUS_FACTOR = 0.25

// Destroy timeline (ms) — 10s total
const DESTROY_FLY_PHASE = 1500
const DESTROY_RETURN_PHASE = 6500
const DESTROY_SNAP_PHASE = 2000
const DESTROY_TOTAL = DESTROY_FLY_PHASE + DESTROY_RETURN_PHASE + DESTROY_SNAP_PHASE

const MOSQUITO_DURATION = 3000

// Scroll thresholds (fraction of max scroll)
const SCROLL_DISPERSE_START = 0.15
const SCROLL_DISPERSE_END = 0.30
const SCROLL_REFORM_START = 0.85
const SCROLL_REFORM_END = 0.95

// Scroll physics
const SCROLL_IMPULSE = 2.0
const SCROLL_DAMPING = 0.96
const SCROLL_SPRING_K = 0.03

/* ========================================
   SHADERS
   ======================================== */
const vertexShader = /* glsl */ `
  attribute float aRandom;
  attribute float aSizeClass;
  attribute vec3 aColor;

  uniform float uTime;
  uniform vec3 uMouse3D;
  uniform float uMouseActive;
  uniform float uOpacity;
  uniform float uBreathing;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vMouseGlow;
  varying float vSizeClass;

  void main() {
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Mouse proximity
    float mouseDist = length(uMouse3D.xy - pos.xy);
    float mouseRadius = 5.0;
    vMouseGlow = uMouseActive * smoothstep(mouseRadius, 0.0, mouseDist);

    // Size based on class
    float baseSize;
    if (aSizeClass < 0.25) {
      // tiny (70%)
      baseSize = 1.0 + aRandom * 0.8;
    } else if (aSizeClass < 0.75) {
      // medium (25%)
      baseSize = 2.5 + aRandom * 2.0;
    } else {
      // large glow (5%)
      baseSize = 7.0 + aRandom * 6.0;
    }

    // Multi-frequency pulse (more alive)
    float pulse = sin(uTime * 1.5 + aRandom * 6.2832) * 0.15
                + sin(uTime * 0.7 + aRandom * 3.14) * 0.08
                + 1.0;

    // Global breathing
    pulse *= uBreathing;

    // Hover size boost
    float hoverBoost = 1.0 + vMouseGlow * 0.6;

    gl_PointSize = baseSize * pulse * hoverBoost * (150.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vColor = aColor;
    vAlpha = uOpacity;
    vSizeClass = aSizeClass;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vMouseGlow;
  varying float vSizeClass;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    // Glow profile: sharper for tiny, softer for large
    float sharpness = mix(12.0, 4.0, vSizeClass);
    float glow = exp(-dist * sharpness);
    float core = exp(-dist * 16.0);

    // Base ember color
    vec3 color = vColor * glow + vec3(1.0, 0.95, 0.85) * core * 0.3;

    // Hover: shift toward yellowish-white
    vec3 hoverColor = vec3(1.0, 0.95, 0.8);
    color = mix(color, hoverColor * (glow + core * 0.5) * 1.5, vMouseGlow * 0.6);

    // Alpha: tiny=more opaque, large=more transparent
    float baseAlpha = mix(0.65, 0.12, vSizeClass);
    float softEdge = smoothstep(0.5, 0.05, dist);
    float alpha = softEdge * glow * baseAlpha * vAlpha;

    // Hover brightness
    alpha *= 1.0 + vMouseGlow * 2.5;

    if (alpha < 0.003) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

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
  const scale = 2
  canvas.width = width * scale
  canvas.height = height * scale
  const fontSize = Math.round(width * scale * 0.11)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `800 ${fontSize}px Syne`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, canvas.width / 2, canvas.height * 0.37)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  const positions: { x: number; y: number }[] = []
  const step = 1
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const i = (y * canvas.width + x) * 4
      if (pixels[i + 3] > 0) {
        positions.push({
          x: x / canvas.width - 0.5,
          y: -(y / canvas.height - 0.5),
        })
      }
    }
  }
  return positions
}

function selectRandom<T>(arr: T[], n: number): T[] {
  const shuffled = arr.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, n)
}

/* ========================================
   SCROLL HELPERS
   ======================================== */
function getScrollRatio(): number {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight
  if (maxScroll <= 0) return 0
  return Math.min(1, Math.max(0, window.scrollY / maxScroll))
}

function getDispersalFactor(ratio: number): number {
  if (ratio <= SCROLL_DISPERSE_START) return 0
  if (ratio <= SCROLL_DISPERSE_END)
    return (ratio - SCROLL_DISPERSE_START) / (SCROLL_DISPERSE_END - SCROLL_DISPERSE_START)
  if (ratio <= SCROLL_REFORM_START) return 1
  if (ratio <= SCROLL_REFORM_END)
    return 1 - (ratio - SCROLL_REFORM_START) / (SCROLL_REFORM_END - SCROLL_REFORM_START)
  return 0
}

function getOpacityFactor(ratio: number): number {
  if (ratio <= SCROLL_DISPERSE_START) return 1.0
  if (ratio <= SCROLL_DISPERSE_END)
    return 1.0 - ((ratio - SCROLL_DISPERSE_START) / (SCROLL_DISPERSE_END - SCROLL_DISPERSE_START)) * 0.8
  if (ratio <= SCROLL_REFORM_START) return 0.2
  if (ratio <= SCROLL_REFORM_END)
    return 0.2 + ((ratio - SCROLL_REFORM_START) / (SCROLL_REFORM_END - SCROLL_REFORM_START)) * 0.8
  return 1.0
}

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
    let resizeTimeout = 0

    // Arrays — allocated in buildParticles()
    let homePositions: Float32Array
    let positionArray: Float32Array
    let randoms: Float32Array
    let destroyedAt: Float32Array
    let destroyVelocities: Float32Array
    let destroyOffsets: Float32Array
    let returnDelays: Float32Array

    // Scroll physics arrays
    let scrollVelocities: Float32Array
    let scrollOffsets: Float32Array
    let scrollDirections: Float32Array
    let prevDispersal = 0

    let textWorldWidth = 1

    // Three.js objects
    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let points: THREE.Points
    let geometry: THREE.BufferGeometry
    let material: THREE.ShaderMaterial

    // Mouse state
    const mouseNDC = new THREE.Vector2(9999, 9999)
    const mouse3D = new THREE.Vector3(9999, 9999, 0)
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const raycaster = new THREE.Raycaster()
    let mouseActive = false

    // Destroy tracking
    const recentDestroys: number[] = []

    // Mosquito state
    let mosquitoActive = false
    let mosquitoStartTime = 0
    let mosquitoOffsets: Float32Array

    // Click raycaster
    const clickRaycaster = new THREE.Raycaster()

    async function init() {
      if (disposed) return
      await document.fonts.ready
      if (disposed) return

      const w = window.innerWidth
      const h = window.innerHeight

      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container!.appendChild(renderer.domElement)

      // Scene + Camera
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(CAMERA_FOV, w / h, 0.1, 200)
      camera.position.z = CAMERA_Z

      buildParticles(w, h)

      const startTime = performance.now()
      animate(startTime)
    }

    function buildParticles(w: number, h: number) {
      const sampled = sampleTextPositions('IVERSO', w, h)
      const fovRad = (camera.fov * Math.PI) / 180
      const visH = 2 * Math.tan(fovRad / 2) * CAMERA_Z
      const visW = visH * (w / h)

      // Measure text width
      let minX = Infinity
      let maxX = -Infinity
      for (const p of sampled) {
        if (p.x < minX) minX = p.x
        if (p.x > maxX) maxX = p.x
      }
      textWorldWidth = (maxX - minX) * visW

      // 90% text particles, 10% halo
      const textCount = Math.floor(PARTICLE_COUNT * 0.9)
      const useSampled =
        sampled.length >= textCount
          ? selectRandom(sampled, textCount)
          : sampled

      // Allocate arrays
      const count = PARTICLE_COUNT
      positionArray = new Float32Array(count * 3)
      homePositions = new Float32Array(count * 3)
      randoms = new Float32Array(count)
      destroyedAt = new Float32Array(count)
      destroyVelocities = new Float32Array(count * 3)
      destroyOffsets = new Float32Array(count * 3)
      returnDelays = new Float32Array(count)
      mosquitoOffsets = new Float32Array(count * 3)

      // Scroll physics
      scrollVelocities = new Float32Array(count * 3)
      scrollOffsets = new Float32Array(count * 3)
      scrollDirections = new Float32Array(count * 3)
      prevDispersal = 0

      const sizeClasses = new Float32Array(count)
      const colors = new Float32Array(count * 3)

      const colorDarkOrange = new THREE.Color(0xcc4400)
      const colorOrange = new THREE.Color(0xf77f0a)
      const colorYellow = new THREE.Color(0xffaa00)
      const colorWhitish = new THREE.Color(0xffe8c0)
      const tmpColor = new THREE.Color()

      for (let i = 0; i < count; i++) {
        // Random seed
        randoms[i] = Math.random()
        const r = randoms[i]

        // Home position
        let hx: number, hy: number, hz: number
        if (i < useSampled.length) {
          hx = useSampled[i].x * visW
          hy = useSampled[i].y * visH
          hz = (Math.random() - 0.5) * 0.5
        } else {
          // Halo particles around text
          const base =
            useSampled[Math.floor(Math.random() * useSampled.length)]
          const ang = Math.random() * Math.PI * 2
          const rad = Math.random() * 0.03 + 0.005
          hx = (base.x + Math.cos(ang) * rad) * visW
          hy = (base.y + Math.sin(ang) * rad) * visH
          hz = (Math.random() - 0.5) * 1.5
        }
        homePositions[i * 3] = hx
        homePositions[i * 3 + 1] = hy
        homePositions[i * 3 + 2] = hz

        // Scroll scatter direction (random unit vector scaled by viewport)
        const scrollAngle = Math.random() * Math.PI * 2
        const scrollSpeed = 0.3 + r * 0.7
        scrollDirections[i * 3] = Math.cos(scrollAngle) * scrollSpeed * visW * 0.02
        scrollDirections[i * 3 + 1] = Math.sin(scrollAngle) * scrollSpeed * visH * 0.02
        scrollDirections[i * 3 + 2] = (Math.random() - 0.5) * 0.5

        // Initial position = home
        positionArray[i * 3] = hx
        positionArray[i * 3 + 1] = hy
        positionArray[i * 3 + 2] = hz

        // Size class: 70% tiny, 25% medium, 5% large
        const roll = Math.random()
        if (roll < 0.7) sizeClasses[i] = 0.0
        else if (roll < 0.95) sizeClasses[i] = 0.5
        else sizeClasses[i] = 1.0

        // Color: ember spectrum
        const ct = Math.random()
        if (ct < 0.15) {
          tmpColor.copy(colorDarkOrange).lerp(colorOrange, Math.random())
        } else if (ct < 0.7) {
          tmpColor.copy(colorOrange).lerp(colorYellow, Math.random() * 0.5)
        } else if (ct < 0.9) {
          tmpColor.copy(colorYellow).lerp(colorWhitish, Math.random() * 0.4)
        } else {
          tmpColor.copy(colorWhitish)
        }
        colors[i * 3] = tmpColor.r
        colors[i * 3 + 1] = tmpColor.g
        colors[i * 3 + 2] = tmpColor.b

        // Return delay for destroy rebuild stagger
        returnDelays[i] = Math.random()
      }

      // Clean up old geometry/material if rebuilding
      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (points) scene.remove(points)

      // Create geometry
      geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionArray, 3),
      )
      geometry.setAttribute(
        'aRandom',
        new THREE.BufferAttribute(randoms, 1),
      )
      geometry.setAttribute(
        'aSizeClass',
        new THREE.BufferAttribute(sizeClasses, 1),
      )
      geometry.setAttribute(
        'aColor',
        new THREE.BufferAttribute(colors, 3),
      )

      // Create material
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse3D: { value: new THREE.Vector3(9999, 9999, 0) },
          uMouseActive: { value: 0 },
          uOpacity: { value: 0 },
          uBreathing: { value: 1.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      points = new THREE.Points(geometry, material)
      scene.add(points)
    }

    /* ── animation loop ── */
    const _hitVec = new THREE.Vector3()

    function animate(startTime: number) {
      if (disposed) return
      const now = performance.now()
      const elapsed = (now - startTime) / 1000

      // Fade in over 1.5s
      const fadeIn = Math.min(elapsed / 1.5, 1.0)

      // Scroll
      const scrollRatio = getScrollRatio()
      const dispersal = getDispersalFactor(scrollRatio)
      const scrollOpacity = getOpacityFactor(scrollRatio)
      const scrollDelta = dispersal - prevDispersal
      prevDispersal = dispersal

      material.uniforms.uTime.value = elapsed
      material.uniforms.uOpacity.value = fadeIn * scrollOpacity

      // Global breathing (4-6s cycle)
      material.uniforms.uBreathing.value =
        Math.sin(elapsed * 0.35) * 0.15 + 1.0

      // Mouse lerp
      const targetActive = mouseActive ? 1.0 : 0.0
      material.uniforms.uMouseActive.value +=
        (targetActive - material.uniforms.uMouseActive.value) * 0.08

      raycaster.setFromCamera(mouseNDC, camera)
      if (raycaster.ray.intersectPlane(mousePlane, _hitVec)) {
        mouse3D.copy(_hitVec)
      }
      ;(material.uniforms.uMouse3D.value as THREE.Vector3).lerp(mouse3D, 0.12)

      // Mosquito jitter factor
      let mJitter = 0
      if (mosquitoActive) {
        const mAge = (now - mosquitoStartTime) / 1000
        const mDuration = MOSQUITO_DURATION / 1000
        if (mAge > mDuration + 1) {
          mosquitoActive = false
          mosquitoOffsets.fill(0)
        } else if (mAge > mDuration) {
          const decay = 0.85
          for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            mosquitoOffsets[i] *= decay
          }
        } else {
          mJitter = Math.max(0, 1 - mAge / mDuration)
        }
      }

      // Prune expired destroy timestamps
      while (
        recentDestroys.length > 0 &&
        now - recentDestroys[0] > DESTROY_TOTAL
      ) {
        recentDestroys.shift()
      }

      // Update particle positions
      const posAttr = geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const r = randoms[i]

        // Home position
        const hx = homePositions[i3]
        const hy = homePositions[i3 + 1]
        const hz = homePositions[i3 + 2]

        /* ── Scroll physics (velocity-based, organic) ── */

        // Damping
        scrollVelocities[i3] *= SCROLL_DAMPING
        scrollVelocities[i3 + 1] *= SCROLL_DAMPING
        scrollVelocities[i3 + 2] *= SCROLL_DAMPING

        // Impulse when dispersing
        if (scrollDelta > 0.0005) {
          const imp = scrollDelta * SCROLL_IMPULSE
          scrollVelocities[i3] += scrollDirections[i3] * imp
          scrollVelocities[i3 + 1] += scrollDirections[i3 + 1] * imp
          scrollVelocities[i3 + 2] += scrollDirections[i3 + 2] * imp
        }

        // Spring return (stronger as dispersal decreases, staggered per particle)
        const springBase = 1 - dispersal
        if (springBase > returnDelays[i] * 0.5) {
          const k = springBase * SCROLL_SPRING_K
          scrollVelocities[i3] -= scrollOffsets[i3] * k
          scrollVelocities[i3 + 1] -= scrollOffsets[i3 + 1] * k
          scrollVelocities[i3 + 2] -= scrollOffsets[i3 + 2] * k
        }

        // Update scroll offsets
        scrollOffsets[i3] += scrollVelocities[i3]
        scrollOffsets[i3 + 1] += scrollVelocities[i3 + 1]
        scrollOffsets[i3 + 2] += scrollVelocities[i3 + 2]

        // Base target = home + scroll offset
        let tx = hx + scrollOffsets[i3]
        let ty = hy + scrollOffsets[i3 + 1]
        let tz = hz + scrollOffsets[i3 + 2]

        // Multi-frequency idle movement (more alive)
        const breatheX =
          Math.sin(elapsed * 0.3 + r * 6.28) * 0.04 +
          Math.sin(elapsed * 0.7 + r * 12.56) * 0.02
        const breatheY =
          Math.sin(elapsed * 0.2 + r * 3.14) * 0.05 +
          Math.cos(elapsed * 0.5 + r * 9.42) * 0.025
        const breatheZ =
          Math.sin(elapsed * 0.15 + r * 9.42) * 0.01

        tx += breatheX
        ty += breatheY
        tz += breatheZ

        // Heat escape: 8% of particles drift upward (only when near home)
        if (r > 0.92 && dispersal < 0.5) {
          const heatPhase = elapsed * 0.4 + r * 20
          const heatStrength = 0.1 * (1 - dispersal * 2)
          ty +=
            (Math.sin(heatPhase) * 0.5 + 0.5) * heatStrength
        }

        // Destroy offsets
        if (destroyedAt[i] > 0) {
          const age = now - destroyedAt[i]

          if (age >= DESTROY_TOTAL) {
            destroyedAt[i] = 0
            destroyOffsets[i3] = 0
            destroyOffsets[i3 + 1] = 0
            destroyOffsets[i3 + 2] = 0
            destroyVelocities[i3] = 0
            destroyVelocities[i3 + 1] = 0
            destroyVelocities[i3 + 2] = 0
          } else if (age < DESTROY_FLY_PHASE) {
            // Phase 1: flying outward with drag
            destroyVelocities[i3] *= 0.985
            destroyVelocities[i3 + 1] *= 0.985
            destroyVelocities[i3 + 2] *= 0.985
            destroyVelocities[i3 + 1] += 0.0005
            destroyOffsets[i3] += destroyVelocities[i3]
            destroyOffsets[i3 + 1] += destroyVelocities[i3 + 1]
            destroyOffsets[i3 + 2] += destroyVelocities[i3 + 2]
          } else if (age < DESTROY_FLY_PHASE + DESTROY_RETURN_PHASE) {
            // Phase 2: gradual return (staggered)
            const returnAge =
              (age - DESTROY_FLY_PHASE) / DESTROY_RETURN_PHASE
            const particleDelay = returnDelays[i] * 0.6
            if (returnAge > particleDelay) {
              const t =
                (returnAge - particleDelay) / (1 - particleDelay)
              const strength = 0.01 + t * t * 0.06
              destroyOffsets[i3] *= 1 - strength
              destroyOffsets[i3 + 1] *= 1 - strength
              destroyOffsets[i3 + 2] *= 1 - strength
            }
            destroyVelocities[i3] *= 0.995
            destroyVelocities[i3 + 1] *= 0.995
            destroyVelocities[i3 + 2] *= 0.995
            destroyOffsets[i3] += destroyVelocities[i3]
            destroyOffsets[i3 + 1] += destroyVelocities[i3 + 1]
            destroyOffsets[i3 + 2] += destroyVelocities[i3 + 2]
          } else {
            // Phase 3: accelerated snap
            const snapProgress =
              (age - DESTROY_FLY_PHASE - DESTROY_RETURN_PHASE) /
              DESTROY_SNAP_PHASE
            const strength = 0.08 + snapProgress * 0.25
            destroyOffsets[i3] *= 1 - strength
            destroyOffsets[i3 + 1] *= 1 - strength
            destroyOffsets[i3 + 2] *= 1 - strength
          }

          tx += destroyOffsets[i3]
          ty += destroyOffsets[i3 + 1]
          tz += destroyOffsets[i3 + 2]
        }

        // Mosquito jitter
        if (mJitter > 0) {
          const freq = 5 + r * 15
          const angle1 = elapsed * freq + r * 100
          const angle2 = elapsed * (freq * 1.3) + r * 200
          mosquitoOffsets[i3] +=
            (Math.sin(angle1) * mJitter * 0.15 -
              mosquitoOffsets[i3] * 0.02)
          mosquitoOffsets[i3 + 1] +=
            (Math.cos(angle2) * mJitter * 0.15 -
              mosquitoOffsets[i3 + 1] * 0.02)
          mosquitoOffsets[i3 + 2] +=
            (Math.sin(angle1 * 0.7) * mJitter * 0.05 -
              mosquitoOffsets[i3 + 2] * 0.02)
        }

        tx += mosquitoOffsets[i3]
        ty += mosquitoOffsets[i3 + 1]
        tz += mosquitoOffsets[i3 + 2]

        positionArray[i3] = tx
        positionArray[i3 + 1] = ty
        positionArray[i3 + 2] = tz
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(() => animate(startTime))
    }

    /* ── interactions ── */

    function handleMouseMove(e: MouseEvent) {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseActive = true
    }

    function handleMouseLeave() {
      mouseActive = false
    }

    function handleClick(e: MouseEvent) {
      if (!camera || !geometry || !material) return

      const now = performance.now()

      // Prune expired
      while (
        recentDestroys.length > 0 &&
        now - recentDestroys[0] > DESTROY_TOTAL
      ) {
        recentDestroys.shift()
      }

      // No limit — continuous clicking allowed

      // Raycast to click position
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1
      clickRaycaster.setFromCamera(
        new THREE.Vector2(ndcX, ndcY),
        camera,
      )
      const clickPos = new THREE.Vector3()
      if (!clickRaycaster.ray.intersectPlane(mousePlane, clickPos))
        return

      const destroyR = DESTROY_RADIUS_FACTOR * textWorldWidth

      let hitCount = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const dx = positionArray[i3] - clickPos.x
        const dy = positionArray[i3 + 1] - clickPos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < destroyR) {
          hitCount++
          destroyedAt[i] = now
          returnDelays[i] = Math.random()
          const angle = Math.random() * Math.PI * 2
          const speed = 0.2 + Math.random() * 0.6
          const falloff = 1 - dist / destroyR
          destroyVelocities[i3] =
            Math.cos(angle) * speed * (0.4 + falloff * 0.6)
          destroyVelocities[i3 + 1] =
            (Math.sin(angle) + 0.2 + Math.random() * 0.3) *
            speed *
            (0.4 + falloff * 0.6)
          destroyVelocities[i3 + 2] =
            (Math.random() - 0.5) * speed * 0.3
          destroyOffsets[i3] = 0
          destroyOffsets[i3 + 1] = 0
          destroyOffsets[i3 + 2] = 0
        }
      }

      if (hitCount > 0) {
        recentDestroys.push(now)
      }
    }

    function handleContextMenu(e: MouseEvent) {
      e.preventDefault()
      mosquitoActive = true
      mosquitoStartTime = performance.now()
    }

    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        if (disposed || !renderer) return
        const w = window.innerWidth
        const h = window.innerHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        buildParticles(w, h)
      }, 300) as unknown as number
    }

    /* ── event listeners ── */
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    container.addEventListener('click', handleClick)
    container.addEventListener('contextmenu', handleContextMenu)

    init()

    return () => {
      disposed = true
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('click', handleClick)
      container.removeEventListener('contextmenu', handleContextMenu)
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
