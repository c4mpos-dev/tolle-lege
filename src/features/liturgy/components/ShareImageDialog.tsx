import { useEffect, useMemo, useRef, useState } from 'react'
import { routes } from '@/config/routes'
import { loadShareFonts, measureShareCard, renderShareCard } from '../share/renderShareCard'
import { segmentsOf } from '../share/segments'
import {
  formatOptions,
  linkOptions,
  radiusOptions,
  shareFormats,
  shareRadii,
  shareThemes,
  themeForLiturgicalColor,
  type ShareFormatId,
  type ShareRadiusId,
  type ShareThemeId,
} from '../share/themes'
import type { LiturgicalColor, Psalm, Reading } from '../types'
import { formatDayMonth } from '../utils/date'
import { OptionGroup, ShareDialogFrame, ThemePicker } from './ShareDialogFrame'

type ShareImageDialogProps = {
  item: Reading | Psalm
  /** Ex.: "28/09/2026" */
  date: string
  color: LiturgicalColor
  onClose: () => void
}

/** Editor da imagem para compartilhar um trecho da liturgia (como as letras do Spotify). */
export function ShareImageDialog({ item, date, color, onClose }: ShareImageDialogProps) {
  const segments = useMemo(() => segmentsOf(item), [item])
  const [selected, setSelected] = useState<string[]>(() => initialSelection(segments))
  const [themeId, setThemeId] = useState<ShareThemeId>(themeForLiturgicalColor[color])
  const [radiusId, setRadiusId] = useState<ShareRadiusId>('soft')
  const [formatId, setFormatId] = useState<ShareFormatId>('story')
  const [withLink, setWithLink] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const quote = segments
    .filter((segment) => selected.includes(segment.id))
    .map((segment) => segment.text)
    .join(' ')
  const content = useMemo(
    () => ({
      eyebrow: `Liturgia de ${formatDayMonth(date)}`,
      quote: quote || '…',
      reference: item.referencia,
      title: 'titulo' in item ? item.titulo : 'Salmo responsorial',
      link: withLink ? `${window.location.host}${routes.liturgy}` : undefined,
    }),
    [date, quote, item, withLink],
  )

  // Em vez de um limite fixo de caracteres, verifica se o trecho cabe com letra legível em cada formato.
  const fitByFormat = useMemo(() => {
    if (!fontsReady) return null
    return Object.fromEntries(
      shareFormats.map((format) => [format.id, measureShareCard(content, format.width, format.height)]),
    ) as Record<ShareFormatId, ReturnType<typeof measureShareCard>>
  }, [fontsReady, content])

  const fit = fitByFormat?.[formatId]
  const tooLong = fit ? !fit.fits : false
  const usage = Math.min(fit?.usage ?? 0, 1)
  const formatThatFits = shareFormats.find((format) => fitByFormat?.[format.id]?.fits)

  useEffect(() => {
    loadShareFonts().then(() => setFontsReady(true))
  }, [])

  // Redesenha a prévia (que é a própria imagem exportada)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !fontsReady) return
    const format = shareFormats.find((f) => f.id === formatId)!
    renderShareCard(canvas, content, {
      width: format.width,
      height: format.height,
      radius: shareRadii.find((r) => r.id === radiusId)!.value,
      theme: shareThemes.find((t) => t.id === themeId)!,
    })
  }, [fontsReady, content, themeId, radiusId, formatId])

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((s) => s !== id) : segments.map((s) => s.id).filter((s) => s === id || current.includes(s)),
    )

  return (
    <ShareDialogFrame
      title="Criar imagem"
      canvasRef={canvasRef}
      fileName={`tolle-lege-${item.referencia.replace(/[^\w]+/g, '-').toLowerCase()}.png`}
      shareTitle={item.referencia}
      disabled={!quote || tooLong}
      onClose={onClose}
    >
      <fieldset>
        <legend className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
          Toque nos trechos
        </legend>
        <ul className="mt-3 space-y-2">
          {segments.map((segment) => {
            const active = selected.includes(segment.id)
            return (
              <li key={segment.id}>
                <button
                  type="button"
                  onClick={() => toggle(segment.id)}
                  aria-pressed={active}
                  className="flex w-full gap-3 rounded-xl border border-line p-3 text-left text-sm leading-relaxed text-ink/80 transition-colors hover:border-primary/50 aria-pressed:border-primary aria-pressed:bg-primary-soft aria-pressed:text-ink"
                >
                  {segment.label && (
                    <span className="w-6 shrink-0 font-semibold text-primary-strong">{segment.label}</span>
                  )}
                  <span className="font-serif">{segment.text}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <SpaceMeter
          usage={usage}
          tooLong={tooLong}
          formatName={shareFormats.find((f) => f.id === formatId)!.name}
          suggestion={tooLong && formatThatFits ? formatThatFits : null}
          onSuggest={(id) => setFormatId(id)}
        />
      </fieldset>

      <ThemePicker value={themeId} onChange={setThemeId} color={color} />

      <div className="grid gap-7 sm:grid-cols-2">
        <OptionGroup label="Bordas" options={radiusOptions} value={radiusId} onChange={(id) => setRadiusId(id as ShareRadiusId)} />
        <OptionGroup label="Formato" options={formatOptions} value={formatId} onChange={(id) => setFormatId(id as ShareFormatId)} />
        <OptionGroup
          label="Link do site"
          options={linkOptions}
          value={withLink ? 'on' : 'off'}
          onChange={(id) => setWithLink(id === 'on')}
        />
      </div>
    </ShareDialogFrame>
  )
}

/** Começa com os primeiros trechos até ~200 caracteres (no salmo, o refrão). */
function initialSelection(segments: { id: string; text: string }[]) {
  if (segments[0]?.id === 'refrain') return ['refrain']
  const chosen: string[] = []
  let length = 0
  for (const segment of segments) {
    if (chosen.length && length + segment.text.length > 200) break
    chosen.push(segment.id)
    length += segment.text.length
  }
  return chosen
}

type SpaceMeterProps = {
  usage: number
  tooLong: boolean
  formatName: string
  suggestion: { id: ShareFormatId; name: string } | null
  onSuggest: (id: ShareFormatId) => void
}

/** Mostra quanto do espaço da imagem o trecho escolhido ocupa. */
function SpaceMeter({ usage, tooLong, formatName, suggestion, onSuggest }: SpaceMeterProps) {
  const barColor = tooLong ? 'bg-terracotta' : usage > 0.85 ? 'bg-primary-strong' : 'bg-primary'

  return (
    <div className="mt-3" aria-live="polite">
      <div className="h-1.5 overflow-hidden rounded-full bg-surface">
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${barColor}`}
          style={{ width: `${tooLong ? 100 : Math.max(usage * 100, 4)}%` }}
        />
      </div>
      {tooLong ? (
        <p className="mt-2 text-xs font-semibold text-terracotta">
          Muito texto para o formato {formatName}.{' '}
          {suggestion ? (
            <>
              <button type="button" onClick={() => onSuggest(suggestion.id)} className="underline underline-offset-2">
                Usar {suggestion.name}
              </button>{' '}
              ou escolha menos trechos.
            </>
          ) : (
            'Escolha menos trechos.'
          )}
        </p>
      ) : (
        <p className="mt-2 text-xs text-ink-muted">
          {usage > 0.85 ? 'Quase sem espaço nesta imagem.' : 'Ainda cabe mais texto nesta imagem.'}
        </p>
      )}
    </div>
  )
}
