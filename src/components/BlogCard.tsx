import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { BlogPost } from '../data/blogs'
import ScanningLine from './animations/ScanningLine'
import HolographicGlitch from './animations/HolographicGlitch'

interface BlogCardProps {
  blog: BlogPost
  index: number
  onReadMore: (slug: string) => void
}

const BlogCard = ({ blog, index, onReadMore }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
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
      <div className="relative h-64 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <div className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full border border-purple-400/30">
          <span className="text-xs font-semibold text-white">{blog.category}</span>
        </div>
      </div>

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
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
            >
              {tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs">
              +{blog.tags.length - 3}
            </span>
          )}
        </div>

        {/* Read More */}
        <motion.div
          className="flex items-center gap-2 text-purple-400 font-semibold group-hover:text-purple-300 transition-colors"
          whileHover={{ x: 5 }}
        >
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Glow Effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
      </motion.div>
    </motion.div>
  )
}

export default BlogCard
