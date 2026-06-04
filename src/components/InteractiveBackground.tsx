import { useEffect, useRef } from 'react'
import HolographicGrid from './animations/HolographicGrid'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsMobile } from '../hooks/useIsMobile'

const NEXUS_COLORS = ['#22d3ee', '#2dd4bf', '#0891b2', '#e0f2fe']

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const starCount = isMobile ? 60 : 100
    const particleCount = isMobile ? 35 : 50
    const drawConnections = particleCount <= 40

    let animationId = 0
    let running = true

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      life: number
      maxLife: number
    }> = []

    const stars: Array<{ x: number; y: number; size: number; twinkle: number }> = []
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.6,
        color: NEXUS_COLORS[Math.floor(Math.random() * NEXUS_COLORS.length)],
        life: Math.random(),
        maxLife: 1,
      })
    }

    let mouseX = 0
    let mouseY = 0
    let frame = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running && !animationId) animate()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)

    const animate = () => {
      if (!running) {
        animationId = 0
        return
      }

      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        const alpha = 0.22 + Math.sin(frame * 0.02 + star.twinkle) * 0.18
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`
        ctx.fill()
      })

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        if (!isMobile) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 120 && distance > 0) {
            const force = (120 - distance) / 120
            particle.vx += (dx / distance) * force * 0.006
            particle.vy += (dy / distance) * force * 0.006
          }
        }

        particle.life += 0.01
        if (particle.life > particle.maxLife) particle.life = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.4
        ctx.fill()
        ctx.globalAlpha = 1

        if (drawConnections) {
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j]
            const odx = particle.x - other.x
            const ody = particle.y - other.y
            const dist = Math.sqrt(odx * odx + ody * ody)
            if (dist < 140) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = 0.1 * (1 - dist / 140)
              ctx.lineWidth = 0.5
              ctx.stroke()
              ctx.globalAlpha = 1
            }
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      running = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [reducedMotion, isMobile])

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,211,238,0.08), transparent), #030712',
          }}
        />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-25" />
      <HolographicGrid spacing={80} color="#22d3ee" opacity={0.02} />
    </div>
  )
}

export default InteractiveBackground
