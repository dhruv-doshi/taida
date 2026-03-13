'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

const CHALLENGES = [
  "Is your pricing actually defensible, or just a number you landed on?",
  "Could a well-funded competitor replicate your moat in 18 months?",
  "What regulatory change would make your business model illegal?",
  "Are your 'loyal' customers just one better offer away from leaving?",
  "Which assumption in your pitch deck has never been tested?",
  "What does your biggest competitor know that you don't?",
  "Is your market growing, or are you competing over a shrinking pie?",
]

export default function HomePage() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % CHALLENGES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero — full viewport */}
      <section className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)]">
          AI Competitive Intelligence
        </p>

        <h1 className="font-serif text-5xl leading-[1.05] text-[var(--foreground)] sm:text-6xl lg:text-7xl xl:text-8xl">
          Your fiercest<br />
          <span className="italic text-[var(--accent)]">competitor.</span><br />
          On your side.
        </h1>

        <div className="mt-10 h-14 flex items-center justify-center px-4">
          <p
            className="max-w-xl text-base text-[var(--muted-foreground)] sm:text-lg transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            &ldquo;{CHALLENGES[index]}&rdquo;
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={ROUTES.REGISTER}
            className="w-full sm:w-auto bg-[var(--accent)] px-10 py-3.5 font-medium text-[var(--accent-foreground)] hover:opacity-90 transition-opacity"
          >
            Start Free Analysis
          </Link>
          <Link
            href={ROUTES.LOGIN}
            className="w-full sm:w-auto border border-[var(--border)] px-10 py-3.5 font-medium text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Feature tiles — typography only, no card borders */}
      <section className="border-t border-[var(--border)] px-6 py-24">
        <div className="mx-auto max-w-5xl grid gap-16 sm:grid-cols-3">
          {[
            {
              stat: '2s',
              title: 'Competitor Analysis',
              desc: 'Deep-dive into strengths, weaknesses, and market positioning of every threat in your space.',
            },
            {
              stat: '↗',
              title: 'Legal & Regulatory',
              desc: 'Applicable regulations, risk factors, and actionable mitigation — before your lawyers charge you for it.',
            },
            {
              stat: '∞',
              title: 'Devil\'s Advocate',
              desc: 'Every assumption challenged. Every blind spot illuminated. The analysis you need, not the one you want to hear.',
            },
          ].map(({ stat, title, desc }) => (
            <div key={title}>
              <p className="font-serif text-5xl text-[var(--accent)] mb-4">{stat}</p>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-[var(--border)] px-6 py-5 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
          Built on AI &nbsp;·&nbsp; Fast &nbsp;·&nbsp; Unbiased
        </p>
      </div>
    </div>
  )
}
