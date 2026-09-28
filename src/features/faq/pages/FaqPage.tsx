import { Search } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { ParishNotice } from '@/components/ui/ParishNotice'
import { normalizeText } from '@/lib/text'
import { FaqList } from '../components/FaqList'
import { faqCategories, faqItems, type FaqCategory } from '../data'

const categories = Object.entries(faqCategories) as [FaqCategory, string][]

export function FaqPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<FaqCategory | null>(null)
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    const terms = normalizeText(deferredQuery).split(/\s+/).filter(Boolean)
    return faqItems.filter((item) => {
      if (category && item.category !== category) return false
      const haystack = normalizeText(`${item.question} ${item.answer.join(' ')}`)
      return terms.every((term) => haystack.includes(term))
    })
  }, [deferredQuery, category])

  return (
    <>
      <title>Dúvidas · Tolle Lege</title>
      <PageHeader
        eyebrow="Dúvidas"
        title="Perguntas que todo mundo faz"
        description="Não existe pergunta boba. Aqui estão as mais comuns de quem está chegando, com respostas diretas."
        glassSeed={57}
      />

      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque por uma palavra: confissão, Maria, roupa…"
            aria-label="Buscar dúvidas"
            className="w-full rounded-full border border-line bg-canvas py-4 pr-5 pl-13 text-ink placeholder:text-ink-muted/70 focus:border-primary focus:ring-4 focus:ring-primary-soft focus:outline-none"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tema">
          <FilterChip active={category === null} onClick={() => setCategory(null)}>
            Todas
          </FilterChip>
          {categories.map(([id, label]) => (
            <FilterChip key={id} active={category === id} onClick={() => setCategory(id)}>
              {label}
            </FilterChip>
          ))}
        </div>

        <div className="mt-10">
          {results.length > 0 ? (
            <FaqList items={results} />
          ) : (
            <p className="rounded-2xl border border-dashed border-line p-10 text-center text-ink-muted">
              Nenhuma dúvida encontrada. Tente outra palavra ou leve sua pergunta à secretaria da
              sua paróquia ou ao padre.
            </p>
          )}
        </div>

        <ParishNotice compact className="mt-12" />
      </section>
    </>
  )
}

type FilterChipProps = { active: boolean; onClick: () => void; children: string }

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-primary/50 hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas"
    >
      {children}
    </button>
  )
}
