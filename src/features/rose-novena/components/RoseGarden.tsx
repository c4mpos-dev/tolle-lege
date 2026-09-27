import { NOVENA_DAYS } from '../novena'
import { BloomingRose } from './BloomingRose'

type RoseGardenProps = {
  /** Dias já rezados. */
  prayed: number[]
  /** Dia de hoje na novena, se estiver no período. */
  today: number | null
}

/** Nove rosas, uma por dia da novena: floridas nos dias rezados, em botão nos demais. */
export function RoseGarden({ prayed, today }: RoseGardenProps) {
  return (
    <ol className="grid grid-cols-3 gap-4 sm:grid-cols-9">
      {Array.from({ length: NOVENA_DAYS }, (_, index) => {
        const day = index + 1
        const done = prayed.includes(day)
        const isToday = day === today
        return (
          <li
            key={day}
            className={`flex flex-col items-center rounded-2xl p-2 ${isToday ? 'bg-canvas ring-2 ring-rose/50' : ''}`}
          >
            <BloomingRose
              progress={done ? 1 : 0}
              className={`w-full max-w-20 transition-opacity ${done ? '' : 'opacity-60 saturate-50'}`}
            />
            <span className={`mt-1 text-xs font-semibold ${isToday ? 'text-rose' : 'text-ink-muted'}`}>
              {day}º dia
            </span>
            <span className="sr-only">{done ? 'rezado' : 'ainda não rezado'}</span>
          </li>
        )
      })}
    </ol>
  )
}
