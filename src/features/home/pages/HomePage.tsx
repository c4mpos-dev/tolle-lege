import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { CuriosityGrid, curiosities } from '@/features/curiosities'
import { FaqList, faqItems } from '@/features/faq'
import { LiturgyTodayCard, SaintOfTheDayCard } from '@/features/liturgy'
import { TrailGrid } from '@/features/trails'
import { ClosingCta } from '../components/ClosingCta'
import { ExploreSection } from '../components/ExploreSection'
import { Hero } from '../components/Hero'
import { MassPreview } from '../components/MassPreview'
import { SaintsQuote } from '../components/SaintsQuote'

const featuredFaqIds = ['mass-without-baptism', 'communion-non-catholic', 'worship-mary', 'how-to-confess']
const featuredFaq = faqItems.filter((item) => featuredFaqIds.includes(item.id))

export function HomePage() {
  return (
    <>
      <title>Tolle Lege · Uma introdução à fé católica</title>
      <Hero />

      {/* Trilhas */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Por onde começar"
              title="Cada caminho começa de um lugar"
              description="Escolha a trilha que mais se parece com a sua história. Você pode mudar quando quiser."
            />
          </Reveal>
          <div className="mt-16">
            <TrailGrid />
          </div>
        </div>
      </section>

      <MassPreview />

      <ExploreSection />

      {/* Liturgia de hoje */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="Liturgia de hoje"
              title="A mesma Palavra, no mundo inteiro"
              description="Todos os dias, em cada Missa do mundo, a Igreja lê as mesmas passagens da Bíblia. Leia as de hoje e reze junto."
            />
            <SaintOfTheDayCard className="mt-10 max-w-xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <LiturgyTodayCard />
          </Reveal>
        </div>
      </section>

      {/* Curiosidades */}
      <section className="border-y border-line bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeader
                eyebrow="Curiosidades"
                title="Você sabia?"
                description="Toque nas cartas para descobrir."
              />
            </Reveal>
            <ButtonLink to={routes.curiosities} variant="text" className="shrink-0">
              Ver todas as curiosidades
            </ButtonLink>
          </div>
          <div className="mt-12">
            <CuriosityGrid items={curiosities.slice(0, 3)} />
          </div>
        </div>
      </section>

      {/* Dúvidas */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[2fr_3fr] lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="Dúvidas"
              title="Não existe pergunta boba"
              description="As perguntas mais comuns de quem está chegando, com respostas diretas."
            />
            <ButtonLink to={routes.faq} variant="text" className="mt-8">
              Ver todas as dúvidas
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={featuredFaq} />
          </Reveal>
        </div>
      </section>

      <SaintsQuote />

      <ClosingCta />
    </>
  )
}
