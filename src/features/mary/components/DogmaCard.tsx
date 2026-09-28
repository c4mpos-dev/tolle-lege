import { TriangleAlert } from 'lucide-react'
import type { Dogma } from '../data'

export function DogmaCard({ dogma, number }: { dogma: Dogma; number: number }) {
  return (
    <article id={dogma.id} className="flex h-full scroll-mt-24 flex-col rounded-3xl border border-line bg-canvas p-7">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-4xl text-marian">{number}</span>
        <h3 className="font-serif text-2xl font-medium text-ink">{dogma.title}</h3>
      </div>
      <p className="mt-3 text-lg font-medium text-ink">{dogma.summary}</p>
      <p className="mt-2 leading-relaxed text-ink/80">{dogma.meaning}</p>

      {dogma.confusion && (
        <p className="mt-4 flex gap-2 rounded-xl bg-terracotta-soft p-3 text-sm text-ink/85">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-terracotta" />
          <span>
            <strong className="font-semibold">Atenção: </strong>
            {dogma.confusion}
          </span>
        </p>
      )}

      <figure className="mt-5 border-l-2 border-marian/50 pl-4">
        <blockquote className="font-serif text-ink/85 italic">“{dogma.scripture.text}”</blockquote>
        <figcaption className="mt-1 text-sm text-ink-muted">{dogma.scripture.reference}</figcaption>
      </figure>

      <p className="mt-auto pt-6 text-xs text-ink-muted">
        <span className="font-semibold text-marian">Quando: </span>
        {dogma.when}
      </p>
    </article>
  )
}
