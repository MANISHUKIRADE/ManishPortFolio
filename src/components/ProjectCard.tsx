import { motion, useMotionValue, useSpring, useTransform, PanInfo } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import ScanningLine from './animations/ScanningLine'
import HolographicGlitch from './animations/HolographicGlitch'

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  live: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Swipe animation values for mobile
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  // Spring animations for drag values (mobile)
  const dragXSpring = useSpring(dragX, { stiffness: 300, damping: 30 })
  const dragYSpring = useSpring(dragY, { stiffness: 300, damping: 30 })
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 })
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 30 })

  // Transform opacity based on drag distance
  const opacity = useTransform(
    [dragX, dragY],
    ([x, y]: number[]) => {
      const distance = Math.sqrt(x * x + y * y)
      return Math.max(0.7, 1 - distance / 500)
    }
  )

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct * 10)
    y.set(-yPct * 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  // Handle swipe end for mobile
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    const velocityThreshold = 500
    
    // Check if swipe is significant enough
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > velocityThreshold) {
      // Horizontal swipe - prevent click
      const direction = info.offset.x > 0 ? 1 : -1
      dragX.set(direction * 100)
      rotateY.set(direction * 15)
      
      // Spring back after animation
      setTimeout(() => {
        dragX.set(0)
        rotateY.set(0)
        scale.set(1)
      }, 300)
    } else if (Math.abs(info.offset.y) > swipeThreshold || Math.abs(info.velocity.y) > velocityThreshold) {
      // Vertical swipe - prevent click
      const direction = info.offset.y > 0 ? 1 : -1
      dragY.set(direction * 100)
      rotateX.set(-direction * 15)
      
      // Spring back after animation
      setTimeout(() => {
        dragY.set(0)
        rotateX.set(0)
        scale.set(1)
      }, 300)
    } else {
      // Small movement - allow click, spring back
      dragX.set(0)
      dragY.set(0)
      rotateX.set(0)
      rotateY.set(0)
      scale.set(1)
    }
  }

  // Handle drag start
  const handleDragStart = () => {
    scale.set(0.95)
  }

  // Handle drag for real-time feedback
  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Apply rotation based on drag direction
    rotateX.set(-info.offset.y * 0.1)
    rotateY.set(info.offset.x * 0.1)
    
    // Scale down slightly while dragging
    const dragDistance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)
    scale.set(Math.max(0.95, 1 - dragDistance / 1000))
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      drag={isMobile}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x: isMobile ? dragXSpring : 0,
        y: isMobile ? dragYSpring : 0,
        rotateX: isMobile ? rotateXSpring : mouseYSpring,
        rotateY: isMobile ? rotateYSpring : mouseXSpring,
        scale: isMobile ? scaleSpring : 1,
        opacity: isMobile ? opacity : 1,
        transformStyle: 'preserve-3d',
      }}
      className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 perspective-1000 touch-none md:touch-auto"
    >
      {/* Holographic Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          opacity: isHovered ? [0.5, 1, 0.5] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          border: '2px solid transparent',
          background: isHovered
            ? 'linear-gradient(90deg, #60a5fa, #8b5cf6, #ec4899, #60a5fa)'
            : 'transparent',
          backgroundSize: '200% 200%',
          backgroundClip: 'padding-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          boxShadow: isHovered
            ? '0 0 20px rgba(96, 165, 250, 0.5), inset 0 0 20px rgba(96, 165, 250, 0.2)'
            : 'none',
        }}
      />

      {/* Scanning Lines */}
      {isHovered && (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <ScanningLine direction="horizontal" speed={2} />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <ScanningLine direction="vertical" speed={3} />
          </div>
        </>
      )}

      {/* Swipe indicator for mobile */}
      {isMobile && (
        <motion.div
          className="absolute top-4 right-4 z-20 px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-blue-300 text-xs font-medium flex items-center gap-1"
          >
            <span>👆</span>
            <span className="hidden sm:inline">Swipe</span>
          </motion.div>
        </motion.div>
      )}

      {/* 3D Tilt Effect */}
      <motion.div
        animate={{
          scale: isHovered && !isMobile ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative h-64 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      </motion.div>

      <div className="p-6 relative z-10">
        <HolographicGlitch intensity={isHovered ? 0.05 : 0} frequency={5}>
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        </HolographicGlitch>
        <p className="text-slate-300 mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors relative z-20"
          >
            <Github size={20} />
            <span>Code</span>
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors relative z-20"
          >
            <ExternalLink size={20} />
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.div>

      {/* Interactive Shine Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.1) 50%, transparent 55%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatType: 'reverse',
        }}
      />
    </motion.div>
  )
}

export default ProjectCard

