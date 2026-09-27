/** Anéis de pétalas, do externo ao interno. `start` = em que ponto do progresso o anel começa a abrir. */
const RINGS = [
  { count: 7, length: 64, start: 0.5, color: '#d9667d', twist: 12 },
  { count: 6, length: 52, start: 0.32, color: '#c9465f', twist: 30 },
  { count: 5, length: 40, start: 0.14, color: '#b3334e', twist: 6 },
  { count: 4, length: 28, start: 0, color: '#9c2440', twist: 45 },
]

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1)

function petalPath(length: number) {
  const w = length * 0.55
  return `M0 0 C ${-w} ${-length * 0.25}, ${-w * 0.9} ${-length * 0.95}, 0 ${-length} C ${w * 0.9} ${-length * 0.95}, ${w} ${-length * 0.25}, 0 0 Z`
}

type BloomingRoseProps = {
  /** 0 = botão fechado, 1 = rosa aberta. */
  progress: number
  className?: string
}

/** Rosa em SVG que desabrocha conforme o progresso da oração. */
export function BloomingRose({ progress, className }: BloomingRoseProps) {
  const p = clamp01(progress)

  return (
    <svg viewBox="0 0 200 250" className={className} aria-hidden>
      {/* Caule e folhas */}
      <path d="M100 120 C 96 160, 106 200, 100 248" stroke="#5f7f63" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M101 185 C 125 170, 146 176, 150 160 C 130 158, 110 166, 101 185 Z" fill="#6f9173" />
      <path d="M99 208 C 76 196, 55 202, 50 188 C 70 185, 90 192, 99 208 Z" fill="#6f9173" />

      <g transform="translate(100 100)">
        {RINGS.map((ring, ringIndex) => {
          const isCore = ringIndex === RINGS.length - 1
          const open = easeOut(clamp01((p - ring.start) / 0.45))
          const scale = (isCore ? 0.7 : 0.18) + (isCore ? 0.3 : 0.82) * open
          const rotation = ring.twist * (1 - open)
          return (
            <g
              key={ringIndex}
              style={{
                transform: `rotate(${rotation}deg) scale(${scale})`,
                opacity: isCore ? 1 : Math.min(1, 0.2 + open * 1.4),
                transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms',
              }}
            >
              {Array.from({ length: ring.count }, (_, petal) => (
                <path
                  key={petal}
                  d={petalPath(ring.length)}
                  transform={`rotate(${(360 / ring.count) * petal + ringIndex * 17})`}
                  fill={ring.color}
                  stroke="#7a1a33"
                  strokeOpacity="0.35"
                  strokeWidth="1.2"
                />
              ))}
            </g>
          )
        })}
        {/* Sépalas verdes envolvendo o botão, que se abrem para trás conforme a rosa desabrocha */}
        {[-38, 0, 38].map((angle) => (
          <path
            key={angle}
            d="M0 6 C -7 -2, -6 -18, 0 -26 C 6 -18, 7 -2, 0 6 Z"
            fill="#6f9173"
            style={{
              transform: `rotate(${angle * (1 + p * 1.6)}deg) scale(${1 - p * 0.6})`,
              opacity: 1 - p,
              transition: 'transform 600ms, opacity 600ms',
            }}
          />
        ))}
        {/* Miolo em espiral */}
        <circle r="9" fill="#861c38" />
        <path d="M-4 0 a4 4 0 1 1 8 0 a6 6 0 1 1 -12 0" fill="none" stroke="#5e1026" strokeWidth="1.5" />
      </g>
    </svg>
  )
}
