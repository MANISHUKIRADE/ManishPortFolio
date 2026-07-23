import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const LOGS = [
  { level: 'ok', msg: 'rag.pipeline · retrieval latency p95 142ms' },
  { level: 'ok', msg: 'llm.router · byo-tenant route healthy' },
  { level: 'info', msg: 'nl2api · intent classifier warm' },
  { level: 'ok', msg: 'vector.store · chroma index synced' },
  { level: 'info', msg: 'auth.sso · azure ad federation up' },
  { level: 'ok', msg: 'compliance · soc2 type II controls green' },
  { level: 'info', msg: 'agents · orchestrator heartbeat ok' },
  { level: 'ok', msg: 'egress · audit log stream active' },
]

/** Live-updating system status strip — terminal-style, non-decorative */
const SystemStatusTicker = () => {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % LOGS.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  const current = LOGS[index] ?? LOGS[0]

  return (
    <div
      className="border-y border-border bg-surface/40 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="System status"
    >
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3 font-mono text-[11px] sm:text-xs overflow-hidden">
        <span className="shrink-0 text-accent tracking-widest uppercase">sys</span>
        <span
          className={`shrink-0 ${
            current.level === 'ok' ? 'text-emerald-400' : 'text-muted'
          }`}
        >
          [{current.level}]
        </span>
        <span className="truncate text-muted">{current.msg}</span>
        <span className="ml-auto hidden sm:inline text-muted/70 shrink-0">
          {String(index + 1).padStart(2, '0')}/{String(LOGS.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export default SystemStatusTicker
