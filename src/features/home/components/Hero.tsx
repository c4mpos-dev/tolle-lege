import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { lazy, Suspense, useRef, useState } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { routes } from '@/config/routes'
import { TodayGospelCard } from '@/features/liturgy'

// O three.js é baixado à parte, para a página abrir sem esperar o 3D.
const ParticleChurch = lazy(() =>
  import('@/features/church').then((m) => ({ default: m.ParticleChurch })),
)

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * "A Palavra vira Igreja": o nome do site, feito de partículas de luz, se desfaz ao rolar
 * e reconstrói a igreja ponto a ponto. A hero fica fixa enquanto a transformação acontece.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion() ?? false

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // Copia o progresso para um MotionValue comum. Ligado direto ao estilo, o Motion usaria a
  // ScrollTimeline nativa, que calcula o intervalo errado com a hero fixa (sticky).
  const progress = useMotionValue(0)
  const [formed, setFormed] = useState(reduceMotion)
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    progress.set(value)
    // Enquanto a igreja não se formou, o texto final fica fora da navegação por teclado.
    setFormed(reduceMotion || value > 0.62)
  })

  const morph = useTransform(progress, [0.04, 0.7], [0, 1])
  const introOpacity = useTransform(progress, [0, 0.14], [1, 0])
  const copyOpacity = useTransform(progress, [0.6, 0.82], [0, 1])
  const copyY = useTransform(progress, [0.6, 0.82], [32, 0])

  return (
    <section
      ref={sectionRef}
      className={`relative bg-ink ${reduceMotion ? '' : 'h-[210dvh]'}`}
      aria-labelledby="hero-title"
    >
      <div className="sticky top-16 h-[calc(100dvh-4rem)] overflow-hidden">
        {/* Céu noturno quente: brilho dourado vindo do altar e vinheta nas bordas */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_55%,rgb(176_141_87/0.28),transparent_60%),radial-gradient(ellipse_at_50%_120%,rgb(74_107_148/0.25),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.45))]"
        />

        <div className="absolute inset-0">
          <Suspense>
            <ParticleChurch morph={morph} reducedMotion={reduceMotion} />
          </Suspense>
        </div>

        {/* Etapa 1: o nome em partículas, com a citação e o convite para rolar */}
        {!reduceMotion && (
          <motion.div
            style={{ opacity: introOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-[14%] flex flex-col items-center px-6 text-center sm:bottom-[18%]"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: EASE }}
              className="font-serif text-xl text-canvas/85 italic sm:text-2xl"
            >
              <span lang="la">“Tolle, lege; tolle, lege.”</span>
              <span className="mt-1 block text-base text-canvas/60 sm:text-lg">
                “Toma e lê, toma e lê.”
              </span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
              className="mt-1 text-sm text-canvas/50"
            >
              Santo Agostinho, Confissões VIII, 12, 29
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="mt-12 flex flex-col items-center gap-3 text-[0.65rem] font-semibold tracking-[0.25em] text-primary uppercase"
            >
              Role para ver a Palavra edificar a Igreja
              <span className="relative h-10 w-px overflow-hidden bg-canvas/15">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-primary"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* Etapa 2: igreja formada, texto e chamadas */}
        <motion.div
          style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
          inert={!formed}
          className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink via-ink/85 to-transparent px-6 pt-24 pb-10 lg:inset-y-0 lg:right-auto lg:flex lg:w-1/2 lg:items-center lg:bg-none lg:px-10 lg:pt-0 lg:pb-0 xl:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Uma introdução à fé católica
            </p>
            <h1
              id="hero-title"
              className="mt-4 font-serif text-5xl font-medium tracking-tight text-canvas sm:text-7xl"
            >
              Tolle Lege
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-canvas/75">
              A Palavra edifica a Igreja. Um caminho simples para conhecer o que ela crê, celebra
              e vive, no seu ritmo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink to={routes.trails} variant="light">
                Começar a jornada
              </ButtonLink>
              <ButtonLink to={routes.mass} variant="textLight">
                Como funciona a Missa
              </ButtonLink>
            </div>

            <TodayGospelCard className="mt-10 hidden max-w-sm lg:flex" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
