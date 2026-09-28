import type { InteriorStop } from '../data'

type InteriorPlanProps = {
  stops: InteriorStop[]
  selected: number | null
  onSelect: (index: number) => void
}

const PEW_ROWS = 7

/** Planta ilustrada do interior (vista de cima): capela-mor em arco no alto, porta embaixo. */
export function InteriorPlan({ stops, selected, onSelect }: InteriorPlanProps) {
  return (
    <div className="relative mx-auto aspect-[360/560] w-full max-w-sm">
      <svg viewBox="0 0 360 560" className="size-full" aria-hidden>
        <defs>
          <radialGradient id="plan-light" cx="0.5" cy="0.15" r="0.8">
            <stop offset="0" stopColor="var(--color-primary-soft)" />
            <stop offset="1" stopColor="var(--color-canvas)" />
          </radialGradient>
        </defs>

        {/* Paredes: nave + capela-mor em arco */}
        <path
          d="M40 540 V200 H70 V150 A110 110 0 0 1 290 150 V200 H320 V540 Z"
          fill="url(#plan-light)"
          stroke="var(--color-ink)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* Porta */}
        <rect x="150" y="534" width="60" height="12" fill="var(--color-canvas)" />
        <path d="M150 540 A30 30 0 0 1 180 512" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M210 540 A30 30 0 0 0 180 512" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Degraus do presbitério */}
        <path d="M70 200 H290" stroke="var(--color-primary)" strokeWidth="2" />
        <path d="M78 192 H282" stroke="var(--color-primary)" strokeWidth="1" opacity="0.5" />

        {/* Altar e crucifixo */}
        <rect x="150" y="122" width="60" height="26" rx="3" fill="var(--color-canvas)" stroke="var(--color-ink)" strokeWidth="2" />
        <path d="M180 48 V76 M170 58 H190" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        {/* Sacrário e lâmpada */}
        <rect x="252" y="88" width="20" height="18" rx="2" fill="var(--color-primary)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <circle cx="244" cy="80" r="3.5" fill="#d9483b" />
        {/* Ambão */}
        <path d="M98 160 h24 v14 h-24 z" fill="var(--color-canvas)" stroke="var(--color-ink)" strokeWidth="2" />
        {/* Círio */}
        <circle cx="128" cy="122" r="5" fill="var(--color-canvas)" stroke="var(--color-primary-strong)" strokeWidth="2" />

        {/* Bancos */}
        {Array.from({ length: PEW_ROWS }, (_, row) => (
          <g key={row} fill="var(--color-line)" stroke="var(--color-ink-muted)" strokeWidth="0.8">
            <rect x="72" y={250 + row * 30} width="92" height="12" rx="2" />
            <rect x="196" y={250 + row * 30} width="92" height="12" rx="2" />
          </g>
        ))}

        {/* Via-Sacra: pequenas cruzes nas paredes */}
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i} stroke="var(--color-ink-muted)" strokeWidth="1.5" strokeLinecap="round">
            <path d={`M46 ${236 + i * 42} h8 M50 ${232 + i * 42} v8`} />
            <path d={`M306 ${236 + i * 42} h8 M310 ${232 + i * 42} v8`} />
          </g>
        ))}

        {/* Imagem lateral, confessionário e pia batismal */}
        <path d="M58 212 a14 14 0 0 1 28 0 v10 h-28 z" fill="var(--color-marian-soft)" stroke="var(--color-marian)" strokeWidth="1.5" />
        <rect x="286" y="404" width="30" height="34" rx="3" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <circle cx="88" cy="478" r="15" fill="var(--color-marian-soft)" stroke="var(--color-marian)" strokeWidth="2" />
        <circle cx="250" cy="505" r="7" fill="var(--color-marian-soft)" stroke="var(--color-marian)" strokeWidth="1.5" />

        <text x="180" y="226" textAnchor="middle" fontSize="10" letterSpacing="3" fill="var(--color-primary-strong)">
          PRESBITÉRIO
        </text>
        <text x="180" y="530" textAnchor="middle" fontSize="10" letterSpacing="3" fill="var(--color-ink-muted)">
          ENTRADA
        </text>
      </svg>

      {/* Pontos clicáveis */}
      {stops.map((stop, index) => (
        <button
          key={stop.id}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`${index + 1}. ${stop.title}`}
          aria-pressed={selected === index}
          className="absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-canvas bg-primary-strong font-serif text-sm text-canvas shadow-md transition-transform hover:scale-110 aria-pressed:scale-125 aria-pressed:bg-ink"
          style={{ left: `${(stop.x / 360) * 100}%`, top: `${(stop.y / 560) * 100}%` }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}
