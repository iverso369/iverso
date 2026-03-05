import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './BuilderSection.module.css'

/* ── constants ── */

const BLOCK_COLORS = [
  '#F77F0A',
  '#E06D00',
  '#FF9933',
  '#CC5500',
  '#F59E42',
  '#D97706',
  '#FFAD5C',
  '#B84D00',
  '#FF8C1A',
]

const TOTAL_BLOCKS = 9
const MORPH_DELAY_AFTER_INTERACT = 3500
const MORPH_DELAY_AUTO = 8000
const MORPH_STAGGER = 180

/* ── types ── */

interface PlacedBlock {
  id: number
  color: string
  slot: number
}

type MorphType = 'kpi1' | 'kpi2' | 'chat' | 'chart' | 'workflow' | 'deco'

/* ── SVG icons (thin-line 1.5px) ── */

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

/* ── morph assignment per slot ── */

function getMorphType(slot: number): MorphType {
  const map: MorphType[] = [
    'kpi1', 'kpi2', 'chat', 'chart',
    'workflow', 'deco', 'deco', 'deco', 'deco',
  ]
  return map[slot] ?? 'deco'
}

/* ── mini morphed elements ── */

function MiniKpi({ variant }: { variant: 1 | 2 }) {
  const data = variant === 1
    ? { value: '€24.8K', label: 'Bevétel' }
    : { value: '94%', label: 'Elégedettség' }

  return (
    <div className={`${styles.morphed} ${styles.miniKpi}`}>
      <span className={styles.miniKpiValue}>{data.value}</span>
      <span className={styles.miniKpiLabel}>{data.label}</span>
    </div>
  )
}

function MiniChat() {
  return (
    <div className={`${styles.morphed} ${styles.miniChat}`}>
      <span className={styles.miniChatName}>Asszisztens</span>
      <span className={styles.miniChatText}>Miben segíthetek?</span>
    </div>
  )
}

