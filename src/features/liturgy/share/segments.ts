import type { Psalm, Reading } from '../types'
import { VERSE_PATTERN } from '../utils/versePattern'

/** Um trecho que a pessoa pode escolher para a imagem (um versículo ou uma estrofe). */
export type Segment = { id: string; label: string; text: string }

const clean = (text: string) => text.replace(/\s+/g, ' ').trim()

/** Divide uma leitura em versículos, sem os números. */
function splitReading(text: string): Segment[] {
  const segments: Segment[] = []
  const matches = [...text.replace(/\n/g, ' ').matchAll(VERSE_PATTERN)]
  const flat = text.replace(/\n/g, ' ')

  if (matches.length === 0) return [{ id: 'all', label: '', text: clean(flat) }]

  // Texto antes do primeiro número (ex.: "Naquele tempo,") fica junto do primeiro versículo.
  const prefix = clean(flat.slice(0, matches[0].index + matches[0][1].length))

  matches.forEach((match, index) => {
    const start = match.index + match[1].length + match[2].length
    const end = index + 1 < matches.length ? matches[index + 1].index : flat.length
    const body = clean(flat.slice(start, end))
    if (!body) return
    segments.push({
      id: `${index}-${match[2]}`,
      label: match[2],
      text: index === 0 && prefix ? `${prefix} ${body}` : body,
    })
  })

  return segments
}

/** Divide o salmo em estrofes, com o refrão como primeira opção. */
function splitPsalm(psalm: Psalm): Segment[] {
  const stanzas = psalm.texto
    .split('\n')
    .map((line) => clean(line.replace(/^[—–-]\s*/, '')))
    .filter(Boolean)
    .map((text, index) => ({ id: `s${index}`, label: `${index + 1}`, text }))

  return [{ id: 'refrain', label: 'R.', text: psalm.refrao }, ...stanzas]
}

export function segmentsOf(item: Reading | Psalm): Segment[] {
  return 'refrao' in item ? splitPsalm(item) : splitReading(item.texto)
}
