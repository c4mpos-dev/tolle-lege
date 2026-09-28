import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { TourStop } from '../data'

type StopPanelProps = {
  stops: TourStop[]
  selected: number | null
  onSelect: (index: number) => void
  /** Conteúdo exibido antes de escolher um ponto. */
  intro: ReactNode
  /** Ação extra no último ponto (ex.: "Entrar na igreja"). */
  finalAction?: ReactNode
  dark?: boolean
}

/** Painel com o texto do ponto selecionado e navegação anterior/próximo. */
export function StopPanel({ stops, selected, onSelect, intro, finalAction, dark = false }: StopPanelProps) {
  const stop = selected !== null ? stops[selected] : null
  const isLast = selected === stops.length - 1
  const muted = dark ? 'text-canvas/70' : 'text-ink-muted'
  const body = dark ? 'text-canvas/85' : 'text-ink/85'

  return (
    <div className="flex h-full flex-col">
      <div aria-live="polite" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={stop?.id ?? 'intro'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {stop ? (
              <>
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                  {selected! + 1} de {stops.length}
                </p>
                <h2 className={`mt-2 font-serif text-3xl font-medium ${dark ? 'text-canvas' : 'text-ink'}`}>
                  {stop.title}
                </h2>
                <div className={`mt-4 space-y-3 leading-relaxed ${body}`}>
                  {stop.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {stop.scripture && (
                  <figure className="mt-5 border-l-2 border-primary/60 pl-4">
                    <blockquote className={`font-serif text-lg italic ${body}`}>“{stop.scripture.text}”</blockquote>
                    <figcaption className={`mt-1 text-sm ${muted}`}>{stop.scripture.reference}</figcaption>
                  </figure>
                )}
                {stop.link && (
                  <ButtonLink to={stop.link.to} variant={dark ? 'textLight' : 'text'} className="mt-5">
                    {stop.link.label}
                  </ButtonLink>
                )}
              </>
            ) : (
              intro
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {selected !== null && (
          <button
            type="button"
            onClick={() => onSelect(Math.max(selected - 1, 0))}
            disabled={selected === 0}
            className={`inline-flex items-center gap-1 rounded-full border px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-40 ${
              dark ? 'border-canvas/25 text-canvas hover:border-canvas' : 'border-line text-ink hover:border-ink'
            }`}
          >
            <ChevronLeft className="size-4" />
            Anterior
          </button>
        )}
        {isLast && finalAction ? (
          finalAction
        ) : (
          <button
            type="button"
            onClick={() => onSelect(selected === null ? 0 : Math.min(selected + 1, stops.length - 1))}
            className={`inline-flex items-center gap-1 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
              dark ? 'bg-canvas text-ink hover:bg-primary-soft' : 'bg-ink text-canvas hover:bg-primary-strong'
            }`}
          >
            {selected === null ? 'Começar a visita' : 'Próximo'}
            <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
