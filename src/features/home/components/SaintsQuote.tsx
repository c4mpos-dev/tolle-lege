import { CrossPattee } from '@/components/ui/CrossPattee'
import { Reveal } from '@/components/ui/Reveal'

/** Cantos da moldura, com a cruz em cada um. */
const CORNERS = [
  'top-0 left-0 -translate-1/2',
  'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-0 right-0 translate-1/2',
]

/** Citação em destaque, emoldurada como uma página de missal, antes do convite final. */
export function SaintsQuote() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="relative bg-canvas px-6 py-16 text-center shadow-[0_24px_60px_-30px_rgb(42_34_27/0.35)] sm:px-16 sm:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-3 sm:inset-4">
            <div className="absolute inset-0 border border-primary/60" />
            <div className="absolute inset-1.5 border border-primary/25" />
            {CORNERS.map((position) => (
              <span
                key={position}
                className={`absolute flex size-6 items-center justify-center bg-canvas text-cardinal ${position}`}
              >
                <CrossPattee className="size-3" />
              </span>
            ))}
          </div>

          <figure>
            <blockquote className="font-serif text-4xl leading-tight font-medium tracking-tight text-balance text-ink sm:text-6xl">
              <p>
                Todo santo tem um <em className="text-ink-muted">passado</em>,
                <br className="hidden sm:block" /> e todo pecador tem um{' '}
                <em className="text-cardinal">futuro</em>.
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center justify-center gap-4 rubric text-primary-strong">
              <span aria-hidden className="h-px w-10 bg-primary/50" />
              Oscar Wilde
              <span aria-hidden className="h-px w-10 bg-primary/50" />
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
