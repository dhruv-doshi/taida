'use client'
import Link from 'next/link'
import { useTaidaHistory } from '@/hooks/useTaidaAnalyze'
import { ROUTES } from '@/constants/routes'
import { ArrowRight, Plus } from 'lucide-react'

export default function HistoryPage() {
  const { data: analyses, isLoading } = useTaidaHistory()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl">Analysis History</h1>
        <Link
          href={ROUTES.ANALYZE}
          className="flex items-center gap-2 bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          New Analysis
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-16 animate-pulse bg-[var(--muted)]" />)}
        </div>
      ) : !analyses?.length ? (
        <div className="py-24 text-center">
          <p className="font-serif text-xl text-[var(--foreground)] mb-2">TAIDA sees what others miss.</p>
          <p className="text-sm text-[var(--muted-foreground)] mb-8">You haven&apos;t run any analyses yet.</p>
          <Link
            href={ROUTES.ANALYZE}
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline text-sm"
          >
            Run your first analysis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[var(--border)]">
          {analyses.map(a => (
            <Link key={a.id} href={ROUTES.RESULT(a.id)}>
              <div className="group flex items-center justify-between py-5 border-l-2 border-transparent pl-4 hover:border-[var(--accent)] transition-all">
                <div>
                  <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{a.request.product}</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{a.request.sector} · {a.request.target_market}</p>
                </div>
                <div className="flex items-center gap-4 text-right shrink-0">
                  {a.result?.legal_analysis?.risk_score !== undefined && (
                    <span className={`font-mono text-sm font-semibold ${
                      a.result.legal_analysis.risk_score < 33 ? 'text-green-500' :
                      a.result.legal_analysis.risk_score < 66 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {a.result.legal_analysis.risk_score}
                    </span>
                  )}
                  <div>
                    <span className={`text-xs font-mono uppercase ${
                      a.status === 'completed' ? 'text-green-500' :
                      a.status === 'failed' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>{a.status}</span>
                    <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{new Date(a.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
