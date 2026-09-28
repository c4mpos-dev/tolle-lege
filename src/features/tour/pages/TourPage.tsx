import { DoorOpen, Hand, Rotate3d } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { ParishNotice } from '@/components/ui/ParishNotice'
import { Reveal } from '@/components/ui/Reveal'
import { Rosette } from '@/components/ui/Rosette'
import { InteriorPlan } from '../components/InteriorPlan'
import { StopPanel } from '../components/StopPanel'
import { exteriorStops, interiorStops } from '../data'

// O three.js é baixado à parte, só quando a visita abre.
const ExteriorScene = lazy(() =>
  import('../components/ExteriorScene').then((m) => ({ default: m.ExteriorScene })),
)

type Part = 'outside' | 'inside'

export function TourPage() {
  const [part, setPart] = useState<Part>('outside')
  const [outsideStop, setOutsideStop] = useState<number | null>(null)
  const [insideStop, setInsideStop] = useState<number | null>(null)

  const goInside = () => {
    setPart('inside')
    setInsideStop(null)
    document.getElementById('visita')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <title>Visita guiada · Tolle Lege</title>

      <section id="visita" className="scroll-mt-16 bg-ink text-canvas">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-6 lg:px-10">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-primary uppercase">
            <Rosette className="size-4" />
            Visita guiada
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            Conheça uma igreja por dentro e por fora
          </h1>

          {/* Por fora / Por dentro */}
          <div className="mt-6 inline-flex rounded-full bg-canvas/10 p-1" role="tablist" aria-label="Parte da visita">
            {(
              [
                ['outside', 'Por fora'],
                ['inside', 'Por dentro'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={part === id}
                onClick={() => setPart(id)}
                className="rounded-full px-5 py-2 text-sm font-semibold text-canvas/70 transition-colors aria-selected:bg-canvas aria-selected:text-ink"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {part === 'outside' ? (
          <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[3fr_2fr] lg:gap-10 lg:px-10">
            <div className="relative h-[55vh] overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_50%_40%,rgb(176_141_87/0.25),transparent_65%)] lg:h-[72vh]">
              <Suspense>
                <ExteriorScene stops={exteriorStops} selected={outsideStop} onSelect={setOutsideStop} />
              </Suspense>
              <p className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-2 text-xs text-canvas/60">
                <Rotate3d className="size-4" />
                Arraste para girar · toque nos números
              </p>
            </div>

            <div className="rounded-3xl border border-canvas/10 bg-canvas/5 p-6 sm:p-8">
              <StopPanel
                dark
                stops={exteriorStops}
                selected={outsideStop}
                onSelect={setOutsideStop}
                intro={
                  <>
                    <h2 className="font-serif text-3xl font-medium">Cada detalhe diz algo</h2>
                    <p className="mt-4 leading-relaxed text-canvas/80">
                      A arquitetura de uma igreja é uma catequese em pedra. Os{' '}
                      {exteriorStops.length} pontos numerados mostram o sentido do que se vê de
                      fora: a porta, a cruz, os sinos, até o galo no alto da torre.
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-sm text-canvas/60">
                      <Hand className="size-4" />
                      Toque em um número ou comece pelo primeiro.
                    </p>
                  </>
                }
                finalAction={
                  <button
                    type="button"
                    onClick={goInside}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-primary-soft"
                  >
                    <DoorOpen className="size-4" />
                    Entrar na igreja
                  </button>
                }
              />
            </div>
          </div>
        ) : (
          <div className="bg-canvas text-ink">
            <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-12 lg:grid-cols-[2fr_3fr] lg:px-10">
              <div className="rounded-3xl border border-line bg-surface p-6">
                <InteriorPlan stops={interiorStops} selected={insideStop} onSelect={setInsideStop} />
                <p className="mt-4 text-center text-xs text-ink-muted">
                  Planta ilustrativa: cada igreja organiza estes espaços do seu jeito.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-canvas p-6 sm:p-8 lg:sticky lg:top-24">
                <StopPanel
                  stops={interiorStops}
                  selected={insideStop}
                  onSelect={setInsideStop}
                  intro={
                    <>
                      <h2 className="font-serif text-3xl font-medium text-ink">Entrando na igreja</h2>
                      <p className="mt-4 leading-relaxed text-ink/85">
                        Do lado de dentro, cada objeto tem um lugar e um significado. Vamos da
                        porta até o altar, na ordem em que você os encontraria ao entrar.
                      </p>
                      <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                        <Hand className="size-4" />
                        Toque em um número ou comece pelo primeiro.
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <Reveal>
          <ParishNotice compact />
        </Reveal>
      </section>
    </>
  )
}
