import { RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { prayers } from '@/features/prayers'
import { GLORIES, novenaPrayer, ordinalDay } from '../novena'
import { BloomingRose } from './BloomingRose'
import { RosePetals } from './RosePetals'

type Step = 'prayer' | 'glories' | 'done'

type NovenaPrayerProps = {
  /** Dia da novena de hoje (1 a 9), ou null fora do período. */
  day: number | null
  onComplete: () => void
}

/** Oração guiada: oração da novena, 24 Glórias com a rosa desabrochando e a rosa recebida no fim. */
export function NovenaPrayer({ day, onComplete }: NovenaPrayerProps) {
  const [step, setStep] = useState<Step>('prayer')
  const [count, setCount] = useState(0)
  const [showPetals, setShowPetals] = useState(false)
  const glory = prayers['glory-be']

  const pray = () => {
    const next = count + 1
    setCount(next)
    if (next === GLORIES) {
      setStep('done')
      setShowPetals(true)
      onComplete()
    }
  }

  const restart = () => {
    setStep('prayer')
    setCount(0)
  }

  const progress = step === 'prayer' ? 0 : count / GLORIES

  return (
    <div className="grid items-center gap-10 rounded-3xl border border-line bg-canvas p-6 sm:p-10 lg:grid-cols-[18rem_1fr] lg:gap-14">
      {showPetals && <RosePetals count={40} onDone={() => setShowPetals(false)} />}

      <div className="flex flex-col items-center">
        <BloomingRose progress={progress} className="w-48 sm:w-56" />
        {step !== 'prayer' && (
          <p className="mt-2 font-serif text-lg text-ink" aria-live="polite">
            {count} de {GLORIES}
          </p>
        )}
      </div>

      <div className="min-w-0">
        <AnimatePresence mode="wait">
          {step === 'prayer' && (
            <motion.div key="prayer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <p className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
                {day ? `${ordinalDay(day)} · ` : ''}Primeiro, a oração
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                Faça o sinal da cruz e apresente, em silêncio, o seu pedido.
              </p>
              <h3 className="mt-5 font-serif text-2xl font-medium text-ink">{novenaPrayer.title}</h3>
              <div className="mt-3 space-y-3 font-serif text-lg leading-relaxed text-ink/85">
                {novenaPrayer.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep('glories')}
                className="mt-8 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-primary-strong"
              >
                Rezei a oração, seguir para as Glórias
              </button>
            </motion.div>
          )}

          {step === 'glories' && (
            <motion.div key="glories" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <p className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
                24 Glórias, uma por ano de vida de Teresinha
              </p>
              <h3 className="mt-4 font-serif text-2xl font-medium text-ink">{glory.title}</h3>
              <div className="mt-3 space-y-2 font-serif text-xl leading-relaxed text-ink/85">
                {glory.text.split('\n').map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={pray}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(179_51_78/0.55)] transition-transform hover:scale-[1.03] active:scale-95"
              >
                Rezei um Glória ({count + 1} de {GLORIES})
              </button>
              <p className="mt-3 text-xs text-ink-muted">A cada Glória, a rosa se abre um pouco mais.</p>
            </motion.div>
          )}

          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <p className="text-xs font-semibold tracking-[0.2em] text-rose uppercase">🌹 Chuva de rosas</p>
              <h3 className="mt-3 font-serif text-3xl font-medium text-ink sm:text-4xl">
                {day ? `Você recebeu a rosa do ${ordinalDay(day)}` : 'Você recebeu uma rosa'}
              </h3>
              <p className="mt-4 leading-relaxed text-ink/80">
                Obrigado por rezar. Entregue o seu pedido com confiança: Deus ouve cada oração e
                responde do jeito e no tempo que for melhor para você. Como dizia Teresinha, “tudo é
                graça”.
              </p>
              {day && day < 9 && (
                <p className="mt-3 text-sm text-ink-muted">Volte amanhã para o {ordinalDay(day + 1)}.</p>
              )}
              <button
                type="button"
                onClick={restart}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink"
              >
                <RotateCcw className="size-4" />
                Rezar de novo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
