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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
      className={`text-center mb-10 md:mb-12 ${className}`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-cyan-500/25 bg-slate-900/50 backdrop-blur-sm mb-5">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={
            reducedMotion
              ? undefined
              : { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <span className="font-mono text-[10px] sm:text-xs text-cyan-400/90 uppercase tracking-[0.2em]">
          // {eyebrow}
        </span>
        {sysId && (
          <span className="hidden sm:inline font-mono text-[10px] text-slate-600">· {sysId}</span>
        )}
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight min-h-[2.5rem] md:min-h-[3rem]">
        {typeTitle && !reducedMotion ? (
          <TypewriterText text={title} speed={35} showCursor={false} as="span" />
        ) : (
          title
        )}
      </h2>

      {description && (
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          {description}
        </p>
      )}

      <div className="mt-6 mx-auto flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
        <span className="font-mono text-[10px] text-cyan-500/40 uppercase tracking-widest">sector</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
      </div>
    </motion.div>
  )
}

export default SectionHeader
