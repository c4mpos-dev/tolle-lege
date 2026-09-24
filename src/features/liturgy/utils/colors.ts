import type { LiturgicalColor } from '../types'

/** Classes literais para o Tailwind detectar no build. */
export const liturgicalColorClass: Record<LiturgicalColor, string> = {
  Verde: 'bg-emerald-600',
  Vermelho: 'bg-red-600',
  Roxo: 'bg-purple-700',
  Rosa: 'bg-pink-400',
  Branco: 'bg-white ring-1 ring-ink/20',
}
