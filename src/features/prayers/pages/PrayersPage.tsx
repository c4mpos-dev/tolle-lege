import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PrayerCard } from '../components/PrayerCard'
import { RosaryGuide } from '../components/RosaryGuide'
import { essentialPrayers, prayers } from '../data'
import { mysterySets } from '../rosary'

export function PrayersPage() {
  return (
    <>
      <title>Orações e Terço · Tolle Lege</title>
      <PageHeader
        eyebrow="Rezar"
        title="Orações e Terço"
        description="Rezar é conversar com Deus. Estas são as orações que todo católico conhece, e um terço guiado para rezar conta por conta."
        glassSeed={131}
      >
        <nav aria-label="Nesta página" className="mt-8 flex flex-wrap gap-2 text-sm">
          <a href="#essenciais" className="rounded-full border border-line bg-canvas px-4 py-2 hover:border-primary/50">
            Orações essenciais
          </a>
          <a href="#terco" className="rounded-full border border-line bg-canvas px-4 py-2 hover:border-primary/50">
            Terço guiado
          </a>
        </nav>
      </PageHeader>

      <section id="essenciais" className="scroll-mt-20 mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="Para aprender de cor"
            title="Orações essenciais"
            description="Comece pelas quatro primeiras. As outras vêm naturalmente com o tempo."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {essentialPrayers.map((id, index) => (
            <Reveal key={id} delay={(index % 3) * 0.06}>
              <PrayerCard prayer={prayers[id]} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="terco" className="scroll-mt-20 border-t border-line bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="Terço guiado"
              title="Rezar o terço, conta por conta"
              description="O terço é uma oração meditativa: enquanto as Ave-Marias se repetem, contemplamos cenas da vida de Jesus, os mistérios. Siga os passos abaixo; já deixamos marcados os mistérios de hoje."
            />
          </Reveal>

          <Reveal className="mt-12">
            <RosaryGuide />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(mysterySets).map((set) => (
              <Reveal key={set.id} className="rounded-2xl border border-line bg-canvas p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
                  {set.days}
                </p>
                <h3 className="mt-2 font-serif text-xl text-ink">{set.title}</h3>
                <ol className="mt-4 space-y-2 text-sm text-ink/80">
                  {set.mysteries.map((mystery, index) => (
                    <li key={mystery.title} className="flex gap-2">
                      <span className="font-serif text-primary-strong">{index + 1}.</span>
                      <span>
                        {mystery.title}{' '}
                        <span className="text-ink-muted">({mystery.reference})</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
