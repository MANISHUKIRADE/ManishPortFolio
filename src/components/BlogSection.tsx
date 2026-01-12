import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import StarField from './3D/StarField'
import { OrbitControls } from '@react-three/drei'
import HolographicGlitch from './animations/HolographicGlitch'
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

  const currentBlog = selectedBlog ? blogs.find(b => b.slug === selectedBlog) : null

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

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block text-purple-400 text-sm font-semibold uppercase tracking-wider mb-4"
            >
              Engineering Insights
            </motion.span>
            <HolographicGlitch intensity={0.05} frequency={4}>
              <h2 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                Tech Lead Blog
              </h2>
            </HolographicGlitch>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Deep dives into production systems, troubleshooting methodologies, and engineering leadership insights
            </p>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
                onReadMore={handleReadMore}
              />
            ))}
          </div>

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
