'use client'
const RADIUS = 72
const CIRCUMFERENCE = Math.PI * RADIUS

export default function RiskGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score))
  const offset = CIRCUMFERENCE * (1 - clamped / 100)
  const color = clamped < 33 ? '#22c55e' : clamped < 66 ? '#f59e0b' : '#ef4444'
  const label = clamped < 33 ? 'LOW' : clamped < 66 ? 'MED' : 'HIGH'

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="200" height="112" viewBox="0 0 200 112">
        {/* Track */}
        <path
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
          stroke="var(--border)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Green band 0–33 */}
        <path
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.25"
          strokeDasharray={`${CIRCUMFERENCE * 0.33} ${CIRCUMFERENCE * 0.67}`}
        />
        {/* Yellow band 33–66 */}
        <path
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.25"
          strokeDasharray={`${CIRCUMFERENCE * 0.33} ${CIRCUMFERENCE * 0.67}`}
          strokeDashoffset={-CIRCUMFERENCE * 0.33}
        />
        {/* Red band 66–100 */}
        <path
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.25"
          strokeDasharray={`${CIRCUMFERENCE * 0.34} ${CIRCUMFERENCE * 0.66}`}
          strokeDashoffset={-CIRCUMFERENCE * 0.66}
        />
        {/* Active fill */}
        <path
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        {/* Score number */}
        <text x="100" y="92" textAnchor="middle" fontSize="32" fontWeight="700" fill="currentColor" fontFamily="var(--font-serif)">
          {clamped}
        </text>
      </svg>
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color }}>{label} RISK</p>
    </div>
  )
}
