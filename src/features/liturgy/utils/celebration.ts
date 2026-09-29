export type Celebration = {
  /** Nome como vem da API, sem o grau (ex.: "Santa Teresa de Jesus, virgem e doutora da Igreja"). */
  name: string
  /** Grau da celebração, quando a API informa. */
  rank?: 'Memória' | 'Memória facultativa' | 'Festa' | 'Solenidade'
}

const RANK_PATTERN = /,\s*(Memória facultativa|Memória|Festa|Solenidade)$/i

/** Dias comuns ("6ª feira da 27ª Semana...", "27º Domingo do Tempo Comum") não celebram um santo. */
const FERIAL_PATTERN = /\b(feira|semana|domingo|sábado)\b/i

/**
 * Extrai a celebração do dia do campo `liturgia` da API.
 * Devolve `null` nos dias comuns, quando não há festa nem memória no calendário.
 */
export function parseCelebration(liturgia: string): Celebration | null {
  const text = liturgia.trim()
  const match = text.match(RANK_PATTERN)
  if (match) {
    const rank = match[1].toLowerCase()
    return {
      name: text.slice(0, match.index).trim(),
      rank:
        rank === 'memória facultativa'
          ? 'Memória facultativa'
          : rank === 'memória'
            ? 'Memória'
            : rank === 'festa'
              ? 'Festa'
              : 'Solenidade',
    }
  }
  return FERIAL_PATTERN.test(text) ? null : { name: text }
}

/** Página oficial do santo do dia no Vatican News (existe para todas as datas do ano). */
export function vaticanSaintUrl(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `https://www.vaticannews.va/pt/santo-do-dia/${month}/${day}.html`
}
