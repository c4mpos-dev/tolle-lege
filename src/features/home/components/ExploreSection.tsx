import { ArrowUpRight, BookA, Droplets, Footprints, HandHeart, Sparkles } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { colorStyles, liturgicalYearFor, weekLabel } from '@/features/liturgical-year'

/** Vitrine "bento" das páginas de aprofundamento. */
export function ExploreSection() {
  const [today] = useState(() => new Date())
  const { season, seasons } = liturgicalYearFor(today)

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="Aprofunde"
            title="Para ir além do primeiro passo"
            description="Conteúdos para entender, rezar e viver a fé com mais profundidade."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Ano litúrgico, com o tempo atual */}
          <Reveal className="lg:col-span-2">
            <Tile to={routes.liturgicalYear} className="bg-ink text-canvas">
              <div className="flex h-full flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                    Ano litúrgico
                  </p>
                  <p className="mt-4 font-serif text-4xl sm:text-5xl">{season.name}</p>
                  <p className="mt-2 text-canvas/70">{weekLabel(today, season, seasons)}</p>
                  <p className="mt-6 max-w-sm text-sm text-canvas/60">
                    Veja a roda do ano, o sentido das cores e as próximas festas.
                  </p>
                </div>
                <span
                  aria-hidden
                  className={`h-28 w-20 shrink-0 rounded-t-full sm:h-36 sm:w-24 ${colorStyles[season.color].swatch}`}
                />
              </div>
            </Tile>
          </Reveal>

          <Reveal delay={0.08}>
            <Tile to={routes.prayers} className="bg-primary-soft">
              <Sparkles className="size-7 text-primary-strong" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-2xl text-ink">Orações e Terço</h3>
              <p className="mt-2 text-sm text-ink-muted">
                As orações essenciais e um terço guiado, conta por conta.
              </p>
            </Tile>
          </Reveal>

          {/* Visita guiada: destaque em toda a largura */}
          <Reveal className="md:col-span-2 lg:col-span-3">
            <Tile
              to={routes.tour}
              className="bg-[radial-gradient(ellipse_at_80%_50%,rgb(176_141_87/0.35),transparent_60%)] bg-ink text-canvas"
            >
              <div className="flex h-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="size-3.5" />
                    Novo
                  </p>
                  <h3 className="mt-4 font-serif text-3xl sm:text-4xl">Visita guiada</h3>
                  <p className="mt-3 leading-relaxed text-canvas/75">
                    Percorra a Igreja Matriz em 3D, da escadaria ao galo no alto da torre, e depois
                    entre para descobrir o sentido do altar, do ambão, do sacrário e da pia batismal.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-canvas px-5 py-2.5 text-sm font-semibold text-ink">
                    <Footprints className="size-4" />
                    Começar a visita
                  </span>
                </div>

                {/* Pontos numerados, como na visita */}
                <div aria-hidden className="relative mx-auto h-36 w-44 shrink-0 sm:mx-0">
                  <div className="absolute inset-x-6 top-4 bottom-0 rounded-t-full border-2 border-canvas/25" />
                  {[
                    ['1', 'left-1/2 bottom-2 -translate-x-1/2'],
                    ['2', 'left-4 top-12'],
                    ['3', 'left-1/2 top-0 -translate-x-1/2'],
                    ['4', 'right-3 top-16'],
                  ].map(([n, position]) => (
                    <span
                      key={n}
                      className={`absolute flex size-9 items-center justify-center rounded-full border-2 border-ink bg-primary-strong font-serif text-sm text-canvas shadow-lg ${position}`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </Tile>
          </Reveal>

          <Reveal>
            <Tile to={routes.sacraments} className="border border-line bg-canvas">
              <Droplets className="size-7 text-marian" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-2xl text-ink">Os sete sacramentos</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Batismo, Crisma, Eucaristia, Confissão, Unção, Ordem e Matrimônio.
              </p>
            </Tile>
          </Reveal>

          <Reveal delay={0.08}>
            <Tile to={routes.confession} className="bg-sage-soft">
              <HandHeart className="size-7 text-sage" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-2xl text-ink">Como se confessar</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Passo a passo e exame de consciência, para quem faz tempo ou nunca foi.
              </p>
            </Tile>
          </Reveal>

          <Reveal delay={0.16}>
            <Tile to={routes.glossary} className="border border-line bg-canvas">
              <BookA className="size-7 text-terracotta" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-2xl text-ink">Glossário da fé</h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Exemplos de termos">
                {['Ambão', 'Sacrário', 'Homilia', 'Círio'].map((term) => (
                  <li key={term} className="rounded-full bg-surface px-3 py-1 text-xs text-ink-muted">
                    {term}
                  </li>
                ))}
              </ul>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Tile({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className={`group relative flex h-full min-h-56 flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-8 ${className}`}
    >
      <ArrowUpRight
        aria-hidden
        className="absolute top-6 right-6 size-5 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
      {children}
    </Link>
  )
}
