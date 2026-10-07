import { useEffect, useMemo, useRef, useState } from 'react'
import { loadShareFonts, renderSaintCard } from '../share/renderShareCard'
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
import type { LiturgicalColor } from '../types'
import { celebrationLabel, type Celebration } from '../utils/celebration'
import { formatDayMonth } from '../utils/date'
import { OptionGroup, ShareDialogFrame, ThemePicker } from './ShareDialogFrame'

type SaintShareDialogProps = {
  celebration: Celebration
  /** Ex.: "07/10/2026" */
  date: string
  color: LiturgicalColor
  onClose: () => void
}

/** Editor da imagem para compartilhar o santo (ou a festa) do dia. */
export function SaintShareDialog({ celebration, date, color, onClose }: SaintShareDialogProps) {
  const [themeId, setThemeId] = useState<ShareThemeId>(themeForLiturgicalColor[color])
  const [radiusId, setRadiusId] = useState<ShareRadiusId>('soft')
  const [formatId, setFormatId] = useState<ShareFormatId>('story')
  const [withLink, setWithLink] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const content = useMemo(
    () => ({
      eyebrow: `${celebrationLabel(celebration)} · ${formatDayMonth(date)}`,
      name: celebration.name,
      rank: celebration.rank,
      link: withLink ? window.location.host : undefined,
    }),
    [date, celebration, withLink],
  )

  useEffect(() => {
    loadShareFonts().then(() => setFontsReady(true))
  }, [])

  // Redesenha a prévia (que é a própria imagem exportada)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !fontsReady) return
    const format = shareFormats.find((f) => f.id === formatId)!
    renderSaintCard(canvas, content, {
      width: format.width,
      height: format.height,
      radius: shareRadii.find((r) => r.id === radiusId)!.value,
      theme: shareThemes.find((t) => t.id === themeId)!,
    })
  }, [fontsReady, content, themeId, radiusId, formatId])

  const slug = celebration.name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

  return (
    <ShareDialogFrame
      title="Compartilhar a celebração do dia"
      canvasRef={canvasRef}
      fileName={`tolle-lege-${slug}.png`}
      shareTitle={celebration.name}
      onClose={onClose}
    >
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
