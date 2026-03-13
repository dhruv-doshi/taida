'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { History, LogOut, Moon, Plus, Sun } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { ROUTES } from '@/constants/routes'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { data: session } = useSession()
  const pathname = usePathname()

  const navLinks = [
    { href: ROUTES.HISTORY, label: 'History', icon: History },
    { href: ROUTES.ANALYZE, label: 'New Analysis', icon: Plus },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href={ROUTES.HISTORY} className="font-serif text-xl tracking-tight">
          TAIDA
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex items-center justify-center h-8 w-8 rounded-md transition-colors ${
                pathname === href
                  ? 'bg-[var(--secondary)] text-[var(--foreground)]'
                  : 'text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]'
              }`}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {session?.user?.name && (
            <span className="hidden text-xs font-mono text-[var(--muted-foreground)] sm:block">
              {session.user.name.split(' ')[0]}
            </span>
          )}

          <button
            onClick={() => signOut({ callbackUrl: ROUTES.LOGIN })}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex border-t border-[var(--border)] sm:hidden">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-xs transition-colors ${
              pathname === href
                ? 'bg-[var(--secondary)] font-medium text-[var(--foreground)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
