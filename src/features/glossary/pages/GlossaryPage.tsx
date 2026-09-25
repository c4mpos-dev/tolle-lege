import { ArrowRight, Search } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { PageHeader } from '@/components/layout/PageHeader'
import { normalizeText } from '@/lib/text'
import { glossary, type GlossaryTerm } from '../data'

const firstLetter = (term: string) => normalizeText(term).charAt(0).toUpperCase()
const sortedTerms = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'))
const allLetters = [...new Set(sortedTerms.map((item) => firstLetter(item.term)))]

export function GlossaryPage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const groups = useMemo(() => {
    const needle = normalizeText(deferredQuery)
    const filtered = sortedTerms.filter((item) =>
      normalizeText(`${item.term} ${item.definition}`).includes(needle),
    )
    const byLetter = new Map<string, GlossaryTerm[]>()
    for (const item of filtered) {
      const letter = firstLetter(item.term)
      byLetter.set(letter, [...(byLetter.get(letter) ?? []), item])
    }
    return [...byLetter.entries()]
  }, [deferredQuery])

  return (
    <>
      <title>Glossário · Tolle Lege</title>
      <PageHeader
        eyebrow="Aprender"
        title="Glossário da fé"
        description="Ambão, sacrário, homilia… As palavras que você vai ouvir na igreja, explicadas de um jeito simples."
        glassSeed={173}
      />

      <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="sticky top-16 z-10 -mx-6 bg-canvas/90 px-6 py-4 backdrop-blur-md">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque um termo…"
              aria-label="Buscar no glossário"
              className="w-full rounded-full border border-line bg-canvas py-3.5 pr-5 pl-13 text-ink placeholder:text-ink-muted/70 focus:border-primary focus:ring-4 focus:ring-primary-soft focus:outline-none"
            />
          </div>
          {!deferredQuery && (
            <nav aria-label="Letras" className="mt-3 flex flex-wrap gap-1">
              {allLetters.map((letter) => (
                <a
                  key={letter}
                  href={`#letra-${letter}`}
                  className="flex size-8 items-center justify-center rounded-full font-serif text-sm text-ink-muted transition-colors hover:bg-primary-soft hover:text-ink"
                >
                  {letter}
                </a>
              ))}
            </nav>
          )}
        </div>

        {groups.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-ink-muted">
            Nenhum termo encontrado.
          </p>
        ) : (
          <div className="mt-6 space-y-12">
            {groups.map(([letter, items]) => (
              <section key={letter} id={`letra-${letter}`} className="scroll-mt-44" aria-label={`Letra ${letter}`}>
                <h2 className="font-serif text-5xl text-primary/60">{letter}</h2>
                <dl className="mt-4 divide-y divide-line border-t border-line">
                  {items.map((item) => (
                    <div key={item.term} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                      <dt className="font-serif text-xl text-ink">{item.term}</dt>
                      <dd className="leading-relaxed text-ink/80">
                        {item.definition}
                        {item.link && (
                          <Link
                            to={item.link.to}
                            className="mt-2 flex w-fit items-center gap-1 text-sm font-semibold text-primary-strong hover:text-ink"
                          >
                            {item.link.label}
                            <ArrowRight className="size-3.5" />
                          </Link>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
