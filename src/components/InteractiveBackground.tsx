import { useEffect, useRef } from 'react'
import HolographicGrid from './animations/HolographicGrid'

const NEXUS_COLORS = ['#22d3ee', '#2dd4bf', '#0891b2', '#e0f2fe']

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

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
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.8,
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

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        const alpha = 0.25 + Math.sin(frame * 0.02 + star.twinkle) * 0.2
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

        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 140 && distance > 0) {
          const force = (140 - distance) / 140
          particle.vx += (dx / distance) * force * 0.008
          particle.vy += (dy / distance) * force * 0.008
        }

        particle.life += 0.01
        if (particle.life > particle.maxLife) particle.life = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.45 + Math.sin(particle.life * Math.PI * 2) * 0.25
        ctx.fill()

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.12
        ctx.fill()
        ctx.globalAlpha = 1

        particles.slice(i + 1).forEach((other) => {
          const odx = particle.x - other.x
          const ody = particle.y - other.y
          const dist = Math.sqrt(odx * odx + ody * ody)
          if (dist < 180) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = 0.15 * (1 - dist / 180)
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 opacity-30"
        style={{ pointerEvents: 'none' }}
      />
      <HolographicGrid spacing={80} color="#22d3ee" opacity={0.02} />
    </>
  )
}

export default InteractiveBackground
