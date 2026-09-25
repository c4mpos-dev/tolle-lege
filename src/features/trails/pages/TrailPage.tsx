import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { NotFoundPage } from '@/components/layout/NotFoundPage'
import { routes } from '@/config/routes'
import { getTrail, trails, type Trail } from '../data'
import { useTrailProgress } from '../hooks/useTrailProgress'
import { toneClasses } from '../tones'

export function TrailPage() {
  const { trailId } = useParams()
  const trail = getTrail(trailId)

  if (!trail) return <NotFoundPage />

  // key: reinicia o progresso carregado ao trocar de trilha
  return <TrailContent key={trail.id} trail={trail} />
}

function TrailContent({ trail }: { trail: Trail }) {
  const { done, toggle, isDone } = useTrailProgress(trail.id)
  const tone = toneClasses[trail.tone]
  const Icon = trail.icon
  const progress = done.length / trail.steps.length
  const otherTrails = trails.filter((t) => t.id !== trail.id)

  return (
    <>
      <title>{`${trail.title} · Tolle Lege`}</title>

      <section className={`relative overflow-hidden border-b border-line ${tone.soft}`}>
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <Link
            to={routes.trails}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Todas as trilhas
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end">
            <div className="flex size-20 shrink-0 items-end justify-center rounded-t-full bg-canvas pb-4">
              <Icon className={`size-8 ${tone.text}`} strokeWidth={1.25} />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                {trail.title}
              </h1>
              <p className="mt-3 text-lg text-ink-muted">{trail.description}</p>
            </div>
          </div>

          {/* Progresso */}
          <div className="mt-10">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-ink">Seu progresso</span>
              <span className="text-ink-muted">
                {done.length} de {trail.steps.length} passos
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-canvas">
              <motion.div
                className={`h-full rounded-full ${tone.solid}`}
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <ol className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-5 before:w-px before:bg-line sm:before:left-6">
          {trail.steps.map((step, index) => {
            const completed = isDone(index)

            return (
              <Reveal as="li" key={step.title} className="relative flex gap-4 sm:gap-6">
                <span
                  className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border font-serif text-lg transition-colors sm:size-12 ${
                    completed
                      ? `border-transparent ${tone.solid} text-canvas`
                      : 'border-line bg-canvas text-ink'
                  }`}
                >
                  {completed ? <Check className="size-5" /> : index + 1}
                </span>

                <article className="flex-1 rounded-2xl border border-line bg-canvas p-6 sm:p-8">
                  <h2 className="font-serif text-2xl font-medium text-ink">{step.title}</h2>
                  <div className="mt-4 space-y-3 leading-relaxed text-ink/80">
                    {step.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className={`mt-6 flex gap-3 rounded-xl p-4 ${tone.soft}`}>
                    <Sparkles className={`mt-0.5 size-5 shrink-0 ${tone.text}`} />
                    <p className="text-sm text-ink">
                      <span className="font-semibold">Na prática: </span>
                      {step.practice}
                    </p>
                  </div>

                  {step.link && (
                    <ButtonLink to={step.link.to} variant="text" className="mt-4">
                      {step.link.label}
                    </ButtonLink>
                  )}

                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-pressed={completed}
                    className="mt-6 flex w-fit items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink aria-pressed:border-transparent aria-pressed:bg-ink aria-pressed:text-canvas"
                  >
                    <Check className="size-4" />
                    {completed ? 'Concluído' : 'Marcar como concluído'}
                  </button>
                </article>
              </Reveal>
            )
          })}
        </ol>

        {done.length === trail.steps.length && (
          <Reveal className="mt-12 rounded-2xl bg-ink p-8 text-center text-canvas">
            <p className="font-serif text-2xl">Você concluiu esta trilha. 🙏</p>
            <p className="mt-2 text-canvas/70">
              O caminho continua: procure sua paróquia e siga dando passos.
            </p>
          </Reveal>
        )}
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-primary-strong uppercase">
            Outras trilhas
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {otherTrails.map((other) => (
              <li key={other.id}>
                <ButtonLink
                  to={routes.trail(other.id)}
                  variant="text"
                  className="h-full w-full justify-between rounded-xl border border-line bg-canvas p-4"
                >
                  {other.title}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
