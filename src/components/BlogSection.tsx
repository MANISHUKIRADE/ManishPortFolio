import { useState } from 'react'
import { blogs } from '../data/blogs'
import BlogCard from './BlogCard'
import BlogDetailModal from './BlogDetailModal'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'

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

  const currentBlog = selectedBlog ? blogs.find((b) => b.slug === selectedBlog) ?? null : null

  return (
    <>
      <SectionShell id="blog" py="py-12 md:py-16" gridSpacing={80} gridOpacity={0.03} contentClassName="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Engineering Insights"
          title="Tech Lead Blog"
          description="Deep dives into production systems, RAG pipelines, troubleshooting methodologies, and engineering leadership."
          sysId="SYS.BLOG"
          typeTitle
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} onReadMore={handleReadMore} />
          ))}
        </div>
      </SectionShell>

      <BlogDetailModal blog={currentBlog} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default BlogSection
