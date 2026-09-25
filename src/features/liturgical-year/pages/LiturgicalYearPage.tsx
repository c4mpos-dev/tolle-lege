import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SeasonWheel } from '../components/SeasonWheel'
import { daysBetween, liturgicalYearFor, upcomingFeasts, weekLabel, type SeasonId } from '../calendar'
import { colorMeanings, colorStyles, seasonDescriptions } from '../seasonInfo'

const shortDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' })
const fullDate = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

export function LiturgicalYearPage() {
  const [today] = useState(() => new Date())
  const { seasons, season: current } = liturgicalYearFor(today)
  const [selectedId, setSelectedId] = useState<SeasonId>(current.id)
  const selected = seasons.find((s) => s.id === selectedId) ?? current
  const isCurrent = selected.id === current.id
  const nextSeason = seasons[seasons.indexOf(current) + 1]
  const daysToNext = nextSeason ? daysBetween(today, nextSeason.start) : null
  const feasts = upcomingFeasts(today)

  return (
    <>
      <title>Ano litúrgico · Tolle Lege</title>
      <PageHeader
        eyebrow="Aprender"
        title="O ano litúrgico"
        description="A Igreja vive o tempo de um jeito próprio: ao longo do ano, percorre toda a vida de Jesus, do nascimento à Ressurreição. Cada tempo tem seu clima e sua cor."
        glassSeed={97}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <SeasonWheel seasons={seasons} today={today} selected={selected.id} onSelect={setSelectedId}>
            <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-primary-strong uppercase sm:text-xs">
              {isCurrent ? 'Estamos no' : 'Tempo do'}
            </p>
            <p className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">{selected.name}</p>
            {isCurrent && (
              <p className="mt-2 text-xs text-ink-muted sm:text-sm">{weekLabel(today, current, seasons)}</p>
            )}
          </SeasonWheel>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm text-ink-muted first-letter:uppercase">{fullDate.format(today)}</p>
          <h2 className="mt-2 font-serif text-4xl font-medium text-ink sm:text-5xl">{selected.name}</h2>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-muted">
            <span aria-hidden className={`size-3 rounded-full ${colorStyles[selected.color].swatch}`} />
            {selected.id === 'triduum' ? 'Branco e vermelho' : colorStyles[selected.color].label} ·{' '}
            {shortDate.format(selected.start)} a {shortDate.format(selected.end)}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">{seasonDescriptions[selected.id]}</p>

          {isCurrent && nextSeason && daysToNext !== null && (
            <p className="mt-6 rounded-xl bg-primary-soft px-4 py-3 text-sm text-ink">
              Faltam <strong>{daysToNext} dias</strong> para o início do tempo de{' '}
              <strong>{nextSeason.name}</strong>.
            </p>
          )}

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tempos do ano">
            {seasons.map((season) => (
              <li key={season.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(season.id)}
                  aria-pressed={season.id === selected.id}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink aria-pressed:border-ink aria-pressed:text-ink"
                >
                  <span aria-hidden className={`size-2.5 rounded-full ${colorStyles[season.color].swatch}`} />
                  {season.name}
                  {season.id === current.id && <span className="text-primary-strong">· agora</span>}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[2fr_3fr] lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="No calendário"
              title="Próximas datas"
              description="As principais celebrações que vêm por aí. As datas móveis dependem da Páscoa, que muda todo ano."
            />
          </Reveal>
          <ol className="divide-y divide-line rounded-2xl border border-line bg-canvas">
            {feasts.map((feast) => {
              const days = daysBetween(today, feast.date)
              return (
                <Reveal as="li" key={feast.name} className="flex items-center gap-5 p-5">
                  <div className="w-14 shrink-0 text-center">
                    <p className="font-serif text-2xl leading-none text-ink">{feast.date.getDate()}</p>
                    <p className="mt-1 text-xs text-ink-muted uppercase">
                      {shortDate.formatToParts(feast.date).find((p) => p.type === 'month')?.value}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink">{feast.name}</p>
                    {feast.note && <p className="text-sm text-ink-muted">{feast.note}</p>}
                  </div>
                  <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-strong">
                    {days === 0 ? 'Hoje' : days === 1 ? 'Amanhã' : `em ${days} dias`}
                  </span>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-10">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="As cores"
            title="Por que o padre muda de cor?"
            description="A cor das vestes e do altar indica o tempo ou a festa do dia. É uma catequese para os olhos."
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {colorMeanings.map((color, index) => (
            <Reveal as="li" key={color.name} delay={index * 0.06} className="rounded-2xl border border-line bg-canvas p-6">
              <span aria-hidden className={`block h-16 rounded-t-full ${color.swatch}`} />
              <p className="mt-4 font-serif text-xl text-ink">{color.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{color.meaning}</p>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
