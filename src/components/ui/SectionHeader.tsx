import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
  typeTitle?: boolean
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  className = '',
  typeTitle = false,
}: SectionHeaderProps) => {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.7 }}
      className={`text-center mb-14 md:mb-16 ${className}`}
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight min-h-[2.5rem] md:min-h-[3rem]">
        {typeTitle && !reducedMotion ? (
          <TypewriterText text={title} speed={35} showCursor={false} as="span" />
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">{description}</p>
      )}
      <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
    </motion.div>
  )
}

export default SectionHeader
