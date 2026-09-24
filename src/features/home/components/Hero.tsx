import { motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { LightRays } from '@/components/ui/LightRays'
import { Rosette } from '@/components/ui/Rosette'
import { routes } from '@/config/routes'

// O 3D (three.js) é baixado à parte, para o texto da hero aparecer sem esperar.
const ChurchViewer = lazy(() =>
  import('@/features/church').then((m) => ({ default: m.ChurchViewer })),
)

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Luz quente vinda de cima, como sol entrando pela nave */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_0%,var(--color-primary-soft),transparent_65%)]"
      />
      <LightRays />

      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-screen-2xl items-center gap-4 px-6 py-8 lg:grid-cols-[3fr_2fr] lg:gap-12 lg:px-10 lg:py-12">
        <div className="relative h-[46vh] w-full sm:h-[60vh] lg:h-[82vh]">
          {/* Arco romano atrás da igreja, ecoando as janelas da fachada */}
          <div
            aria-hidden
            className="absolute inset-x-[8%] top-[4%] bottom-0 -z-10 mask-b-from-75% mask-b-to-100%"
          >
            <div className="absolute inset-0 rounded-t-full border border-primary/25" />
            <div className="absolute inset-3 rounded-t-full bg-surface" />
          </div>

          <div className="h-full w-full cursor-grab active:cursor-grabbing">
            <Suspense>
              <ChurchViewer />
            </Suspense>
          </div>

          {/*
           * Em telas de toque, uma camada transparente cobre o 3D: assim o dedo rola a página
           * em vez de girar a igreja (que continua balançando sozinha).
           */}
          <div aria-hidden className="absolute inset-0 hidden pointer-coarse:block" />

          <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-ink-muted/70 pointer-coarse:hidden">
            Arraste para girar
          </p>
        </div>

        <div className="max-w-xl pb-8 lg:pb-0">
          <motion.p
            {...fadeUp(0.1)}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-primary-strong uppercase"
          >
            <Rosette className="size-4 text-primary" />
            Uma introdução à fé católica
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            className="mt-5 font-serif text-6xl font-medium tracking-tight text-ink sm:text-7xl xl:text-8xl"
          >
            Tolle Lege
          </motion.h1>

          <motion.figure {...fadeUp(0.35)} className="mt-6 border-l-2 border-primary/50 pl-4">
            <blockquote className="font-serif text-xl text-ink/80 italic">
              “Toma e lê, toma e lê.”
            </blockquote>
            <figcaption className="mt-1 text-sm text-ink-muted">
              Santo Agostinho, <cite>Confissões</cite> VIII, 12
            </figcaption>
          </motion.figure>

          <motion.p
            {...fadeUp(0.5)}
            className="mt-8 text-lg leading-relaxed text-pretty text-ink-muted"
          >
            Um caminho simples para conhecer o que a Igreja crê, celebra e vive. Comece pelo
            essencial e aprofunde no seu ritmo.
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink to={routes.trails}>Começar a jornada</ButtonLink>
            <ButtonLink to={routes.mass} variant="text">
              Como funciona a Missa
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
