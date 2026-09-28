import { ImageDown } from 'lucide-react'
import { useState } from 'react'
import type { LiturgicalColor, Psalm, Reading } from '../types'
import { formatVerses } from '../utils/verses'
import { ShareImageDialog } from './ShareImageDialog'

/** Dados do dia, usados na imagem de compartilhamento. */
type DayInfo = { date: string; color: LiturgicalColor }

type ReadingViewProps = DayInfo &
  ({ kind: 'reading'; options: Reading[] } | { kind: 'psalm'; options: Psalm[] })

/** Mostra uma leitura ou salmo. Quando há mais de uma opção (ex.: forma longa/breve), permite alternar. */
export function ReadingView({ kind, options, date, color }: ReadingViewProps) {
  const [selected, setSelected] = useState(0)
  const [sharing, setSharing] = useState(false)
  const current = options[selected] ?? options[0]

  return (
    <article>
      {options.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Opções">
          {options.map((option, index) => (
            <button
              key={option.referencia}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={index === selected}
              className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink/80 transition-colors hover:border-primary/50 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas"
            >
              {option.referencia}
            </button>
          ))}
        </div>
      )}

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          {'titulo' in current && (
            <h3 className="font-serif text-2xl font-medium text-ink">{current.titulo}</h3>
          )}
          <p className="mt-1 text-sm font-medium text-primary-strong">
            {kind === 'psalm' && 'Salmo responsorial · '}
            {current.referencia}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSharing(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-primary hover:bg-primary-soft"
        >
          <ImageDown className="size-4" />
          Criar imagem
        </button>
      </header>

      {sharing && (
        <ShareImageDialog item={current} date={date} color={color} onClose={() => setSharing(false)} />
      )}

      {'refrao' in current && (
        <p className="mb-6 rounded-lg bg-primary-soft px-4 py-3 font-serif text-lg text-ink/80 italic">
          <span className="mr-2 text-sm font-semibold text-primary-strong not-italic">R.</span>
          {current.refrao}
        </p>
      )}

      <div className="space-y-4 font-serif text-lg leading-relaxed text-ink/80">
        {current.texto
          .split('\n')
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index}>{formatVerses(paragraph)}</p>
          ))}
      </div>
    </article>
  )
}
