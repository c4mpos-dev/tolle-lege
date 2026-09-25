import type { ReactNode } from 'react'
import { daysBetween, type Season, type SeasonId } from '../calendar'
import { colorStyles } from '../seasonInfo'

const SIZE = 400
const C = SIZE / 2
const OUTER = 180
const INNER = 128

function polar(radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return { x: C + radius * Math.cos(radians), y: C + radius * Math.sin(radians) }
}

/** Fatia de anel entre dois ângulos (em graus, 0 = topo, sentido horário). */
function ringSlice(start: number, end: number) {
  const large = end - start > 180 ? 1 : 0
  const a = polar(OUTER, start)
  const b = polar(OUTER, end)
  const c = polar(INNER, end)
  const d = polar(INNER, start)
  return `M${a.x} ${a.y} A${OUTER} ${OUTER} 0 ${large} 1 ${b.x} ${b.y} L${c.x} ${c.y} A${INNER} ${INNER} 0 ${large} 0 ${d.x} ${d.y} Z`
}

type SeasonWheelProps = {
  seasons: Season[]
  today: Date
  selected: SeasonId
  onSelect: (id: SeasonId) => void
  children?: ReactNode
}

/** Roda do ano litúrgico: cada tempo ocupa uma fatia proporcional aos seus dias. */
export function SeasonWheel({ seasons, today, selected, onSelect, children }: SeasonWheelProps) {
  const yearStart = seasons[0].start
  const totalDays = daysBetween(yearStart, seasons[seasons.length - 1].end) + 1
  const angleOf = (date: Date) => (daysBetween(yearStart, date) / totalDays) * 360
  const todayAngle = angleOf(today) + 360 / totalDays / 2
  const marker = polar(OUTER + 12, todayAngle)
  const markerInner = polar(INNER - 6, todayAngle)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full overflow-visible" role="img" aria-label="Roda do ano litúrgico">
        {seasons.map((season) => {
          const start = angleOf(season.start)
          const end = angleOf(season.end) + 360 / totalDays
          const isSelected = season.id === selected
          return (
            <path
              key={season.id}
              d={ringSlice(start, end)}
              fill={colorStyles[season.color].fill}
              stroke="var(--color-canvas)"
              strokeWidth="3"
              onClick={() => onSelect(season.id)}
              onMouseEnter={() => onSelect(season.id)}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity: isSelected ? 1 : 0.55 }}
            >
              <title>{season.name}</title>
            </path>
          )
        })}

        {/* Marcador de hoje */}
        <line
          x1={markerInner.x}
          y1={markerInner.y}
          x2={marker.x}
          y2={marker.y}
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
        <circle cx={marker.x} cy={marker.y} r="7" fill="var(--color-ink)" />
        <circle cx={marker.x} cy={marker.y} r="12" fill="none" stroke="var(--color-ink)" strokeOpacity="0.3" className="motion-safe:animate-ping" style={{ transformOrigin: `${marker.x}px ${marker.y}px` }} />
      </svg>

      {/* Centro da roda */}
      <div className="absolute inset-[27%] flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}
