import { useRef, useState, useEffect } from 'react'

interface UseIntersectionOptions {
  threshold?: number
  once?: boolean
}

export default function useIntersection({
  threshold = 0.15,
  once = true,
}: UseIntersectionOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, isVisible }
}
