import { useState, useEffect } from 'react'
import { Calendar, Clock, ArrowRight, BookOpen, Star } from 'lucide-react'
import { blogs, BlogPost } from '../data/blogs'
import BlogDetailModal from './BlogDetailModal'
import SectionHeader from './ui/SectionHeader'
import SectionShell from './ui/SectionShell'
import HudPanel from './ui/HudPanel'
import HudCard from './ui/HudCard'

const FEATURED_SLUGS = new Set([
  'production-rag-pipeline-kyara-lessons',
  'troubleshooting-in-production',
])

const blogLabels: Record<string, string> = {
  'production-rag-pipeline-kyara-lessons': 'RAG',
  'troubleshooting-in-production': 'Debug',
  'building-ai-powered-hr-solutions-kyara': 'KYARA',
  'zero-downtime-cloud-migration-aws-azure': 'Cloud',
  'scaling-engineering-teams-tech-lead': 'Lead',
  'building-resilient-systems-designing-for-failure': 'Systems',
  'employee-attrition-prediction-ml-models': 'ML',
}

const getBlogLabel = (blog: BlogPost) =>
  blogLabels[blog.slug] ?? blog.category.split(' ')[0].slice(0, 8)

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

interface BlogPreviewProps {
  blog: BlogPost
  index: number
  onReadMore: () => void
}

const BlogPreview = ({ blog, index, onReadMore }: BlogPreviewProps) => (
  <div>
    <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden border-b border-slate-800/80">
      <img src={blog.image} alt={blog.title} loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      <span className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/25">
        {blog.category}
      </span>
      {FEATURED_SLUGS.has(blog.slug) && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 font-mono text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
          <Star className="w-3 h-3" />
          Featured
        </span>
      )}
      {!FEATURED_SLUGS.has(blog.slug) && (
        <span className="absolute top-3 right-3 font-mono text-[10px] text-slate-500">
          LOG_{String(index + 1).padStart(2, '0')}
        </span>
      )}
    </div>

    <div className="p-4 sm:p-5 lg:p-6">
      <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800/60">
        <div className="p-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 mb-1">
            // Active Article
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-cyan-300 leading-snug">{blog.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 font-mono">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(blog.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-5">{blog.excerpt}</p>

      <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70 mb-2">
        // Tags
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {blog.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-md text-xs border border-cyan-500/20 font-mono"
          >
            {tag}
          </span>
        ))}
        {blog.tags.length > 5 && (
          <span className="px-2.5 py-1 text-slate-500 text-xs font-mono">+{blog.tags.length - 5}</span>
        )}
      </div>

      <button
        type="button"
        onClick={onReadMore}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono uppercase tracking-wider pt-3 border-t border-slate-800/80 w-full touch-manipulation"
      >
        <span>Read Full Article</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
)

interface BlogCompactCardProps {
  blog: BlogPost
  index: number
  onRead: () => void
}

const BlogCompactCard = ({ blog, index, onRead }: BlogCompactCardProps) => (
  <HudCard className="p-4 sm:p-5">
    <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-mono text-[10px] text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">
          {getBlogLabel(blog)}
        </span>
        {FEATURED_SLUGS.has(blog.slug) && (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-300 shrink-0">
            <Star className="w-3 h-3" />
            Featured
          </span>
        )}
      </div>
      <span className="font-mono text-[10px] text-slate-600 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    <h3 className="text-base font-semibold text-white leading-snug mb-2 line-clamp-2">{blog.title}</h3>

    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
      <span className="inline-flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {formatDate(blog.date)}
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {blog.readTime}
      </span>
    </div>

    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">{blog.excerpt}</p>

    <button
      type="button"
      onClick={onRead}
      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-xs font-mono uppercase tracking-wider touch-manipulation"
    >
      <span>Read Article</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </HudCard>
)

const BlogSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalSlug, setModalSlug] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const active = blogs[activeIndex]

  const openArticle = (slug: string) => {
    setModalSlug(slug)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setModalSlug(null), 300)
  }

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash
      if (!hash.startsWith('#blog-')) return
      const slug = hash.slice('#blog-'.length)
      const blog = blogs.find((b) => b.slug === slug)
      if (!blog) return

      const blogSection = document.getElementById('blog')
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      setModalSlug(slug)
      setIsModalOpen(true)
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const currentBlog = modalSlug ? blogs.find((b) => b.slug === modalSlug) ?? null : null

  return (
    <>
      <SectionShell
        id="blog"
        py="py-12 md:py-16"
        gridSpacing={80}
        gridOpacity={0.03}
        contentClassName="max-w-6xl mx-auto"
      >
        <SectionHeader
          eyebrow="Engineering Insights"
          title="Tech Lead Blog"
          description="Deep dives into production systems, RAG pipelines, troubleshooting methodologies, and engineering leadership."
          sysId="SYS.BLOG"
          typeTitle
          className="mb-8 md:mb-10"
        />

        <HudPanel
          moduleLabel="// Blog Module"
          sysId="SYS.ARTICLE_LOG v1.0"
          badge={`${blogs.length} articles`}
          footer={
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                Archive: 2019 → 2026
              </span>
              <span className="font-mono text-[10px] text-cyan-400/50">
                {blogs.length} articles indexed
              </span>
            </div>
          }
        >
          {/* Mobile: all articles as compact cards */}
          <div className="lg:hidden px-4 sm:px-5 py-5 space-y-4">
            {blogs.map((blog, index) => (
              <BlogCompactCard
                key={blog.id}
                blog={blog}
                index={index}
                onRead={() => openArticle(blog.slug)}
              />
            ))}
          </div>

          {/* Desktop: split panel */}
          <div className="hidden lg:grid lg:grid-cols-[minmax(260px,36%)_1fr] min-h-[500px]">
            <nav className="border-r border-slate-800/80 p-4 overflow-y-auto max-h-[600px]" aria-label="Article navigation">
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/60 mb-4 px-2 sticky top-0 bg-slate-900/90 py-1">
                // Article Log
              </p>
              <ul className="space-y-2">
                {blogs.map((blog, index) => {
                  const isActive = activeIndex === index
                  const isFeatured = FEATURED_SLUGS.has(blog.slug)
                  return (
                    <li key={blog.id}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`w-full text-left px-3 py-3 rounded-lg border transition-colors ${
                          isActive
                            ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-100'
                            : 'border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2 font-mono text-[10px] text-slate-500 mb-0.5">
                          {formatDate(blog.date)} · {blog.readTime}
                          {isFeatured && <Star className="w-3 h-3 text-amber-400/80" aria-label="Featured" />}
                        </span>
                        <span className="block font-semibold text-sm leading-snug">{getBlogLabel(blog)}</span>
                        <span className="block text-xs text-slate-500 mt-1 line-clamp-2">{blog.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="bg-slate-950/20">
              <BlogPreview
                blog={active}
                index={activeIndex}
                onReadMore={() => openArticle(active.slug)}
              />
            </div>
          </div>
        </HudPanel>
      </SectionShell>

      <BlogDetailModal blog={currentBlog} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default BlogSection
