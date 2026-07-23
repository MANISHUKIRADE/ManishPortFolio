/** Zero-cost CSS starfield for section backgrounds */
const CssStarfield = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute inset-0 opacity-25 pointer-events-none ${className}`}
    style={{
      backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(226,232,240,0.35) 1px, transparent 0),
        radial-gradient(1px 1px at 60% 70%, color-mix(in srgb, var(--accent) 35%, transparent) 1px, transparent 0),
        radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.18) 1px, transparent 0),
        radial-gradient(1px 1px at 40% 80%, rgba(148,163,184,0.25) 1px, transparent 0)`,
      backgroundSize: '200px 200px, 280px 280px, 240px 240px, 320px 320px',
    }}
    aria-hidden="true"
  />
)

export default CssStarfield
