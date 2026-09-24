export type CuriosityTone = 'marian' | 'primary' | 'terracotta' | 'sage'

export type Curiosity = {
  id: string
  question: string
  answer: string
  tone: CuriosityTone
}

export const curiosities: Curiosity[] = [
  {
    id: 'tolle-lege',
    question: 'De onde vem o nome “Tolle Lege”?',
    answer:
      'Em 386, Santo Agostinho ouviu uma criança cantar “tolle, lege” (“toma e lê”). Abriu a Bíblia em Romanos 13,13-14 e ali começou sua conversão. Ele se tornou um dos maiores santos da história.',
    tone: 'primary',
  },
  {
    id: 'catholic-meaning',
    question: 'O que significa a palavra “católica”?',
    answer:
      'Vem do grego “katholikós”: universal. O primeiro registro escrito da expressão “Igreja Católica” é de Santo Inácio de Antioquia, por volta do ano 107.',
    tone: 'marian',
  },
  {
    id: 'bible-books',
    question: 'Quantos livros tem a Bíblia católica?',
    answer:
      '73: 46 no Antigo Testamento e 27 no Novo. Ela inclui livros como Tobias, Judite, Sabedoria e os dois de Macabeus.',
    tone: 'terracotta',
  },
  {
    id: 'vatican-size',
    question: 'Qual é o menor país do mundo?',
    answer:
      'O Vaticano, sede do Papa: tem cerca de 0,44 km², menor que muitos bairros. Mesmo assim, tem correio, bandeira e até guarda própria, a Guarda Suíça.',
    tone: 'sage',
  },
  {
    id: 'amen',
    question: 'O que quer dizer “Amém”?',
    answer:
      'É uma palavra hebraica que significa “é verdade”, “assim seja”. Ao dizer “Amém”, você assina embaixo do que foi rezado.',
    tone: 'marian',
  },
  {
    id: 'ichthys',
    question: 'Por que o peixe é um símbolo cristão?',
    answer:
      'Em grego, peixe é “ICHTHYS”, e cada letra forma a frase “Jesus Cristo, Filho de Deus, Salvador”. Os primeiros cristãos usavam o desenho para se identificar.',
    tone: 'terracotta',
  },
  {
    id: 'mass-name',
    question: 'Por que a Missa se chama “Missa”?',
    answer:
      'Vem da despedida em latim, “Ite, missa est”: “Ide, é o envio”. Quem participa da Missa é enviado a viver a fé no dia a dia.',
    tone: 'primary',
  },
  {
    id: 'eastern-churches',
    question: 'Existe só um jeito católico de celebrar?',
    answer:
      'Não! Além da Igreja latina, existem 23 Igrejas católicas orientais, com ritos, línguas e tradições próprias, todas em comunhão com o Papa.',
    tone: 'sage',
  },
  {
    id: 'big-bang',
    question: 'Quem propôs a teoria do Big Bang?',
    answer:
      'Georges Lemaître, um padre e físico belga, em 1927. Ele chamou sua ideia de “átomo primordial”.',
    tone: 'marian',
  },
  {
    id: 'paschal-candle',
    question: 'O que é aquela vela grande perto do altar?',
    answer:
      'É o Círio Pascal, aceso na Vigília da Páscoa. Tem gravadas as letras Alfa e Ômega (Cristo é o princípio e o fim) e o ano corrente.',
    tone: 'primary',
  },
  {
    id: 'rosary',
    question: 'Quantos mistérios tem o Rosário?',
    answer:
      'Vinte, divididos em gozosos, luminosos, dolorosos e gloriosos. Os luminosos, sobre a vida pública de Jesus, foram acrescentados por São João Paulo II em 2002.',
    tone: 'terracotta',
  },
  {
    id: 'sunday',
    question: 'Por que o domingo é o dia principal?',
    answer:
      'Porque Jesus ressuscitou no primeiro dia da semana. “Domingo” vem do latim “dies Dominicus”: o dia do Senhor.',
    tone: 'sage',
  },
]
