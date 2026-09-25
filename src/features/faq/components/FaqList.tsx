import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { FaqItem } from '../data'

/** Perguntas em acordeão (usa <details>, acessível sem JavaScript extra). */
export function FaqList({ items }: { items: FaqItem[] }) {
  const { hash } = useLocation()

  // Chegou por um link direto (ex.: /faq#worship-mary)? Abre a pergunta correspondente.
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target instanceof HTMLDetailsElement) target.open = true
  }, [hash])

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-canvas">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group scroll-mt-24">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-surface/60 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-lg text-ink">{item.question}</span>
            <Plus className="size-5 shrink-0 text-primary-strong transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="space-y-3 px-5 pb-6 leading-relaxed text-ink/80 sm:px-6">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {item.link && (
              <ButtonLink to={item.link.to} variant="text" className="pt-1">
                {item.link.label}
              </ButtonLink>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
