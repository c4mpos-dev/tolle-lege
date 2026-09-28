import { PageHeader } from '@/components/layout/PageHeader'
import { ParishNotice } from '@/components/ui/ParishNotice'
import { Reveal } from '@/components/ui/Reveal'
import { SacramentCard } from '../components/SacramentCard'
import { sacramentGroups, sacraments } from '../data'

export function SacramentsPage() {
  return (
    <>
      <title>Sacramentos · Tolle Lege</title>
      <PageHeader
        eyebrow="Aprender"
        title="Os sete sacramentos"
        description="Sinais visíveis pelos quais Deus age de verdade na vida de cada pessoa, do nascimento na fé até o fim da vida."
        glassSeed={71}
      >
        <nav aria-label="Sacramentos" className="mt-8 flex flex-wrap gap-2 text-sm">
          {sacraments.map((sacrament) => (
            <a
              key={sacrament.id}
              href={`#${sacrament.id}`}
              className="rounded-full border border-line bg-canvas px-3.5 py-1.5 hover:border-primary/50"
            >
              {sacrament.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <Reveal className="rounded-3xl bg-ink p-8 text-canvas sm:p-10">
          <p className="rubric text-primary">
            O que é um sacramento?
          </p>
          <blockquote className="mt-4 font-serif text-2xl leading-snug text-balance sm:text-3xl">
            “Sinais eficazes da graça, instituídos por Cristo e confiados à Igreja, pelos quais nos
            é concedida a vida divina.”
          </blockquote>
          <p className="mt-4 text-sm text-canvas/60">Catecismo da Igreja Católica, § 1131</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-canvas/80">
            Em outras palavras: algo que se vê (água, óleo, pão, palavras) torna presente algo que
            não se vê, a ação do próprio Deus. Não é um símbolo vazio: o sacramento realiza aquilo
            que significa.
          </p>
        </Reveal>

        {sacramentGroups.map((group) => {
          const items = sacraments.filter((sacrament) => sacrament.group === group.id)
          return (
            <div key={group.id} className="mt-20">
              <Reveal>
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{group.title}</h2>
                <p className="mt-2 text-lg text-ink-muted">{group.description}</p>
              </Reveal>
              <div className="mt-8 space-y-6">
                {items.map((sacrament) => (
                  <Reveal key={sacrament.id}>
                    <SacramentCard
                      sacrament={sacrament}
                      number={sacraments.indexOf(sacrament) + 1}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}

        <ParishNotice className="mt-20" />
      </section>
    </>
  )
}
