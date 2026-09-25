export type ConfessionPhase = {
  id: string
  title: string
  steps: { title: string; description: string; words?: string }[]
}

export const confessionPhases: ConfessionPhase[] = [
  {
    id: 'before',
    title: 'Antes',
    steps: [
      {
        title: 'Peça luz ao Espírito Santo',
        description: 'Faça uma breve oração pedindo sinceridade para enxergar a própria vida sem medo.',
      },
      {
        title: 'Faça o exame de consciência',
        description:
          'Repasse, com calma, os mandamentos e lembre-se do que fez de errado desde a última Confissão. Se ajudar, anote para não esquecer.',
      },
      {
        title: 'Arrependa-se e decida mudar',
        description:
          'O essencial é o arrependimento sincero e o propósito de não voltar a pecar. Não precisa sentir emoção forte: basta a decisão.',
      },
    ],
  },
  {
    id: 'during',
    title: 'Durante',
    steps: [
      {
        title: 'Cumprimente e faça o sinal da cruz',
        description: 'Pode ser no confessionário ou numa conversa frente a frente, como preferir.',
        words: 'Em nome do Pai, e do Filho e do Espírito Santo. Amém.',
      },
      {
        title: 'Diga há quanto tempo não se confessa',
        description: 'Se for a primeira vez ou faz muitos anos, diga isso ao padre: ele vai conduzir você.',
        words: 'Padre, faz tanto tempo desde a minha última Confissão.',
      },
      {
        title: 'Conte seus pecados',
        description:
          'Com simplicidade e sem rodeios. Os pecados graves devem ser ditos com a quantidade aproximada. Não é preciso contar detalhes desnecessários.',
      },
      {
        title: 'Ouça o conselho e a penitência',
        description: 'O padre pode dar uma orientação e indicará uma penitência, geralmente uma oração ou uma boa ação.',
      },
      {
        title: 'Reze o ato de contrição',
        description: 'É o seu pedido de perdão a Deus. Se não souber de cor, pode ler ou dizer com suas palavras.',
      },
      {
        title: 'Receba a absolvição',
        description: 'O padre estende a mão e diz as palavras do perdão. Ao final, responda “Amém”.',
        words: '… e eu te absolvo dos teus pecados, em nome do Pai, e do Filho e do Espírito Santo.',
      },
    ],
  },
  {
    id: 'after',
    title: 'Depois',
    steps: [
      {
        title: 'Cumpra a penitência',
        description: 'De preferência logo em seguida, ainda na igreja.',
      },
      {
        title: 'Agradeça e recomece',
        description:
          'Seus pecados estão perdoados de verdade. Não é preciso carregar culpa pelo que foi confessado: siga em paz.',
      },
    ],
  },
]

export type Commandment = { number: number; title: string; questions: string[] }

export const commandments: Commandment[] = [
  {
    number: 1,
    title: 'Amar a Deus sobre todas as coisas',
    questions: [
      'Deixei de rezar ou passei muito tempo sem me lembrar de Deus?',
      'Coloquei dinheiro, trabalho, fama ou prazer acima de Deus?',
      'Pratiquei superstições, horóscopo, simpatias ou consultei médiuns?',
      'Duvidei da fé de propósito ou tive vergonha de ser cristão?',
    ],
  },
  {
    number: 2,
    title: 'Não tomar seu santo nome em vão',
    questions: [
      'Usei o nome de Deus, de Nossa Senhora ou dos santos com desrespeito?',
      'Jurei em falso ou jurei sem necessidade?',
      'Deixei de cumprir uma promessa feita a Deus?',
    ],
  },
  {
    number: 3,
    title: 'Guardar domingos e festas de guarda',
    questions: [
      'Faltei à Missa aos domingos ou dias santos por negligência?',
      'Cheguei atrasado ou me distraí de propósito durante a Missa?',
      'Trabalhei sem necessidade no domingo, sem tempo para Deus e para a família?',
    ],
  },
  {
    number: 4,
    title: 'Honrar pai e mãe',
    questions: [
      'Desrespeitei meus pais ou fui ingrato com eles?',
      'Negligenciei os cuidados com minha família, meus filhos ou meus pais idosos?',
      'Desobedeci às autoridades legítimas em algo justo?',
    ],
  },
  {
    number: 5,
    title: 'Não matar',
    questions: [
      'Guardei raiva, ódio ou desejo de vingança?',
      'Agredi alguém com palavras, gestos ou violência?',
      'Descuidei da minha saúde ou abusei de álcool, drogas ou comida?',
      'Participei, aconselhei ou apoiei um aborto?',
      'Recusei-me a perdoar alguém?',
    ],
  },
  {
    number: 6,
    title: 'Não pecar contra a castidade',
    questions: [
      'Consenti em pensamentos ou desejos impuros?',
      'Consumi pornografia?',
      'Tive relações sexuais fora do casamento?',
      'Fui infiel ao meu cônjuge?',
    ],
  },
  {
    number: 7,
    title: 'Não furtar',
    questions: [
      'Peguei ou fiquei com algo que não era meu?',
      'Fui desonesto no trabalho, nos negócios ou nos impostos?',
      'Deixei de pagar dívidas ou de devolver o que me emprestaram?',
      'Fui egoísta e indiferente com quem passa necessidade?',
    ],
  },
  {
    number: 8,
    title: 'Não levantar falso testemunho',
    questions: [
      'Menti, exagerei ou enganei alguém?',
      'Falei mal dos outros, fiz fofoca ou espalhei boatos?',
      'Revelei segredos que me foram confiados?',
      'Julguei os outros sem motivo?',
    ],
  },
  {
    number: 9,
    title: 'Não desejar a mulher do próximo',
    questions: [
      'Alimentei desejos por alguém casado ou fantasias que ferem o respeito ao outro?',
      'Olhei para as pessoas como objetos?',
    ],
  },
  {
    number: 10,
    title: 'Não cobiçar as coisas alheias',
    questions: [
      'Tive inveja do que os outros têm ou conquistaram?',
      'Vivi apegado ao dinheiro e às coisas, sempre insatisfeito?',
    ],
  },
]
