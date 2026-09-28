import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { lazy, Suspense, useRef, useState, useSyncExternalStore } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CrossPattee } from '@/components/ui/CrossPattee'
import { routes } from '@/config/routes'
import { TodayGospelCard } from '@/features/liturgy'
import { Resplendor } from './Resplendor'

// O three.js é baixado à parte, para a página abrir sem esperar o 3D.
const ParticleChurch = lazy(() =>
  import('@/features/church').then((m) => ({ default: m.ParticleChurch })),
)

const EASE = [0.22, 1, 0.36, 1] as const

/** Mesma condição da variante `wide:` do CSS: tela larga e deitada vira tríptico. */
const HERO_WIDE_QUERY = '(min-width: 1024px) and (min-aspect-ratio: 105/100)'

/** Linha (fração da altura, a partir do topo) onde a base da igreja se apoia. */
const HORIZON = { wide: 0.71, narrow: 0.39 }

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Cantos da moldura de iluminura. */
const CORNERS = ['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0']

/**
 * "A Palavra vira Igreja": o nome do site, escrito em tinta de partículas sobre o pergaminho,
 * se desfaz ao rolar e reconstrói a igreja ponto a ponto. No fim, a igreja fica no centro de
 * um medalhão com resplendor, como a hóstia no ostensório, e a página vira um tríptico.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const wide = useMediaQuery(HERO_WIDE_QUERY)
  const horizon = wide ? HORIZON.wide : HORIZON.narrow

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
  // O medalhão e o resplendor surgem enquanto a igreja termina de se formar.
  const haloOpacity = useTransform(progress, [0.4, 0.75], [0, 1])
  const haloScale = useTransform(progress, [0.4, 0.8], [0.85, 1])

  return (
    <section
      ref={sectionRef}
      className={`relative bg-parchment ${reduceMotion ? '' : 'h-[210dvh]'}`}
      aria-labelledby="hero-title"
    >
      <div
        ref={stageRef}
        className="sticky top-16 h-[calc(100dvh-4rem)] overflow-hidden [--church-size:0px] [--church-y:50%]"
      >
        {/* Luz suave no centro do pergaminho */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_var(--church-y),rgb(250_247_240/0.9),transparent_60%)]"
        />

        {/* Ostensório: resplendor girando devagar e medalhão sépia atrás da igreja */}
        <motion.div
          aria-hidden
          style={reduceMotion ? undefined : { opacity: haloOpacity, scale: haloScale }}
          className="absolute inset-0"
        >
          <div className="absolute top-[calc(var(--church-y)-var(--church-size)*0.08)] left-1/2 size-[calc(var(--church-size)*2.9)] -translate-1/2">
            <Resplendor className="size-full motion-safe:animate-[spin_240s_linear_infinite]" />
          </div>
          <div className="absolute top-[calc(var(--church-y)-var(--church-size)*0.08)] left-1/2 size-[calc(var(--church-size)*1.15)] -translate-1/2 rounded-full border-[5px] border-double border-primary bg-[radial-gradient(circle_at_50%_40%,#d8bd88,#b08a4c_70%,#8a6a35)] shadow-[0_0_0_6px_var(--color-parchment),0_0_0_7px_rgb(168_130_63/0.6),inset_0_0_40px_rgb(60_40_15/0.45)]" />
        </motion.div>

        {/* Moldura de iluminura, com cruzes nos cantos */}
        <div aria-hidden className="pointer-events-none absolute inset-3 sm:inset-5">
          <div className="absolute inset-0 border border-primary/60" />
          <div className="absolute inset-1.5 border border-primary/25" />
          {CORNERS.map((position) => (
            <span
              key={position}
              className={`absolute flex size-6 items-center justify-center bg-parchment text-cardinal ${position} ${position.includes('left') ? '-translate-x-1/2' : 'translate-x-1/2'} ${position.includes('top') ? '-translate-y-1/2' : 'translate-y-1/2'}`}
            >
              <CrossPattee className="size-3" />
            </span>
          ))}
        </div>

        <div className="absolute inset-0">
          <Suspense>
            <ParticleChurch
              morph={morph}
              reducedMotion={reduceMotion}
              wide={wide}
              horizon={horizon}
              layoutTarget={stageRef}
            />
          </Suspense>
        </div>

        {/* Etapa 1: o nome em tinta, com a citação e o convite para rolar */}
        {!reduceMotion && (
          <motion.div
            style={{ opacity: introOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-[14%] flex flex-col items-center px-6 text-center sm:bottom-[16%] wide:bottom-[10%]"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: EASE }}
              className="font-serif text-2xl text-ink italic sm:text-3xl"
            >
              <span lang="la">“Tolle, lege; tolle, lege.”</span>
              <span className="mt-1 block text-lg text-ink-muted sm:text-xl">
                “Toma e lê, toma e lê.”
              </span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
              className="mt-2 rubric text-xs text-cardinal"
            >
              Santo Agostinho, Confissões VIII, 12, 29
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="mt-10 flex flex-col items-center gap-3 rubric text-xs text-primary-strong"
            >
              Role para ver a Palavra edificar a Igreja
              <span className="relative h-10 w-px overflow-hidden bg-ink/15">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-primary-strong"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </motion.div>
          </motion.div>
        )}

        {/*
         * Etapa 2: igreja formada. No celular, o texto fica embaixo.
         * Na tela larga, vira um tríptico: título à esquerda, igreja no centro, chamadas à direita.
         */}
        <motion.div
          style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
          inert={!formed}
          className="absolute inset-x-0 bottom-0 bg-linear-to-t from-parchment via-parchment/90 to-transparent px-8 pt-12 pb-10 wide:inset-y-0 wide:grid wide:grid-cols-[minmax(0,1fr)_36vw_minmax(0,1fr)] wide:items-center wide:bg-none wide:px-14 wide:pt-0 wide:pb-0"
        >
          <div className="max-w-xl wide:max-w-sm wide:justify-self-end wide:text-right">
            <p className="flex items-center gap-3 rubric text-cardinal wide:justify-end wide:text-xs 2xl:text-sm">
              <CrossPattee className="size-3 shrink-0" />
              Uma introdução à fé católica
            </p>
            {/* Como num missal: a capitular em vermelho, o resto em preto */}
            <h1
              id="hero-title"
              className="mt-4 font-serif text-6xl font-medium tracking-tight text-ink sm:text-7xl 2xl:text-8xl"
            >
              <span className="text-cardinal">T</span>olle <span className="text-cardinal">L</span>
              ege
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-muted">
              A Palavra edifica a Igreja. Um caminho simples para conhecer o que ela crê, celebra
              e vive, no seu ritmo.
            </p>
          </div>

          <div className="mt-8 wide:col-start-3 wide:mt-0 wide:max-w-xs wide:justify-self-start">
            <div className="flex flex-wrap items-center gap-6 wide:flex-col wide:items-start">
              <ButtonLink to={routes.trails}>Começar a jornada</ButtonLink>
              <ButtonLink to={routes.mass} variant="text">
                Como funciona a Missa
              </ButtonLink>
            </div>

            <TodayGospelCard className="mt-10 hidden wide:flex" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
