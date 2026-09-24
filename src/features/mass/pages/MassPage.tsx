import { Lightbulb } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { firstTimeTips, massParts } from '../data'
import { MassTimeline } from '../components/MassTimeline'
import { PostureBadge } from '../components/PostureBadge'

export function MassPage() {
  return (
    <>
      <title>Como funciona a Missa · Tolle Lege</title>
      <PageHeader
        eyebrow="A Missa"
        title="Como funciona a Missa"
        description="Passo a passo, o que acontece em cada momento, se é hora de ficar em pé, sentado ou de joelhos, e o que responder."
        glassSeed={23}
      >
        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <span className="mr-1">Legenda:</span>
          <PostureBadge posture="stand" />
          <PostureBadge posture="sit" />
          <PostureBadge posture="kneel" />
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1fr_18rem] lg:px-10">
        <MassTimeline />

        <aside className="order-first lg:order-last">
          <div className="space-y-6 lg:sticky lg:top-24">
            <nav aria-label="Partes da Missa" className="hidden rounded-2xl border border-line bg-canvas p-6 lg:block">
              <p className="text-xs font-semibold tracking-[0.25em] text-primary-strong uppercase">
                As 4 partes
              </p>
              <ol className="mt-4 space-y-3">
                {massParts.map((part) => (
                  <li key={part.id}>
                    <a href={`#${part.id}`} className="flex gap-3 text-sm text-ink-muted hover:text-ink">
                      <span className="w-6 font-serif text-primary-strong">{part.numeral}</span>
                      {part.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="rounded-2xl bg-primary-soft p-6">
              <p className="flex items-center gap-2 font-serif text-lg text-ink">
                <Lightbulb className="size-5 text-primary-strong" />
                Primeira vez?
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/80">
                {firstTimeTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span aria-hidden className="text-primary-strong">
                      ·
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <p className="mx-auto max-w-3xl px-6 pb-16 text-center text-xs text-ink-muted">
        Respostas conforme o Missal Romano usado no Brasil. Alguns costumes, como ajoelhar-se, podem
        variar entre paróquias.
      </p>
    </>
  )
}
