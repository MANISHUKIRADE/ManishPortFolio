import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react'
import { BlogPost } from '../data/blogs'
import { useEffect } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'
import SEO from './SEO'
import { SITE_URL } from '../config/site'
import BlogMarkdown from './ui/BlogMarkdown'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface BlogDetailModalProps {
  blog: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

const BlogDetailModal = ({ blog, isOpen, onClose }: BlogDetailModalProps) => {
  useScrollLock(isOpen)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!blog || !isOpen) return

    const existingScript = document.getElementById('blog-structured-data')
    if (existingScript) existingScript.remove()

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.seo.metaDescription,
      image: blog.image,
      datePublished: blog.date,
      dateModified: blog.date,
      author: {
        '@type': 'Person',
        name: blog.author,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Person',
        name: blog.author,
        url: SITE_URL,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/${blog.slug}`,
      },
      keywords: blog.seo.keywords,
      articleSection: blog.category,
      wordCount: blog.content.split(/\s+/).length,
    }

    const script = document.createElement('script')
    script.id = 'blog-structured-data'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.getElementById('blog-structured-data')?.remove()
    }
  }, [blog, isOpen])

  if (!blog) return null

  return (
    <AnimatePresence>
      {isOpen && blog && (
        <>
          <SEO
            title={`${blog.title} | Manish Ukirade - Tech Lead Blog`}
            description={blog.seo.metaDescription}
            keywords={blog.seo.keywords}
            image={blog.image}
            url={`${SITE_URL}/blog/${blog.slug}`}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overscroll-none"
          />

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed inset-0 sm:inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden pointer-events-none min-h-0"
          >
            <div
              className="h-full min-h-0 w-full bg-surface rounded-none sm:rounded-2xl border-0 sm:border border-border shadow-2xl flex flex-col relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden shrink-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />

                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-surface/90 backdrop-blur-sm rounded-md border border-border hover:border-accent hover:text-accent transition-colors z-10 touch-manipulation"
                  aria-label="Close article"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-accent text-bg rounded-md font-mono text-[10px] sm:text-xs font-semibold">
                  {blog.category}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-2 sm:mb-3 leading-tight">
                    {blog.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-muted font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                    <span>By {blog.author}</span>
                  </div>
                </div>
              </div>

              <div
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain modal-content"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                }}
              >
                <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-accent/10 text-accent rounded-md text-xs sm:text-sm border border-accent/20 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-invert prose-sm sm:prose-base md:prose-lg max-w-none">
                    <BlogMarkdown content={blog.content} />
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-4 sm:p-6 relative z-10 shrink-0">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors px-4 py-2 rounded-md hover:bg-accent/10 touch-manipulation text-sm sm:text-base font-mono"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Blogs</span>
                  </button>
                  <div className="text-xs sm:text-sm text-muted text-center sm:text-right font-mono">
                    Published by {blog.author}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BlogDetailModal
