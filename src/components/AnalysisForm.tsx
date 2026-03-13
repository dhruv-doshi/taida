'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTaidaAnalyze } from '@/hooks/useTaidaAnalyze'
import { ROUTES } from '@/constants/routes'

const schema = z.object({
  product: z.string().min(2, 'Product name required'),
  target_market: z.string().min(2, 'Target market required'),
  sector: z.string().min(2, 'Sector required'),
  competitors: z.array(z.object({ name: z.string().min(1) })).min(1, 'Add at least one competitor'),
})

type FormValues = z.infer<typeof schema>

export default function AnalysisForm() {
  const router = useRouter()
  const { mutateAsync, isPending } = useTaidaAnalyze()
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { competitors: [{ name: '' }] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'competitors' })

  const onSubmit = async (data: FormValues) => {
    setError(null)
    try {
      const result = await mutateAsync({
        ...data,
        competitors: data.competitors.map(c => c.name).filter(Boolean),
      })
      router.push(ROUTES.RESULT(result.id))
    } catch {
      setError('Analysis failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="border-l-2 border-[var(--destructive)] bg-[var(--destructive)]/5 px-4 py-3 text-sm text-[var(--destructive)]">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product" className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Product / Service</Label>
          <Input id="product" placeholder="e.g. SaaS CRM platform" {...register('product')} className="border-[var(--border)] bg-transparent focus-visible:ring-[var(--accent)]" />
          {errors.product && <p className="text-xs text-[var(--destructive)]">{errors.product.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="target_market" className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Target Market</Label>
          <Input id="target_market" placeholder="e.g. SMBs in North America" {...register('target_market')} className="border-[var(--border)] bg-transparent focus-visible:ring-[var(--accent)]" />
          {errors.target_market && <p className="text-xs text-[var(--destructive)]">{errors.target_market.message}</p>}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="sector" className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Sector / Industry</Label>
          <Input id="sector" placeholder="e.g. B2B SaaS, Healthcare, FinTech" {...register('sector')} className="border-[var(--border)] bg-transparent focus-visible:ring-[var(--accent)]" />
          {errors.sector && <p className="text-xs text-[var(--destructive)]">{errors.sector.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Competitors</Label>
        {fields.map((field, i) => (
          <div key={field.id} className="flex items-center gap-3">
            <span className="w-5 shrink-0 text-right text-xs font-mono text-[var(--muted-foreground)]">{i + 1}.</span>
            <Input
              placeholder={`Competitor name`}
              {...register(`competitors.${i}.name`)}
              className="border-[var(--border)] bg-transparent focus-visible:ring-[var(--accent)]"
            />
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(i)} className="shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ name: '' })}
          className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add Competitor
        </button>
        {errors.competitors && <p className="text-xs text-[var(--destructive)]">Add at least one competitor</p>}
      </div>

      <div>
        {isPending && (
          <div className="mb-3 h-0.5 w-full overflow-hidden bg-[var(--border)]">
            <div className="h-full bg-[var(--accent)] animate-pulse" style={{ width: '100%' }} />
          </div>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[var(--accent)] py-3.5 text-sm font-semibold text-[var(--accent-foreground)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Analyzing…' : 'Run Analysis'}
        </button>
      </div>
    </form>
  )
}
