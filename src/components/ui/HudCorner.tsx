const HudCorner = ({ className }: { className: string }) => (
  <span
    className={`absolute w-3 h-3 border-cyan-400/50 pointer-events-none ${className}`}
    aria-hidden
  />
)

export default HudCorner
