import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react'
import { BlogPost } from '../data/blogs'
import { useEffect } from 'react'
import SEO from './SEO'

interface BlogDetailModalProps {
  blog: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

const BlogDetailModal = ({ blog, isOpen, onClose }: BlogDetailModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Inject blog structured data
  useEffect(() => {
    if (!blog || !isOpen) return

    // Remove existing blog structured data
    const existingScript = document.getElementById('blog-structured-data')
    if (existingScript) {
      existingScript.remove()
    }

    // Create blog structured data
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
        url: 'https://manish-port-folio.vercel.app'
      },
      publisher: {
        '@type': 'Person',
        name: blog.author,
        url: 'https://manish-port-folio.vercel.app'
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://manish-port-folio.vercel.app/blog/${blog.slug}`
      },
      keywords: blog.seo.keywords,
      articleSection: blog.category,
      wordCount: blog.content.split(/\s+/).length
    }

    const script = document.createElement('script')
    script.id = 'blog-structured-data'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('blog-structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
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
            url={`https://manish-port-folio.vercel.app/blog/${blog.slug}`}
          />
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="h-full w-full bg-slate-900 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur-sm rounded-full border border-purple-500/30 hover:bg-purple-600/20 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full border border-purple-400/30">
                  <span className="text-xs font-semibold text-white">{blog.category}</span>
                </div>

                {/* Title and Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {blog.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>By {blog.author}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-12">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Markdown Content */}
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="text-slate-300 leading-relaxed">
                      {blog.content.split('\n').map((line, idx) => {
                        const trimmedLine = line.trim()
                        
                        if (trimmedLine.startsWith('# ')) {
                          return <h1 key={idx} className="text-3xl font-bold text-white mt-8 mb-4">{trimmedLine.replace(/^#+\s/, '')}</h1>
                        } else if (trimmedLine.startsWith('## ')) {
                          return <h2 key={idx} className="text-2xl font-bold text-white mt-6 mb-3">{trimmedLine.replace(/^#+\s/, '')}</h2>
                        } else if (trimmedLine.startsWith('### ')) {
                          return <h3 key={idx} className="text-xl font-bold text-white mt-4 mb-2">{trimmedLine.replace(/^#+\s/, '')}</h3>
                        } else if (trimmedLine.startsWith('- ')) {
                          return <li key={idx} className="ml-6 mb-2 list-disc">{trimmedLine.replace(/^-\s/, '')}</li>
                        } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                          return <p key={idx} className="font-bold text-white my-4">{trimmedLine.replace(/\*\*/g, '')}</p>
                        } else if (trimmedLine === '') {
                          return <div key={idx} className="h-4" />
                        } else {
                          // Handle bold text within paragraphs
                          const parts = trimmedLine.split(/(\*\*.*?\*\*)/g)
                          return (
                            <p key={idx} className="mb-4">
                              {parts.map((part, partIdx) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={partIdx} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>
                                }
                                return <span key={partIdx}>{part}</span>
                              })}
                            </p>
                          )
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-700 p-6">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                  <motion.button
                    whileHover={{ x: -5 }}
                    onClick={onClose}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Blogs</span>
                  </motion.button>
                  <div className="text-sm text-slate-400">
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
