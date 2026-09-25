import { Lock, Plus } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { prayers } from '@/features/prayers'
import { commandments, confessionPhases } from '../data'

export function ConfessionPage() {
  const contrition = prayers['act-of-contrition']

  return (
    <>
      <title>Confissão · Tolle Lege</title>
      <PageHeader
        eyebrow="Rezar"
        title="Como se confessar"
        description="O sacramento da Reconciliação é o reencontro com a misericórdia de Deus. Se faz tempo ou se é a primeira vez, este guia é para você."
        glassSeed={151}
      />

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <Reveal className="grid gap-6 rounded-3xl bg-ink p-8 text-canvas sm:grid-cols-[auto_1fr] sm:p-10">
          <Lock className="size-8 text-primary" strokeWidth={1.5} />
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">Não tenha medo</h2>
            <p className="mt-3 leading-relaxed text-canvas/80">
              O padre é obrigado a guardar <strong className="text-canvas">sigilo absoluto</strong>{' '}
              sobre tudo o que ouve na Confissão, sem nenhuma exceção, nem mesmo diante da polícia
              ou de um tribunal. E ele não está ali para julgar: está ali em nome de Jesus, para
              perdoar.
            </p>
          </div>
        </Reveal>

        {/* Passo a passo */}
        <div className="mt-20">
          <Reveal>
            <SectionHeader eyebrow="Passo a passo" title="Antes, durante e depois" />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {confessionPhases.map((phase, phaseIndex) => (
              <Reveal key={phase.id} delay={phaseIndex * 0.08} className="rounded-3xl border border-line bg-canvas p-6 sm:p-7">
                <p className="font-serif text-3xl text-primary-strong">{phase.title}</p>
                <ol className="mt-6 space-y-6">
                  {phase.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary-strong">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-medium text-ink">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                        {step.words && (
                          <p className="mt-2 rounded-lg bg-surface px-3 py-2 font-serif text-sm text-ink italic">
                            “{step.words}”
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Ato de contrição */}
        <Reveal className="mt-16 rounded-3xl bg-primary-soft p-8 sm:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-primary-strong uppercase">
            Para rezar no confessionário
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink">{contrition.title}</h2>
          <div className="mt-4 space-y-2 font-serif text-xl leading-relaxed text-ink/85">
            {contrition.text.split('\n').map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        {/* Exame de consciência */}
        <div className="mt-20">
          <Reveal>
            <SectionHeader
              eyebrow="Exame de consciência"
              title="Um olhar honesto sobre a própria vida"
              description="Use os Dez Mandamentos como guia. Leia com calma, sem escrúpulos: o objetivo não é se culpar, e sim reconhecer onde precisa da misericórdia de Deus."
            />
          </Reveal>

          <Reveal className="mt-8 rounded-2xl border border-line bg-surface p-6 text-sm leading-relaxed text-ink/80">
            <p>
              <strong className="text-ink">Pecado grave (mortal)</strong> é aquele que reúne três
              condições ao mesmo tempo: matéria grave, pleno conhecimento de que é grave e
              consentimento deliberado (Catecismo, § 1857). Os demais são pecados leves (veniais),
              que também podem e devem ser confessados.
            </p>
          </Reveal>

          <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-canvas">
            {commandments.map((commandment) => (
              <details key={commandment.number} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 transition-colors hover:bg-surface/60 sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span className="w-8 shrink-0 font-serif text-2xl text-primary-strong">
                    {commandment.number}
                  </span>
                  <span className="flex-1 font-serif text-lg text-ink">{commandment.title}</span>
                  <Plus className="size-5 shrink-0 text-primary-strong transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <ul className="space-y-2 px-5 pb-6 pl-17 text-ink/80 sm:px-6 sm:pl-18">
                  {commandment.questions.map((question) => (
                    <li key={question} className="list-disc marker:text-primary">
                      {question}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-ink-muted">
            Nada nesta página é salvo ou enviado. O exame acontece só entre você e Deus.
          </p>
        </div>
      </section>
    </>
  )
}
