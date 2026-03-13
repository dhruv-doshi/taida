# TAIDA Frontend — Vercel Deployment Checklist

## Branch Strategy

| Branch | Vercel Env  | Purpose                                  |
|--------|-------------|------------------------------------------|
| `prod` | Production  | Live site — set as Production Branch     |
| `main` | Preview     | Staging / QA                             |
| `dev`  | Preview     | Active development                       |

---

## Environment Variables

Set these in Vercel → Project → Settings → Environment Variables:

| Variable                  | Env          | Value                                  |
|---------------------------|--------------|----------------------------------------|
| `NEXTAUTH_URL`            | All          | `https://your-domain.vercel.app`       |
| `NEXTAUTH_SECRET`         | All          | Generate with `openssl rand -base64 32`|
| `NEXT_PUBLIC_API_URL`     | All          | Backend API base URL                   |

> For `prod`, set `NEXTAUTH_URL` to your custom domain (e.g. `https://taida.io`).

---

## Vercel Setup Steps

1. **Import repo** — Vercel Dashboard → Add New → Project → Import from Git
2. **Framework preset** — Vercel auto-detects Next.js; `vercel.json` confirms settings
3. **Set Production Branch** — Project Settings → Git → Production Branch → `prod`
4. **Add env vars** — per the table above; scope each to the correct branches
5. **Deploy** — push to `prod` to trigger first production build

---

## CORS Wiring (Backend)

The FastAPI backend must allow the Vercel domains:

```python
origins = [
    "https://taida.io",                      # prod custom domain
    "https://taida-frontend.vercel.app",     # Vercel default
    "https://*.vercel.app",                  # preview deployments
    "http://localhost:3000",                 # local dev
]
```

---

## Post-Deploy Verification

- [ ] Landing page loads with rotating challenger questions
- [ ] `/login` and `/register` forms submit without CORS errors
- [ ] Protected routes redirect to `/login` when unauthenticated
- [ ] `POST /taida/analyze` returns a result ID
- [ ] Result page renders RiskGauge and CompetitorCards
- [ ] Theme toggle persists across page navigations

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `NEXTAUTH_URL` mismatch error | Env var not set for branch | Add `NEXTAUTH_URL` scoped to production |
| 401 on API calls | `NEXT_PUBLIC_API_URL` wrong or missing | Verify env var, redeploy |
| CORS error on auth | Backend origins list missing Vercel URL | Update FastAPI CORS origins |
| Build fails — missing env | Vercel build env not set | Add vars in Settings → Environment Variables |
| Hydration mismatch | Server/client rendering divergence | Check `'use client'` directives on interactive components |
