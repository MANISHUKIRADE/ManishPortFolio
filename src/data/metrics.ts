export type Metric = {
  id: string
  value: string
  label: string
}

/** Replace `—` placeholders with real numbers when available */
export const metrics: Metric[] = [
  { id: 'nl2api', value: '—', label: 'NL2API misclassification ↓' },
  { id: 'tenants', value: '10+', label: 'Enterprise tenants' },
  { id: 'yoe', value: '6.7y', label: 'Production ML' },
  { id: 'soc2', value: 'SOC 2', label: 'Type II shipped' },
]
