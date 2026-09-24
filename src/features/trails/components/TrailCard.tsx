import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { routes } from '@/config/routes'
import type { Trail } from '../data'
import { toneClasses } from '../tones'

export function TrailCard({ trail }: { trail: Trail }) {
  const tone = toneClasses[trail.tone]
  const Icon = trail.icon

  return (
    <Link
      to={routes.trail(trail.id)}
      className="group flex h-full flex-col rounded-t-full rounded-b-2xl border border-line bg-canvas p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_40px_-12px_rgb(138_106_53/0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {/* Janela em arco */}
      <div className={`relative flex aspect-4/3 items-end justify-center overflow-hidden rounded-t-full pb-8 ${tone.soft}`}>
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-white/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <Icon
          className={`size-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 ${tone.text}`}
          strokeWidth={1.25}
        />
      </div>

      <div className="flex flex-1 flex-col px-3 pt-6 pb-4">
        <h3 className="font-serif text-xl font-medium text-ink">{trail.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{trail.description}</p>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-ink-muted/80">{trail.steps.length} passos</span>
          <span className="inline-flex items-center gap-1 font-semibold text-ink group-hover:text-primary-strong">
            Começar
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
