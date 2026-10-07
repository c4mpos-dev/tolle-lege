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
/** A cruz pátea do site (viewBox 24×24). */
const CROSS_PATTEE = 'M9 1h6l-1.6 8.6L22 9v6l-8.6-.6L15 23H9l1.6-8.6L2 15V9l8.6.6Z'

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

/** Fundo com um leve brilho de luz vindo de cima. */
function drawBackdrop(ctx: CanvasRenderingContext2D, W: number, H: number, theme: ShareTheme) {
  ctx.fillStyle = theme.outer
  ctx.fillRect(0, 0, W, H)
  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.8)
  glow.addColorStop(0, 'rgba(255,255,255,0.22)')
  glow.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)
}

function drawCard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number, theme: ShareTheme) {
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.28)'
  ctx.shadowBlur = 70
  ctx.shadowOffsetY = 24
  ctx.fillStyle = theme.card
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, radius)
  ctx.fill()
  ctx.restore()
}

/** Altura do divisor e da linha da marca, no pé do cartão. */
const BRAND_H = 44 + 56

/** Divisor, marca e (opcional) o link do site, alinhado à direita na linha da marca. */
function drawBrand(ctx: CanvasRenderingContext2D, x: number, y: number, textW: number, theme: ShareTheme, link?: string) {
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillStyle = theme.muted
  ctx.globalAlpha = 0.35
  ctx.fillRect(x, y, textW, 2)
  ctx.globalAlpha = 1
  y += 44
  drawLogo(ctx, x, y - 4, 52, theme.text, theme.accent)
  ctx.fillStyle = theme.text
  ctx.font = `500 38px ${SERIF}`
  ctx.fillText('Tolle Lege', x + 68, y + 4)

  // A letra do link diminui se faltar espaço
  if (link) {
    const room = textW - 68 - ctx.measureText('Tolle Lege').width - 32
    let linkSize = 26
    ctx.font = `500 ${linkSize}px ${SANS}`
    while (ctx.measureText(link).width > room && linkSize > 18) {
      linkSize -= 1
      ctx.font = `500 ${linkSize}px ${SANS}`
    }
    ctx.fillStyle = theme.muted
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(link, x + textW, y + 22)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
  }
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

  drawBackdrop(ctx, W, H, theme)

  // Sem aspas externas: o trecho muitas vezes já tem as suas, e as aspas grandes decoram o cartão.
  const { size, quoteLines, titleLines, cardH } = computeLayout(ctx, content, W, H)
  const lineH = size * 1.34
  const cardX = margin
  const cardY = (H - cardH) / 2

  drawCard(ctx, cardX, cardY, cardW, cardH, radius, theme)

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

  drawBrand(ctx, x, y, textW, theme, content.link)
}

export type SaintCardContent = {
  /** Ex.: "Santo do dia · 7 de outubro" */
  eyebrow: string
  name: string
  /** Grau da celebração (ex.: "Memória"). */
  rank?: string
  link?: string
}

/** Medalhão sépia com a cruz pátea, como o do cartão do santo do dia no site. */
function drawMedallion(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, theme: ShareTheme) {
  ctx.save()
  ctx.strokeStyle = theme.accent
  ctx.lineWidth = 3
  for (const ring of [r, r - 9]) {
    ctx.beginPath()
    ctx.arc(cx, cy, ring, 0, Math.PI * 2)
    ctx.stroke()
  }
  const fill = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r - 12)
  fill.addColorStop(0, '#d8bd88')
  fill.addColorStop(0.7, '#b08a4c')
  fill.addColorStop(1, '#8a6a35')
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.arc(cx, cy, r - 12, 0, Math.PI * 2)
  ctx.fill()
  const size = r * 0.8
  ctx.translate(cx - size / 2, cy - size / 2)
  ctx.scale(size / 24, size / 24)
  ctx.fillStyle = '#fbf8f3'
  ctx.fill(new Path2D(CROSS_PATTEE))
  ctx.restore()
}

/** Desenha a imagem do santo do dia: medalhão, nome da celebração, grau e marca. */
export function renderSaintCard(canvas: HTMLCanvasElement, content: SaintCardContent, options: ShareCardOptions) {
  const { width: W, height: H, radius, theme } = options
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cardW = W - MARGIN * 2
  const textW = cardW - PAD * 2
  const medallionR = W === H ? 62 : 78
  const rankH = content.rank ? 32 + 24 : 0
  const fixedH = PAD * 2 + medallionR * 2 + 52 + 26 + 40 + 34 + 28 + rankH + 64 + BRAND_H

  // O nome encolhe até caber (nomes como "Santos André Kim Taegon, presbítero, ..." são longos)
  let size = W === H ? 72 : 88
  let nameLines: string[] = []
  const measure = () => {
    ctx.font = `500 ${size}px ${SERIF}`
    nameLines = wrap(ctx, content.name, textW)
    return fixedH + nameLines.length * size * 1.18
  }
  let cardH = measure()
  while (cardH > H - MARGIN * 2 && size > 44) {
    size -= 2
    cardH = measure()
  }

  drawBackdrop(ctx, W, H, theme)
  const cardX = MARGIN
  const cardY = (H - cardH) / 2
  drawCard(ctx, cardX, cardY, cardW, cardH, radius, theme)

  const cx = W / 2
  let y = cardY + PAD
  drawMedallion(ctx, cx, y + medallionR, medallionR, theme)
  y += medallionR * 2 + 52

  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  // Cabeçalho
  ctx.fillStyle = theme.accent
  ctx.font = `600 26px ${SANS}`
  setSpacing(ctx, 5)
  ctx.fillText(content.eyebrow.toUpperCase(), cx, y)
  setSpacing(ctx, 0)
  y += 26 + 40

  ctx.fillStyle = theme.muted
  ctx.font = `italic 400 34px ${SERIF}`
  ctx.fillText('Hoje a Igreja celebra', cx, y)
  y += 34 + 28

  // Nome da celebração
  ctx.fillStyle = theme.text
  ctx.font = `500 ${size}px ${SERIF}`
  for (const line of nameLines) {
    ctx.fillText(line, cx, y)
    y += size * 1.18
  }

  if (content.rank) {
    y += 32
    ctx.fillStyle = theme.accent
    ctx.font = `600 24px ${SANS}`
    setSpacing(ctx, 4)
    ctx.fillText(content.rank.toUpperCase(), cx, y)
    setSpacing(ctx, 0)
    y += 24
  }
  y += 64

  drawBrand(ctx, cardX + PAD, y, textW, theme, content.link)
}

export function canvasToFile(canvas: HTMLCanvasElement, name: string) {
  return new Promise<File | null>((resolve) =>
    canvas.toBlob((blob) => resolve(blob ? new File([blob], name, { type: 'image/png' }) : null), 'image/png'),
  )
}
