import { useState } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { routes } from '@/config/routes'
import { useLiturgy } from '../hooks/useLiturgy'
import { liturgicalColorClass } from '../utils/colors'
import { formatLongDate } from '../utils/date'

/** Resumo da liturgia de hoje: nome do dia, cor, refrão do salmo e Evangelho. */
export function LiturgyTodayCard() {
  const [today] = useState(() => new Date())
  const { data, isPending, isError } = useLiturgy(today)

  return (
    <article className="relative overflow-hidden rounded-3xl border border-line bg-canvas p-8 sm:p-10">
      <p className="text-sm text-ink-muted">{formatLongDate(today)}</p>

      {isPending && (
        <div className="mt-4 animate-pulse space-y-4" role="status" aria-label="Carregando liturgia">
          <div className="h-9 w-4/5 rounded bg-line" />
          <div className="h-20 rounded-xl bg-line" />
        </div>
      )}

      {isError && (
        <p className="mt-4 text-ink/80">A liturgia de hoje não pôde ser carregada agora.</p>
      )}

      {data && (
        <>
          <h3 className="mt-2 font-serif text-3xl font-medium text-balance text-ink">
            {data.liturgia}
          </h3>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-muted">
            <span aria-hidden className={`size-3 rounded-full ${liturgicalColorClass[data.cor]}`} />
            Cor litúrgica: {data.cor}
          </p>

          {data.leituras.salmo[0] && (
            <blockquote className="mt-8 border-l-2 border-primary/50 pl-4 font-serif text-xl text-ink/85 italic">
              “{data.leituras.salmo[0].refrao}”
              <footer className="mt-1 font-sans text-sm text-ink-muted not-italic">
                {data.leituras.salmo[0].referencia}
              </footer>
            </blockquote>
          )}

          {data.leituras.evangelho[0] && (
            <p className="mt-6 text-sm text-ink-muted">
              Evangelho:{' '}
              <span className="font-semibold text-ink">{data.leituras.evangelho[0].referencia}</span>
            </p>
          )}
        </>
      )}

      <ButtonLink to={routes.liturgy} variant="text" className="mt-8">
        Ler a liturgia completa
      </ButtonLink>
    </article>
  )
}
