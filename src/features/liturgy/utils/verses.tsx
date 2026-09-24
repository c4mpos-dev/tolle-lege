import type { ReactNode } from 'react'

// Números de versículo vêm colados ao texto (ex.: "7o tetrarca", "12E Deus").
// Sufixo de meio-versículo ("9aChegados") só conta se seguido de maiúscula,
// para não confundir com a primeira letra da palavra ("10não").
const VERSE_PATTERN = /(^|\s)(\d+(?:[a-z](?=[A-ZÀ-Ý“"‘]))?)(?=[^\s\d,.;:)])/g

/** Converte o texto bruto da API em nós com os versículos em sobrescrito. */
export function formatVerses(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(VERSE_PATTERN)) {
    const [, space, verse] = match
    const start = match.index + space.length
    nodes.push(text.slice(lastIndex, start))
    nodes.push(
      <sup key={start} className="mr-0.5 text-[0.65em] font-semibold text-primary-strong">
        {verse}
      </sup>,
    )
    lastIndex = start + verse.length
  }
  nodes.push(text.slice(lastIndex))

  return nodes
}
