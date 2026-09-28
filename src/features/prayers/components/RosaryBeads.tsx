import { beadKey, type Bead } from '../rosary'

const CX = 150
const CY = 150
const RADIUS = 110
const LOOP_BEADS = 55
const GAP_DEGREES = 12 // espaço em volta da medalha, na base do círculo

type BeadState = 'done' | 'current' | 'todo'

/** Posições da parte pendente, da cruz (0) até a última conta pequena (4). */
const PENDANT_Y = [372, 340, 318, 302, 286]
const MEDAL_Y = CY + RADIUS + 2

function loopPosition(index: number) {
  const step = (360 - GAP_DEGREES * 2) / (LOOP_BEADS - 1)
  const angle = ((90 + GAP_DEGREES + index * step) * Math.PI) / 180
  return { x: CX + RADIUS * Math.cos(angle), y: CY + RADIUS * Math.sin(angle) }
}

type RosaryBeadsProps = {
  current: Bead | null
  done: Set<string>
  className?: string
}

/** Desenho do terço. As contas já rezadas ficam douradas; a atual brilha. */
export function RosaryBeads({ current, done, className = 'w-full max-w-xs' }: RosaryBeadsProps) {
  const stateOf = (bead: Bead): BeadState =>
    current && beadKey(current) === beadKey(bead) ? 'current' : done.has(beadKey(bead)) ? 'done' : 'todo'

  const fill: Record<BeadState, string> = {
    done: 'var(--color-primary)',
    current: 'var(--color-primary-strong)',
    todo: 'var(--color-canvas)',
  }

  return (
    <svg viewBox="0 0 300 400" className={className} aria-hidden>
      {/* Fio */}
      <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
      <line x1={CX} y1={MEDAL_Y} x2={CX} y2={PENDANT_Y[0]} stroke="var(--color-line)" strokeWidth="1.5" />

      {/* Dezenas */}
      {Array.from({ length: LOOP_BEADS }, (_, index) => {
        const bead: Bead = { kind: index % 11 === 0 ? 'large' : 'small', area: 'loop', index }
        const { x, y } = loopPosition(index)
        const state = stateOf(bead)
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={bead.kind === 'large' ? 7 : 4.5}
            fill={fill[state]}
            stroke={state === 'todo' ? 'var(--color-ink-muted)' : 'var(--color-primary-strong)'}
            strokeWidth="1.2"
            className={state === 'current' ? 'motion-safe:animate-pulse' : undefined}
            style={state === 'current' ? { filter: 'drop-shadow(0 0 6px rgb(176 141 87 / 0.9))' } : undefined}
          />
        )
      })}

      {/* Medalha */}
      <rect x={CX - 8} y={MEDAL_Y - 8} width="16" height="16" rx="8" transform={`rotate(45 ${CX} ${MEDAL_Y})`} fill="var(--color-primary-soft)" stroke="var(--color-primary-strong)" strokeWidth="1.2" />

      {/* Parte pendente: contas */}
      {[1, 2, 3, 4].map((index) => {
        const bead: Bead = { kind: index === 1 ? 'large' : 'small', area: 'pendant', index }
        const state = stateOf(bead)
        return (
          <circle
            key={index}
            cx={CX}
            cy={PENDANT_Y[index]}
            r={bead.kind === 'large' ? 7 : 4.5}
            fill={fill[state]}
            stroke={state === 'todo' ? 'var(--color-ink-muted)' : 'var(--color-primary-strong)'}
            strokeWidth="1.2"
            className={state === 'current' ? 'motion-safe:animate-pulse' : undefined}
          />
        )
      })}

      {/* Cruz */}
      <g
        transform={`translate(${CX} ${PENDANT_Y[0]})`}
        fill={fill[stateOf({ kind: 'cross', area: 'pendant', index: 0 })]}
        stroke="var(--color-primary-strong)"
        strokeWidth="1.2"
      >
        <rect x="-3" y="-14" width="6" height="28" rx="1" />
        <rect x="-10" y="-7" width="20" height="6" rx="1" />
      </g>
    </svg>
  )
}
