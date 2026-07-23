import { useId, useState } from 'react'
import TechGrid from './ui/TechGrid'
import { kyaraArchitecture, type ArchNode } from '../data/architecture-kyara'

const NodeCard = ({
  node,
  index,
  activeId,
  onFocus,
  describedBy,
}: {
  node: ArchNode
  index: number
  activeId: string | null
  onFocus: (id: string | null) => void
  describedBy: string
}) => {
  const active = activeId === node.id

  return (
    <button
      type="button"
      className={`relative w-full text-left rounded-md border px-3 py-3 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active
          ? 'border-accent bg-accent-muted/30'
          : 'border-border bg-surface/80 hover:border-accent/60'
      }`}
      aria-describedby={active ? describedBy : undefined}
      onMouseEnter={() => onFocus(node.id)}
      onMouseLeave={() => onFocus(null)}
      onFocus={() => onFocus(node.id)}
      onBlur={() => onFocus(null)}
    >
      <span className="font-mono text-[10px] text-muted tracking-widest">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="font-mono text-sm text-text mt-1">{node.label}</div>
      <div className="text-xs text-muted mt-0.5">{node.subtitle}</div>
    </button>
  )
}

const ArchitectureDiagram = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const tipId = useId()
  const active = kyaraArchitecture.find((n) => n.id === activeId)

  return (
    <div className="relative mt-6 rounded-lg border border-border bg-bg/80 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-3 py-2 relative z-[2]">
        <span className="h-2 w-2 rounded-full bg-accent/80" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          pipeline · kyara-rag.sh
        </span>
      </div>
      <TechGrid className="opacity-[0.12]" />
      <div className="relative z-[1] p-4 sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
          $ ./describe --graph ingestion..response
        </p>

        {/* Desktop horizontal */}
        <div className="hidden md:flex items-stretch gap-2">
          {kyaraArchitecture.map((node, i) => (
            <div key={node.id} className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <NodeCard
                  node={node}
                  index={i}
                  activeId={activeId}
                  onFocus={setActiveId}
                  describedBy={tipId}
                />
              </div>
              {i < kyaraArchitecture.length - 1 && (
                <span className="font-mono text-accent shrink-0" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="flex md:hidden flex-col gap-1">
          {kyaraArchitecture.map((node, i) => (
            <div key={node.id}>
              <NodeCard
                node={node}
                index={i}
                activeId={activeId}
                onFocus={setActiveId}
                describedBy={tipId}
              />
              {i < kyaraArchitecture.length - 1 && (
                <div className="text-center font-mono text-accent py-1" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          id={tipId}
          role="tooltip"
          className={`mt-4 rounded-md border border-border bg-surface px-3 py-2.5 font-mono text-xs text-muted min-h-[3rem] transition-opacity duration-150 ${
            active ? 'opacity-100' : 'opacity-60'
          }`}
        >
          {active ? (
            <>
              <span className="text-accent">{active.label}:</span> {active.tech}
            </>
          ) : (
            <span>Hover or focus a node for tech choices</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
