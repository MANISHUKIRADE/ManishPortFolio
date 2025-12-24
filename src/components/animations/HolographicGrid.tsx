import { motion } from 'framer-motion'

interface HolographicGridProps {
  spacing?: number
  color?: string
  opacity?: number
  className?: string
}

const HolographicGrid = ({
  spacing = 50,
  color = '#60a5fa',
  opacity = 0.1,
  className = '',
}: HolographicGridProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full" style={{ opacity }}>
        <defs>
          <pattern
            id="grid"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent, ${color}20, transparent)`,
        }}
        animate={{
          y: ['-100%', '200%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export default HolographicGrid

