import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import HudCorner from './HudCorner'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT } from '../../lib/motionPresets'

interface HudPanelProps {
  moduleLabel: string
  sysId?: string
  badge?: string
  footer?: ReactNode
  children: ReactNode
  className?: string
}

const HudPanel = ({
  moduleLabel,
  sysId,
  badge,
  footer,
  children,
  className = '',
}: HudPanelProps) => {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE_OUT }}
      className={`relative rounded-xl border border-cyan-500/25 bg-slate-900/60 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.08)] ${className}`}
    >
      <HudCorner className="top-0 left-0 border-t-2 border-l-2" />
      <HudCorner className="top-0 right-0 border-t-2 border-r-2" />
      <HudCorner className="bottom-0 left-0 border-b-2 border-l-2" />
      <HudCorner className="bottom-0 right-0 border-b-2 border-r-2" />

      <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3 border-b border-cyan-500/20 bg-slate-950/40">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-cyan-400/80 font-mono text-[10px] sm:text-xs tracking-widest uppercase shrink-0">
            {moduleLabel}
          </span>
          {sysId && (
            <>
              <span className="hidden sm:inline text-slate-600 font-mono text-xs">·</span>
              <span className="hidden sm:inline text-slate-500 font-mono text-xs truncate">{sysId}</span>
            </>
          )}
        </div>
        {badge && (
          <span className="font-mono text-[10px] sm:text-xs text-cyan-400/60 shrink-0">{badge}</span>
        )}
      </div>

      <div>{children}</div>

      {footer && (
        <div className="px-4 sm:px-5 py-2.5 border-t border-cyan-500/15 bg-slate-950/30">{footer}</div>
      )}
    </motion.div>
  )
}

export default HudPanel
