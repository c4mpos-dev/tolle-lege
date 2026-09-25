import { ArrowRight, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { routes } from '@/config/routes'
import { useLiturgy } from '../hooks/useLiturgy'
import { liturgicalColorClass } from '../utils/colors'

/** Cartão compacto: "Toma e lê hoje", com a referência do Evangelho do dia. */
export function TodayGospelCard({ className = '' }: { className?: string }) {
  const [today] = useState(() => new Date())
  const { data, isError } = useLiturgy(today)
  const gospel = data?.leituras.evangelho[0]

  if (isError) return null

  return (
    <Link
      to={routes.liturgy}
      className={`group flex items-center gap-4 rounded-2xl border border-line/80 bg-canvas/80 p-4 pr-5 shadow-[0_18px_40px_-20px_rgb(43_38_34/0.35)] backdrop-blur-md transition-colors hover:border-primary/50 ${className}`}
    >
      <span className="flex size-11 shrink-0 items-end justify-center rounded-t-full bg-primary-soft pb-2.5 text-primary-strong">
        <BookOpen className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.65rem] font-semibold tracking-[0.2em] text-primary-strong uppercase">
          Toma e lê hoje
        </span>
        {gospel && data ? (
          <span className="mt-0.5 flex items-center gap-2 text-sm text-ink">
            <span aria-hidden className={`size-2 shrink-0 rounded-full ${liturgicalColorClass[data.cor]}`} />
            <span className="truncate">
              Evangelho: <strong className="font-semibold">{gospel.referencia}</strong>
            </span>
          </span>
        ) : (
          <span className="mt-1 block h-4 w-40 animate-pulse rounded bg-line" />
        )}
      </span>
      <ArrowRight className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
    </Link>
  )
}
