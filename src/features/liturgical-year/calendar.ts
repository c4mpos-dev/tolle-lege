/*
 * Calendário litúrgico (rito romano, com as datas adotadas no Brasil).
 * Tudo é calculado a partir da data da Páscoa e do Natal: nada vem de API.
 */

export type SeasonId = 'advent' | 'christmas' | 'ordinary-1' | 'lent' | 'triduum' | 'easter' | 'ordinary-2'

export type LiturgicalColor = 'purple' | 'white' | 'green' | 'red'

export type Season = {
  id: SeasonId
  name: string
  color: LiturgicalColor
  start: Date
  end: Date
}

export type Feast = { name: string; date: Date; note?: string }

const DAY_MS = 86_400_000

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** Diferença em dias inteiros (imune ao horário de verão). */
export function daysBetween(from: Date, to: Date) {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.round((b - a) / DAY_MS)
}

/** Domingo de Páscoa (algoritmo gregoriano anônimo, de Meeus/Jones/Butcher). */
export function easterSunday(year: number) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

/** 1º Domingo do Advento: o quarto domingo antes do Natal (entre 27/11 e 3/12). */
export function firstSundayOfAdvent(year: number) {
  const christmas = new Date(year, 11, 25)
  const weekday = christmas.getDay()
  return addDays(christmas, -(weekday === 0 ? 7 : weekday) - 21)
}

/** Epifania no Brasil: domingo entre 2 e 8 de janeiro. */
export function epiphany(year: number) {
  const january2 = new Date(year, 0, 2)
  return addDays(january2, (7 - january2.getDay()) % 7)
}

/** Batismo do Senhor: domingo após a Epifania, ou segunda-feira se a Epifania cair em 7 ou 8/1. */
export function baptismOfTheLord(year: number) {
  const epiphanyDate = epiphany(year)
  return addDays(epiphanyDate, epiphanyDate.getDate() >= 7 ? 1 : 7)
}

/** Tempos do ano litúrgico que começa no Advento do ano informado. */
export function seasonsOfLiturgicalYear(adventYear: number): Season[] {
  const start = firstSundayOfAdvent(adventYear)
  const nextAdvent = firstSundayOfAdvent(adventYear + 1)
  const year = adventYear + 1
  const easter = easterSunday(year)
  const baptism = baptismOfTheLord(year)
  const ashWednesday = addDays(easter, -46)
  const pentecost = addDays(easter, 49)

  return [
    { id: 'advent', name: 'Advento', color: 'purple', start, end: new Date(adventYear, 11, 24) },
    { id: 'christmas', name: 'Natal', color: 'white', start: new Date(adventYear, 11, 25), end: baptism },
    { id: 'ordinary-1', name: 'Tempo Comum', color: 'green', start: addDays(baptism, 1), end: addDays(ashWednesday, -1) },
    { id: 'lent', name: 'Quaresma', color: 'purple', start: ashWednesday, end: addDays(easter, -4) },
    { id: 'triduum', name: 'Tríduo Pascal', color: 'red', start: addDays(easter, -3), end: addDays(easter, -1) },
    { id: 'easter', name: 'Páscoa', color: 'white', start: easter, end: pentecost },
    { id: 'ordinary-2', name: 'Tempo Comum', color: 'green', start: addDays(pentecost, 1), end: addDays(nextAdvent, -1) },
  ]
}

/** Ano litúrgico que contém a data (começa no 1º Domingo do Advento). */
export function liturgicalYearFor(date: Date) {
  const day = startOfDay(date)
  const adventYear = day >= firstSundayOfAdvent(day.getFullYear()) ? day.getFullYear() : day.getFullYear() - 1
  const seasons = seasonsOfLiturgicalYear(adventYear)
  const season = seasons.find((s) => day >= s.start && day <= s.end) ?? seasons[0]
  return { adventYear, seasons, season }
}

/** Ex.: "25ª semana do Tempo Comum". Segue a contagem oficial (a última semana antes do Advento é a 34ª). */
export function weekLabel(date: Date, season: Season, seasons: Season[]) {
  const day = startOfDay(date)
  const sinceStart = daysBetween(season.start, day)

  switch (season.id) {
    case 'advent':
      return `${Math.floor(sinceStart / 7) + 1}ª semana do Advento`
    case 'christmas':
      return 'Tempo do Natal'
    case 'ordinary-1': {
      // A semana 1 começa no dia seguinte ao Batismo do Senhor; semanas vão de domingo a sábado.
      const baptism = addDays(season.start, -1)
      const sundayOfBaptism = addDays(baptism, -baptism.getDay())
      return `${Math.floor(daysBetween(sundayOfBaptism, day) / 7) + 1}ª semana do Tempo Comum`
    }
    case 'lent': {
      const firstSunday = addDays(season.start, 4)
      if (day < firstSunday) return 'Dias após as Cinzas'
      return `${Math.floor(daysBetween(firstSunday, day) / 7) + 1}ª semana da Quaresma`
    }
    case 'triduum':
      return ['Quinta-feira Santa', 'Sexta-feira da Paixão', 'Sábado Santo'][sinceStart]
    case 'easter':
      return sinceStart === 49 ? 'Domingo de Pentecostes' : `${Math.floor(sinceStart / 7) + 1}ª semana da Páscoa`
    case 'ordinary-2': {
      const nextAdvent = addDays(seasons[seasons.length - 1].end, 1)
      return `${35 - Math.ceil(daysBetween(day, nextAdvent) / 7)}ª semana do Tempo Comum`
    }
  }
}

/** Principais celebrações de um ano civil. */
function feastsOfYear(year: number): Feast[] {
  const easter = easterSunday(year)
  return [
    { name: 'Santa Maria, Mãe de Deus', date: new Date(year, 0, 1) },
    { name: 'Epifania do Senhor', date: epiphany(year) },
    { name: 'Quarta-feira de Cinzas', date: addDays(easter, -46), note: 'Início da Quaresma' },
    { name: 'Domingo de Ramos', date: addDays(easter, -7), note: 'Início da Semana Santa' },
    { name: 'Páscoa da Ressurreição', date: easter, note: 'A maior festa do ano' },
    { name: 'Ascensão do Senhor', date: addDays(easter, 42), note: 'No Brasil, celebrada no domingo' },
    { name: 'Pentecostes', date: addDays(easter, 49) },
    { name: 'Santíssima Trindade', date: addDays(easter, 56) },
    { name: 'Corpus Christi', date: addDays(easter, 60) },
    { name: 'Nossa Senhora Aparecida', date: new Date(year, 9, 12), note: 'Padroeira do Brasil' },
    { name: 'Cristo Rei', date: addDays(firstSundayOfAdvent(year), -7), note: 'Último domingo do ano litúrgico' },
    { name: '1º Domingo do Advento', date: firstSundayOfAdvent(year), note: 'Começa um novo ano litúrgico' },
    { name: 'Natal do Senhor', date: new Date(year, 11, 25) },
  ]
}

export function upcomingFeasts(from: Date, count = 6) {
  const day = startOfDay(from)
  return [...feastsOfYear(day.getFullYear()), ...feastsOfYear(day.getFullYear() + 1)]
    .filter((feast) => feast.date >= day)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count)
}
