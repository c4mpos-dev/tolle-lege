export type FaqCategory = 'faith' | 'mass' | 'sacraments' | 'life'

export type FaqItem = {
  id: string
  category: FaqCategory
  question: string
  answer: string[]
}

export const faqCategories: Record<FaqCategory, string> = {
  faith: 'Fé',
  mass: 'Missa',
  sacraments: 'Sacramentos',
  life: 'Vida cristã',
}

export const faqItems: FaqItem[] = [
  {
    id: 'mass-without-baptism',
    category: 'mass',
    question: 'Preciso ser batizado para ir à Missa?',
    answer: [
      'Não. Qualquer pessoa pode participar da Missa, católica ou não. Você é bem-vindo para ouvir, rezar e acompanhar.',
    ],
  },
  {
    id: 'communion-non-catholic',
    category: 'mass',
    question: 'Posso comungar se não sou católico?',
    answer: [
      'Via de regra, não. A Comunhão expressa a fé comum na presença real de Cristo e a plena unidade com a Igreja. Por isso ela é reservada aos católicos preparados.',
      'Durante a Comunhão, você pode permanecer no banco rezando. Isso é perfeitamente normal.',
    ],
  },
  {
    id: 'state-of-grace',
    category: 'sacraments',
    question: 'O que significa “estar em estado de graça”?',
    answer: [
      'Significa não ter nenhum pecado grave (mortal) sem ter se confessado. É a condição para receber a Comunhão. Pecados leves (veniais) não impedem de comungar.',
    ],
  },
  {
    id: 'worship-mary',
    category: 'faith',
    question: 'Os católicos adoram Maria?',
    answer: [
      'Não. A adoração é devida somente a Deus. Maria é venerada, isto é, honrada de modo especial por ser a Mãe de Jesus e o maior exemplo de fé.',
      'Quando um católico reza a Ave-Maria, pede que ela interceda, que reze por nós, como pedimos a um amigo.',
    ],
  },
  {
    id: 'why-confess-to-priest',
    category: 'sacraments',
    question: 'Por que confessar os pecados a um padre?',
    answer: [
      'Porque Jesus deu aos apóstolos o poder de perdoar pecados em seu nome (João 20,22-23). Na Confissão, é Deus quem perdoa, por meio do sacerdote.',
      'O padre é obrigado a guardar sigilo absoluto sobre tudo o que ouve, sem nenhuma exceção.',
    ],
  },
  {
    id: 'how-to-confess',
    category: 'sacraments',
    question: 'Como é uma Confissão, na prática?',
    answer: [
      'Você faz o sinal da cruz, diz há quanto tempo não se confessa e conta seus pecados com simplicidade. O padre dá um conselho e uma penitência (geralmente uma oração).',
      'Depois você reza um ato de contrição (um pedido de perdão) e recebe a absolvição. Se estiver nervoso ou não lembrar como fazer, é só dizer: o padre conduz tudo.',
    ],
  },
  {
    id: 'what-to-wear',
    category: 'mass',
    question: 'Que roupa usar na Missa?',
    answer: [
      'Não há um uniforme. O ideal é uma roupa discreta e respeitosa, como você usaria num encontro importante.',
    ],
  },
  {
    id: 'mass-duration',
    category: 'mass',
    question: 'Quanto tempo dura uma Missa?',
    answer: [
      'Aos domingos, cerca de uma hora. Nos dias de semana, costuma durar entre 30 e 40 minutos.',
    ],
  },
  {
    id: 'offering',
    category: 'mass',
    question: 'Sou obrigado a dar dinheiro na coleta?',
    answer: [
      'Não. A oferta é livre e voluntária. Ela ajuda a manter a paróquia e suas obras de caridade, mas ninguém é obrigado a contribuir.',
    ],
  },
  {
    id: 'sunday-obligation',
    category: 'life',
    question: 'Preciso ir à Missa todo domingo?',
    answer: [
      'Sim, para os católicos a participação na Missa aos domingos e nos dias santos de guarda é um preceito da Igreja. O domingo é o dia da Ressurreição de Jesus.',
      'Doença, necessidade de cuidar de alguém ou impossibilidade real dispensam dessa obrigação.',
    ],
  },
  {
    id: 'sign-of-cross',
    category: 'faith',
    question: 'Por que os católicos fazem o sinal da cruz?',
    answer: [
      'É uma oração com o corpo: lembra a cruz de Cristo, pela qual fomos salvos, e a Santíssima Trindade, “em nome do Pai, e do Filho e do Espírito Santo”. É um costume dos primeiros séculos do cristianismo.',
    ],
  },
  {
    id: 'catholic-vs-protestant',
    category: 'faith',
    question: 'Qual a diferença entre católicos e evangélicos?',
    answer: [
      'Ambos creem em Jesus Cristo como Salvador e na Bíblia como Palavra de Deus. As principais diferenças estão na autoridade da Tradição e do Papa, no número de sacramentos, na compreensão da Eucaristia e no lugar de Maria e dos santos.',
      'A Igreja Católica reconhece os cristãos de outras igrejas como irmãos em Cristo, unidos pelo Batismo.',
    ],
  },
  {
    id: 'church-and-science',
    category: 'faith',
    question: 'A Igreja é contra a ciência?',
    answer: [
      'Não. Para a Igreja, fé e razão não se opõem, pois vêm do mesmo Deus. Muitos cientistas foram católicos, e a teoria do Big Bang foi proposta por um padre, o belga Georges Lemaître.',
    ],
  },
  {
    id: 'catechism',
    category: 'faith',
    question: 'O que é o Catecismo?',
    answer: [
      'O Catecismo da Igreja Católica, publicado em 1992, é um resumo completo e organizado do que a Igreja crê, celebra, vive e reza. É o livro de referência para quem quer aprofundar.',
    ],
  },
  {
    id: 'liturgical-seasons',
    category: 'life',
    question: 'O que são Advento, Quaresma e Tempo Comum?',
    answer: [
      'São os tempos do ano litúrgico. O Advento prepara o Natal; a Quaresma, a Páscoa; o Tempo Pascal celebra a Ressurreição por 50 dias; e o Tempo Comum acompanha a vida pública de Jesus.',
      'Cada tempo tem sua cor: roxo no Advento e na Quaresma, branco no Natal e na Páscoa, verde no Tempo Comum.',
    ],
  },
  {
    id: 'find-parish',
    category: 'life',
    question: 'Como encontro uma paróquia?',
    answer: [
      'Procure “paróquia” e o nome do seu bairro num buscador ou mapa, ou consulte o site da diocese da sua cidade, que costuma listar todas as paróquias com endereços e horários.',
    ],
  },
]
