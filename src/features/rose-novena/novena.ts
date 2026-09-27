/*
 * Novena das Rosas a Santa Teresinha: rezada de 22 a 30 de setembro,
 * preparando a festa da santa em 1º de outubro.
 */

export const NOVENA_DAYS = 9
export const GLORIES = 24

const SEPTEMBER = 8
const OCTOBER = 9
const FIRST_DAY = 22

export type NovenaMoment =
  | { kind: 'novena'; day: number }
  | { kind: 'feast' }
  | { kind: 'off' }

/** Em que momento da novena está a data (horário local). */
export function novenaMoment(date: Date): NovenaMoment {
  const month = date.getMonth()
  const day = date.getDate()
  if (month === SEPTEMBER && day >= FIRST_DAY && day < FIRST_DAY + NOVENA_DAYS) {
    return { kind: 'novena', day: day - FIRST_DAY + 1 }
  }
  if (month === OCTOBER && day === 1) return { kind: 'feast' }
  return { kind: 'off' }
}

/** Ex.: "6º dia" */
export const ordinalDay = (day: number) => `${day}º dia`

export const novenaPrayer = {
  title: 'Oração da Novena das Rosas',
  text: [
    'Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço todos os favores e todas as graças com que enriquecestes a alma de vossa serva Santa Teresinha do Menino Jesus e da Sagrada Face, durante os vinte e quatro anos que passou na terra.',
    'Pelos méritos de tão querida santa, concedei-me a graça que ardentemente vos peço, se for conforme a vossa santíssima vontade e para a salvação da minha alma.',
    'Ajudai a minha fé e a minha esperança, ó Santa Teresinha, cumprindo mais uma vez a vossa promessa de que ninguém vos invocaria em vão, fazendo-me ganhar uma rosa, sinal de que alcançarei a graça pedida.',
  ],
}

export const howToPray = [
  'Faça o sinal da cruz e apresente, em silêncio, o seu pedido.',
  'Reze a oração da novena, dirigida à Santíssima Trindade.',
  'Reze 24 vezes o Glória ao Pai, em agradecimento pelos 24 anos de vida de Santa Teresinha.',
  'Repita durante nove dias seguidos. Tradicionalmente, de 22 a 30 de setembro.',
]

export const theresaFacts = [
  { label: 'Nome', value: 'Marie-Françoise-Thérèse Martin' },
  { label: 'Vida', value: '2 de janeiro de 1873, Alençon (França) – 30 de setembro de 1897, Lisieux' },
  { label: 'Vocação', value: 'Carmelita, entrou no Carmelo de Lisieux aos 15 anos' },
  { label: 'Canonização', value: '1925, pelo papa Pio XI' },
  { label: 'Doutora da Igreja', value: '1997, por São João Paulo II' },
  { label: 'Padroeira', value: 'Das missões, junto com São Francisco Xavier' },
]

export const theresaQuotes = [
  'Quero passar o meu Céu fazendo o bem sobre a terra.',
  'Depois da minha morte, farei cair uma chuva de rosas.',
  'A minha vocação, enfim a encontrei: a minha vocação é o Amor!',
]
