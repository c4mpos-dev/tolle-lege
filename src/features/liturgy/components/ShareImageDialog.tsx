import { Download, Share2, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { routes } from '@/config/routes'
import { canvasToFile, loadShareFonts, measureShareCard, renderShareCard } from '../share/renderShareCard'
import { segmentsOf } from '../share/segments'
import {
  shareFormats,
  shareRadii,
  shareThemes,
  themeForLiturgicalColor,
  type ShareFormatId,
  type ShareRadiusId,
  type ShareThemeId,
} from '../share/themes'
import type { LiturgicalColor, Psalm, Reading } from '../types'

type ShareImageDialogProps = {
  item: Reading | Psalm
  /** Ex.: "28/09/2026" */
  date: string
  color: LiturgicalColor
  onClose: () => void
}

function eyebrowFor(date: string) {
  const [day, month, year] = date.split('/').map(Number)
  const formatted = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(
    new Date(year, month - 1, day),
  )
  return `Liturgia de ${formatted}`
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
  const [busy, setBusy] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const quote = segments
    .filter((segment) => selected.includes(segment.id))
    .map((segment) => segment.text)
    .join(' ')
  const content = useMemo(
    () => ({
      eyebrow: eyebrowFor(date),
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
  const canShareFiles = typeof navigator !== 'undefined' && 'canShare' in navigator

  useEffect(() => {
    loadShareFonts().then(() => setFontsReady(true))
  }, [])

  // Fecha com Esc e trava o scroll da página por trás
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

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

  const exportImage = async (mode: 'share' | 'download') => {
    const canvas = canvasRef.current
    if (!canvas || !quote || tooLong) return
    setBusy(true)
    try {
      const fileName = `tolle-lege-${item.referencia.replace(/[^\w]+/g, '-').toLowerCase()}.png`
      const file = await canvasToFile(canvas, fileName)
      if (!file) return
      if (mode === 'share' && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: item.referencia })
        return
      }
      const url = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      // Compartilhamento cancelado pela pessoa: nada a fazer.
    } finally {
      setBusy(false)
    }
  }

  // Portal no <body>: fora de ancestrais com transform (animações), que prenderiam o
  // editor numa camada abaixo do cabeçalho do site e das pétalas da novena.
  return createPortal(
    <div className="fixed inset-0 z-60 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-canvas shadow-2xl sm:rounded-3xl"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-7">
          <h2 id="share-title" className="font-serif text-xl text-ink">
            Criar imagem
          </h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-full p-2 text-ink-muted hover:bg-surface hover:text-ink">
            <X className="size-5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:overflow-hidden">
          {/* Prévia */}
          <div className="flex items-center justify-center bg-surface p-5 md:p-8">
            <canvas
              ref={canvasRef}
              aria-label="Prévia da imagem"
              className="max-h-[42dvh] w-auto max-w-full rounded-lg shadow-lg md:max-h-[70dvh]"
            />
          </div>

          {/* Opções */}
          <div className="space-y-7 p-5 sm:p-7 md:overflow-y-auto">
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

            <fieldset>
              <legend className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">Cor</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {shareThemes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setThemeId(theme.id)}
                    aria-pressed={themeId === theme.id}
                    aria-label={theme.name}
                    title={theme.name}
                    className="relative size-10 rounded-full ring-offset-2 ring-offset-canvas transition-transform hover:scale-110 aria-pressed:ring-2 aria-pressed:ring-ink"
                    style={{ background: `linear-gradient(135deg, ${theme.card} 50%, ${theme.outer} 50%)` }}
                  >
                    {theme.id === themeForLiturgicalColor[color] && (
                      <span className="absolute -top-1 -right-1 rounded-full bg-ink px-1 text-[0.55rem] font-bold text-canvas">
                        HOJE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-7 sm:grid-cols-2">
              <OptionGroup
                label="Bordas"
                options={shareRadii.map((r) => ({ id: r.id, name: r.name }))}
                value={radiusId}
                onChange={(id) => setRadiusId(id as ShareRadiusId)}
              />
              <OptionGroup
                label="Formato"
                options={shareFormats.map((f) => ({ id: f.id, name: f.name }))}
                value={formatId}
                onChange={(id) => setFormatId(id as ShareFormatId)}
              />
              <OptionGroup
                label="Link do site"
                options={[
                  { id: 'off', name: 'Sem link' },
                  { id: 'on', name: 'Com link' },
                ]}
                value={withLink ? 'on' : 'off'}
                onChange={(id) => setWithLink(id === 'on')}
              />
            </div>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={() => exportImage('download')}
            disabled={busy || !quote || tooLong}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink disabled:opacity-40"
          >
            <Download className="size-4" />
            Baixar
          </button>
          {canShareFiles && (
            <button
              type="button"
              onClick={() => exportImage('share')}
              disabled={busy || !quote || tooLong}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-primary-strong disabled:opacity-40"
            >
              <Share2 className="size-4" />
              Compartilhar
            </button>
          )}
        </footer>
      </motion.div>
    </div>,
    document.body,
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

type OptionGroupProps = {
  label: string
  options: { id: string; name: string }[]
  value: string
  onChange: (id: string) => void
}

function OptionGroup({ label, options, value, onChange }: OptionGroupProps) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={value === option.id}
            className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-primary/50 hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas"
          >
            {option.name}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
