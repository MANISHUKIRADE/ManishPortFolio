import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'
import { BlogPost } from '../data/blogs'
import ScanningLine from './animations/ScanningLine'
import HolographicGlitch from './animations/HolographicGlitch'
import EnergyConnection from './animations/EnergyConnection'

interface BlogCardProps {
  blog: BlogPost
  index: number
  onReadMore: (slug: string) => void
}

const BlogCard = ({ blog, index, onReadMore }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7.5, -7.5])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7.5, 7.5])

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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all duration-300 cursor-pointer perspective-1000"
      onClick={() => onReadMore(blog.slug)}
    >
      {/* Holographic Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
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
            ? 'linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)'
            : 'transparent',
          backgroundSize: '200% 200%',
          backgroundClip: 'padding-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          boxShadow: isHovered
            ? '0 0 20px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.2)'
            : 'none',
        }}
      />

      {/* Scanning Lines */}
      {isHovered && (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            <ScanningLine direction="horizontal" speed={2} />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            <ScanningLine direction="vertical" speed={3} />
          </div>
        </>
      )}

      {/* Image */}
      <motion.div 
        className="relative h-64 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        {/* Animated Category Badge */}
        <motion.div 
          className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full border border-purple-400/30 z-10"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            boxShadow: isHovered 
              ? '0 0 20px rgba(139, 92, 246, 0.6)' 
              : '0 0 0px rgba(139, 92, 246, 0)'
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
          }}
        >
          <span className="text-xs font-semibold text-white">{blog.category}</span>
        </motion.div>

        {/* Energy Connection Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <EnergyConnection
              from={{ x: 10, y: 20 }}
              to={{ x: 90, y: 80 }}
              color="#8b5cf6"
              pulseSpeed={2}
            />
            <EnergyConnection
              from={{ x: 90, y: 20 }}
              to={{ x: 10, y: 80 }}
              color="#ec4899"
              pulseSpeed={2.5}
            />
          </div>
        )}
      </motion.div>

      <div className="p-6 relative z-10">
        <HolographicGlitch intensity={isHovered ? 0.05 : 0} frequency={5}>
          <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">{blog.title}</h3>
        </HolographicGlitch>
        
        <p className="text-slate-300 mb-4 line-clamp-3">{blog.excerpt}</p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + tagIndex * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
              }}
              className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
          {blog.tags.length > 3 && (
            <motion.span 
              className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs"
              whileHover={{ scale: 1.1 }}
            >
              +{blog.tags.length - 3}
            </motion.span>
          )}
        </div>

        {/* Read More */}
        <motion.div
          className="flex items-center gap-2 text-purple-400 font-semibold group-hover:text-purple-300 transition-colors"
          whileHover={{ x: 5 }}
        >
          <motion.span
            animate={isHovered ? {
              background: [
                'linear-gradient(90deg, #8b5cf6, #ec4899)',
                'linear-gradient(90deg, #ec4899, #8b5cf6)',
                'linear-gradient(90deg, #8b5cf6, #ec4899)',
              ],
            } : {}}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            className="bg-clip-text text-transparent"
          >
            Read Article
          </motion.span>
          <motion.div
            animate={isHovered ? {
              x: [0, 5, 0],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Glow Effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
          animate={isHovered ? {
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          } : {}}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
          }}
        />
        {/* Pulsing border glow */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={isHovered ? {
            boxShadow: [
              '0 0 20px rgba(139, 92, 246, 0.3)',
              '0 0 40px rgba(139, 92, 246, 0.6)',
              '0 0 20px rgba(139, 92, 246, 0.3)',
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      </motion.div>

      {/* Interactive Shine Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl"
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

export default BlogCard
