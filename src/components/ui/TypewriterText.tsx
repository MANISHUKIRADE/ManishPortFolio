import { useEffect, useMemo, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface TypewriterTextProps {
  text?: string
  strings?: string[]
  speed?: number
  delay?: number
  pauseBetween?: number
  /** When true with strings[], loops forever (respects reduced-motion) */
  loop?: boolean
  showCursor?: boolean
  className?: string
  onComplete?: () => void
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3'
}

const TypewriterText = ({
  text,
  strings,
  speed = 45,
  delay = 0,
  pauseBetween = 2000,
  loop = false,
  showCursor = true,
  className = '',
  onComplete,
  as: Tag = 'span',
}: TypewriterTextProps) => {
  const reducedMotion = usePrefersReducedMotion()
  const sequence = useMemo(
    () => (strings?.length ? strings : text ? [text] : []),
    [strings, text]
  )
  const [displayed, setDisplayed] = useState('')
  const [stringIndex, setStringIndex] = useState(0)
  const [done, setDone] = useState(false)
  const completedOnce = useRef(false)

  useEffect(() => {
    if (reducedMotion || sequence.length === 0) {
      setDisplayed(sequence[0] ?? '')
      setDone(true)
      if (!completedOnce.current) {
        completedOnce.current = true
        onComplete?.()
      }
      return
    }

    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>
    let charIndex = 0
    const current = sequence[stringIndex] ?? ''

    const notifyComplete = () => {
      if (!completedOnce.current) {
        completedOnce.current = true
        onComplete?.()
      }
    }

    const startTyping = () => {
      charIndex = 0
      setDisplayed('')
      setDone(false)

      intervalId = setInterval(() => {
        charIndex += 1
        setDisplayed(current.slice(0, charIndex))

        if (charIndex >= current.length) {
          clearInterval(intervalId)

          const isLast = stringIndex >= sequence.length - 1
          if (!isLast) {
            timeoutId = setTimeout(() => setStringIndex((i) => i + 1), pauseBetween)
          } else if (loop && sequence.length > 1) {
            notifyComplete()
            timeoutId = setTimeout(() => setStringIndex(0), pauseBetween)
          } else {
            setDone(true)
            notifyComplete()
          }
        }
      }, speed)
    }

    timeoutId = setTimeout(startTyping, stringIndex === 0 ? delay : 0)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [stringIndex, sequence, speed, delay, pauseBetween, reducedMotion, onComplete, loop])

  const showCaret = showCursor && (loop || !done)

  return (
    <Tag className={className}>
      {displayed}
      {showCaret && (
        <span className="typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
    </Tag>
  )
}

export default TypewriterText
