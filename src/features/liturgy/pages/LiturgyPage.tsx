import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { LiturgyReader } from '../components/LiturgyReader'
import { addDays, formatLongDate, isSameDay, toDateKey } from '../utils/date'

export function LiturgyPage() {
  const [today] = useState(() => new Date())
  const [date, setDate] = useState(today)
  const isToday = isSameDay(date, today)

  return (
    <>
      <title>Liturgia diária · Tolle Lege</title>
      <PageHeader
        eyebrow="Liturgia diária"
        title="A Palavra de cada dia"
        description="As leituras, o salmo e o Evangelho que a Igreja inteira lê hoje, em cada Missa no mundo."
        glassSeed={41}
      />

      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* Navegação entre dias */}
        <div className="mb-10 flex items-center justify-between gap-4 rounded-full border border-line bg-canvas p-1.5">
          <button
            type="button"
            onClick={() => setDate((d) => addDays(d, -1))}
            aria-label="Dia anterior"
            className="rounded-full p-2.5 text-ink-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="text-center">
            <p className="text-sm font-semibold text-ink">{formatLongDate(date)}</p>
            {isToday ? (
              <p className="text-xs text-primary-strong">Hoje</p>
            ) : (
              <button
                type="button"
                onClick={() => setDate(today)}
                className="text-xs text-ink-muted underline underline-offset-2 hover:text-ink"
              >
                Voltar para hoje
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setDate((d) => addDays(d, 1))}
            aria-label="Próximo dia"
            className="rounded-full p-2.5 text-ink-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* key: reinicia abas e opções ao trocar de dia */}
        <LiturgyReader key={toDateKey(date)} date={date} />
      </section>
    </>
  )
}
