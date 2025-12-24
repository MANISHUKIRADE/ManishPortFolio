import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HolographicGlitchProps {
  children: ReactNode
  intensity?: number
  frequency?: number
  className?: string
}

const HolographicGlitch = ({ 
  children, 
  intensity = 0.1, 
  frequency = 3,
  className = '' 
}: HolographicGlitchProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        filter: [
          'hue-rotate(0deg) brightness(1) contrast(1)',
          `hue-rotate(${Math.random() * 20 - 10}deg) brightness(${1 + intensity}) contrast(${1 + intensity})`,
          'hue-rotate(0deg) brightness(1) contrast(1)',
        ],
        x: [0, Math.random() * 4 - 2, 0],
      }}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        repeatDelay: frequency,
        ease: 'easeInOut',
      }}
      style={{
        textShadow: `
          0 0 10px rgba(96, 165, 250, 0.5),
          0 0 20px rgba(139, 92, 246, 0.3),
          0 0 30px rgba(236, 72, 153, 0.2)
        `,
      }}
    >
      {children}
      {/* Glitch overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0, 0.3, 0],
          clipPath: [
            'inset(0 0 100% 0)',
            'inset(20% 0 60% 0)',
            'inset(0 0 100% 0)',
          ],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: frequency,
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
          mixBlendMode: 'screen',
        }}
      />
    </motion.div>
  )
}

export default HolographicGlitch

