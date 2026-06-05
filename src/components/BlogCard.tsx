import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogPost } from '../data/blogs'
import HudCard from './ui/HudCard'

interface BlogCardProps {
  blog: BlogPost
  index: number
  onReadMore: (slug: string) => void
}

const BlogCard = ({ blog, index, onReadMore }: BlogCardProps) => {
  return (
    <HudCard className="overflow-hidden cursor-pointer group" onClick={() => onReadMore(blog.slug)}>
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />
        <span className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/25">
          {blog.category}
        </span>
        <span className="absolute top-3 right-3 font-mono text-[10px] text-slate-500">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 mb-2">
          // Article
        </p>
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-cyan-100 transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-slate-400 mb-3 line-clamp-3 leading-relaxed">{blog.excerpt}</p>

        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {new Date(blog.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300/80 rounded text-[10px] border border-cyan-500/20 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider pt-3 border-t border-slate-800/80">
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </HudCard>
  )
}

export default BlogCard