function MiniChart() {
  const heights = [60, 85, 45, 100, 70]
  return (
    <div className={`${styles.morphed} ${styles.miniChart}`}>
      <span className={styles.miniChartLabel}>Havi trend</span>
      <div className={styles.miniChartBars}>
        {heights.map((h, i) => (
          <div
            key={i}
            className={styles.miniChartBar}
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, #CC5500, #F77F0A)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function MiniWorkflow() {
  return (
    <div className={`${styles.morphed} ${styles.miniWorkflow}`}>
      <div className={styles.miniWorkflowIcon}>
        <SettingsIcon />
      </div>
      <span className={styles.miniWorkflowTitle}>Feldolgozás</span>
    </div>
  )
}

function MiniDeco({ color }: { color: string }) {
  return (
    <div
      className={`${styles.morphed} ${styles.miniDeco}`}
      style={{ background: color, opacity: 0.25 }}
    />
  )
}

function MorphedElement({ slot, color }: { slot: number; color: string }) {
  const type = getMorphType(slot)
  switch (type) {
    case 'kpi1': return <MiniKpi variant={1} />
    case 'kpi2': return <MiniKpi variant={2} />
    case 'chat': return <MiniChat />
    case 'chart': return <MiniChart />
    case 'workflow': return <MiniWorkflow />
    case 'deco': return <MiniDeco color={color} />
  }
}

/* ── component ── */

interface BuilderSectionProps {
  animated?: boolean
}

export default function BuilderSection({ animated = false }: BuilderSectionProps) {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const morphTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasInteracted = useRef(false)
  const prefersReduced = useRef(false)

  const [titleVisible, setTitleVisible] = useState(!animated)
  const [availableBlocks, setAvailableBlocks] = useState<number[]>(
    () => Array.from({ length: TOTAL_BLOCKS }, (_, i) => i),
  )
  const [placedBlocks, setPlacedBlocks] = useState<PlacedBlock[]>([])
  const [morphedSlots, setMorphedSlots] = useState<Set<number>>(new Set())
  const [dragOverZone, setDragOverZone] = useState(false)
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [morphStarted, setMorphStarted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  /* ── detect mobile ── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    function handler(e: MediaQueryListEvent) {
      setIsMobile(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* ── detect reduced motion ── */
  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])

  /* ── intersection observer for title ── */
  useEffect(() => {
    if (!animated) return
    const el = sectionRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [animated])

  /* ── find next open slot ── */
  const getNextSlot = useCallback(
    (placed: PlacedBlock[]): number => {
      const occupied = new Set(placed.map((b) => b.slot))
      const maxSlots = isMobile ? 9 : 8
      for (let i = 0; i < maxSlots; i++) {
        if (!occupied.has(i)) return i
      }
      return placed.length
    },
    [isMobile],
  )

  /* ── start morph sequence ── */
  const startMorph = useCallback(
    (blocks: PlacedBlock[]) => {
      if (morphStarted) return
      setMorphStarted(true)

      const delay = prefersReduced.current ? 0 : MORPH_STAGGER
      blocks.forEach((block, i) => {
        setTimeout(() => {
          setMorphedSlots((prev) => new Set(prev).add(block.slot))
        }, i * delay)
      })
    },
    [morphStarted],
  )

  /* ── schedule morph after placing blocks ── */
  const scheduleMorph = useCallback(
    (blocks: PlacedBlock[]) => {
      if (morphTimerRef.current) clearTimeout(morphTimerRef.current)
      morphTimerRef.current = setTimeout(() => {
        startMorph(blocks)
      }, prefersReduced.current ? 0 : MORPH_DELAY_AFTER_INTERACT)
    },
    [startMorph],
  )

  /* ── place a block ── */
  const placeBlock = useCallback(
    (blockId: number) => {
      if (morphStarted) return

      hasInteracted.current = true
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current)
        autoTimerRef.current = null
      }

      setAvailableBlocks((prev) => prev.filter((id) => id !== blockId))
      setPlacedBlocks((prev) => {
        const slot = getNextSlot(prev)
        const next = [...prev, { id: blockId, color: BLOCK_COLORS[blockId], slot }]
        scheduleMorph(next)
        return next
      })
    },
    [getNextSlot, scheduleMorph, morphStarted],
  )

  /* ── auto-play fallback ── */
  const autoPlay = useCallback(() => {
    if (hasInteracted.current || morphStarted) return

    const allBlocks: PlacedBlock[] = Array.from({ length: TOTAL_BLOCKS }, (_, i) => ({
      id: i,
      color: BLOCK_COLORS[i],
      slot: i,
    }))

    const delay = prefersReduced.current ? 0 : 120

    allBlocks.forEach((block, i) => {
      setTimeout(() => {
        setAvailableBlocks((prev) => prev.filter((id) => id !== block.id))
        setPlacedBlocks((prev) => {
          const next = [...prev, block]
          if (next.length === TOTAL_BLOCKS) {
            setTimeout(() => {
              startMorph(allBlocks)
            }, prefersReduced.current ? 0 : 800)
          }
          return next
        })
      }, i * delay)
    })
  }, [morphStarted, startMorph])

  /* ── start auto-play timer when section enters viewport ── */
  useEffect(() => {
    if (!titleVisible) return
    if (hasInteracted.current || morphStarted) return

    autoTimerRef.current = setTimeout(() => {
      autoPlay()
    }, MORPH_DELAY_AUTO)

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    }
  }, [titleVisible, autoPlay, morphStarted])

  /* ── cleanup timers ── */
  useEffect(() => {
    return () => {
      if (morphTimerRef.current) clearTimeout(morphTimerRef.current)
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    }
  }, [])

  /* ── drag handlers (desktop) ── */
  function handleDragStart(e: React.DragEvent, blockId: number) {
    e.dataTransfer.setData('text/plain', String(blockId))
    setDraggingId(blockId)
  }

  function handleDragEnd() {
    setDraggingId(null)
    setDragOverZone(false)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragOverZone(true)
  }

  function handleDragLeave() {
    setDragOverZone(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOverZone(false)
    const blockId = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (!isNaN(blockId)) {
      placeBlock(blockId)
    }
  }

  /* ── tap handler (mobile) ── */
  function handleTap(blockId: number) {
    if (isMobile) {
      placeBlock(blockId)
    }
  }

  /* ── check if a slot is morphed ── */
  const isSlotMorphed = (slot: number) => morphedSlots.has(slot)

  /* ── compute placed slots set for rendering ── */
  const placedSlotsMap = new Map<number, PlacedBlock>()
  placedBlocks.forEach((b) => {
    placedSlotsMap.set(b.slot, b)
  })

  const maxSlots = isMobile ? 9 : 8

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* title */}
      <h2 className={`${styles.title} ${titleVisible ? styles.titleVisible : ''}`}>
        {t('builder.title')}
      </h2>

      {/* drop zone */}
      <div
        className={`${styles.dropZone} ${dragOverZone ? styles.dragOver : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {Array.from({ length: maxSlots }, (_, slotIdx) => {
          const block = placedSlotsMap.get(slotIdx)
          if (!block) return <div key={slotIdx} />

          if (isSlotMorphed(slotIdx)) {
            return (
              <div key={slotIdx}>
                <MorphedElement slot={slotIdx} color={block.color} />
              </div>
            )
          }

          return (
            <div key={slotIdx}>
              <div
                className={styles.placed}
                style={{ background: block.color }}
              />
            </div>
          )
        })}
      </div>

      {/* source zone */}
      <div className={styles.sourceZone}>
        {availableBlocks.map((blockId, idx) => {
          const isPrompt = idx === 0 && !hasInteracted.current && placedBlocks.length === 0
          const promptHidden = morphStarted || placedBlocks.length > 0

          return (
            <div
              key={blockId}
              className={`${styles.block} ${isPrompt && !promptHidden ? styles.promptBlock : ''} ${isPrompt && promptHidden ? styles.promptHidden : ''} ${draggingId === blockId ? styles.dragging : ''}`}
              style={{ background: BLOCK_COLORS[blockId] }}
              draggable={!isMobile}
              onDragStart={(e) => handleDragStart(e, blockId)}
              onDragEnd={handleDragEnd}
              onClick={() => handleTap(blockId)}
            >
              {isPrompt && !promptHidden ? t('builder.dragPrompt') : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
