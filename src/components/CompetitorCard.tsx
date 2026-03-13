import type { CompetitorInfo } from '@/types/taida'

const threatBorder = {
  low: 'border-l-green-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-red-500',
}

const threatLabel = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
}

export default function CompetitorCard({ competitor }: { competitor: CompetitorInfo }) {
  return (
    <div className={`border border-[var(--border)] border-l-4 ${threatBorder[competitor.threat_level]} bg-[var(--card)] p-5`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-[var(--foreground)]">{competitor.name}</h3>
        <span className={`text-xs font-mono uppercase ${threatLabel[competitor.threat_level]}`}>
          {competitor.threat_level}
        </span>
      </div>
      <p className="mb-4 text-xs text-[var(--muted-foreground)]">{competitor.market_position}</p>
      <div className="space-y-3">
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-green-600">Strengths</p>
          <ul className="space-y-1">
            {competitor.strengths.map((s, i) => <li key={i} className="text-xs text-[var(--foreground)]">· {s}</li>)}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-red-500">Weaknesses</p>
          <ul className="space-y-1">
            {competitor.weaknesses.map((w, i) => <li key={i} className="text-xs text-[var(--foreground)]">· {w}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
