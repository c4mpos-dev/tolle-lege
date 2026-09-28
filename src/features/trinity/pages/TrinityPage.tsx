import { PageHeader } from '@/components/layout/PageHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { routes } from '@/config/routes'
import { AnalogyCard } from '../components/AnalogyCard'
import { ShieldOfTrinity } from '../components/ShieldOfTrinity'
import { analogies, heresies, trinityInScripture, trinityRules } from '../data'

export function TrinityPage() {
  return (
    <>
      <title>Santíssima Trindade · Tolle Lege</title>
      <PageHeader
        eyebrow="Aprender"
        title="A Santíssima Trindade"
        description="Um só Deus em três Pessoas: Pai, Filho e Espírito Santo. O que isso quer dizer, onde está na Bíblia e por que tantas comparações populares acabam em heresias antigas."
        glassSeed={3}
      >
        <nav aria-label="Nesta página" className="mt-8 flex flex-wrap gap-2 text-sm">
          {[
            ['#o-que-e', 'O que é'],
            ['#biblia', 'Na Bíblia'],
            ['#analogias', 'Analogias'],
            ['#heresias', 'Heresias'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-line bg-canvas px-4 py-2 hover:border-primary/50">
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* O mistério central */}
      <section className="mx-auto max-w-5xl px-6 pt-16 sm:pt-24">
        <Reveal className="rounded-3xl bg-ink p-8 text-canvas sm:p-10">
          <blockquote className="font-serif text-2xl leading-snug text-balance sm:text-3xl">
            “O mistério da Santíssima Trindade é o mistério central da fé e da vida cristã. É o
            mistério de Deus em si mesmo.”
          </blockquote>
          <p className="mt-4 text-sm text-canvas/60">Catecismo da Igreja Católica, § 234</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-canvas/80">
            “Mistério” não quer dizer contradição, nem algo em que é proibido pensar. Quer dizer uma
            verdade que só conhecemos porque Deus a revelou, e que é grande demais para caber
            inteira na nossa razão. Podemos entendê-la cada vez melhor, sem nunca esgotá-la.
          </p>
        </Reveal>
      </section>

      {/* O que é */}
      <section id="o-que-e" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16 sm:py-24 lg:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="O que é"
            title="Quatro frases que resumem tudo"
            description="Se uma explicação contradiz qualquer uma delas, está errada."
          />
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trinityRules.map((rule, index) => (
            <Reveal as="li" key={rule.title} delay={index * 0.06} className="rounded-2xl border border-line bg-canvas p-6">
              <span className="font-serif text-4xl text-primary">{index + 1}</span>
              <h3 className="mt-3 font-serif text-xl font-medium text-ink">{rule.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{rule.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 rounded-3xl border border-line bg-surface p-6 sm:p-10">
          <p className="rubric text-primary-strong">
            O Escudo da Trindade
          </p>
          <p className="mt-2 max-w-2xl text-ink-muted">
            Um diagrama usado desde a Idade Média para ensinar a fé. As linhas douradas dizem “é”;
            as terracota dizem “não é”.
          </p>
          <div className="mt-8">
            <ShieldOfTrinity />
          </div>
        </Reveal>

        <Reveal className="mt-8 rounded-2xl border border-line p-6 text-sm leading-relaxed text-ink/80">
          <p>
            <strong className="text-ink">Duas palavras ajudam:</strong> <em>natureza</em> responde “o
            que” Deus é, e é uma só. <em>Pessoa</em> responde “quem” é Deus, e são três. Por isso
            não há contradição: não dizemos “um Deus e três deuses”, nem “uma Pessoa e três
            Pessoas”. As três Pessoas se distinguem apenas pelas relações entre si: o Pai gera, o
            Filho é gerado, o Espírito Santo procede.
          </p>
        </Reveal>
      </section>

      {/* Na Bíblia */}
      <section id="biblia" className="scroll-mt-20 border-y border-line bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="Na Bíblia"
              title="A palavra não está lá, a verdade está"
              description="O termo “Trindade” surgiu no fim do século II para dar nome ao que a Escritura já mostra: o Pai, o Filho e o Espírito Santo agindo juntos, cada um sendo Deus."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {trinityInScripture.map((passage, index) => (
              <Reveal key={passage.reference} delay={(index % 2) * 0.06}>
                <figure className="h-full rounded-2xl border border-line bg-canvas p-6">
                  <blockquote className="font-serif text-lg leading-relaxed text-ink/85 italic">
                    “{passage.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-primary-strong">
                    {passage.reference}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Analogias */}
      <section id="analogias" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16 sm:py-24 lg:px-10">
        <Reveal>
          <SectionHeader
            eyebrow="Analogias"
            title="Água, ovo, sorvete napolitano…"
            description="Muita gente tenta explicar a Trindade com comparações do dia a dia. A intenção é boa, mas quase todas caem, sem querer, numa heresia que a Igreja já rejeitou há séculos. Teste você mesmo."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {analogies.map((analogy, index) => (
            <Reveal key={analogy.id} delay={(index % 4) * 0.05}>
              <AnalogyCard analogy={analogy} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Heresias */}
      <section id="heresias" className="scroll-mt-20 bg-ink py-16 text-canvas sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="rubric text-primary">Heresias antigas</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Os erros que ajudaram a Igreja a falar certo
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-canvas/70">
              Heresia é negar com obstinação uma verdade da fé, e não simplesmente ter dúvidas. Curiosamente, foi respondendo a elas que
              a Igreja encontrou as palavras precisas que usamos até hoje no Credo.
            </p>
          </Reveal>

          <div className="mt-12 space-y-5">
            {heresies.map((heresy) => (
              <Reveal key={heresy.id}>
                <article id={heresy.id} className="scroll-mt-24 rounded-3xl border border-canvas/10 bg-canvas/5 p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-3xl text-canvas">{heresy.name}</h3>
                    <p className="text-sm text-canvas/50">{heresy.period}</p>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] text-terracotta uppercase">O que dizia</p>
                      <p className="mt-2 leading-relaxed text-canvas/80">{heresy.claim}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Por que está errado</p>
                      <p className="mt-2 leading-relaxed text-canvas/80">{heresy.whyWrong}</p>
                    </div>
                  </div>

                  <figure className="mt-6 border-l-2 border-primary/60 pl-4">
                    <blockquote className="font-serif text-lg text-canvas/90 italic">“{heresy.scripture.text}”</blockquote>
                    <figcaption className="mt-1 text-sm text-canvas/50">{heresy.scripture.reference}</figcaption>
                  </figure>

                  <p className="mt-6 rounded-xl bg-canvas/5 px-4 py-3 text-sm text-canvas/75">
                    <span className="font-semibold text-canvas">A resposta da Igreja: </span>
                    {heresy.response}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Como pensar */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <Reveal>
          <SectionHeader
            eyebrow="Então, como pensar?"
            title="Com humildade, e começando pelo amor"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-canvas p-7">
            <h3 className="font-serif text-2xl text-ink">O Amante, o Amado e o Amor</h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              Santo Agostinho, em sua obra <cite>A Trindade</cite>, parte da frase “Deus é amor” (1Jo
              4,8). Todo amor envolve quem ama, quem é amado e o próprio amor que os une. É uma
              imagem que fala de relações, e não de peças ou de disfarces.
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Mesmo ela é só uma aproximação: nenhuma comparação criada esgota o Criador.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="rounded-3xl border border-line bg-canvas p-7">
            <h3 className="font-serif text-2xl text-ink">O menino na praia</h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              Conta uma tradição que Agostinho caminhava na praia pensando na Trindade quando viu um
              menino tentando colocar o mar inteiro num buraco na areia. “É impossível”, disse o
              santo. “Mais fácil eu fazer isso”, respondeu o menino, “do que o senhor compreender o
              mistério de Deus.”
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              É uma lenda piedosa, não um fato histórico, mas guarda uma verdade.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-5 rounded-3xl bg-primary-soft p-7 sm:p-10">
          <p className="rubric text-primary-strong">
            Para guardar
          </p>
          <blockquote className="mt-3 font-serif text-2xl leading-snug text-ink sm:text-3xl">
            “Veneramos um só Deus na Trindade, e a Trindade na unidade, sem confundir as Pessoas nem
            separar a substância.”
          </blockquote>
          <p className="mt-3 text-sm text-ink-muted">Símbolo “Quicumque”, dito Atanasiano (séc. V–VI)</p>
          <p className="mt-6 leading-relaxed text-ink/80">
            “Sem confundir as Pessoas” afasta o modalismo. “Sem separar a substância” afasta o
            triteísmo e o parcialismo. Em uma frase, a Igreja protege a fé de todos esses erros.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <ButtonLink to={`${routes.prayers}#glory-be`}>Rezar o Glória ao Pai</ButtonLink>
            <ButtonLink to={`${routes.prayers}#apostles-creed`} variant="text">
              Ler o Credo
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
