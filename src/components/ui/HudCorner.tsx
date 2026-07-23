const HudCorner = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute w-3 h-3 border-accent/40 pointer-events-none ${className}`}
    aria-hidden="true"
  />
)

export default HudCorner
