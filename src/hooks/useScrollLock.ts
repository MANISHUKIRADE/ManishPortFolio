import { useEffect } from 'react'

/** Locks document scroll while active; restores position on cleanup. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const scrollY = window.scrollY
    const body = document.body
    const html = document.documentElement

    body.classList.add('modal-open')
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'

    return () => {
      body.classList.remove('modal-open')
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      body.style.overflow = ''
      html.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [active])
}
