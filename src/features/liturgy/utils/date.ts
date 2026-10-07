/** yyyy-mm-dd no fuso local (usado como chave de cache). */
export function toDateKey(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function isSameDay(a: Date, b: Date) {
  return toDateKey(a) === toDateKey(b)
}

const longDate = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

/** Ex.: "Quinta-feira, 24 de setembro" */
export function formatLongDate(date: Date) {
  const text = longDate.format(date)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const dayMonth = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' })

/** De "28/09/2026" (formato da API) para "28 de setembro". */
export function formatDayMonth(apiDate: string) {
  const [day, month, year] = apiDate.split('/').map(Number)
  return dayMonth.format(new Date(year, month - 1, day))
}
