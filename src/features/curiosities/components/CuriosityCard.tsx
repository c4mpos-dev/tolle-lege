import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Rosette } from '@/components/ui/Rosette'
import type { Curiosity, CuriosityTone } from '../data'

/** Classes literais para o Tailwind detectar no build. */
const toneClasses: Record<CuriosityTone, { front: string; accent: string }> = {
  marian: { front: 'bg-marian text-canvas', accent: 'text-marian' },
  primary: { front: 'bg-primary-strong text-canvas', accent: 'text-primary-strong' },
  terracotta: { front: 'bg-terracotta text-canvas', accent: 'text-terracotta' },
  sage: { front: 'bg-sage text-canvas', accent: 'text-sage' },
}

/** Carta que vira ao ser tocada: pergunta na frente, resposta atrás. */
export function CuriosityCard({ curiosity }: { curiosity: Curiosity }) {
  const [flipped, setFlipped] = useState(false)
  const tone = toneClasses[curiosity.tone]

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={flipped ? `${curiosity.question} ${curiosity.answer}` : curiosity.question}
      className="group h-80 w-full rounded-3xl text-left perspective-[1400px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <div
        className={`relative size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform-3d motion-reduce:duration-0 ${
          flipped ? 'rotate-y-180' : 'group-hover:rotate-y-6'
        }`}
      >
        {/* Frente */}
        <div
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-7 backface-hidden ${tone.front}`}
        >
          <Rosette aria-hidden className="absolute -right-10 -bottom-10 size-48 opacity-15" />
          <span className="rubric opacity-80">
            Você sabia?
          </span>
          <p className="mt-auto font-serif text-2xl leading-snug font-medium text-balance">
            {curiosity.question}
          </p>
          <span className="mt-6 text-xs opacity-75">Toque para descobrir</span>
        </div>

        {/* Verso */}
        <div className="absolute inset-0 flex rotate-y-180 flex-col rounded-3xl border border-line bg-canvas p-7 backface-hidden">
          <Rosette aria-hidden className={`size-6 ${tone.accent}`} />
          <p className="mt-4 leading-relaxed text-ink/85">{curiosity.answer}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <RotateCcw className="size-3.5" />
            Toque para voltar
          </span>
        </div>
      </div>
    </button>
  )
}
