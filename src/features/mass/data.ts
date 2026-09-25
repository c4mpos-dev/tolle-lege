export type Posture = 'stand' | 'sit' | 'kneel'

export type DialogueLine = { speaker: 'priest' | 'all'; text: string }

export type MassMoment = {
  title: string
  description: string
  posture: Posture
  dialogue?: DialogueLine[]
  /** Momento que só acontece em domingos e solenidades. */
  sundaysOnly?: boolean
  /** O sentido mais profundo do gesto (exibido em "Por que isso?"). */
  why?: string
}

export type MassPart = {
  id: string
  numeral: string
  title: string
  summary: string
  moments: MassMoment[]
}

export const postureLabels: Record<Posture, string> = {
  stand: 'Em pé',
  sit: 'Sentado',
  kneel: 'De joelhos',
}

export const massParts: MassPart[] = [
  {
    id: 'initial-rites',
    numeral: 'I',
    title: 'Ritos iniciais',
    summary: 'A comunidade se reúne, reconhece suas faltas e se prepara para ouvir a Palavra.',
    moments: [
      {
        title: 'Canto de entrada',
        description: 'O sacerdote entra em procissão e beija o altar, que representa Cristo.',
        why: 'A procissão lembra que somos um povo a caminho, peregrinando rumo a Deus. O beijo no altar é um gesto de amor: o altar representa o próprio Cristo, pedra angular da Igreja.',
        posture: 'stand',
      },
      {
        title: 'Sinal da cruz e saudação',
        description: 'Tudo começa em nome da Santíssima Trindade.',
        posture: 'stand',
        dialogue: [
          { speaker: 'priest', text: 'O Senhor esteja convosco.' },
          { speaker: 'all', text: 'Ele está no meio de nós.' },
        ],
      },
      {
        title: 'Ato penitencial',
        description: 'Um momento de silêncio para reconhecer os próprios pecados e pedir a misericórdia de Deus.',
        why: 'Antes de ouvir a Palavra e celebrar a Eucaristia, reconhecemos humildemente que precisamos de Deus. Não é humilhação: é a atitude de quem se sabe amado apesar das falhas.',
        posture: 'stand',
        dialogue: [
          { speaker: 'priest', text: 'Senhor, tende piedade de nós.' },
          { speaker: 'all', text: 'Senhor, tende piedade de nós.' },
        ],
      },
      {
        title: 'Glória',
        description: 'Hino antigo de louvor, cantado aos domingos (exceto no Advento e na Quaresma) e nas festas.',
        why: 'Suas primeiras palavras são o canto dos anjos na noite de Natal (Lucas 2,14). Omitido no Advento e na Quaresma, ele “volta” com mais força no Natal e na Páscoa.',
        posture: 'stand',
        sundaysOnly: true,
      },
      {
        title: 'Oração do dia (Coleta)',
        description: 'O sacerdote “recolhe” as intenções de todos numa só oração.',
        posture: 'stand',
        dialogue: [{ speaker: 'all', text: 'Amém.' }],
      },
    ],
  },
  {
    id: 'liturgy-of-the-word',
    numeral: 'II',
    title: 'Liturgia da Palavra',
    summary: 'Deus fala ao seu povo pelas Escrituras. É a mesa da Palavra.',
    moments: [
      {
        title: 'Primeira leitura',
        description: 'Geralmente do Antigo Testamento, ligada ao Evangelho do dia.',
        posture: 'sit',
        dialogue: [
          { speaker: 'priest', text: 'Palavra do Senhor.' },
          { speaker: 'all', text: 'Graças a Deus.' },
        ],
      },
      {
        title: 'Salmo responsorial',
        description: 'Um salmo cantado ou rezado. Todos repetem o refrão.',
        why: 'Os salmos são as orações que o próprio Jesus rezava. Aqui, a Palavra de Deus se torna a nossa resposta a Deus.',
        posture: 'sit',
      },
      {
        title: 'Segunda leitura',
        description: 'Das cartas dos apóstolos ou do Apocalipse.',
        posture: 'sit',
        sundaysOnly: true,
        dialogue: [
          { speaker: 'priest', text: 'Palavra do Senhor.' },
          { speaker: 'all', text: 'Graças a Deus.' },
        ],
      },
      {
        title: 'Aclamação e Evangelho',
        description: 'Todos se levantam para ouvir as palavras e ações de Jesus. Fazemos pequenas cruzes na testa, na boca e no peito.',
        why: 'Ficamos de pé porque é o próprio Cristo quem fala. As três pequenas cruzes pedem que a Palavra esteja na nossa mente, nos nossos lábios e no nosso coração.',
        posture: 'stand',
        dialogue: [
          { speaker: 'priest', text: 'Proclamação do Evangelho de Jesus Cristo segundo N.' },
          { speaker: 'all', text: 'Glória a vós, Senhor.' },
          { speaker: 'priest', text: 'Palavra da Salvação.' },
          { speaker: 'all', text: 'Glória a vós, Senhor.' },
        ],
      },
      {
        title: 'Homilia',
        description: 'O sacerdote explica as leituras e as aproxima da vida de hoje.',
        posture: 'sit',
      },
      {
        title: 'Profissão de fé (Creio)',
        description: 'Toda a assembleia proclama junta aquilo em que a Igreja crê.',
        why: 'Depois de ouvir a Palavra, a assembleia responde com a fé da Igreja de todos os tempos. O Creio da Missa é o Niceno-Constantinopolitano, formulado nos concílios do século IV.',
        posture: 'stand',
        sundaysOnly: true,
      },
      {
        title: 'Oração dos fiéis',
        description: 'Preces pela Igreja, pelo mundo, pelos que sofrem e pela comunidade.',
        posture: 'stand',
      },
    ],
  },
  {
    id: 'liturgy-of-the-eucharist',
    numeral: 'III',
    title: 'Liturgia Eucarística',
    summary: 'O coração da Missa: o pão e o vinho se tornam o Corpo e o Sangue de Cristo.',
    moments: [
      {
        title: 'Apresentação das oferendas',
        description: 'O pão e o vinho são levados ao altar. É também o momento da coleta.',
        why: 'O pão e o vinho são “fruto da terra e do trabalho humano”. Junto com eles, oferecemos também a nossa vida, que Deus vai santificar.',
        posture: 'sit',
      },
      {
        title: 'Oração eucarística e Santo',
        description: 'A grande oração de ação de graças. Todos cantam “Santo, Santo, Santo…”.',
        posture: 'stand',
        dialogue: [
          { speaker: 'priest', text: 'Corações ao alto.' },
          { speaker: 'all', text: 'O nosso coração está em Deus.' },
        ],
      },
      {
        title: 'Consagração',
        description: 'O sacerdote repete as palavras de Jesus na Última Ceia. O pão e o vinho se tornam o Corpo e o Sangue de Cristo.',
        why: 'É o momento mais sagrado da Missa. As palavras de Jesus na Última Ceia, ditas pelo sacerdote, tornam presente o seu sacrifício. Por isso nos ajoelhamos em adoração.',
        posture: 'kneel',
        dialogue: [
          { speaker: 'priest', text: 'Mistério da fé!' },
          {
            speaker: 'all',
            text: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!',
          },
        ],
      },
      {
        title: 'Pai-Nosso e abraço da paz',
        description: 'Rezamos a oração que Jesus ensinou e trocamos um gesto de paz com quem está ao lado.',
        posture: 'stand',
      },
      {
        title: 'Comunhão',
        description: 'Os católicos preparados recebem a Eucaristia. Quem não vai comungar pode permanecer no banco, rezando.',
        why: 'Receber a Eucaristia é unir-se a Cristo e a todos os que comungam. Por isso a Igreja pede estar em estado de graça: é um gesto de comunhão plena.',
        posture: 'stand',
        dialogue: [
          { speaker: 'priest', text: 'O Corpo de Cristo.' },
          { speaker: 'all', text: 'Amém.' },
        ],
      },
    ],
  },
  {
    id: 'concluding-rites',
    numeral: 'IV',
    title: 'Ritos finais',
    summary: 'Abençoados, somos enviados para viver no dia a dia o que celebramos.',
    moments: [
      {
        title: 'Bênção final',
        description: 'O sacerdote abençoa a assembleia. Fazemos o sinal da cruz.',
        posture: 'stand',
        dialogue: [{ speaker: 'all', text: 'Amém.' }],
      },
      {
        title: 'Despedida',
        description: '“Missa” vem justamente do latim “missio”: envio, missão.',
        why: 'A Missa não termina, ela continua na vida. Somos enviados para levar ao mundo o amor que recebemos.',
        posture: 'stand',
        dialogue: [
          { speaker: 'priest', text: 'Ide em paz, e o Senhor vos acompanhe.' },
          { speaker: 'all', text: 'Graças a Deus.' },
        ],
      },
    ],
  },
]

export const firstTimeTips = [
  'Chegue alguns minutos antes para se ambientar.',
  'Na dúvida, faça o que as pessoas ao redor estão fazendo.',
  'Quem não vai comungar pode ficar no banco durante a Comunhão.',
  'Deixe o celular no silencioso.',
  'A Missa de domingo dura cerca de uma hora.',
]
