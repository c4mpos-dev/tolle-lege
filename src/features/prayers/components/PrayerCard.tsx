import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import type { Prayer } from '../data'

export function PrayerCard({ prayer }: { prayer: Prayer }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${prayer.title}\n\n${prayer.text}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Área de transferência indisponível (permissão negada, contexto inseguro etc.).
    }
  }

  return (
    <article id={prayer.id} className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-line bg-canvas p-6 sm:p-7">
      <header className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-2xl font-medium text-ink">{prayer.title}</h3>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Oração copiada' : `Copiar ${prayer.title}`}
          className="shrink-0 rounded-full p-2 text-ink-muted transition-colors hover:bg-surface hover:text-ink"
        >
          {copied ? <Check className="size-4 text-sage" /> : <Copy className="size-4" />}
        </button>
      </header>

      <div className="mt-4 flex-1 space-y-3 font-serif text-lg leading-relaxed text-ink/85">
        {prayer.text.split('\n').map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <p className="mt-6 border-t border-line pt-4 text-sm text-ink-muted">{prayer.note}</p>
    </article>
  )
}
