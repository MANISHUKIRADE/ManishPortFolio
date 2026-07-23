import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
  typeTitle?: boolean
  sysId?: string
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  className = '',
  typeTitle = false,
  sysId,
}: SectionHeaderProps) => {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.15, ease: 'easeOut' }}
      className={`text-center mb-10 md:mb-12 ${className}`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-border bg-surface/80 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span className="font-mono text-[10px] sm:text-xs text-accent uppercase tracking-[0.2em]">
          // {eyebrow}
        </span>
        {sysId && (
          <span className="hidden sm:inline font-mono text-[10px] text-muted">· {sysId}</span>
        )}
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-text tracking-tight min-h-[2.5rem] md:min-h-[3rem]">
        {typeTitle && !reducedMotion ? (
          <TypewriterText text={title} speed={35} showCursor={false} as="span" />
        ) : (
          title
        )}
      </h2>

      {description && (
        <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-light">
          {description}
        </p>
      )}

      <div className="mt-6 mx-auto flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent/50" />
        <span className="font-mono text-[10px] text-muted uppercase tracking-widest">sector</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50" />
      </div>
    </motion.div>
  )
}

export default SectionHeader
