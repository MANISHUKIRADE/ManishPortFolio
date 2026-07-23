import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import HudCorner from './HudCorner'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

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
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: reducedMotion ? 0 : 0.15, ease: 'easeOut' }}
      className={`relative rounded-xl border border-border bg-surface/80 backdrop-blur-md ${className}`}
    >
      <HudCorner className="top-0 left-0 border-t-2 border-l-2" />
      <HudCorner className="top-0 right-0 border-t-2 border-r-2" />
      <HudCorner className="bottom-0 left-0 border-b-2 border-l-2" />
      <HudCorner className="bottom-0 right-0 border-b-2 border-r-2" />

      <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3 border-b border-border bg-bg/40">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-accent font-mono text-[10px] sm:text-xs tracking-widest uppercase shrink-0">
            {moduleLabel}
          </span>
          {sysId && (
            <>
              <span className="hidden sm:inline text-muted font-mono text-xs">·</span>
              <span className="hidden sm:inline text-muted font-mono text-xs truncate">{sysId}</span>
            </>
          )}
        </div>
        {badge && (
          <span className="font-mono text-[10px] sm:text-xs text-muted shrink-0">{badge}</span>
        )}
      </div>

      <div>{children}</div>

      {footer && (
        <div className="px-4 sm:px-5 py-2.5 border-t border-border bg-bg/30">{footer}</div>
      )}
    </motion.div>
  )
}

export default HudPanel
