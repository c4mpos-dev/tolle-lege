import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { prayers } from '../data'
import { beadKey, buildRosarySteps, mysterySetForDate, mysterySets, type MysterySetId } from '../rosary'
import { RosaryBeads } from './RosaryBeads'

const steps = buildRosarySteps()
const setIds = Object.keys(mysterySets) as MysterySetId[]

/** Terço guiado: mostra cada oração, o mistério da dezena e a conta atual no desenho. */
export function RosaryGuide() {
  const [setId, setSetId] = useState<MysterySetId>(() => mysterySetForDate(new Date()))
  const [index, setIndex] = useState(0)
  const step = steps[index]
  const set = mysterySets[setId]
  const mystery = step.decade !== undefined ? set.mysteries[step.decade] : null
  const isLast = index === steps.length - 1

  const done = useMemo(() => {
    const keys = new Set<string>()
    for (const previous of steps.slice(0, index)) {
      if (previous.bead) keys.add(beadKey(previous.bead))
    }
    return keys
  }, [index])

  const go = (delta: number) =>
    setIndex((current) => Math.min(Math.max(current + delta, 0), steps.length - 1))

  return (
    <div className="grid gap-10 rounded-3xl border border-line bg-canvas p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-14">
      <div className="flex flex-col items-center">
        <RosaryBeads current={step.bead} done={done} />
        <div className="mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          Passo {index + 1} de {steps.length}
        </p>
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Mistérios">
          {setIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setSetId(id)}
              aria-pressed={id === setId}
              className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-primary/50 hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas"
            >
              {mysterySets[id].title.replace('Mistérios ', '')}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          {set.title}: {set.days.toLowerCase()}
        </p>

        <div aria-live="polite" className="mt-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
                {step.label}
              </p>

              {mystery && (
                <div className="mt-4 rounded-xl bg-primary-soft px-4 py-3">
                  <p className="font-serif text-lg text-ink">{mystery.title}</p>
                  <p className="text-xs text-ink-muted">{mystery.reference}</p>
                </div>
              )}

              <h3 className="mt-5 font-serif text-2xl font-medium text-ink">
                {prayers[step.prayer].title}
              </h3>
              <div className="mt-3 space-y-2 font-serif text-lg leading-relaxed text-ink/85">
                {prayers[step.prayer].text.split('\n').map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {step.extraPrayer && (
                <p className="mt-4 border-l-2 border-primary/50 pl-4 font-serif text-ink/80 italic">
                  {prayers[step.extraPrayer].text}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            className="inline-flex items-center gap-1 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
            Anterior
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={() => setIndex(0)}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-primary-strong"
            >
              <RotateCcw className="size-4" />
              Rezar de novo
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-primary-strong"
            >
              Próximo
              <ChevronRight className="size-4" />
            </button>
          )}
          {index > 0 && !isLast && (
            <button
              type="button"
              onClick={() => setIndex(0)}
              className="ml-auto text-xs text-ink-muted underline underline-offset-2 hover:text-ink"
            >
              Recomeçar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
