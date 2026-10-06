import type { ShareTheme } from './themes'

export type ShareCardContent = {
  eyebrow: string
  quote: string
  reference: string
  title?: string
  /** Endereço do site, mostrado ao lado da marca (ex.: "tolle-et-lege.vercel.app/liturgy"). */
  link?: string
}

export type ShareCardOptions = {
  width: number
  height: number
  radius: number
  theme: ShareTheme
}

const SERIF = '"EB Garamond Variable", Georgia, serif'
const SANS = '"Inter Variable", system-ui, sans-serif'

/** Mesmos traços da marca do site (viewBox 32×32). */
const LOGO_PATHS = [
  'M6.5 29V14.5a9.5 9.5 0 0 1 19 0V29',
  'M16 21.2c-1.9-1.3-4.1-1.8-6.3-1.6v6.2c2.2-.2 4.4.3 6.3 1.6 1.9-1.3 4.1-1.8 6.3-1.6v-6.2c-2.2-.2-4.4.3-6.3 1.6Z',
  'M16 21.2v6.2',
]
const LOGO_CROSS = 'M16 8.5v8M12.75 11.5h6.5'

/** Garante que as fontes do site estão carregadas antes de desenhar. */
export async function loadShareFonts() {
  await Promise.all([
    document.fonts.load(`italic 400 60px ${SERIF}`),
    document.fonts.load(`500 36px ${SERIF}`),
    document.fonts.load(`600 28px ${SANS}`),
  ]).catch(() => undefined)
}

function setSpacing(ctx: CanvasRenderingContext2D, px: number) {
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    const attempt = line ? `${line} ${word}` : word
    if (ctx.measureText(attempt).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = attempt
    }
  }
  if (line) lines.push(line)
  return lines
}

function drawLogo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, accent: string) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 32, size / 32)
  ctx.lineWidth = 1.7
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = color
  for (const d of LOGO_PATHS) ctx.stroke(new Path2D(d))
  ctx.strokeStyle = accent
  ctx.stroke(new Path2D(LOGO_CROSS))
  ctx.restore()
}

const MARGIN = 80
const PAD = 88
/** Menor tamanho de letra do trecho que ainda se lê bem no celular (em uma imagem de 1080 px). */
const MIN_QUOTE_SIZE = 40
/** Altura fixa do cartão: respiros, cabeçalho, referência, divisor e marca. */
const FIXED_H = PAD * 2 + 26 + 56 + 56 + 34 + 88 + 56

export type ShareCardLayout = {
  size: number
  quoteLines: string[]
  titleLines: string[]
  cardH: number
  /** O trecho cabe com letra legível? */
  fits: boolean
  /** Quanto do espaço disponível o trecho ocupa na menor letra legível (0 a 1+). */
  usage: number
}

/** Calcula o layout, reduzindo a letra do trecho até caber (sem passar do mínimo legível). */
function computeLayout(ctx: CanvasRenderingContext2D, content: ShareCardContent, W: number, H: number): ShareCardLayout {
  const textW = W - MARGIN * 2 - PAD * 2
  const maxCardH = H - MARGIN * 2

  ctx.font = `400 26px ${SANS}`
  const titleLines = content.title ? wrap(ctx, content.title, textW).slice(0, 2) : []
  const heightAt = (size: number) => {
    ctx.font = `italic 400 ${size}px ${SERIF}`
    const lines = wrap(ctx, content.quote, textW)
    return { lines, cardH: FIXED_H + lines.length * size * 1.34 + titleLines.length * 36 }
  }

  let size = W === H ? 58 : 70
  let result = heightAt(size)
  while (result.cardH > maxCardH && size > MIN_QUOTE_SIZE) {
    size -= 2
    result = heightAt(size)
  }

  const atMinimum = size === MIN_QUOTE_SIZE ? result : heightAt(MIN_QUOTE_SIZE)
  const usage = (atMinimum.cardH - FIXED_H) / (maxCardH - FIXED_H)

  return { size, quoteLines: result.lines, titleLines, cardH: result.cardH, fits: result.cardH <= maxCardH, usage }
}

let measureCtx: CanvasRenderingContext2D | null = null

