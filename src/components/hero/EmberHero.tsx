import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './EmberHero.module.css'

/* ========================================
   CONSTANTS
   ======================================== */
const PARTICLE_COUNT = 80000
const CAMERA_Z = 35
const CAMERA_FOV = 75
const MOUSE_PUSH_RADIUS = 5.0
const MOUSE_GLOW_RADIUS = 8.0
const DESTROY_RADIUS_FRAC = 0.15
const REBUILD_TIME = 12000
const FADE_IN_TIME = 1.5

const COLOR_A = new THREE.Color(0xCC5500)
const COLOR_B = new THREE.Color(0xFF8533)

/* ========================================
   SIMPLEX NOISE (Ashima Arts)
   ======================================== */
const SNOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

/* ========================================
   SHADERS
   ======================================== */
const vertexShader = /* glsl */ `
  attribute float aRandom;
  attribute vec3 aColor;

  uniform float uTime;
  uniform vec3 uMouse3D;
  uniform float uMouseInfluence;
  uniform vec3 uMouseVelocity;
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vMouseProximity;

  ${SNOISE_GLSL}

  void main() {
    vec3 pos = position;

    // Breathing — simplex noise micro-shimmer (like poking coals)
    float noiseScale = 0.8;
    float breathe = sin(uTime * 0.3) * 0.2 + 0.8;
    vec3 noiseOffset = vec3(
      snoise(pos * noiseScale + uTime * 0.08),
      snoise(pos * noiseScale + 100.0 + uTime * 0.08),
      snoise(pos * noiseScale + 200.0 + uTime * 0.08)
    ) * breathe;
    float textBreathe = 0.03 + snoise(vec3(aRandom * 50.0, uTime * 0.5, 0.0)) * 0.02;
    pos += noiseOffset * textBreathe;

    // Mouse push-away (particles deflect from cursor)
    vec3 toMouse = uMouse3D - pos;
    float mouseDist = length(toMouse);
    float mouseInfl = uMouseInfluence * smoothstep(${MOUSE_PUSH_RADIUS.toFixed(1)}, 0.0, mouseDist);
    vec3 pushAway = mouseDist > 0.01 ? normalize(pos - uMouse3D) : vec3(0.0);
    pos += pushAway * mouseInfl * 2.0 * (0.5 + aRandom * 0.5);

    // Mouse velocity trail
    float trailInfl = uMouseInfluence * smoothstep(10.0, 0.0, mouseDist) * 0.5;
    pos += uMouseVelocity * trailInfl * (3.0 + aRandom * 5.0);

    // Mouse proximity for fragment glow
    vMouseProximity = uMouseInfluence * smoothstep(${MOUSE_GLOW_RADIUS.toFixed(1)}, 0.0, mouseDist);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size — dual-frequency pulse + per-particle variation
    float pulse = sin(uTime * 1.2 + aRandom * 6.28) * 0.15
                + sin(uTime * 0.7 + aRandom * 3.14) * 0.1;
    float textScale = 0.8 + aRandom * 0.6 + step(0.85, aRandom) * 0.8;
    float size = textScale * (1.0 + pulse);
    float hoverSizeBoost = 1.0 + vMouseProximity * 0.6;
    gl_PointSize = size * (150.0 / -mvPosition.z) * hoverSizeBoost;

    gl_Position = projectionMatrix * mvPosition;

    vColor = aColor;
    vAlpha = uOpacity;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vMouseProximity;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    // 3-layer glow (softer spread for 80K density)
    float outerGlow = exp(-dist * 3.0);
    float midGlow = exp(-dist * 7.0);
    float coreGlow = exp(-dist * 18.0);

    // Additive color build (warm ember — not mix!)
    vec3 warmColor = mix(uColorA, uColorB, 0.5);
    vec3 deepColor = warmColor * 0.2;
    vec3 hotCore = vec3(1.0, 0.92, 0.8);

    vec3 color = deepColor * outerGlow
               + warmColor * midGlow * 0.8
               + hotCore * coreGlow * 0.3;

    // Per-particle color variation
    color = mix(color, vColor * midGlow * 0.6, 0.25);

    // Edge glow — thin bright rim
    float edgeBrightness = smoothstep(0.35, 0.47, dist) * smoothstep(0.5, 0.47, dist) * 0.5;
    color += warmColor * edgeBrightness;

    // Soft edge + alpha
    float softEdge = smoothstep(0.5, 0.03, dist);
    float alpha = softEdge * 0.4 * vAlpha;

    // Hover glow
    float hoverGlow = vMouseProximity * 0.8;
    color = mix(color, warmColor * 1.5, hoverGlow * 0.6);
    alpha *= 1.0 + hoverGlow * 2.0;

    if (alpha < 0.005) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

/* ========================================
   PIXEL SAMPLING
   ======================================== */
function sampleTextPositions(
  text: string, width: number, height: number,
): { x: number; y: number }[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const scale = 2
  canvas.width = width * scale
  canvas.height = height * scale
  const fontSize = Math.round(width * scale * 0.13)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `800 ${fontSize}px Syne`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  const positions: { x: number; y: number }[] = []
  const step = 2
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const i = (y * canvas.width + x) * 4
      if (pixels[i + 3] > 0) {
        positions.push({
          x: (x / canvas.width - 0.5),
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
   COMPONENT
   ======================================== */
export default function EmberHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let animationId = 0

    let homePositions: Float32Array
    let velocities: Float32Array
    let destroyedFlags: Float32Array

    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let points: THREE.Points
    let geometry: THREE.BufferGeometry
    let material: THREE.ShaderMaterial
    let textWorldWidth = 1

    const rc = new THREE.Raycaster()
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const mouseNDC = new THREE.Vector2(0, 0)
    const mouse3D = new THREE.Vector3(9999, 9999, 0)
    let mouseActive = false

    async function init() {
      if (disposed) return
      await document.fonts.load('800 100px Syne')
      if (disposed) return

      const w = window.innerWidth
      const h = window.innerHeight

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container!.appendChild(renderer.domElement)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(CAMERA_FOV, w / h, 0.1, 200)
      camera.position.z = CAMERA_Z

      const sampled = sampleTextPositions('IVERSO', w, h)
      const fovRad = (camera.fov * Math.PI) / 180
      const visH = 2 * Math.tan(fovRad / 2) * CAMERA_Z
      const visW = visH * (w / h)

      let minX = Infinity, maxX = -Infinity
      for (const p of sampled) {
        if (p.x < minX) minX = p.x
        if (p.x > maxX) maxX = p.x
      }
      textWorldWidth = (maxX - minX) * visW

      const count = PARTICLE_COUNT
      const positions = new Float32Array(count * 3)
      homePositions = new Float32Array(count * 3)
      velocities = new Float32Array(count * 3)
      destroyedFlags = new Float32Array(count)
      const randoms = new Float32Array(count)
      const colors = new Float32Array(count * 3)

      const useSampled = sampled.length >= count
        ? selectRandom(sampled, count)
        : sampled

      for (let i = 0; i < useSampled.length; i++) {
        const x = useSampled[i].x * visW
        const y = useSampled[i].y * visH
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
      }

      for (let i = useSampled.length; i < count; i++) {
        const base = useSampled[Math.floor(Math.random() * useSampled.length)]
        const ang = Math.random() * Math.PI * 2
        const r = Math.random() * 0.035 + 0.005
        const x = (base.x + Math.cos(ang) * r) * visW
        const y = (base.y + Math.sin(ang) * r) * visH
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
      }

      for (let i = 0; i < count; i++) {
        randoms[i] = Math.random()
        const depth = Math.random()
        if (depth < 0.05) {
          const t = Math.random()
          colors[i * 3] = 0.4 + t * 0.2
          colors[i * 3 + 1] = 0.133 + t * 0.106
          colors[i * 3 + 2] = 0
        } else if (depth > 0.98) {
          const t = Math.random()
          colors[i * 3] = 1.0
          colors[i * 3 + 1] = 0.8 + t * 0.2
          colors[i * 3 + 2] = 0.5 + t * 0.43
        } else {
          const t = Math.random()
          colors[i * 3] = 0.8 + t * 0.2
          colors[i * 3 + 1] = 0.333 + t * 0.189
          colors[i * 3 + 2] = t * 0.2
        }
      }

      geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse3D: { value: new THREE.Vector3(9999, 9999, 0) },
          uMouseInfluence: { value: 0 },
          uMouseVelocity: { value: new THREE.Vector3(0, 0, 0) },
          uOpacity: { value: 0 },
          uColorA: { value: COLOR_A.clone() },
          uColorB: { value: COLOR_B.clone() },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      points = new THREE.Points(geometry, material)
      scene.add(points)

      const startTime = performance.now()
      animate(startTime)
    }

    function animate(startTime: number) {
      if (disposed) return
      const now = performance.now()
      const elapsed = (now - startTime) / 1000

      material.uniforms.uTime.value = elapsed
      material.uniforms.uOpacity.value = Math.min(elapsed / FADE_IN_TIME, 1.0)

      // Mouse lerping
      const tgtInfl = mouseActive ? 1.0 : 0.0
      material.uniforms.uMouseInfluence.value +=
        (tgtInfl - material.uniforms.uMouseInfluence.value) * 0.05

      rc.setFromCamera(mouseNDC, camera)
      const hit = new THREE.Vector3()
      if (rc.ray.intersectPlane(mousePlane, hit)) {
        mouse3D.copy(hit)
      }

      const prev = material.uniforms.uMouse3D.value.clone()
      material.uniforms.uMouse3D.value.lerp(mouse3D, 0.1)
      const vel = material.uniforms.uMouse3D.value.clone().sub(prev)
      material.uniforms.uMouseVelocity.value.lerp(vel, 0.3)

      // Destroyed particles (CPU update)
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const posArr = posAttr.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (destroyedFlags[i] === 0) continue
        const age = now - destroyedFlags[i]

        if (age > REBUILD_TIME) {
          destroyedFlags[i] = 0
          posArr[i * 3] = homePositions[i * 3]
          posArr[i * 3 + 1] = homePositions[i * 3 + 1]
          posArr[i * 3 + 2] = 0
          velocities[i * 3] = velocities[i * 3 + 1] = velocities[i * 3 + 2] = 0
          continue
        }

        const explDur = REBUILD_TIME * 0.15
        if (age < explDur) {
          velocities[i * 3] *= 0.96
          velocities[i * 3 + 1] *= 0.96
          velocities[i * 3 + 2] *= 0.96
          posArr[i * 3] += velocities[i * 3]
          posArr[i * 3 + 1] += velocities[i * 3 + 1]
          posArr[i * 3 + 2] += velocities[i * 3 + 2]
        } else {
          const prog = (age - explDur) / (REBUILD_TIME - explDur)
          const eased = prog < 0.5
            ? 4 * prog * prog * prog
            : 1 - Math.pow(-2 * prog + 2, 3) / 2
          if (eased < 0.99) {
            posArr[i * 3] += (homePositions[i * 3] - posArr[i * 3]) * 0.03
            posArr[i * 3 + 1] += (homePositions[i * 3 + 1] - posArr[i * 3 + 1]) * 0.03
            posArr[i * 3 + 2] += (0 - posArr[i * 3 + 2]) * 0.03
          } else {
            posArr[i * 3] = homePositions[i * 3]
            posArr[i * 3 + 1] = homePositions[i * 3 + 1]
            posArr[i * 3 + 2] = 0
          }
        }
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(() => animate(startTime))
    }

    function handleClick(e: MouseEvent) {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1
      rc.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera)
      const clickPos = new THREE.Vector3()
      if (!rc.ray.intersectPlane(mousePlane, clickPos)) return

      const destroyR = DESTROY_RADIUS_FRAC * textWorldWidth
      const now = performance.now()
      const posArr = (geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (destroyedFlags[i] > 0) continue
        const dx = posArr[i * 3] - clickPos.x
        const dy = posArr[i * 3 + 1] - clickPos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < destroyR) {
          destroyedFlags[i] = now
          const ang = Math.random() * Math.PI * 2
          const speed = 0.3 + Math.random() * 0.9
          const f = 1 - dist / destroyR
          velocities[i * 3] = Math.cos(ang) * speed * (0.5 + f)
          velocities[i * 3 + 1] = (Math.sin(ang) + Math.random() * 0.3) * speed * (0.5 + f)
          velocities[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.3
        }
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseActive = true
    }

    function handleMouseLeave() {
      mouseActive = false
    }

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
        rebuildParticles(w, h)
      }, 200)
    }

    function rebuildParticles(w: number, h: number) {
      const sampled = sampleTextPositions('IVERSO', w, h)
      const fovRad = (camera.fov * Math.PI) / 180
      const visH = 2 * Math.tan(fovRad / 2) * CAMERA_Z
      const visW = visH * camera.aspect

      let minX = Infinity, maxX = -Infinity
      for (const p of sampled) {
        if (p.x < minX) minX = p.x
        if (p.x > maxX) maxX = p.x
      }

      const useSampled = sampled.length >= PARTICLE_COUNT
        ? selectRandom(sampled, PARTICLE_COUNT)
        : sampled

      const posArr = (geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array
      for (let i = 0; i < useSampled.length; i++) {
        const x = useSampled[i].x * visW
        const y = useSampled[i].y * visH
        posArr[i * 3] = x
        posArr[i * 3 + 1] = y
        posArr[i * 3 + 2] = 0
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
        homePositions[i * 3 + 2] = 0
      }
      for (let i = useSampled.length; i < PARTICLE_COUNT; i++) {
        const base = useSampled[Math.floor(Math.random() * useSampled.length)]
        const ang = Math.random() * Math.PI * 2
        const r = Math.random() * 0.035 + 0.005
        const x = (base.x + Math.cos(ang) * r) * visW
        const y = (base.y + Math.sin(ang) * r) * visH
        posArr[i * 3] = x
        posArr[i * 3 + 1] = y
        posArr[i * 3 + 2] = 0
        homePositions[i * 3] = x
        homePositions[i * 3 + 1] = y
        homePositions[i * 3 + 2] = 0
      }
      ;(geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
      textWorldWidth = (maxX - minX) * visW
      destroyedFlags.fill(0)
      velocities.fill(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    container.addEventListener('click', handleClick)

    init()

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
