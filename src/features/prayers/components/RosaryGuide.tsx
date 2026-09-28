import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { prayers } from '../data'
import { beadKey, buildRosarySteps, mysterySetForDate, mysterySets, type MysterySetId } from '../rosary'
import { RosaryBeads } from './RosaryBeads'

const steps = buildRosarySteps()
const setIds = Object.keys(mysterySets) as MysterySetId[]

/** Terço guiado: mostra cada oração, o mistério da dezena e a conta atual no desenho. */
export function RosaryGuide() {
  const [setId, setSetId] = useState<MysterySetId>(() => mysterySetForDate(new Date()))
  const [index, setIndex] = useState(0)
  const prayerRef = useRef<HTMLDivElement>(null)
  const stickyBarRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // No celular, ao mudar de passo, traz o início da oração para logo abaixo do terço fixo.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const prayer = prayerRef.current
    const bar = stickyBarRef.current
    if (!prayer || !bar || getComputedStyle(bar).position !== 'sticky') return
    const barBottom = bar.getBoundingClientRect().bottom
    const top = prayer.getBoundingClientRect().top
    if (top < barBottom) window.scrollBy({ top: top - barBottom - 16, behavior: 'smooth' })
  }, [index])
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
    <div className="grid grid-cols-1 gap-6 rounded-3xl border border-line bg-canvas p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-14">
      {/*
       * No celular, o terço fica fixo no topo (compacto) e os botões fixos embaixo,
       * para que a conta atual continue visível enquanto a oração rola.
       */}
      <div
        ref={stickyBarRef}
        className="sticky top-16 z-10 -mx-6 -mt-6 flex items-center gap-4 rounded-t-3xl border-b border-line bg-canvas/95 px-6 py-3 backdrop-blur-md sm:-mx-10 sm:-mt-10 sm:px-10 lg:static lg:m-0 lg:flex-col lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <RosaryBeads
          current={step.bead}
          done={done}
          className="w-24 shrink-0 sm:w-32 lg:w-full lg:max-w-xs"
        />
        <div className="min-w-0 flex-1 lg:w-full lg:max-w-xs lg:flex-none lg:text-center">
          <p className="truncate text-xs font-semibold tracking-[0.15em] text-primary-strong uppercase lg:hidden">
            {step.label}
          </p>
          {mystery && (
            <p className="mt-1 truncate font-serif text-sm text-ink lg:hidden">{mystery.title}</p>
          )}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface lg:mt-4">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${((index + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            Passo {index + 1} de {steps.length}
          </p>
        </div>
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

        <div ref={prayerRef} aria-live="polite" className="mt-6 flex-1 lg:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* No celular, o rótulo já aparece no topo fixo */}
              <p className="hidden text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase lg:block">
                {step.label}
              </p>

              {mystery && (
                <div className="rounded-xl lg:mt-4 bg-primary-soft px-4 py-3">
                  <p className="font-serif text-lg text-ink">{mystery.title}</p>
                  <p className="text-xs text-ink-muted">{mystery.reference}</p>
                </div>
              )}

              <h3 className="mt-5 font-serif text-2xl font-medium text-ink">
                {prayers[step.prayer].title}
              </h3>
              <div className="mt-3 space-y-2 font-serif text-base leading-relaxed text-ink/85 sm:text-lg">
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

        <div className="sticky bottom-0 z-10 -mx-6 -mb-6 mt-6 flex flex-wrap items-center gap-3 rounded-b-3xl border-t border-line bg-canvas/95 px-6 py-3 backdrop-blur-md sm:-mx-10 sm:-mb-10 sm:px-10 lg:static lg:m-0 lg:mt-10 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
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