/** Mede um trecho sem desenhar (para avisar quando não cabe no formato). */
export function measureShareCard(content: ShareCardContent, width: number, height: number) {
  measureCtx ??= document.createElement('canvas').getContext('2d')
  if (!measureCtx) return null
  return computeLayout(measureCtx, content, width, height)
}

/** Desenha a imagem de compartilhamento: fundo, cartão, trecho, referência e marca. */
export function renderShareCard(canvas: HTMLCanvasElement, content: ShareCardContent, options: ShareCardOptions) {
  const { width: W, height: H, radius, theme } = options
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const margin = MARGIN
  const pad = PAD
  const cardW = W - margin * 2
  const textW = cardW - pad * 2

  // Fundo com um leve brilho de luz vindo de cima
  ctx.fillStyle = theme.outer
  ctx.fillRect(0, 0, W, H)
  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.8)
  glow.addColorStop(0, 'rgba(255,255,255,0.22)')
  glow.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  // Sem aspas externas: o trecho muitas vezes já tem as suas, e as aspas grandes decoram o cartão.
  const { size, quoteLines, titleLines, cardH } = computeLayout(ctx, content, W, H)
  const lineH = size * 1.34
  const cardX = margin
  const cardY = (H - cardH) / 2

  // Cartão
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.28)'
  ctx.shadowBlur = 70
  ctx.shadowOffsetY = 24
  ctx.fillStyle = theme.card
  ctx.beginPath()
  ctx.roundRect(cardX, cardY, cardW, cardH, radius)
  ctx.fill()
  ctx.restore()

  // Aspas decorativas grandes
  ctx.save()
  ctx.globalAlpha = 0.12
  ctx.fillStyle = theme.accent
  ctx.font = `400 300px ${SERIF}`
  ctx.textBaseline = 'top'
  ctx.fillText('”', cardX + cardW - pad - 110, cardY + 10)
  ctx.restore()

  let y = cardY + pad
  const x = cardX + pad
  ctx.textBaseline = 'top'

  // Cabeçalho
  ctx.fillStyle = theme.accent
  ctx.font = `600 26px ${SANS}`
  setSpacing(ctx, 5)
  ctx.fillText(content.eyebrow.toUpperCase(), x, y)
  setSpacing(ctx, 0)
  y += 26 + 56

  // Trecho
  ctx.fillStyle = theme.text
  ctx.font = `italic 400 ${size}px ${SERIF}`
  for (const line of quoteLines) {
    ctx.fillText(line, x, y)
    y += lineH
  }
  y += 56

  // Referência e título da leitura
  ctx.fillStyle = theme.text
  ctx.font = `600 34px ${SANS}`
  ctx.fillText(content.reference, x, y)
  y += 34
  ctx.fillStyle = theme.muted
  ctx.font = `400 26px ${SANS}`
  for (const line of titleLines) {
    y += 10
    ctx.fillText(line, x, y)
    y += 26
  }
  y += 44

  // Divisor e marca
  ctx.fillStyle = theme.muted
  ctx.globalAlpha = 0.35
  ctx.fillRect(x, y, textW, 2)
  ctx.globalAlpha = 1
  y += 44
  drawLogo(ctx, x, y - 4, 52, theme.text, theme.accent)
  ctx.fillStyle = theme.text
  ctx.font = `500 38px ${SERIF}`
  ctx.fillText('Tolle Lege', x + 68, y + 4)

  // Link do site, alinhado à direita na linha da marca (a letra diminui se faltar espaço)
  if (content.link) {
    const room = textW - 68 - ctx.measureText('Tolle Lege').width - 32
    let linkSize = 26
    ctx.font = `500 ${linkSize}px ${SANS}`
    while (ctx.measureText(content.link).width > room && linkSize > 18) {
      linkSize -= 1
      ctx.font = `500 ${linkSize}px ${SANS}`
    }
    ctx.fillStyle = theme.muted
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(content.link, x + textW, y + 22)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
  }
}

export function canvasToFile(canvas: HTMLCanvasElement, name: string) {
  return new Promise<File | null>((resolve) =>
    canvas.toBlob((blob) => resolve(blob ? new File([blob], name, { type: 'image/png' }) : null), 'image/png'),
  )
}
