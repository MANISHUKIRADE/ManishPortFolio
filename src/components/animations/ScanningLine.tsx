import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScanningLineProps {
  direction?: 'horizontal' | 'vertical'
  speed?: number
  color?: string
  className?: string
  children?: ReactNode
}

const ScanningLine = ({ 
  direction = 'horizontal', 
  speed = 2,
  color = '#60a5fa',
  className = '',
  children 
}: ScanningLineProps) => {
  const isHorizontal = direction === 'horizontal'
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          [isHorizontal ? 'top' : 'left']: 0,
          [isHorizontal ? 'width' : 'height']: '100%',
          [isHorizontal ? 'height' : 'width']: '2px',
          background: `linear-gradient(${isHorizontal ? '180deg' : '90deg'}, transparent, ${color}, transparent)`,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
        animate={{
          [isHorizontal ? 'y' : 'x']: [isHorizontal ? '-100%' : '-100%', '200%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export default ScanningLine

