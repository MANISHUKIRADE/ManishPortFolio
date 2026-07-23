import { forwardRef, type ReactNode } from 'react'
import CssStarfield from './CssStarfield'

interface SectionShellProps {
  id: string
  children: ReactNode
  className?: string
  contentClassName?: string
  py?: string
}

const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  (
    {
      id,
      children,
      className = '',
      contentClassName = '',
      py = 'py-12 md:py-16',
    },
    ref
  ) => (
    <section id={id} ref={ref} className={`relative ${py} px-4 overflow-x-clip ${className}`}>
      <div className="absolute inset-0 bg-bg" />
      <CssStarfield className="opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_6%,transparent),transparent_55%)] pointer-events-none" />
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </section>
  )
)

SectionShell.displayName = 'SectionShell'

export default SectionShell
