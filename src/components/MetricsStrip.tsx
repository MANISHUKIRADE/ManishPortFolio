import Reveal from './ui/Reveal'
import { metrics } from '../data/metrics'

const MetricsStrip = () => (
  <Reveal className="mb-10">
    <div className="rounded-lg border border-border bg-bg/60 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          $ metrics --prod --json
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-border">
        {metrics.map((m) => (
          <div key={m.id} className="px-4 py-5 text-center">
            <div className="font-mono text-2xl md:text-3xl font-semibold text-accent tracking-tight">
              {m.value}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
)

export default MetricsStrip
