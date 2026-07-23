/** Faint technical grid — used behind hero and architecture diagram only */
const TechGrid = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute inset-0 pointer-events-none opacity-[0.07] ${className}`}
    aria-hidden="true"
    style={{
      backgroundImage: `
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px',
    }}
  />
)

export default TechGrid
