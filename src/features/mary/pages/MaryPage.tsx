import { Plus } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { DogmaCard } from '../components/DogmaCard'
import { MaryTimeline } from '../components/MaryTimeline'
import { magnificat, marianDogmas, marianFeasts, marianPlaces, maryQuestions } from '../data'

const DAY_MS = 86_400_000
const feastDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' })

/** Próxima ocorrência de cada festa a partir de hoje, em ordem. */
function upcomingFeasts(today: Date) {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return marianFeasts
    .map((feast) => {
      let date = new Date(start.getFullYear(), feast.month, feast.day)
      if (date < start) date = new Date(start.getFullYear() + 1, feast.month, feast.day)
      return { ...feast, date, days: Math.round((date.getTime() - start.getTime()) / DAY_MS) }
    })
    .sort((a, b) => a.days - b.days)
}

export function MaryPage() {
  const [today] = useState(() => new Date())
  const feasts = upcomingFeasts(today)

  return (
    <>
      <title>Maria, Mãe de Jesus · Tolle Lege</title>
      <PageHeader
        eyebrow="Aprender"
        title="Maria, Mãe de Jesus"
        description="Quem foi a jovem de Nazaré, por que os católicos a honram, o que a Igreja ensina sobre ela e as perguntas que mais aparecem."
        glassSeed={2024}
      >
        <nav aria-label="Nesta página" className="mt-8 flex flex-wrap gap-2 text-sm">
          {[
            ['#vida', 'Sua vida'],
            ['#dogmas', 'Os 4 dogmas'],
            ['#duvidas', 'Dúvidas'],
            ['#aparicoes', 'Aparições'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-line bg-canvas px-4 py-2 hover:border-marian/50">
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* Magnificat */}
      <section className="relative isolate overflow-hidden bg-marian py-16 text-canvas sm:py-24">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.25em] text-canvas/70 uppercase">O cântico de Maria</p>
            <blockquote className="mt-6 space-y-1 font-serif text-2xl leading-snug text-balance italic sm:text-3xl">
              {magnificat.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </blockquote>
            <p className="mt-6 text-sm text-canvas/70">Magnificat · Lc 1,46-49</p>
          </Reveal>
        </div>
      </section>

      {/* Vida */}
      <section id="vida" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16 sm:py-24 lg:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="Sua vida"
            title="Uma jovem de Nazaré"
            description="O que os Evangelhos contam sobre Maria. Poucas palavras, mas presentes em todos os momentos decisivos da vida de Jesus."
          />
        </Reveal>
        <div className="mt-6">
          <MaryTimeline />
        </div>
      </section>

      {/* Dogmas */}
      <section id="dogmas" className="scroll-mt-20 border-y border-line bg-marian-soft/60 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="O que a Igreja ensina"
              title="Os quatro dogmas marianos"
              description="Tudo o que a Igreja crê sobre Maria diz algo sobre Jesus. Estes são os quatro pontos definidos como verdades de fé."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {marianDogmas.map((dogma, index) => (
              <Reveal key={dogma.id} delay={(index % 2) * 0.06}>
                <DogmaCard dogma={dogma} number={index + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dúvidas */}
      <section id="duvidas" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-16 sm:py-24">
        <Reveal>
          <SectionHeader eyebrow="Dúvidas" title="As perguntas que mais aparecem" />
        </Reveal>
        <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-canvas">
          {maryQuestions.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-surface/60 sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-lg text-ink">{item.question}</span>
                <Plus className="size-5 shrink-0 text-marian transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <div className="space-y-3 px-5 pb-6 leading-relaxed text-ink/80 sm:px-6">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {item.scripture && (
                  <figure className="border-l-2 border-marian/50 pl-4">
                    <blockquote className="font-serif text-ink/85 italic">“{item.scripture.text}”</blockquote>
                    <figcaption className="mt-1 text-sm text-ink-muted">{item.scripture.reference}</figcaption>
                  </figure>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Aparições */}
      <section id="aparicoes" className="scroll-mt-20 bg-ink py-16 text-canvas sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">Pelo mundo</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">Aparições e devoções</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-canvas/70">
              A Igreja reconhece algumas aparições como dignas de fé. Elas são chamadas de
              “revelações privadas”: ajudam a viver o Evangelho, mas não acrescentam nada a ele, e
              nenhum católico é obrigado a crer nelas (Catecismo, § 67).
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {marianPlaces.map((place, index) => (
              <Reveal as="li" key={place.name} delay={index * 0.06} className="flex flex-col rounded-t-full rounded-b-3xl border border-canvas/10 bg-canvas/5 px-6 pt-12 pb-7 text-center">
                <span className="font-serif text-4xl text-primary">{place.year}</span>
                <h3 className="mt-3 font-serif text-2xl">{place.name}</h3>
                <p className="text-sm text-canvas/50">{place.place}</p>
                <p className="mt-4 text-sm leading-relaxed text-canvas/80">{place.text}</p>
                <span className="mt-auto pt-5 text-xs font-semibold tracking-[0.15em] text-canvas/50 uppercase">
                  {place.kind === 'apparition' ? 'Aparição reconhecida' : 'Imagem e devoção'}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Festas e oração */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="No calendário"
            title="Festas de Nossa Senhora"
            description="Ao longo do ano, a Igreja celebra os mistérios da vida de Maria."
          />
          <ol className="mt-8 divide-y divide-line rounded-2xl border border-line bg-canvas">
            {feasts.map((feast) => (
              <li key={feast.name} className="flex items-center gap-4 p-5">
                <div className="flex-1">
                  <p className="font-medium text-ink">{feast.name}</p>
                  <p className="text-sm text-ink-muted">
                    {feastDate.format(feast.date)}
                    {feast.note && ` · ${feast.note}`}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-marian-soft px-3 py-1 text-xs font-semibold text-marian">
                  {feast.days === 0 ? 'Hoje' : feast.days === 1 ? 'Amanhã' : `em ${feast.days} dias`}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.08} className="self-start rounded-3xl bg-marian-soft p-8 sm:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-marian uppercase">Rezar com Maria</p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-ink">Ela sempre leva a Jesus</h2>
          <p className="mt-4 leading-relaxed text-ink/80">
            Toda devoção mariana verdadeira termina em Cristo. As orações mais tradicionais para
            começar são a Ave-Maria, a Salve-Rainha e o Terço, que medita a vida de Jesus com os
            olhos de Maria.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink to={`${routes.prayers}#terco`}>Rezar o Terço</ButtonLink>
            <ButtonLink to={`${routes.prayers}#hail-mary`} variant="text">
              Ave-Maria
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
