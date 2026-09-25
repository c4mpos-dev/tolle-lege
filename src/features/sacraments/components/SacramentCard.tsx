import { BookOpen, CalendarClock, Sprout, UserRound } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { Sacrament, SacramentGroupId } from '../data'

/** Classes literais para o Tailwind detectar no build. */
const groupTone: Record<SacramentGroupId, { soft: string; text: string }> = {
  initiation: { soft: 'bg-marian-soft', text: 'text-marian' },
  healing: { soft: 'bg-sage-soft', text: 'text-sage' },
  service: { soft: 'bg-terracotta-soft', text: 'text-terracotta' },
}

export function SacramentCard({ sacrament, number }: { sacrament: Sacrament; number: number }) {
  const tone = groupTone[sacrament.group]

  return (
    <article
      id={sacrament.id}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-canvas lg:grid lg:grid-cols-[18rem_1fr]"
    >
      {/* Coluna "janela": número, nome e símbolos */}
      <div className={`flex flex-col p-7 sm:p-8 ${tone.soft}`}>
        <span className={`font-serif text-5xl ${tone.text}`}>{number}</span>
        <h3 className="mt-4 font-serif text-3xl font-medium text-ink">{sacrament.name}</h3>
        <p className="mt-1 text-ink-muted">{sacrament.tagline}</p>

        <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-ink-muted uppercase">
          Sinais
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {sacrament.symbols.map((symbol) => (
            <li key={symbol} className="rounded-full bg-canvas/80 px-3 py-1 text-xs font-medium text-ink">
              {symbol}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-7 sm:p-8">
        <div className="space-y-3 text-lg leading-relaxed text-ink/85">
          {sacrament.meaning.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <figure className="mt-6 border-l-2 border-primary/50 pl-4">
          <blockquote className="font-serif text-lg text-ink/80 italic">
            “{sacrament.bible.text}”
          </blockquote>
          <figcaption className="mt-1 text-sm text-ink-muted">{sacrament.bible.reference}</figcaption>
        </figure>

        <dl className="mt-8 grid gap-5 sm:grid-cols-3">
          <Fact icon={UserRound} label="Quem recebe" value={sacrament.who} />
          <Fact icon={CalendarClock} label="Com que frequência" value={sacrament.frequency} />
          <Fact icon={Sprout} label="Como se preparar" value={sacrament.preparation} />
        </dl>

        {sacrament.link && (
          <ButtonLink to={sacrament.link.to} variant="text" className="mt-8">
            <BookOpen className="size-4" />
            {sacrament.link.label}
          </ButtonLink>
        )}
      </div>
    </article>
  )
}

type FactProps = { icon: typeof UserRound; label: string; value: string }

function Fact({ icon: Icon, label, value }: FactProps) {
  return (
    <div className="rounded-xl bg-surface p-4">
      <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-primary-strong uppercase">
        <Icon className="size-4" />
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-ink/80">{value}</dd>
    </div>
  )
}
