import { Reveal } from '@/components/ui/Reveal'
import { maryLife } from '../data'

/** A vida de Maria nos Evangelhos, em uma linha do tempo que rola na horizontal. */
export function MaryTimeline() {
  return (
    <>
      <p className="text-sm text-ink-muted">
        Deslize para o lado para ver os {maryLife.length} momentos →
      </p>
      <div className="-mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
        <ol className="relative flex w-max snap-x snap-mandatory gap-5 pt-10">
          {/* Fio da linha do tempo */}
          <span aria-hidden className="absolute top-3.5 right-0 left-0 h-px bg-linear-to-r from-marian/0 via-marian/40 to-marian/0" />
          {maryLife.map((moment, index) => (
            <Reveal as="li" key={moment.title} delay={index * 0.05} className="relative w-64 shrink-0 snap-start sm:w-72">
              <span aria-hidden className="absolute -top-8.5 left-6 flex size-6 items-center justify-center rounded-full bg-marian font-serif text-xs text-canvas ring-4 ring-canvas">
                {index + 1}
              </span>
              <article className="h-full rounded-t-[2.5rem] rounded-b-2xl border border-line bg-canvas p-6">
                <h3 className="font-serif text-xl text-ink">{moment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{moment.text}</p>
                <p className="mt-4 text-xs font-semibold text-marian">{moment.reference}</p>
              </article>
            </Reveal>
          ))}
      </ol>
    </div>
    </>
  )
}
