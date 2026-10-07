import { ArrowUpRight, ImageDown } from 'lucide-react'
import { useState } from 'react'
import { CrossPattee } from '@/components/ui/CrossPattee'
import { useLiturgy } from '../hooks/useLiturgy'
import { celebrationLabel, parseCelebration, vaticanSaintUrl } from '../utils/celebration'
import { SaintShareDialog } from './SaintShareDialog'

/**
 * Santo do dia: o nome da celebração vem da API da liturgia (calendário litúrgico) e a história
 * fica na fonte oficial, o Vatican News. Nenhum texto sobre o santo é escrito pelo site.
 */
export function SaintOfTheDayCard({ className = '' }: { className?: string }) {
  const [today] = useState(() => new Date())
  const { data, isPending } = useLiturgy(today)
  const celebration = data ? parseCelebration(data.liturgia) : null
  const [sharing, setSharing] = useState(false)

  return (
    <article
      className={`flex gap-5 border border-line bg-canvas p-6 shadow-[0_18px_40px_-28px_rgb(42_34_27/0.4)] sm:p-7 ${className}`}
    >
      {/* Medalhão sépia, como os da hero */}
      <span
        aria-hidden
        className="flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-double border-primary bg-[radial-gradient(circle_at_50%_40%,#d8bd88,#b08a4c_70%,#8a6a35)] text-canvas shadow-[inset_0_0_14px_rgb(60_40_15/0.45)]"
      >
        <CrossPattee className="size-6" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="rubric text-xs text-cardinal">{celebration ? celebrationLabel(celebration) : 'Santo do dia'}</p>

        {isPending ? (
          <div className="mt-3 h-6 w-4/5 animate-pulse rounded bg-line" role="status" aria-label="Carregando" />
        ) : celebration ? (
          <>
            <p className="mt-2 text-sm text-ink-muted">Hoje a Igreja celebra</p>
            <h3 className="mt-1 font-serif text-2xl leading-snug font-medium text-balance text-ink">
              {celebration.name}
            </h3>
            {celebration.rank && (
              <p className="mt-2 text-xs font-semibold tracking-wide text-primary-strong uppercase">
                {celebration.rank}
              </p>
            )}
          </>
        ) : (
          <p className="mt-2 leading-relaxed text-ink-muted">
            Hoje não há festa nem memória no calendário, mas a Igreja recorda santos todos os dias.
          </p>
        )}

        <a
          href={vaticanSaintUrl(today)}
          target="_blank"
          rel="noreferrer"
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Conheça a história do santo de hoje
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <p className="mt-1 text-xs text-ink-muted">No Vatican News, o portal oficial da Santa Sé</p>

        {data && celebration && (
          <button
            type="button"
            onClick={() => setSharing(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            <ImageDown className="size-4" />
            Compartilhar imagem
          </button>
        )}
      </div>

      {sharing && data && celebration && (
        <SaintShareDialog
          celebration={celebration}
          date={data.data}
          color={data.cor}
          onClose={() => setSharing(false)}
        />
      )}
    </article>
  )
}
