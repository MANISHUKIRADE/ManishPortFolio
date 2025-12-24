import { motion } from 'framer-motion'

interface EnergyConnectionProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color?: string
  pulseSpeed?: number
  className?: string
}

const EnergyConnection = ({
  from,
  to,
  color = '#60a5fa',
  pulseSpeed = 1.5,
  className = '',
}: EnergyConnectionProps) => {

  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id={`energyGradient-${from.x}-${from.y}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1={`${from.x}%`}
          y1={`${from.y}%`}
          x2={`${to.x}%`}
          y2={`${to.y}%`}
          stroke={`url(#energyGradient-${from.x}-${from.y})`}
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 5px ${color})`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: pulseSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Energy pulse */}
        <motion.circle
          r="4"
          fill={color}
          style={{
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
          animate={{
            cx: [`${from.x}%`, `${to.x}%`],
            cy: [`${from.y}%`, `${to.y}%`],
            opacity: [1, 0],
          }}
          transition={{
            duration: pulseSpeed,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
    </div>
  )
}

export default EnergyConnection

