import { LiturgyNotFoundError } from '../api/getLiturgy'
import { useLiturgy } from '../hooks/useLiturgy'
import { liturgicalColorClass } from '../utils/colors'
import { ReadingsTabs } from './ReadingsTabs'

/** Liturgia completa de uma data: título, cor, oração do dia e leituras. */
export function LiturgyReader({ date }: { date: Date }) {
  const { data, error, isPending, isError, refetch } = useLiturgy(date)

  if (isPending) return <LiturgySkeleton />

  if (isError) {
    return (
      <div className="rounded-2xl border border-line bg-canvas p-6">
        <p className="text-ink/80">
          {error instanceof LiturgyNotFoundError
            ? error.message
            : 'Não foi possível carregar a liturgia deste dia.'}
        </p>
        {!(error instanceof LiturgyNotFoundError) && (
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 text-sm font-semibold text-ink underline underline-offset-4"
          >
            Tentar novamente
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      <header>
        <h2 className="font-serif text-3xl font-medium tracking-tight text-balance text-ink sm:text-5xl">
          {data.liturgia}
        </h2>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted">
          <span aria-hidden className={`size-3 rounded-full ${liturgicalColorClass[data.cor]}`} />
          Cor litúrgica: {data.cor}
        </p>
      </header>

      <figure className="mt-10 rounded-2xl border border-line bg-canvas p-6">
        <figcaption className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
          Oração do dia
        </figcaption>
        <blockquote className="mt-3 font-serif text-lg leading-relaxed whitespace-pre-line text-ink/80 italic">
          {data.oracoes.coleta}
        </blockquote>
      </figure>

      <div className="mt-8 rounded-2xl border border-line bg-canvas p-5 sm:p-10">
        <ReadingsTabs liturgy={data} />
      </div>
    </>
  )
}

function LiturgySkeleton() {
  return (
    <div className="animate-pulse" role="status" aria-label="Carregando liturgia">
      <div className="h-12 w-3/4 rounded bg-line" />
      <div className="mt-4 h-4 w-1/3 rounded bg-line" />
      <div className="mt-10 h-32 rounded-2xl bg-line" />
      <div className="mt-8 h-96 rounded-2xl bg-line" />
    </div>
  )
}
