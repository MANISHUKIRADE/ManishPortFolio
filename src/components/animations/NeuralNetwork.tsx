import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

interface NeuralNetworkProps {
  nodeCount?: number
  connectionDistance?: number
  color?: string
  className?: string
}

const NeuralNetwork = ({
  nodeCount = 20,
  connectionDistance = 150,
  color = '#60a5fa',
  className = '',
}: NeuralNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize nodes
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      connections: [],
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodesRef.current.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Find connections
        node.connections = []
        nodesRef.current.forEach((other, index) => {
          if (node !== other) {
            const dx = other.x - node.x
            const dy = other.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < connectionDistance) {
              node.connections.push(index)
            }
          }
        })
      })

      // Draw connections
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach((connIndex) => {
          const other = nodesRef.current[connIndex]
          const dx = other.x - node.x
          const dy = other.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const opacity = 1 - distance / connectionDistance

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = color
          ctx.globalAlpha = opacity * 0.3
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.globalAlpha = 1
        })
      })

      // Draw nodes
      nodesRef.current.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = 0.8
        ctx.fill()
        ctx.globalAlpha = 1

        // Glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = 0.2
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [nodeCount, connectionDistance, color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  )
}

export default NeuralNetwork

