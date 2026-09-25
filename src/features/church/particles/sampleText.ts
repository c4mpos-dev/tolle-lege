const FONT = '500 220px "Fraunces Variable"'

/**
 * Sorteia `count` pontos dentro das letras de `text`, desenhado com a fonte do site.
 * Retorna xyz normalizado: largura 1, centrado na origem, com leve profundidade.
 */
export async function sampleText(text: string, count: number) {
  try {
    await document.fonts.load(FONT)
  } catch {
    // Sem a fonte, usa a serifada padrão do sistema.
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return new Float32Array(count * 3)

  ctx.font = FONT
  const width = Math.ceil(ctx.measureText(text).width) + 40
  const height = 300
  canvas.width = width
  canvas.height = height

  ctx.font = FONT
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  ctx.fillText(text, 20, height / 2)

  // Coleta os pixels preenchidos (de 2 em 2, suficiente para a densidade que precisamos).
  const { data } = ctx.getImageData(0, 0, width, height)
  const filled: number[] = []
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (data[(y * width + x) * 4 + 3] > 128) filled.push(x, y)
    }
  }

  const positions = new Float32Array(count * 3)
  const pixels = filled.length / 2
  for (let i = 0; i < count; i++) {
    const pick = Math.floor(Math.random() * pixels) * 2
    const x = filled[pick] + Math.random() * 2
    const y = filled[pick + 1] + Math.random() * 2
    positions[i * 3] = (x - width / 2) / width
    positions[i * 3 + 1] = -(y - height / 2) / width
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.02
  }
  return positions
}
