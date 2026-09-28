import { ImageDown, Sparkles } from 'lucide-react'
import { shareThemes } from '../share/themes'
import type { Liturgy } from '../types'
import { ShareImageButton } from './ShareImageButton'

const STACK = ['marian', 'gold', 'sage'] as const

/** Destaque para a função de criar imagem, com o Evangelho do dia já escolhido. */
export function SharePromo({ liturgy }: { liturgy: Liturgy }) {
  const gospel = liturgy.leituras.evangelho[0]
  if (!gospel) return null

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-ink p-6 text-canvas sm:p-8">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_50%,rgb(176_141_87/0.35),transparent_60%)]" />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        {/* Mini-imagens empilhadas, como prévia do resultado */}
        <div aria-hidden className="relative mx-auto h-36 w-32 shrink-0 sm:order-last sm:mx-0">
          {STACK.map((id, index) => {
            const theme = shareThemes.find((t) => t.id === id)!
            return (
              <div
                key={id}
                className="absolute inset-0 flex flex-col justify-between rounded-2xl p-3 shadow-lg"
                style={{
                  background: theme.card,
                  transform: `rotate(${(index - 1) * 9}deg) translateX(${(index - 1) * 14}px)`,
                  zIndex: index === 1 ? 3 : index,
                }}
              >
                <span className="h-1 w-10 rounded-full" style={{ background: theme.accent, opacity: 0.7 }} />
                <span className="space-y-1.5">
                  <span className="block h-1.5 w-full rounded-full" style={{ background: theme.text, opacity: 0.85 }} />
                  <span className="block h-1.5 w-4/5 rounded-full" style={{ background: theme.text, opacity: 0.85 }} />
                  <span className="block h-1.5 w-3/5 rounded-full" style={{ background: theme.text, opacity: 0.85 }} />
                </span>
                <span className="h-1 w-8 rounded-full" style={{ background: theme.text, opacity: 0.5 }} />
              </div>
            )
          })}
        </div>

        <div className="flex-1">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Novo
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-snug sm:text-3xl">
            Leve a Palavra a mais pessoas
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-canvas/70">
            Escolha o versículo que tocou o seu coração e transforme-o em uma imagem para partilhar
            com quem você ama. Uma semente lançada pode dar muito fruto.
          </p>
          <ShareImageButton
            item={gospel}
            date={liturgy.data}
            color={liturgy.cor}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-primary-soft"
          >
            <ImageDown className="size-4" />
            Criar imagem do Evangelho
          </ShareImageButton>
        </div>
      </div>
    </section>
  )
}
