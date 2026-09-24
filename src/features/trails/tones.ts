import type { TrailTone } from './data'

/** Classes literais para o Tailwind detectar no build. */
export const toneClasses: Record<TrailTone, { soft: string; text: string; solid: string }> = {
  sage: { soft: 'bg-sage-soft', text: 'text-sage', solid: 'bg-sage' },
  marian: { soft: 'bg-marian-soft', text: 'text-marian', solid: 'bg-marian' },
  terracotta: { soft: 'bg-terracotta-soft', text: 'text-terracotta', solid: 'bg-terracotta' },
  primary: { soft: 'bg-primary-soft', text: 'text-primary-strong', solid: 'bg-primary' },
}
