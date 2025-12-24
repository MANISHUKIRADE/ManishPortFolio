import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface EnergyBeamProps {
  from?: { x: number; y: number }
  to?: { x: number; y: number }
  color?: string
  intensity?: number
  children?: ReactNode
  className?: string
}

const EnergyBeam = ({ 
  from = { x: 50, y: 50 }, 
  to = { x: 50, y: 50 },
  color = '#60a5fa',
  intensity = 1,
  children,
  className = ''
}: EnergyBeamProps) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI)
  const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2))
  
  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${from.x}%`,
          top: `${from.y}%`,
          width: `${distance}%`,
          height: '2px',
          transformOrigin: 'left center',
          transform: `rotate(${angle}deg)`,
          background: `linear-gradient(90deg, ${color}, transparent)`,
          boxShadow: `0 0 ${10 * intensity}px ${color}, 0 0 ${20 * intensity}px ${color}`,
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleX: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default EnergyBeam

