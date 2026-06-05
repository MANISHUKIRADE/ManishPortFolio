import { forwardRef, ReactNode } from 'react'
import CssStarfield from './CssStarfield'
import HolographicGrid from '../animations/HolographicGrid'

interface SectionShellProps {
  id: string
  children: ReactNode
  className?: string
  contentClassName?: string
  py?: string
  gridSpacing?: number
  gridOpacity?: number
}

const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  (
    {
      id,
      children,
      className = '',
      contentClassName = '',
      py = 'py-12 md:py-16',
      gridSpacing = 48,
      gridOpacity = 0.04,
    },
    ref
  ) => (
    <section id={id} ref={ref} className={`relative ${py} px-4 overflow-x-clip ${className}`}>
      <div className="absolute inset-0 bg-nexus-950" />
      <CssStarfield />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent pointer-events-none" />
      <HolographicGrid spacing={gridSpacing} color="#22d3ee" opacity={gridOpacity} />
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </section>
  )
)

SectionShell.displayName = 'SectionShell'

export default SectionShell
