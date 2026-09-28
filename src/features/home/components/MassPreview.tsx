import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { Rosette } from '@/components/ui/Rosette'
import { routes } from '@/config/routes'
import { massParts } from '@/features/mass'

/** Seção escura, como o interior da nave: as 4 partes da Missa em janelas iluminadas. */
export function MassPreview() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-canvas sm:py-32">
      {/* Brilho dourado vindo do altar */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgb(176_141_87/0.35),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 rubric text-primary">
            <Rosette className="size-4" />A Missa
          </p>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            Uma celebração em quatro movimentos
          </h2>
          <p className="mt-4 text-lg text-canvas/70">
            Entenda o que acontece, quando levantar, sentar ou ajoelhar, e o que responder.
          </p>
        </Reveal>

        <ol className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {massParts.map((part, index) => (
            <Reveal as="li" key={part.id} delay={index * 0.1}>
              <a
                href={`${routes.mass}#${part.id}`}
                className="group flex h-full flex-col items-center rounded-t-full border border-canvas/15 bg-canvas/5 px-4 pt-10 pb-8 text-center transition-colors duration-500 hover:border-primary/60 hover:bg-primary/10 sm:pt-14"
              >
                <span className="font-serif text-4xl text-primary transition-transform duration-500 group-hover:-translate-y-1 sm:text-5xl">
                  {part.numeral}
                </span>
                <span className="mt-4 font-serif text-lg sm:text-xl">{part.title}</span>
                <span className="mt-2 hidden text-sm text-canvas/60 sm:block">{part.summary}</span>
              </a>
            </Reveal>
          ))}
        </ol>

        <div className="mt-14 text-center">
          <ButtonLink to={routes.mass} variant="light">
            Ver a Missa passo a passo
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
