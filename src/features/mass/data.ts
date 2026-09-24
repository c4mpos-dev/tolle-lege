export type Posture = 'stand' | 'sit' | 'kneel'

export type DialogueLine = { speaker: 'priest' | 'all'; text: string }

export type MassMoment = {
  title: string
  description: string
  posture: Posture
  dialogue?: DialogueLine[]
  /** Momento que só acontece em domingos e solenidades. */
  sundaysOnly?: boolean
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
        posture: 'stand',
        dialogue: [
          { speaker: 'priest', text: 'Senhor, tende piedade de nós.' },
          { speaker: 'all', text: 'Senhor, tende piedade de nós.' },
        ],
      },
      {
        title: 'Glória',
        description: 'Hino antigo de louvor, cantado aos domingos (exceto no Advento e na Quaresma) e nas festas.',
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
