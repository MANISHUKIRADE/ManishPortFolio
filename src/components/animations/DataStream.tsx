import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DataStreamProps {
  direction?: 'up' | 'down' | 'left' | 'right'
  speed?: number
  color?: string
  count?: number
  className?: string
  children?: ReactNode
}

const DataStream = ({
  direction = 'down',
  speed = 2,
  color = '#60a5fa',
  count = 20,
  className = '',
  children,
}: DataStreamProps) => {
  const getGradient = () => {
    switch (direction) {
      case 'down':
        return `linear-gradient(180deg, transparent, ${color}, transparent)`
      case 'up':
        return `linear-gradient(0deg, transparent, ${color}, transparent)`
      case 'right':
        return `linear-gradient(90deg, transparent, ${color}, transparent)`
      case 'left':
        return `linear-gradient(270deg, transparent, ${color}, transparent)`
    }
  }

  const getAnimationProps = () => {
    switch (direction) {
      case 'down':
        return { y: ['-100%', '200%'] }
      case 'up':
        return { y: ['200%', '-100%'] }
      case 'right':
        return { x: ['-100%', '200%'] }
      case 'left':
        return { x: ['200%', '-100%'] }
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: direction === 'down' || direction === 'up' ? '2px' : '100%',
            height: direction === 'down' || direction === 'up' ? '100%' : '2px',
            left: direction === 'down' || direction === 'up' ? `${(i * 100) / count}%` : 0,
            top: direction === 'right' || direction === 'left' ? `${(i * 100) / count}%` : 0,
            background: getGradient(),
            boxShadow: `0 0 10px ${color}`,
            opacity: 0.6,
          }}
          animate={getAnimationProps()}
          transition={{
            duration: speed + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default DataStream

