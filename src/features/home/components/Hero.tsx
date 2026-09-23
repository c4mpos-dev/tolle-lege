import { ChurchViewer } from '@/features/church'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_25%_50%,var(--color-amber-50),transparent_60%)]"
      />

      <div className="mx-auto grid min-h-dvh max-w-7xl items-center gap-8 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative h-[50vh] w-full cursor-grab active:cursor-grabbing lg:h-[80vh]">
          <ChurchViewer />
          <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs text-stone-400">
            Arraste para girar
          </p>
        </div>

        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.2em] text-amber-700 uppercase">
            Uma introdução à fé católica
          </p>

          <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight text-stone-900 sm:text-7xl">
            Tolle Lege
          </h1>

          <figure className="mt-6 border-l-2 border-amber-600/60 pl-4">
            <blockquote className="font-serif text-xl text-stone-700 italic">
              “Toma e lê, toma e lê.”
            </blockquote>
            <figcaption className="mt-1 text-sm text-stone-500">
              Santo Agostinho, <cite>Confissões</cite> VIII, 12
            </figcaption>
          </figure>

          <p className="mt-8 text-lg leading-relaxed text-stone-600">
            Um caminho simples para conhecer o que a Igreja crê, celebra e vive.
            Comece pelo essencial e aprofunde no seu ritmo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#comecar"
              className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
            >
              Começar a jornada
            </a>
            <a
              href="#sobre"
              className="group text-sm font-semibold text-stone-900"
            >
              Saiba mais{' '}
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
