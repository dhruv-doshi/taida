# TAIDA

> AI-powered competitive intelligence. Deep analysis of competitors, legal signals, and market positioning — all in one place.

🌐 **Live**: [taida-ai.vercel.app](https://taida-ai.vercel.app)
👤 **Author**: [Dhruv Doshi](https://dhruvdoshi.vercel.app)

---

## What it does

TAIDA pulls together the signals a founder or strategist needs to understand a market:

- **Competitor profiles** — funding, product, positioning, recent moves
- **Legal signals** — patents, lawsuits, regulatory filings
- **Market positioning** — how players cluster on capability and price
- **AI-generated briefs** — ask a question, get a sourced answer with linked evidence

Think Crunchbase × Pitchbook × a research analyst, packaged for a single founder doing diligence at 11pm.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| UI | Tailwind CSS · shadcn/ui · Radix primitives |
| State / Data | TanStack Query · Axios |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Testing Library |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Required env vars

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | URL of the intelligence backend |
| `NEXTAUTH_SECRET` | Session signing |
| `NEXTAUTH_URL` | Public origin |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Vitest unit tests |

## Project structure

```
src/
├── app/             # App Router pages (search, profile, brief)
├── components/      # Competitor cards, signal feeds, brief viewer
├── lib/             # API client, search helpers
├── hooks/           # Data-fetching hooks
└── types/           # Shared TypeScript types
```

## Deploy

Deployed on Vercel — connect the repo and add env vars above.

## License

MIT
