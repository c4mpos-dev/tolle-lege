import { Clover, Droplets, Egg, IceCreamBowl, Sun, UserRound, Users, type LucideIcon } from 'lucide-react'

export type Scripture = { reference: string; text: string }

/** As quatro afirmações que resumem o dogma. */
export const trinityRules = [
  { title: 'Há um só Deus', text: 'Não três deuses: uma única natureza divina, um só Deus.' },
  {
    title: 'Três Pessoas são Deus',
    text: 'O Pai é Deus, o Filho é Deus e o Espírito Santo é Deus. Cada um, por inteiro.',
  },
  {
    title: 'As Pessoas são distintas',
    text: 'O Pai não é o Filho, o Filho não é o Espírito Santo, o Espírito Santo não é o Pai.',
  },
  {
    title: 'Iguais e eternas',
    text: 'Nenhuma é maior, mais antiga ou foi criada pela outra. As três são eternas e inseparáveis.',
  },
]

export type PersonId = 'father' | 'son' | 'spirit'

export type Person = {
  id: PersonId
  name: string
  short: string
  description: string
  scripture: Scripture
}

export const persons: Person[] = [
  {
    id: 'father',
    name: 'Pai',
    short: 'Pai',
    description:
      'A origem sem origem: o Pai não vem de ninguém. Desde toda a eternidade, ele gera o Filho. A Igreja lhe atribui de modo especial a criação.',
    scripture: {
      reference: 'Mt 6,9',
      text: 'Pai nosso que estais nos céus, santificado seja o vosso nome.',
    },
  },
  {
    id: 'son',
    name: 'Filho',
    short: 'Filho',
    description:
      'Eternamente gerado pelo Pai, “gerado, não criado”. Na plenitude dos tempos, fez-se homem em Jesus Cristo, sem deixar de ser Deus. A ele se atribui a redenção.',
    scripture: {
      reference: 'Jo 1,1',
      text: 'No princípio era a Palavra, e a Palavra estava junto de Deus, e a Palavra era Deus.',
    },
  },
  {
    id: 'spirit',
    name: 'Espírito Santo',
    short: 'Espírito',
    description:
      '“Senhor que dá a vida”, que procede do Pai e do Filho (como professa o Credo da Igreja latina). É o amor entre o Pai e o Filho, e a ele se atribui a santificação.',
    scripture: {
      reference: 'Jo 14,16',
      text: 'E eu rogarei ao Pai, e ele vos dará outro Defensor, para que permaneça sempre convosco.',
    },
  },
]

export const trinityInScripture: Scripture[] = [
  {
    reference: 'Mt 3,16-17',
    text: 'Jesus viu o Espírito de Deus descer como pomba e vir sobre ele. E do céu veio uma voz que dizia: “Este é o meu Filho amado, no qual pus o meu agrado”.',
  },
  {
    reference: 'Mt 28,19',
    text: 'Ide, pois, fazer discípulos entre todas as nações, e batizai-os em nome do Pai, e do Filho e do Espírito Santo.',
  },
  {
    reference: '2Cor 13,13',
    text: 'A graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo estejam com todos vós.',
  },
  {
    reference: 'Jo 10,30',
    text: 'Eu e o Pai somos um.',
  },
]

export type HeresyId = 'modalism' | 'arianism' | 'macedonianism' | 'tritheism' | 'partialism'

export type Heresy = {
  id: HeresyId
  name: string
  period: string
  claim: string
  whyWrong: string
  scripture: Scripture
  response: string
}

