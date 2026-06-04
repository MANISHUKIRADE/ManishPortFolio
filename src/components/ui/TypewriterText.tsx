import { useEffect, useMemo, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface TypewriterTextProps {
  text?: string
  strings?: string[]
  speed?: number
  delay?: number
  pauseBetween?: number
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

  useEffect(() => {
    if (reducedMotion || sequence.length === 0) {
      setDisplayed(sequence[0] ?? '')
      setDone(true)
      onComplete?.()
      return
    }

    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>
    let charIndex = 0
    const current = sequence[stringIndex] ?? ''

    const startTyping = () => {
      charIndex = 0
      setDisplayed('')

      intervalId = setInterval(() => {
        charIndex += 1
        setDisplayed(current.slice(0, charIndex))

        if (charIndex >= current.length) {
          clearInterval(intervalId)

          if (stringIndex < sequence.length - 1) {
            timeoutId = setTimeout(() => setStringIndex((i) => i + 1), pauseBetween)
          } else {
            setDone(true)
            onComplete?.()
          }
        }
      }, speed)
    }

    timeoutId = setTimeout(startTyping, stringIndex === 0 ? delay : 0)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [stringIndex, sequence, speed, delay, pauseBetween, reducedMotion, onComplete])

  return (
    <Tag className={className}>
      {displayed}
      {showCursor && !done && (
        <span className="typewriter-cursor text-cyan-400" aria-hidden="true">
          |
        </span>
      )}
    </Tag>
  )
}

export default TypewriterText
