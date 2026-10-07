import { Download, Share2, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { canvasToFile } from '../share/renderShareCard'
import { shareThemes, themeForLiturgicalColor, type ShareThemeId } from '../share/themes'
import type { LiturgicalColor } from '../types'

type ShareDialogFrameProps = {
  title: string
  canvasRef: RefObject<HTMLCanvasElement | null>
  /** Nome do arquivo PNG exportado. */
  fileName: string
  /** Título passado ao compartilhamento do sistema. */
  shareTitle: string
  /** Impede exportar (ex.: trecho vazio ou grande demais). */
  disabled?: boolean
  onClose: () => void
  /** As opções do editor, ao lado da prévia. */
  children: ReactNode
}

/** Moldura dos editores de imagem: prévia no canvas, opções e os botões de baixar e compartilhar. */
export function ShareDialogFrame({ title, canvasRef, fileName, shareTitle, disabled, onClose, children }: ShareDialogFrameProps) {
  const [busy, setBusy] = useState(false)
  const canShareFiles = typeof navigator !== 'undefined' && 'canShare' in navigator

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

  const exportImage = async (mode: 'share' | 'download') => {
    const canvas = canvasRef.current
    if (!canvas || disabled) return
    setBusy(true)
    try {
      const file = await canvasToFile(canvas, fileName)
      if (!file) return
      if (mode === 'share' && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: shareTitle })
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
            {title}
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
          <div className="space-y-7 p-5 sm:p-7 md:overflow-y-auto">{children}</div>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={() => exportImage('download')}
            disabled={busy || disabled}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink disabled:opacity-40"
          >
            <Download className="size-4" />
            Baixar
          </button>
          {canShareFiles && (
            <button
              type="button"
              onClick={() => exportImage('share')}
              disabled={busy || disabled}
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

type ThemePickerProps = {
  value: ShareThemeId
  onChange: (id: ShareThemeId) => void
  /** Cor litúrgica do dia, para marcar o tema que combina com ela. */
  color: LiturgicalColor
}

export function ThemePicker({ value, onChange, color }: ThemePickerProps) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">Cor</legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {shareThemes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onChange(theme.id)}
            aria-pressed={value === theme.id}
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
  )
}

type OptionGroupProps = {
  label: string
  options: { id: string; name: string }[]
  value: string
  onChange: (id: string) => void
}

export function OptionGroup({ label, options, value, onChange }: OptionGroupProps) {
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
