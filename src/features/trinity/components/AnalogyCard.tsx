import { ArrowDown, TriangleAlert } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { getHeresy, type Analogy } from '../data'

/** Analogia popular: a pessoa tenta adivinhar se ela funciona, e a carta revela a heresia. */
export function AnalogyCard({ analogy }: { analogy: Analogy }) {
  const [revealed, setRevealed] = useState(false)
  const heresy = getHeresy(analogy.heresy)
  const Icon = analogy.icon

  return (
    <article className="flex h-full flex-col rounded-3xl border border-line bg-canvas p-6">
      <span className="flex size-12 items-end justify-center rounded-t-full bg-surface pb-2.5 text-ink">
        <Icon className="size-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-5 font-serif text-xl font-medium text-ink">{analogy.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{analogy.description}</p>

      <div className="mt-auto pt-6">
        <AnimatePresence mode="wait" initial={false}>
          {revealed ? (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-terracotta-soft p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-terracotta">
                <TriangleAlert className="size-4" />
                Cuidado: {heresy.name.toLowerCase()}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">{analogy.explanation}</p>
              <a
                href={`#${heresy.id}`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink underline-offset-2 hover:underline"
              >
                Entenda o {heresy.name.toLowerCase()}
                <ArrowDown className="size-3.5" />
              </a>
            </motion.div>
          ) : (
            <motion.button
              key="ask"
              type="button"
              onClick={() => setRevealed(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Isso explica a Trindade?
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}
