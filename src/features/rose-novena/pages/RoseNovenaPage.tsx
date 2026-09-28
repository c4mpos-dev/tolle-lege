import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { NovenaPrayer } from '../components/NovenaPrayer'
import { RoseGarden } from '../components/RoseGarden'
import { useNovenaProgress } from '../hooks/useNovenaProgress'
import { howToPray, novenaMoment, ordinalDay, theresaFacts, theresaQuotes } from '../novena'

export function RoseNovenaPage() {
  const [today] = useState(() => new Date())
  const moment = novenaMoment(today)
  const day = moment.kind === 'novena' ? moment.day : null
  const { days, markDay } = useNovenaProgress(today.getFullYear())

  const status =
    moment.kind === 'novena'
      ? `Hoje é o ${ordinalDay(moment.day)} da novena.`
      : moment.kind === 'feast'
        ? 'Hoje é a festa de Santa Teresinha!'
        : 'A novena é rezada de 22 a 30 de setembro, mas pode ser feita em qualquer época do ano.'

  return (
    <>
      <title>Novena das Rosas · Tolle Lege</title>
      <PageHeader
        eyebrow="Rezar"
        title="Novena das Rosas"
        description="Nove dias de oração a Santa Teresinha do Menino Jesus, que prometeu passar o seu Céu fazendo o bem sobre a terra."
        glassSeed={1001}
      >
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-soft px-4 py-2 text-sm font-semibold text-rose">
          🌹 {status}
        </p>
      </PageHeader>

      {/* Rezar hoje */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Reveal>
          <SectionHeader
            eyebrow={day ? `Rezar o ${ordinalDay(day)}` : 'Rezar agora'}
            title="A rosa desabrocha com a sua oração"
            description="Reze a oração da novena e, depois, os 24 Glórias ao Pai. A cada um, a rosa se abre um pouco mais."
          />
        </Reveal>
        <Reveal className="mt-10">
          <NovenaPrayer day={day} onComplete={() => day && markDay(day)} />
        </Reveal>
      </section>

      {/* Jardim */}
      <section className="border-y border-line bg-rose-soft/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeader
              eyebrow="Seu jardim"
              title={`${days.length} de 9 rosas`}
              description="Cada dia rezado faz florescer uma rosa. O progresso fica salvo só neste navegador. Começou no meio? Tudo bem: reze a partir de hoje."
            />
          </Reveal>
          <Reveal className="mt-10">
            <RoseGarden prayed={days} today={day} />
          </Reveal>
        </div>
      </section>

      {/* Santa Teresinha */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <Reveal>
            <SectionHeader eyebrow="Quem foi" title="Santa Teresinha do Menino Jesus" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/85">
              <p>
                Teresa Martin entrou no Carmelo de Lisieux, na França, aos 15 anos, e morreu de
                tuberculose aos 24. Nunca fez grandes obras nem saiu do convento, e mesmo assim se
                tornou uma das santas mais amadas do mundo.
              </p>
              <p>
                Seu segredo foi a <strong className="text-ink">“pequena via”</strong>: um caminho de
                santidade feito de confiança total em Deus, como a de uma criança nos braços do pai,
                e de amor colocado nas pequenas coisas de cada dia. Ela comparava Jesus a um
                elevador: incapaz de subir sozinha a “escada” da perfeição, deixava-se levar por
                ele.
              </p>
              <p>
                Suas memórias, publicadas como <cite>História de uma Alma</cite>, espalharam essa
                espiritualidade pelo mundo. Em 1997, São João Paulo II a declarou Doutora da Igreja.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="divide-y divide-line rounded-3xl border border-line bg-canvas">
              {theresaFacts.map((fact) => (
                <div key={fact.label} className="px-6 py-4">
                  <dt className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">{fact.label}</dt>
                  <dd className="mt-1 text-ink/85">{fact.value}</dd>
                </div>
              ))}
              <div className="px-6 py-4">
                <dt className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">Festa</dt>
                <dd className="mt-1 text-ink/85">1º de outubro</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {theresaQuotes.map((quote, index) => (
            <Reveal as="li" key={quote} delay={index * 0.06} className="rounded-2xl bg-rose-soft/60 p-6">
              <p className="font-serif text-xl leading-snug text-ink italic">“{quote}”</p>
              <p className="mt-3 text-sm text-ink-muted">Santa Teresinha</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Sobre a novena */}
      <section className="bg-ink py-16 text-canvas sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="rubric text-primary">Sobre a novena</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight">Por que rosas?</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-canvas/80">
              <p>
                Pouco antes de morrer, Teresinha prometeu: “Depois da minha morte, farei cair uma
                chuva de rosas”. Por isso ela é representada com rosas nos braços, e por isso muitos
                pedem a ela uma rosa como sinal de que sua oração foi ouvida.
              </p>
              <p>
                Segundo a tradição, esta novena nasceu em 1925, quando um padre jesuíta, o padre
                Putigan, pediu a graça e uma rosa como sinal, e a recebeu antes do fim dos nove dias.
              </p>
              <p className="rounded-xl bg-canvas/5 p-4 text-sm text-canvas/70">
                Receber uma rosa, real ou simbólica, é um consolo, não uma condição nem uma garantia.
                O essencial da novena é a confiança em Deus, que Teresinha viveu como ninguém.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="rubric text-primary">Como rezar</p>
            <ol className="mt-6 space-y-4">
              {howToPray.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose font-serif text-canvas">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-canvas/85">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  )
}
