import { Church } from 'lucide-react'

type ParishNoticeProps = {
  className?: string
  /** Versão compacta, para o fim de páginas. */
  compact?: boolean
}

/**
 * Lembra que cada história tem particularidades e que a paróquia é quem orienta de verdade.
 * O site é uma introdução; não substitui o acompanhamento da secretaria e do padre.
 */
export function ParishNotice({ className = '', compact = false }: ParishNoticeProps) {
  return (
    <aside
      aria-label="Cada caso é único"
      className={`flex gap-4 rounded-2xl border border-primary/30 bg-primary-soft/70 ${compact ? 'p-5' : 'p-6 sm:p-7'} ${className}`}
    >
      <span className="flex size-10 shrink-0 items-end justify-center rounded-t-full bg-canvas pb-2 text-primary-strong">
        <Church className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="font-serif text-lg font-medium text-ink">Cada caso é único</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">
          O que está aqui é uma orientação geral: cada história tem suas particularidades, e
          algumas regras e costumes mudam de uma diocese para outra. Procure a{' '}
          <strong className="font-semibold text-ink">paróquia mais próxima ou de mais fácil acesso para você</strong>{' '}
          e tire suas dúvidas com a <strong className="font-semibold text-ink">secretaria paroquial</strong> e
          com o <strong className="font-semibold text-ink">padre</strong>.
        </p>
      </div>
    </aside>
  )
}
