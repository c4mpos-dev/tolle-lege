import { postureLabels, type Posture } from '../data'

/** Classes literais para o Tailwind detectar no build. */
const postureClasses: Record<Posture, string> = {
  stand: 'bg-marian-soft text-marian',
  sit: 'bg-sage-soft text-sage',
  kneel: 'bg-terracotta-soft text-terracotta',
}

export function PostureBadge({ posture }: { posture: Posture }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${postureClasses[posture]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {postureLabels[posture]}
    </span>
  )
}
