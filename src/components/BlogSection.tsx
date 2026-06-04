import { motion } from 'framer-motion'
import { useState } from 'react'
import { blogs } from '../data/blogs'
import BlogCard from './BlogCard'
import BlogDetailModal from './BlogDetailModal'
import SectionHeader from './ui/SectionHeader'
import HolographicGrid from './animations/HolographicGrid'
import CssStarfield from './ui/CssStarfield'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const BlogSection = () => {
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const handleReadMore = (slug: string) => {
    setSelectedBlog(slug)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedBlog(null), 300)
  }

  const currentBlog = selectedBlog ? blogs.find((b) => b.slug === selectedBlog) ?? null : null

  return (
    <>
      <section id="blog" className="relative py-12 md:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-nexus-950" />
        <CssStarfield />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.1),transparent_50%)] pointer-events-none" />
        <HolographicGrid spacing={80} color="#22d3ee" opacity={0.03} />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            eyebrow="Engineering Insights"
            title="Tech Lead Blog"
            description="Deep dives into production systems, RAG pipelines, troubleshooting methodologies, and engineering leadership."
            typeTitle
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.06 }}
              >
                <BlogCard blog={blog} index={index} onReadMore={handleReadMore} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <BlogDetailModal blog={currentBlog} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default BlogSection
