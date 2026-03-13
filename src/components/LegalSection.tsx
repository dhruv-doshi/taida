import type { LegalAnalysis } from '@/types/taida'

const severityColor = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
}

const severityText = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-orange-500',
  critical: 'text-red-500',
}

export default function LegalSection({ legal }: { legal: LegalAnalysis }) {
  return (
    <div className="space-y-6">
      {/* Risk summary */}
      <div className="border-l-2 border-[var(--border)] pl-4">
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{legal.risk_summary}</p>
      </div>

      {/* Risk items */}
      {legal.risks.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {legal.risks.map((risk, i) => (
            <div key={i} className="border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 shrink-0 rounded-full ${severityColor[risk.severity]}`} />
                <span className="text-sm font-medium text-[var(--foreground)]">{risk.type}</span>
                <span className={`ml-auto text-xs font-mono uppercase ${severityText[risk.severity]}`}>{risk.severity}</span>
              </div>
              <p className="mb-2 text-xs text-[var(--muted-foreground)]">{risk.description}</p>
              <p className="text-xs"><span className="font-semibold text-[var(--foreground)]">Mitigation:</span>{' '}{risk.mitigation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Regulations */}
      {legal.regulations.length > 0 && (
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Applicable Regulations</p>
          <ol className="space-y-0 divide-y divide-[var(--border)]">
            {legal.regulations.map((reg, i) => (
              <li key={i} className="flex gap-4 py-4">
                <span className="shrink-0 font-mono text-xs text-[var(--muted-foreground)] mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-sm font-medium text-[var(--foreground)]">{reg.name}</span>
                    <span className="text-xs font-mono text-[var(--muted-foreground)] shrink-0">{reg.jurisdiction}</span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">{reg.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
