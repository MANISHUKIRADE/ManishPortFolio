/** Zero-cost CSS starfield for section backgrounds */
const CssStarfield = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute inset-0 opacity-25 pointer-events-none ${className}`}
    style={{
      backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(224,242,254,0.45) 1px, transparent 0),
        radial-gradient(1px 1px at 60% 70%, rgba(34,211,238,0.35) 1px, transparent 0),
        radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.2) 1px, transparent 0),
        radial-gradient(1px 1px at 40% 80%, rgba(45,212,191,0.3) 1px, transparent 0)`,
      backgroundSize: '200px 200px, 280px 280px, 240px 240px, 320px 320px',
    }}
  />
)

export default CssStarfield
