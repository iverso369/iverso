import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './EmberHero.module.css'

/* ========================================
   CONSTANTS
   ======================================== */
const PARTICLE_COUNT = 72000
const CAMERA_Z = 35
const CAMERA_FOV = 75

// Destroy radius
const DESTROY_RADIUS_FACTOR = 0.162

// Destroy timeline (ms) — 10s total
const DESTROY_FLY_PHASE = 1500
const DESTROY_DRIFT_PHASE = 2000
const DESTROY_RETURN_PHASE = 5000
const DESTROY_SNAP_PHASE = 1500
const DESTROY_TOTAL = DESTROY_FLY_PHASE + DESTROY_DRIFT_PHASE + DESTROY_RETURN_PHASE + DESTROY_SNAP_PHASE

// Drift minimum speed (world units/frame) — matches background particle drift
const DRIFT_MIN_SPEED = 0.015

// Explode: fade duration after scroll-triggered explosion (ms)
const EXPLODE_FADE_DURATION = 1500

/* ========================================
   SHADERS
   ======================================== */
const vertexShader = /* glsl */ `
  attribute float aRandom;
  attribute float aSizeClass;
  attribute float aEdgeDist;
  attribute vec3 aColor;
  attribute float aDestroyGlow;
  uniform float uTime;
  uniform vec3 uMouse3D;
  uniform float uMouseActive;
  uniform float uOpacity;
  uniform float uBreathing;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vMouseGlow;
  varying float vSizeClass;
  varying float vEdgeDist;
  varying float vDestroyGlow;

  void main() {
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float mouseDist = length(uMouse3D.xy - pos.xy);
    vMouseGlow = uMouseActive * smoothstep(3.0, 0.0, mouseDist);

    float baseSize;
    if (aSizeClass < 0.25) {
      baseSize = 1.5 + aRandom * 1.2;
    } else if (aSizeClass < 0.75) {
      baseSize = 3.75 + aRandom * 3.0;
    } else {
      baseSize = 10.5 + aRandom * 9.0;
    }

    float contourSize = 4.5;
    float edgeContour = smoothstep(0.25, 0.02, aEdgeDist);
    baseSize = mix(baseSize, contourSize, edgeContour);

    float pulse = 1.0;
    float edgeSizeBoost = 1.0;
    float hoverBoost = 1.0 + vMouseGlow * 0.15;
    float destroyGrow = 1.0 + aDestroyGlow * 0.5;

    gl_PointSize = baseSize * pulse * hoverBoost * edgeSizeBoost * destroyGrow * (150.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    vAlpha = uOpacity;
    vSizeClass = aSizeClass;
    vEdgeDist = aEdgeDist;
    vDestroyGlow = aDestroyGlow;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vMouseGlow;
  varying float vSizeClass;
  varying float vEdgeDist;
  varying float vDestroyGlow;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float destroySharpBoost = vDestroyGlow * 18.0;
    float edgeContour = smoothstep(0.25, 0.02, vEdgeDist);
    float contourSharpness = 12.0;
    float sharpness = mix(mix(19.2, 9.6, vSizeClass), contourSharpness, edgeContour) + destroySharpBoost;
    float glow = exp(-dist * sharpness);
    float coreSharpness = 24.0 + vDestroyGlow * 16.0;
    float core = exp(-dist * coreSharpness);
    float coreIntensity = 0.25 + vDestroyGlow * 0.35;
    float edgeBrightness = 1.0 + edgeContour * 1.0;

    vec3 color = vColor * glow * edgeBrightness
               + vec3(1.0, 0.85, 0.65) * core * coreIntensity * edgeBrightness;
    vec3 contourHot = vec3(1.0, 0.75, 0.35);
    color += contourHot * edgeContour * glow * 0.39;

    vec3 hoverColor = vec3(1.0, 0.82, 0.63);
    color = mix(color, hoverColor * (glow + core * 0.5) * 1.5, vMouseGlow * 0.15);

    float destroyAlphaBoost = vDestroyGlow * 0.28;
    float baseAlpha = mix(0.85, 0.35, vSizeClass) + destroyAlphaBoost;
    float softEdge = smoothstep(0.5, 0.02, dist);
    float edgeAlpha = 1.0 + edgeContour * 0.325;
    float alpha = softEdge * glow * baseAlpha * vAlpha * edgeAlpha;
    alpha *= 1.0 + vMouseGlow * 0.5;

    if (alpha < 0.003) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

/* ========================================
   PIXEL SAMPLING
   ======================================== */
interface SampledPixel { x: number; y: number; edgeDist: number }

function sampleTextPositions(
  text: string, width: number, height: number,
): SampledPixel[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const scale = 2
  canvas.width = width * scale
  canvas.height = height * scale
  const fontSize = Math.round(width * scale * 0.11)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `700 ${fontSize}px "Roboto"`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, canvas.width / 2, canvas.height * 0.37)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const px = imageData.data
  const cw = canvas.width
  const ch = canvas.height
  const positions: SampledPixel[] = []
  const maxScan = 12

  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (px[(y * cw + x) * 4 + 3] === 0) continue

      let minD = maxScan
      for (let d = 1; d <= minD; d++) {
        if (x + d >= cw || px[(y * cw + x + d) * 4 + 3] === 0) { minD = d; break }
      }
      for (let d = 1; d <= minD; d++) {
        if (x - d < 0 || px[(y * cw + x - d) * 4 + 3] === 0) { if (d < minD) minD = d; break }
      }
      for (let d = 1; d <= minD; d++) {
        if (y + d >= ch || px[((y + d) * cw + x) * 4 + 3] === 0) { if (d < minD) minD = d; break }
      }
      for (let d = 1; d <= minD; d++) {
        if (y - d < 0 || px[((y - d) * cw + x) * 4 + 3] === 0) { if (d < minD) minD = d; break }
      }

      positions.push({
        x: x / cw - 0.5,
        y: -(y / ch - 0.5),
        edgeDist: Math.min(minD / maxScan, 1.0),
      })
    }
  }
  return positions
}

function selectRandom<T>(arr: T[], n: number): T[] {
  const s = arr.slice()
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[s[i], s[j]] = [s[j], s[i]]
  }
  return s.slice(0, n)
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

    let homePositions: Float32Array
    let positionArray: Float32Array
    let randoms: Float32Array
    let edgeDistArr: Float32Array
    let destroyedAt: Float32Array
    let destroyVelocities: Float32Array
    let destroyOffsets: Float32Array
    let returnDelays: Float32Array
    let destroyGlowArr: Float32Array
    let exploded = false
    let explodeTime = 0
    let storedVisW = 1
    let storedVisH = 1
    let textWorldWidth = 1

    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let points: THREE.Points
    let geometry: THREE.BufferGeometry
    let material: THREE.ShaderMaterial

    const mouseNDC = new THREE.Vector2(9999, 9999)
    const mouse3D = new THREE.Vector3(9999, 9999, 0)
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const raycaster = new THREE.Raycaster()
    let mouseActive = false
    const recentDestroys: number[] = []
    const clickRC = new THREE.Raycaster()

    async function init() {
      if (disposed) return
      await document.fonts.ready
      if (disposed) return
      const w = window.innerWidth, h = window.innerHeight

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container!.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(CAMERA_FOV, w / h, 0.1, 200)
      camera.position.z = CAMERA_Z

      buildParticles(w, h)
      animate(performance.now())
    }

    function buildParticles(w: number, h: number) {
      const sampled = sampleTextPositions('IVERSO', w, h)
      const fovRad = (camera.fov * Math.PI) / 180
      const visH = 2 * Math.tan(fovRad / 2) * CAMERA_Z
      const visW = visH * (w / h)
      storedVisW = visW
      storedVisH = visH

      let minX = Infinity, maxX = -Infinity
      for (const p of sampled) { if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x }
      textWorldWidth = (maxX - minX) * visW

      const textCount = Math.floor(PARTICLE_COUNT * 0.95)
      const edgePixels = sampled.filter(p => p.edgeDist < 0.25)
      const innerPixels = sampled.filter(p => p.edgeDist >= 0.25)
      let useSampled: SampledPixel[]
      if (sampled.length <= textCount) {
        useSampled = sampled
      } else {
        const remaining = textCount - edgePixels.length
        if (remaining > 0) {
          useSampled = [...edgePixels, ...selectRandom(innerPixels, remaining)]
        } else {
          useSampled = selectRandom(edgePixels, textCount)
        }
      }

      const count = PARTICLE_COUNT
      positionArray = new Float32Array(count * 3)
      homePositions = new Float32Array(count * 3)
      randoms = new Float32Array(count)
      edgeDistArr = new Float32Array(count)
      destroyedAt = new Float32Array(count)
      destroyVelocities = new Float32Array(count * 3)
      destroyOffsets = new Float32Array(count * 3)
      returnDelays = new Float32Array(count)
      destroyGlowArr = new Float32Array(count)

      const sizeClasses = new Float32Array(count)
      const edgeDists = new Float32Array(count)
      const colors = new Float32Array(count * 3)

      // Vulcanic lava palette
      const cDeepCore = new THREE.Color(0x8b1a00)
      const cDarkRed = new THREE.Color(0xaa2200)
      const cMidOrange = new THREE.Color(0xcc4400)
      const cBrightOrange = new THREE.Color(0xff6600)
      const cHot = new THREE.Color(0xff8800)
      const cHotYellow = new THREE.Color(0xffaa00)
      const cHaloA = new THREE.Color(0xcc4400)
      const cHaloB = new THREE.Color(0xff6600)
      const tmp = new THREE.Color()

      for (let i = 0; i < count; i++) {
        randoms[i] = Math.random()
        const r = randoms[i]
        let hx: number, hy: number, hz: number, ed: number

        if (i < useSampled.length) {
          hx = useSampled[i].x * visW
          hy = useSampled[i].y * visH
          hz = (Math.random() - 0.5) * 0.15
          ed = useSampled[i].edgeDist

          if (r > 0.95 && ed < 0.3) {
            tmp.copy(cHot).lerp(cHotYellow, Math.random() * 0.5)
          } else if (ed < 0.1) {
            tmp.copy(cBrightOrange).lerp(cHot, Math.random() * 0.4)
          } else if (ed < 0.35) {
            const t = (ed - 0.1) / 0.25
            tmp.copy(cBrightOrange).lerp(cMidOrange, t)
          } else {
            const t = Math.min((ed - 0.35) / 0.65, 1.0)
            tmp.copy(cMidOrange).lerp(cDeepCore, t * 0.7)
            tmp.lerp(cDarkRed, (1 - t) * 0.3)
          }
        } else {
          // Reuse text positions — no scatter outside contour
          const base = useSampled[Math.floor(Math.random() * useSampled.length)]
          hx = base.x * visW
          hy = base.y * visH
          hz = (Math.random() - 0.5) * 0.15
          ed = base.edgeDist
          if (ed < 0.1) {
            tmp.copy(cBrightOrange).lerp(cHot, Math.random() * 0.4)
          } else {
            tmp.copy(cHaloA).lerp(cHaloB, Math.random() * 0.3)
          }
        }

        homePositions[i * 3] = hx
        homePositions[i * 3 + 1] = hy
        homePositions[i * 3 + 2] = hz
        edgeDists[i] = ed
        edgeDistArr[i] = ed

        positionArray[i * 3] = hx
        positionArray[i * 3 + 1] = hy
        positionArray[i * 3 + 2] = hz

        const roll = Math.random()
        if (roll < 0.7) sizeClasses[i] = 0.0
        else if (roll < 0.95) sizeClasses[i] = 0.5
        else sizeClasses[i] = 1.0

        colors[i * 3] = tmp.r
        colors[i * 3 + 1] = tmp.g
        colors[i * 3 + 2] = tmp.b
        returnDelays[i] = Math.random()
      }

      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (points) scene.remove(points)

      geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
      geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
      geometry.setAttribute('aSizeClass', new THREE.BufferAttribute(sizeClasses, 1))
      geometry.setAttribute('aEdgeDist', new THREE.BufferAttribute(edgeDists, 1))
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute('aDestroyGlow', new THREE.BufferAttribute(destroyGlowArr, 1))

      material = new THREE.ShaderMaterial({
        vertexShader, fragmentShader,
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

    const _hit = new THREE.Vector3()

    function animate(startTime: number) {
      if (disposed) return
      const now = performance.now()
      const elapsed = (now - startTime) / 1000
      const fadeIn = Math.min(elapsed / 1.5, 1.0)

      // Explode trigger: when container scrolls near top of viewport
      if (!exploded && container) {
        const rect = container.getBoundingClientRect()
        if (rect.bottom < window.innerHeight * 0.3) {
          exploded = true
          explodeTime = now
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3
            const angle = Math.random() * Math.PI * 2
            const speed = 0.08 + Math.random() * 0.2
            destroyedAt[i] = now
            destroyVelocities[i3] = Math.cos(angle) * speed
            destroyVelocities[i3 + 1] = Math.sin(angle) * speed
            destroyVelocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.3
            returnDelays[i] = Math.random()
          }
        }
      }

      // Opacity: fade in normally, fade out after explosion
      let opacity = fadeIn
      if (exploded && explodeTime > 0) {
        const fadeProgress = Math.min(1, (now - explodeTime) / EXPLODE_FADE_DURATION)
        opacity = fadeIn * (1 - fadeProgress)
      }

      material.uniforms.uTime.value = elapsed
      material.uniforms.uOpacity.value = opacity
      material.uniforms.uBreathing.value = 1.0

      const tgtActive = mouseActive ? 1.0 : 0.0
      material.uniforms.uMouseActive.value += (tgtActive - material.uniforms.uMouseActive.value) * 0.08

      raycaster.setFromCamera(mouseNDC, camera)
      if (raycaster.ray.intersectPlane(mousePlane, _hit)) mouse3D.copy(_hit)
      ;(material.uniforms.uMouse3D.value as THREE.Vector3).lerp(mouse3D, 0.12)

      while (recentDestroys.length > 0 && now - recentDestroys[0] > DESTROY_TOTAL) recentDestroys.shift()

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const r = randoms[i]
        const hx = homePositions[i3], hy = homePositions[i3 + 1], hz = homePositions[i3 + 2]

        let tx = hx
        let ty = hy
        let tz = hz

        // Idle movement (subtle, keeps contour readable)
        tx += Math.sin(elapsed * 0.4 + r * 6.28) * 0.03 + Math.sin(elapsed * 0.9 + r * 12.56) * 0.015
        ty += Math.sin(elapsed * 0.3 + r * 3.14) * 0.04 + Math.cos(elapsed * 0.6 + r * 9.42) * 0.015
        tz += Math.sin(elapsed * 0.2 + r * 9.42) * 0.01

        // Edge sparks only (edgeDist < 0.2, random directions)
        const ed = edgeDistArr[i]
        if (ed < 0.2 && r > 0.94 && !exploded) {
          const sp = elapsed * 0.5 + r * 30
          const ss = 0.06 * (0.2 - ed) / 0.2
          const sa = r * 100 + elapsed * 0.3
          tx += Math.cos(sa) * (Math.sin(sp) * 0.5 + 0.5) * ss
          ty += Math.sin(sa) * (Math.sin(sp) * 0.5 + 0.5) * ss
        }

        // Destroy — 4 phases: FLY → DRIFT → RETURN → SNAP (explode skips return+snap)
        if (destroyedAt[i] > 0) {
          const age = now - destroyedAt[i]
          const driftEnd = DESTROY_FLY_PHASE + DESTROY_DRIFT_PHASE
          const returnEnd = driftEnd + DESTROY_RETURN_PHASE

          if (!exploded && age >= DESTROY_TOTAL) {
            destroyedAt[i] = 0
            destroyOffsets[i3] = destroyOffsets[i3 + 1] = destroyOffsets[i3 + 2] = 0
            destroyVelocities[i3] = destroyVelocities[i3 + 1] = destroyVelocities[i3 + 2] = 0
          } else if (age < DESTROY_FLY_PHASE) {
            // Phase 1: fly outward with drag + min speed floor
            destroyVelocities[i3] *= 0.985
            destroyVelocities[i3 + 1] *= 0.985
            destroyVelocities[i3 + 2] *= 0.985
            const vMagFly = Math.sqrt(destroyVelocities[i3] ** 2 + destroyVelocities[i3 + 1] ** 2)
            if (vMagFly > 0 && vMagFly < DRIFT_MIN_SPEED) {
              const sc = DRIFT_MIN_SPEED / vMagFly
              destroyVelocities[i3] *= sc
              destroyVelocities[i3 + 1] *= sc
            }
            destroyOffsets[i3] += destroyVelocities[i3]
            destroyOffsets[i3 + 1] += destroyVelocities[i3 + 1]
            destroyOffsets[i3 + 2] += destroyVelocities[i3 + 2]
          } else if (age < driftEnd || exploded) {
            // Phase 2: drift — slow down but maintain minimum speed
            // When exploded: stay in drift forever (no return)
            destroyVelocities[i3] *= 0.985
            destroyVelocities[i3 + 1] *= 0.985
            destroyVelocities[i3 + 2] *= 0.985
            const vMag = Math.sqrt(destroyVelocities[i3] * destroyVelocities[i3] + destroyVelocities[i3 + 1] * destroyVelocities[i3 + 1])
            if (vMag > 0 && vMag < DRIFT_MIN_SPEED) {
              const scale = DRIFT_MIN_SPEED / vMag
              destroyVelocities[i3] *= scale
              destroyVelocities[i3 + 1] *= scale
            }
            destroyVelocities[i3] += (Math.random() - 0.5) * 0.002
            destroyVelocities[i3 + 1] += (Math.random() - 0.5) * 0.002
            destroyOffsets[i3] += destroyVelocities[i3]
            destroyOffsets[i3 + 1] += destroyVelocities[i3 + 1]
            destroyOffsets[i3 + 2] += destroyVelocities[i3 + 2]
          } else if (age < returnEnd) {
            // Phase 3: gradual return (staggered per particle)
            const ra = (age - driftEnd) / DESTROY_RETURN_PHASE
            const pd = returnDelays[i] * 0.6
            if (ra > pd) {
              const t = (ra - pd) / (1 - pd)
              const s = 0.01 + t * t * 0.06
              destroyOffsets[i3] *= 1 - s
              destroyOffsets[i3 + 1] *= 1 - s
              destroyOffsets[i3 + 2] *= 1 - s
            }
            destroyVelocities[i3] *= 0.992
            destroyVelocities[i3 + 1] *= 0.992
            destroyVelocities[i3 + 2] *= 0.992
            destroyOffsets[i3] += destroyVelocities[i3]
            destroyOffsets[i3 + 1] += destroyVelocities[i3 + 1]
            destroyOffsets[i3 + 2] += destroyVelocities[i3 + 2]
          } else {
            // Phase 4: accelerated snap back to home
            const sp = (age - returnEnd) / DESTROY_SNAP_PHASE
            const s = 0.08 + sp * 0.25
            destroyOffsets[i3] *= 1 - s
            destroyOffsets[i3 + 1] *= 1 - s
            destroyOffsets[i3 + 2] *= 1 - s
          }
          // Clamp destroy offsets so particles stay within viewport
          const halfW = storedVisW * 0.52
          const halfH = storedVisH * 0.52
          const homeX = homePositions[i3]
          const homeY = homePositions[i3 + 1]
          if (homeX + destroyOffsets[i3] > halfW) {
            destroyOffsets[i3] = halfW - homeX
            destroyVelocities[i3] *= -0.3
          } else if (homeX + destroyOffsets[i3] < -halfW) {
            destroyOffsets[i3] = -halfW - homeX
            destroyVelocities[i3] *= -0.3
          }
          if (homeY + destroyOffsets[i3 + 1] > halfH) {
            destroyOffsets[i3 + 1] = halfH - homeY
            destroyVelocities[i3 + 1] *= -0.3
          } else if (homeY + destroyOffsets[i3 + 1] < -halfH) {
            destroyOffsets[i3 + 1] = -halfH - homeY
            destroyVelocities[i3 + 1] *= -0.3
          }

          tx += destroyOffsets[i3]
          ty += destroyOffsets[i3 + 1]
          tz += destroyOffsets[i3 + 2]

          // Destroy glow for normal particles
          if (age < driftEnd) {
            destroyGlowArr[i] = 1.0
          } else if (age < returnEnd) {
            destroyGlowArr[i] = 1.0 - (age - driftEnd) / DESTROY_RETURN_PHASE
          } else {
            destroyGlowArr[i] = 0.0
          }
        } else {
          destroyGlowArr[i] = 0.0
        }

        positionArray[i3] = tx
        positionArray[i3 + 1] = ty
        positionArray[i3 + 2] = tz
      }

      posAttr.needsUpdate = true
      const destroyGlowAttr = geometry.getAttribute('aDestroyGlow') as THREE.BufferAttribute
      destroyGlowAttr.needsUpdate = true
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(() => animate(startTime))
    }

    /* ── interactions ── */
    function handleMouseMove(e: MouseEvent) {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseActive = true
    }
    function handleMouseLeave() { mouseActive = false }

    function doDestroy(cx: number, cy: number, destroyAll = false) {
      if (!camera || !geometry || !material || exploded) return
      const now = performance.now()
      while (recentDestroys.length > 0 && now - recentDestroys[0] > DESTROY_TOTAL) recentDestroys.shift()

      const ndcX = (cx / window.innerWidth) * 2 - 1
      const ndcY = -(cy / window.innerHeight) * 2 + 1
      clickRC.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera)
      const clickPos = new THREE.Vector3()
      if (!clickRC.ray.intersectPlane(mousePlane, clickPos)) return

      const dR = destroyAll ? 9999 : DESTROY_RADIUS_FACTOR * textWorldWidth
      let hitCount = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3

        // Use current position (home + any existing offset) so scattered particles also get hit
        const curX = positionArray[i3]
        const curY = positionArray[i3 + 1]
        const dx = curX - clickPos.x
        const dy = curY - clickPos.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (!destroyAll) {
          // Per-particle radius variation for organic edge (±40%)
          const effectiveR = dR * (0.6 + Math.random() * 0.8)
          if (dist >= effectiveR) continue

          // Squared probability falloff — no sharp boundary
          const normDist = dist / effectiveR
          const hitChance = (1 - normDist * normDist)
          if (Math.random() > hitChance) continue
        }

        hitCount++
        // Shockwave physics: closer particles get MORE speed (inverse distance)
        // Like a water ripple or supernova — epicenter = fastest
        const maxDist = destroyAll ? textWorldWidth * 0.8 : dR
        const normDist = Math.min(dist / maxDist, 1)
        // Inverse: close = fast, far = slow (with minimum so edge particles still move)
        const distanceFactor = 1.0 - normDist * 0.7

        // 90% random direction, 10% radial outward from click
        const randomAngle = Math.random() * Math.PI * 2
        const radialDist = dist || 0.001
        const radX = dx / radialDist
        const radY = dy / radialDist
        const vx = Math.cos(randomAngle) * 0.9 + radX * 0.1
        const vy = Math.sin(randomAngle) * 0.9 + radY * 0.1
        const vlen = Math.sqrt(vx * vx + vy * vy) || 1

        const baseSpeed = destroyAll ? 0.12 + Math.random() * 0.25 : 0.15 + Math.random() * 0.4
        const speed = baseSpeed * distanceFactor

        // If already flying, add new velocity on top (don't reset offset)
        if (destroyedAt[i] > 0) {
          destroyVelocities[i3] += (vx / vlen) * speed
          destroyVelocities[i3 + 1] += (vy / vlen) * speed
          destroyVelocities[i3 + 2] += (Math.random() - 0.5) * speed * 0.3
          // Reset timer so fly phase restarts with new velocity
          destroyedAt[i] = now
          returnDelays[i] = Math.random()
        } else {
          destroyedAt[i] = now
          returnDelays[i] = Math.random()
          destroyVelocities[i3] = (vx / vlen) * speed
          destroyVelocities[i3 + 1] = (vy / vlen) * speed
          destroyVelocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.3
          destroyOffsets[i3] = destroyOffsets[i3 + 1] = destroyOffsets[i3 + 2] = 0
        }
      }
      if (hitCount > 0) recentDestroys.push(now)
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target !== renderer?.domElement && target !== container) {
        if (target.closest('a, button, nav, input, textarea, select, [role="button"]')) return
      }
      doDestroy(e.clientX, e.clientY)
    }

    function handleContextMenu(e: MouseEvent) {
      e.preventDefault()
      // Right-click = destroy ALL particles from click position
      doDestroy(e.clientX, e.clientY, true)
    }

    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        if (disposed || !renderer) return
        const w = window.innerWidth, h = window.innerHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        buildParticles(w, h)
      }, 300) as unknown as number
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleClick)
    container.addEventListener('contextmenu', handleContextMenu)
    init()

    return () => {
      disposed = true
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick)
      container.removeEventListener('contextmenu', handleContextMenu)
      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className={styles.container} />
}
