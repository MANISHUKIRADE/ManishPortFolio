import type { ReactNode } from 'react'
import HudCorner from './HudCorner'

interface HudCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
}

const HudCard = ({ children, className = '', onClick, selected = false }: HudCardProps) => (
  <div
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={
      onClick
        ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClick()
            }
          }
        : undefined
    }
    className={`relative rounded-xl border bg-surface/80 backdrop-blur-md transition-colors duration-150 ${
      selected
        ? 'border-accent/60'
        : 'border-border hover:border-accent/40'
    } ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    <HudCorner className="top-0 left-0 border-t border-l" />
    <HudCorner className="top-0 right-0 border-t border-r" />
    <HudCorner className="bottom-0 left-0 border-b border-l" />
    <HudCorner className="bottom-0 right-0 border-b border-r" />
    {children}
  </div>
)

export default HudCard
