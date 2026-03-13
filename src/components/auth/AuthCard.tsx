interface AuthCardProps { title: string; subtitle?: string; children: React.ReactNode }
export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="font-serif text-2xl tracking-tight text-[var(--accent)] mb-6">TAIDA</p>
        <h1 className="font-serif text-3xl text-[var(--foreground)]">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-[var(--muted-foreground)]">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
