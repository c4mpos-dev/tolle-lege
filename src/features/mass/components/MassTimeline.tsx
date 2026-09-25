import { Plus } from 'lucide-react'
import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { massParts, type MassMoment } from '../data'
import { PostureBadge } from './PostureBadge'

/** Linha do tempo da Missa. A linha vertical se enche de dourado conforme a leitura avança. */
export function MassTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={ref} className="relative">
      {/* Trilho e preenchimento */}
      <div aria-hidden className="absolute top-0 bottom-0 left-4 w-px bg-line sm:left-6" />
      <motion.div
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute top-0 bottom-0 left-4 w-px origin-top bg-primary sm:left-6"
      />

      <div className="space-y-20">
        {massParts.map((part) => (
          <section key={part.id} id={part.id} aria-labelledby={`${part.id}-title`} className="scroll-mt-24">
            <Reveal className="relative flex items-start gap-5 sm:gap-8">
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-sm text-canvas ring-8 ring-canvas sm:size-12 sm:text-lg">
                {part.numeral}
              </span>
              <div>
                <h2 id={`${part.id}-title`} className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  {part.title}
                </h2>
                <p className="mt-2 max-w-xl text-lg text-ink-muted">{part.summary}</p>
              </div>
            </Reveal>

            <ol className="mt-8 space-y-4 pl-13 sm:pl-20">
              {part.moments.map((moment) => (
                <Reveal as="li" key={moment.title} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-7 left-[-2.55rem] size-2.5 rounded-full border-2 border-primary bg-canvas sm:left-[-3.8rem]"
                  />
                  <MomentCard moment={moment} />
                </Reveal>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  )
}

function MomentCard({ moment }: { moment: MassMoment }) {
  return (
    <article className="rounded-2xl border border-line bg-canvas p-5 transition-shadow hover:shadow-[0_8px_30px_-12px_rgb(43_38_34/0.15)] sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="mr-auto font-serif text-xl font-medium text-ink">{moment.title}</h3>
        {moment.sundaysOnly && (
          <span className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-muted">
            Domingos
          </span>
        )}
        <PostureBadge posture={moment.posture} />
      </div>

      <p className="mt-2 leading-relaxed text-ink/80">{moment.description}</p>

      {moment.dialogue && (
        <dl className="mt-4 space-y-2 rounded-xl bg-surface p-4 text-sm">
          {moment.dialogue.map((line, index) => (
            <div key={index} className="flex gap-3">
              <dt
                className={`w-16 shrink-0 font-semibold ${line.speaker === 'all' ? 'text-primary-strong' : 'text-ink-muted'}`}
              >
                {line.speaker === 'all' ? 'Todos' : 'Padre'}
              </dt>
              <dd className={line.speaker === 'all' ? 'font-serif text-base text-ink' : 'text-ink-muted'}>
                {line.text}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {moment.why && (
        <details className="group mt-4">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-primary-strong hover:text-ink [&::-webkit-details-marker]:hidden">
            <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
            Por que isso?
          </summary>
          <p className="mt-3 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-ink/80">
            {moment.why}
          </p>
        </details>
      )}
    </article>
  )
}
