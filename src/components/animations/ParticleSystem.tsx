import { useEffect, useRef } from 'react'
import { useInViewPause } from '../../hooks/useInViewPause'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

interface ParticleSystemProps {
  count?: number
  colors?: string[]
  speed?: number
  size?: { min: number; max: number }
  className?: string
  interactive?: boolean
  active?: boolean
}

const ParticleSystem = ({
  count = 50,
  colors = ['#22d3ee', '#2dd4bf', '#0891b2'],
  speed = 0.5,
  size = { min: 1, max: 3 },
  className = '',
  interactive = true,
  active: activeProp,
}: ParticleSystemProps) => {
  const [containerRef, inView] = useInViewPause<HTMLDivElement>()
  const reducedMotion = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  const isActive = activeProp !== undefined ? activeProp && inView : inView

  useEffect(() => {
    if (reducedMotion || !isActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawConnections = count <= 30

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * (size.max - size.min) + size.min,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random(),
      maxLife: 1,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    let running = true

    const animate = () => {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        if (interactive) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 120 && distance > 0) {
            particle.vx += (dx / distance) * 0.008
            particle.vy += (dy / distance) * 0.008
          }
        }

        particle.life += 0.01
        if (particle.life > particle.maxLife) particle.life = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.5
        ctx.fill()
        ctx.globalAlpha = 1

        if (drawConnections) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const other = particlesRef.current[j]
            const dx = particle.x - other.x
            const dy = particle.y - other.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = 0.12 * (1 - distance / 120)
              ctx.lineWidth = 0.5
              ctx.stroke()
              ctx.globalAlpha = 1
            }
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      running = false
      window.removeEventListener('resize', resize)
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [count, colors, speed, size, interactive, isActive, reducedMotion])

  if (reducedMotion) return null

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.5 }} />
    </div>
  )
}

export default ParticleSystem
