import { ReactNode } from 'react'
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
    className={`relative rounded-xl border bg-slate-900/60 backdrop-blur-md transition-colors ${
      selected
        ? 'border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
        : 'border-cyan-500/20 hover:border-cyan-400/35'
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
