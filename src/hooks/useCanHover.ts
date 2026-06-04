import { useEffect, useState } from 'react'

/** True on devices with fine pointer + hover (desktop mice). */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handler = () => setCanHover(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return canHover
}
