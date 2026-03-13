'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTaidaAnalysis } from '@/hooks/useTaidaAnalyze'
import CompetitorCard from '@/components/CompetitorCard'
import LegalSection from '@/components/LegalSection'
import RiskGauge from '@/components/RiskGauge'
import { ROUTES } from '@/constants/routes'

export default function ResultPage() {
  const { id } = useParams<{ id: string }>()
  const { data: analysis, isLoading, isError } = useTaidaAnalysis(id)

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </div>
  )
  if (isError || !analysis) return (
    <div className="flex min-h-screen items-center justify-center text-[var(--muted-foreground)]">Analysis not found.</div>
  )

  const result = analysis.result

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="font-serif text-4xl leading-tight">{analysis.request.product}</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">{analysis.request.sector} · {analysis.request.target_market}</p>
          <Link
            href={ROUTES.ANALYZE}
            className="mt-4 inline-block bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90 transition-opacity"
          >
            New Analysis
          </Link>
        </div>
        {result && (
          <div className="flex flex-col items-center shrink-0">
            <RiskGauge score={result.legal_analysis.risk_score} />
          </div>
        )}
      </div>

      {!result ? (
        <div className="border border-[var(--border)] p-8 text-center text-[var(--muted-foreground)]">
          {analysis.status === 'processing' ? 'Analysis in progress…' : 'Analysis failed.'}
        </div>
      ) : (
        <>
          {/* Competitor Analysis */}
          <section>
            <h2 className="mb-6 border-l-2 border-[var(--accent)] pl-4 font-serif text-2xl">Competitor Analysis</h2>
            <p className="mb-6 text-sm text-[var(--muted-foreground)]">{result.competitor_analysis.market_positioning}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {result.competitor_analysis.competitors.map((c) => (
                <CompetitorCard key={c.name} competitor={c} />
              ))}
            </div>
            {result.competitor_analysis.opportunities.length > 0 && (
              <div className="mt-6 bg-[var(--accent)]/10 border-l-2 border-[var(--accent)] p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Opportunities</p>
                <ul className="space-y-2">
                  {result.competitor_analysis.opportunities.map((o, i) => (
                    <li key={i} className="text-sm text-[var(--foreground)]">→ {o}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Legal & Regulatory */}
          <section>
            <h2 className="mb-6 border-l-2 border-[var(--accent)] pl-4 font-serif text-2xl">Legal & Regulatory</h2>
            <LegalSection legal={result.legal_analysis} />
          </section>
        </>
      )}
    </div>
  )
}