export const heresies: Heresy[] = [
  {
    id: 'modalism',
    name: 'Modalismo',
    period: 'Séc. III · também chamado de sabelianismo',
    claim:
      'Deus seria uma única Pessoa que se mostra de três “modos”: como Pai na criação, como Filho na redenção e como Espírito na santificação, como um ator que troca de máscara.',
    whyWrong:
      'As três Pessoas aparecem ao mesmo tempo e se relacionam entre si: no Batismo de Jesus, o Filho está no rio, o Espírito desce e o Pai fala do céu. E Jesus reza ao Pai; ele não estaria falando consigo mesmo.',
    scripture: {
      reference: 'Jo 17,1',
      text: 'Jesus ergueu os olhos ao céu e disse: “Pai, chegou a hora: glorifica o teu Filho”.',
    },
    response: 'Sabélio, seu principal defensor, foi excomungado pelo papa Calisto I, por volta do ano 220.',
  },
  {
    id: 'arianism',
    name: 'Arianismo',
    period: 'Séc. IV · Ário, presbítero de Alexandria',
    claim:
      'O Filho seria a primeira e mais perfeita criatura de Deus, mas não Deus como o Pai. “Houve um tempo em que o Filho não existia.”',
    whyWrong:
      'O Evangelho de João afirma que a Palavra já era Deus “no princípio”. Se o Filho fosse criatura, adorá-lo seria idolatria, e uma criatura não poderia nos dar a vida divina.',
    scripture: {
      reference: 'Jo 1,1',
      text: 'No princípio era a Palavra, e a Palavra estava junto de Deus, e a Palavra era Deus.',
    },
    response:
      'O Concílio de Niceia (325) declarou que o Filho é “gerado, não criado, consubstancial ao Pai”, palavras que rezamos até hoje no Credo.',
  },
  {
    id: 'macedonianism',
    name: 'Macedonianismo',
    period: 'Séc. IV · os “pneumatômacos” (inimigos do Espírito)',
    claim: 'O Espírito Santo seria uma força ou uma criatura a serviço de Deus, e não uma Pessoa divina.',
    whyWrong:
      'A Escritura trata o Espírito como Pessoa que fala, ensina e intercede, e mentir ao Espírito Santo é mentir a Deus.',
    scripture: {
      reference: 'At 5,3-4',
      text: 'Ananias, por que Satanás se apoderou do teu coração, para mentires ao Espírito Santo? Não mentiste aos homens, mas a Deus.',
    },
    response:
      'O Concílio de Constantinopla (381) completou o Credo: o Espírito Santo é “Senhor que dá a vida” e “com o Pai e o Filho é adorado e glorificado”.',
  },
  {
    id: 'tritheism',
    name: 'Triteísmo',
    period: 'Um desvio que reaparece ao longo da história',
    claim:
      'Pai, Filho e Espírito Santo seriam três deuses, unidos apenas pela vontade ou pela amizade, como três pessoas humanas.',
    whyWrong:
      'A fé cristã herdou de Israel a certeza de que Deus é um só. As três Pessoas não compartilham “um pedaço” da divindade nem têm três naturezas: são um só Deus.',
    scripture: {
      reference: 'Dt 6,4',
      text: 'Ouve, Israel, o Senhor nosso Deus é o único Senhor.',
    },
    response:
      'A Igreja sempre o rejeitou. No século VI, o filósofo João Filópono foi acusado de ensinar algo assim.',
  },
  {
    id: 'partialism',
    name: 'Parcialismo',
    period: 'Mais um erro comum do que uma seita histórica',
    claim:
      'Cada Pessoa seria uma parte de Deus: o Pai, um terço; o Filho, outro terço; o Espírito, o último. Só juntas formariam Deus inteiro.',
    whyWrong:
      'Deus não tem partes. Cada Pessoa é plenamente, inteiramente Deus. O Pai sozinho não é “um terço de Deus”: é Deus.',
    scripture: {
      reference: 'Cl 2,9',
      text: 'Nele [em Cristo] habita corporalmente toda a plenitude da divindade.',
    },
    response:
      'O Catecismo ensina que cada uma das três Pessoas é a própria natureza divina, por inteiro (§ 253).',
  },
]

export type Analogy = {
  id: string
  name: string
  description: string
  icon: LucideIcon
  heresy: HeresyId
  explanation: string
}

/** Comparações populares, e por que cada uma cai numa heresia antiga. */
export const analogies: Analogy[] = [
  {
    id: 'water',
    name: 'A água',
    description: 'Pode ser gelo, líquido ou vapor, e continua sendo água.',
    icon: Droplets,
    heresy: 'modalism',
    explanation:
      'A mesma água não é gelo, líquido e vapor ao mesmo tempo: ela muda de estado. Isso é dizer que Deus é um só que muda de “forma”, e não três Pessoas reais.',
  },
  {
    id: 'man',
    name: 'O homem que é pai, filho e marido',
    description: 'Um só homem com três papéis diferentes na família.',
    icon: UserRound,
    heresy: 'modalism',
    explanation:
      'Aqui existe uma só pessoa com três funções. Na Trindade não são papéis de uma pessoa: são três Pessoas distintas.',
  },
  {
    id: 'sun',
    name: 'O sol, a luz e o calor',
    description: 'Uma estrela que irradia luz e calor.',
    icon: Sun,
    heresy: 'arianism',
    explanation:
      'A luz e o calor são efeitos produzidos pelo sol, não o próprio sol. Isso faz do Filho e do Espírito criaturas do Pai, exatamente o erro de Ário.',
  },
  {
    id: 'clover',
    name: 'O trevo de três folhas',
    description: 'Um só trevo com três folhas.',
    icon: Clover,
    heresy: 'partialism',
    explanation:
      'Cada folha é só uma parte do trevo. Mas cada Pessoa divina não é “parte de Deus”: é Deus por inteiro.',
  },
  {
    id: 'egg',
    name: 'O ovo',
    description: 'Casca, clara e gema: três partes, um ovo.',
    icon: Egg,
    heresy: 'partialism',
    explanation:
      'A casca não é o ovo inteiro, nem a gema. De novo, a Trindade vira um objeto montado com peças.',
  },
  {
    id: 'neapolitan',
    name: 'O sorvete napolitano',
    description: 'Três sabores lado a lado no mesmo pote.',
    icon: IceCreamBowl,
    heresy: 'partialism',
    explanation:
      'Cada sabor é só um terço do pote, e os três ficam separados, lado a lado. Deus não é dividido em faixas, e as Pessoas não estão apenas juntas: são um só Deus.',
  },
  {
    id: 'friends',
    name: 'Três amigos inseparáveis',
    description: 'Três pessoas muito unidas, que pensam e agem juntas.',
    icon: Users,
    heresy: 'tritheism',
    explanation:
      'Por mais unidos que sejam, três amigos são três seres humanos distintos. Aplicado a Deus, isso dá três deuses.',
  },
]

export function getHeresy(id: HeresyId) {
  return heresies.find((heresy) => heresy.id === id)!
}
