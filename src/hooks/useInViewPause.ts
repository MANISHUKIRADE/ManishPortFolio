import { useEffect, useRef, useState, type RefObject } from 'react'

interface UseInViewPauseOptions {
  threshold?: number
  rootMargin?: string
}

/** Returns true when the observed element is visible enough to run animations. */
export function useInViewPause<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewPauseOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.05, rootMargin = '0px' } = options
  const ref = useRef<T>(null)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isActive]
}
