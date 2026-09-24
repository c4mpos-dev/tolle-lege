import { useId, useMemo } from 'react'

const WIDTH = 200
const HEIGHT = 300
const COLS = 6
const ROWS = 9

/** Janela em arco romano (mesmo formato das janelas da fachada). */
const ARCH = `M6 ${HEIGHT - 6} V100 A94 94 0 0 1 194 100 V${HEIGHT - 6} Z`

const GLASS_COLORS = [
  'var(--color-marian)',
  'var(--color-marian)',
  'var(--color-primary)',
  'var(--color-primary)',
  'var(--color-terracotta)',
  'var(--color-sage)',
  'var(--color-marian-soft)',
  'var(--color-primary-soft)',
  'var(--color-terracotta-soft)',
]

/** PRNG determinístico: o mesmo `seed` gera sempre o mesmo vitral. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Pane = { points: string; color: string; delay: number }

function buildPanes(seed: number): Pane[] {
  const random = mulberry32(seed)
  const cellW = WIDTH / COLS
  const cellH = HEIGHT / ROWS

  // Grade de vértices com leve deslocamento nos pontos internos, para um vitral orgânico.
  const vertices = Array.from({ length: ROWS + 1 }, (_, row) =>
    Array.from({ length: COLS + 1 }, (_, col) => {
      const inner = row > 0 && row < ROWS && col > 0 && col < COLS
      const jitter = (size: number) => (inner ? (random() - 0.5) * size * 0.5 : 0)
      return [col * cellW + jitter(cellW), row * cellH + jitter(cellH)] as const
    }),
  )

  const panes: Pane[] = []
  const pick = () => GLASS_COLORS[Math.floor(random() * GLASS_COLORS.length)]

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const a = vertices[row][col]
      const b = vertices[row][col + 1]
      const c = vertices[row + 1][col + 1]
      const d = vertices[row + 1][col]
      const triangles = (row + col) % 2 === 0 ? [[a, b, c], [a, c, d]] : [[a, b, d], [b, c, d]]

      for (const triangle of triangles) {
        panes.push({
          points: triangle.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '),
          color: pick(),
          delay: random() * 7,
        })
      }
    }
  }

  return panes
}

type StainedGlassWindowProps = {
  seed?: number
  className?: string
}

/**
 * Vitral decorativo em SVG. Cada vidro pulsa levemente, como luz atravessando a janela.
 * A animação respeita `prefers-reduced-motion`.
 */
export function StainedGlassWindow({ seed = 7, className = '' }: StainedGlassWindowProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const panes = useMemo(() => buildPanes(seed), [seed])

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className={className} aria-hidden>
      <defs>
        <clipPath id={`${id}-arch`}>
          <path d={ARCH} />
        </clipPath>
        <radialGradient id={`${id}-light`} cx="0.5" cy="0.2" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${id}-arch)`}>
        <rect width={WIDTH} height={HEIGHT} fill="var(--color-canvas)" />
        {panes.map((pane, index) => (
          <polygon
            key={index}
            points={pane.points}
            fill={pane.color}
            stroke="var(--color-ink)"
            strokeOpacity={0.55}
            strokeWidth={1.4}
            strokeLinejoin="round"
            className="motion-safe:animate-glass"
            style={{ animationDelay: `-${pane.delay.toFixed(2)}s` }}
          />
        ))}
        <rect width={WIDTH} height={HEIGHT} fill={`url(#${id}-light)`} />
      </g>

      {/* Rosácea no topo do arco */}
      <g transform="translate(100 96)">
        <circle r="30" fill="var(--color-canvas)" stroke="var(--color-ink)" strokeWidth="3" />
        <path
          d="M-11 -11a11 11 0 0 1 22 0a11 11 0 0 1 0 22a11 11 0 0 1 -22 0a11 11 0 0 1 0 -22Z"
          fill="var(--color-primary)"
          stroke="var(--color-ink)"
          strokeWidth="2"
          className="motion-safe:animate-glass"
        />
        <circle r="4" fill="var(--color-marian)" />
      </g>

      <path d={ARCH} fill="none" stroke="var(--color-ink)" strokeWidth="5" />
    </svg>
  )
}
