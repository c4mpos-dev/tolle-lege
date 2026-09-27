import { useState, type KeyboardEvent } from 'react'
import { persons, type PersonId } from '../data'

const POS: Record<PersonId | 'god', { x: number; y: number }> = {
  father: { x: 200, y: 58 },
  son: { x: 72, y: 290 },
  spirit: { x: 328, y: 290 },
  god: { x: 200, y: 208 },
}
const PERSON_R = 44
const GOD_R = 50

const withArticle: Record<PersonId, string> = {
  father: 'o Pai',
  son: 'o Filho',
  spirit: 'o Espírito Santo',
}

/** Ponto na borda do círculo de `from`, na direção de `to` (para as linhas não entrarem nos nós). */
function edgePoint(from: { x: number; y: number }, to: { x: number; y: number }, radius: number) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy)
  return { x: from.x + (dx / length) * radius, y: from.y + (dy / length) * radius }
}

type RelationProps = {
  from: PersonId | 'god'
  to: PersonId | 'god'
  label: string
  active: boolean
  tone: 'is' | 'isNot'
}

function Relation({ from, to, label, active, tone }: RelationProps) {
  const a = edgePoint(POS[from], POS[to], from === 'god' ? GOD_R : PERSON_R)
  const b = edgePoint(POS[to], POS[from], to === 'god' ? GOD_R : PERSON_R)
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
  const color = tone === 'is' ? 'var(--color-primary)' : 'var(--color-terracotta)'

  return (
    <g className="transition-opacity duration-300" style={{ opacity: active ? 1 : 0.28 }}>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={active ? 3 : 2} />
      <rect x={mid.x - 26} y={mid.y - 11} width="52" height="22" rx="11" fill="var(--color-canvas)" stroke={color} />
      <text x={mid.x} y={mid.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={color}>
        {label}
      </text>
    </g>
  )
}

/**
 * O "Escudo da Trindade" (Scutum Fidei), diagrama medieval que resume o dogma:
 * cada Pessoa "é" Deus e "não é" as outras Pessoas. Tocar numa Pessoa destaca suas relações.
 */
export function ShieldOfTrinity() {
  const [selected, setSelected] = useState<PersonId>('father')
  const others = persons.filter((person) => person.id !== selected)

  const onKey = (id: PersonId) => (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelected(id)
    }
  }

  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr]">
      <svg viewBox="0 0 400 350" className="mx-auto w-full max-w-md" role="group" aria-label="Escudo da Trindade">
        {/* "não é" entre as Pessoas */}
        {(
          [
            ['father', 'son'],
            ['son', 'spirit'],
            ['spirit', 'father'],
          ] as const
        ).map(([a, b]) => (
          <Relation key={a + b} from={a} to={b} label="não é" tone="isNot" active={selected === a || selected === b} />
        ))}
        {/* "é" de cada Pessoa para Deus */}
        {persons.map((person) => (
          <Relation key={person.id} from={person.id} to="god" label="é" tone="is" active={selected === person.id} />
        ))}

        {/* Deus, no centro */}
        <circle cx={POS.god.x} cy={POS.god.y} r={GOD_R} fill="var(--color-ink)" />
        <text x={POS.god.x} y={POS.god.y + 7} textAnchor="middle" fontSize="22" fill="var(--color-primary)" fontFamily="var(--font-serif)">
          Deus
        </text>

        {/* As três Pessoas */}
        {persons.map((person) => {
          const active = selected === person.id
          const { x, y } = POS[person.id]
          const lines = person.name === 'Espírito Santo' ? ['Espírito', 'Santo'] : [person.name]
          return (
            <g
              key={person.id}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={person.name}
              onClick={() => setSelected(person.id)}
              onKeyDown={onKey(person.id)}
              className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-ink"
            >
              <circle
                cx={x}
                cy={y}
                r={PERSON_R}
                fill={active ? 'var(--color-primary-soft)' : 'var(--color-canvas)'}
                stroke={active ? 'var(--color-primary-strong)' : 'var(--color-line)'}
                strokeWidth="3"
                className="transition-colors duration-300"
              />
              <text textAnchor="middle" fontSize="16" fontFamily="var(--font-serif)" fill="var(--color-ink)">
                {lines.map((line, index) => (
                  <tspan key={line} x={x} y={y + 6 + (index - (lines.length - 1) / 2) * 18}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}
      </svg>

      <div aria-live="polite">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
          Toque em uma Pessoa
        </p>
        <ul className="mt-4 space-y-3 font-serif text-2xl text-ink">
          <li>
            <span className="capitalize">{withArticle[selected]}</span>{' '}
            <strong className="font-medium text-primary-strong">é</strong> Deus.
          </li>
          {others.map((other) => (
            <li key={other.id}>
              <span className="capitalize">{withArticle[selected]}</span>{' '}
              <strong className="font-medium text-terracotta">não é</strong> {withArticle[other.id]}.
            </li>
          ))}
        </ul>
        <p className="mt-6 leading-relaxed text-ink-muted">
          {persons.find((person) => person.id === selected)?.description}
        </p>
      </div>
    </div>
  )
}
