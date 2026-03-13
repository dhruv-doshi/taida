import AnalysisForm from '@/components/AnalysisForm'
export const metadata = { title: 'New Analysis — TAIDA' }
export default function AnalyzePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl mb-2">New Analysis</h1>
      <p className="mb-10 text-[var(--muted-foreground)]">Challenge every assumption about your market.</p>
      <AnalysisForm />
    </div>
  )
}
