import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={ROUTES.HOME} className="font-serif text-xl tracking-tight">TAIDA</Link>
          <div className="flex items-center gap-6">
            <Link href={ROUTES.LOGIN} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Sign In</Link>
            <Link href={ROUTES.REGISTER} className="bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90 transition-opacity">Get Started</Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
