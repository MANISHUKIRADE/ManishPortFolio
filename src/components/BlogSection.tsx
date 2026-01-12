import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import StarField from './3D/StarField'
import { OrbitControls } from '@react-three/drei'
import HolographicGlitch from './animations/HolographicGlitch'
import HolographicGrid from './animations/HolographicGrid'
import ParticleSystem from './animations/ParticleSystem'
import DataStream from './animations/DataStream'
import { useState } from 'react'
import { blogs } from '../data/blogs'
import BlogCard from './BlogCard'
import BlogDetailModal from './BlogDetailModal'

const BlogSection = () => {
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleReadMore = (slug: string) => {
    setSelectedBlog(slug)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedBlog(null), 300)
  }

  const currentBlog = selectedBlog ? blogs.find(b => b.slug === selectedBlog) ?? null : null

  return (
    <>
      <section id="blog" className="relative py-20 px-4 overflow-hidden min-h-[600px]">
        {/* Space Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
            <StarField count={5000} speed={0.03} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Canvas>
        </div>

        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] z-[1]" />

        {/* Holographic Grid Background - reduced opacity */}
        <div className="absolute inset-0 z-[2]">
          <HolographicGrid spacing={80} color="#8b5cf6" opacity={0.03} />
        </div>

        {/* Particle System - reduced count and opacity */}
        <div className="absolute inset-0 z-[2] opacity-40">
          <ParticleSystem 
            count={15} 
            speed={0.3} 
            size={{ min: 1, max: 2 }}
            colors={['#8b5cf6', '#ec4899', '#a855f7']}
          />
        </div>

        {/* Data Stream Animation - reduced opacity */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-[2]">
          <DataStream direction="down" speed={2} count={10} color="#8b5cf6" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Additional backdrop for content area */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-transparent pointer-events-none" />
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative"
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                background: [
                  'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1), transparent 50%)',
                  'radial-gradient(circle at 50% 0%, rgba(236, 72, 153, 0.1), transparent 50%)',
                  'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1), transparent 50%)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="inline-block text-purple-400 text-sm font-semibold uppercase tracking-wider mb-4"
            >
              Engineering Insights
            </motion.span>
            
            <HolographicGlitch intensity={0.05} frequency={4}>
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Tech Lead Blog
              </motion.h2>
            </HolographicGlitch>
            
            <motion.p 
              className="text-lg text-slate-200 max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Deep dives into production systems, troubleshooting methodologies, and engineering leadership insights
            </motion.p>
          </motion.div>

          {/* Blog Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <BlogCard
                  blog={blog}
                  index={index}
                  onReadMore={handleReadMore}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State (if no blogs) */}
          {blogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-400 text-lg">More articles coming soon...</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Detail Modal */}
      <BlogDetailModal
        blog={currentBlog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default BlogSection
