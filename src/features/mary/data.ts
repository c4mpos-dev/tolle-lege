export type Scripture = { reference: string; text: string }

/** A vida de Maria segundo a Escritura. */
export const maryLife: { title: string; text: string; reference: string }[] = [
  {
    title: 'A Anunciação',
    text: 'Em Nazaré, o anjo Gabriel anuncia a uma jovem prometida em casamento a José que ela será a mãe do Filho de Deus. Ela responde: “Eis a serva do Senhor”.',
    reference: 'Lc 1,26-38',
  },
  {
    title: 'A Visitação',
    text: 'Maria vai às pressas ajudar sua parente Isabel, grávida de João Batista. Ali ela canta o Magnificat.',
    reference: 'Lc 1,39-56',
  },
  {
    title: 'O Natal',
    text: 'Em Belém, dá à luz Jesus e o coloca numa manjedoura. “Maria guardava todas essas coisas, meditando-as no seu coração.”',
    reference: 'Lc 2,1-19',
  },
  {
    title: 'A apresentação no Templo',
    text: 'O velho Simeão profetiza que uma espada de dor atravessará a alma de Maria.',
    reference: 'Lc 2,22-35',
  },
  {
    title: 'As bodas de Caná',
    text: 'Maria percebe que falta vinho e intercede junto a Jesus: “Fazei tudo o que ele vos disser”. É o primeiro sinal de Jesus.',
    reference: 'Jo 2,1-11',
  },
  {
    title: 'Aos pés da Cruz',
    text: 'Maria permanece junto do Filho até o fim. Jesus a entrega ao discípulo amado: “Eis a tua mãe”.',
    reference: 'Jo 19,25-27',
  },
  {
    title: 'Pentecostes',
    text: 'Maria está com os apóstolos em oração, esperando o Espírito Santo. Ela está presente no nascimento da Igreja.',
    reference: 'At 1,14',
  },
]

export type Dogma = {
  id: string
  title: string
  summary: string
  meaning: string
  scripture: Scripture
  when: string
  /** Um equívoco comum sobre o dogma. */
  confusion?: string
}

export const marianDogmas: Dogma[] = [
  {
    id: 'mother-of-god',
    title: 'Mãe de Deus',
    summary: 'Maria é mãe de Jesus, e Jesus é Deus.',
    meaning:
      'Ela não é mãe da divindade, que é eterna, mas é mãe de uma Pessoa: o Filho de Deus que se fez homem. Negar esse título seria dividir Jesus em dois.',
    scripture: {
      reference: 'Lc 1,43',
      text: 'Donde me vem esta honra, que a mãe do meu Senhor venha a mim?',
    },
    when: 'Concílio de Éfeso, em 431 (em grego, Theotókos: “aquela que gerou Deus”).',
  },
  {
    id: 'perpetual-virginity',
    title: 'Sempre Virgem',
    summary: 'Maria foi virgem antes, durante e depois do parto de Jesus.',
    meaning:
      'Jesus foi concebido pelo poder do Espírito Santo, sem intervenção de homem. E Maria permaneceu virgem por toda a vida, inteiramente consagrada a Deus.',
    scripture: {
      reference: 'Lc 1,34-35',
      text: 'Como acontecerá isso, se eu não conheço homem? […] O Espírito Santo virá sobre ti, e o poder do Altíssimo te cobrirá com a sua sombra.',
    },
    when: 'Crida desde os primeiros séculos; afirmada solenemente, por exemplo, pelo Concílio de Latrão, em 649.',
  },
  {
    id: 'immaculate-conception',
    title: 'Imaculada Conceição',
    summary: 'Maria foi preservada do pecado original desde o primeiro instante da sua existência.',
    meaning:
      'Por uma graça especial, em vista dos méritos de Jesus, Maria nunca teve a mancha do pecado original. Ela também foi salva por Cristo, só que de modo antecipado.',
    scripture: {
      reference: 'Lc 1,28',
      text: 'Alegra-te, cheia de graça, o Senhor está contigo.',
    },
    when: 'Proclamada pelo papa Pio IX em 1854, na bula Ineffabilis Deus.',
    confusion:
      'Não fala da concepção de Jesus, e sim da de Maria, no ventre de sua mãe, Santa Ana. É um dos dogmas mais confundidos.',
  },
  {
    id: 'assumption',
    title: 'Assunção',
    summary: 'Ao fim da sua vida terrena, Maria foi levada ao céu de corpo e alma.',
    meaning:
      'Ela antecipa o que Deus promete a todos os que creem: a ressurreição do corpo. A Igreja não definiu se Maria morreu antes de ser elevada.',
    scripture: {
      reference: 'Ap 12,1',
      text: 'Apareceu no céu um grande sinal: uma mulher vestida de sol, tendo a lua debaixo dos pés e sobre a cabeça uma coroa de doze estrelas.',
    },
    when: 'Proclamada pelo papa Pio XII em 1950, na constituição Munificentissimus Deus.',
  },
]

export type Question = { question: string; answer: string[]; scripture?: Scripture }

export const maryQuestions: Question[] = [
  {
    question: 'Os católicos adoram Maria?',
    answer: [
      'Não. A adoração é devida somente a Deus. Maria é venerada: honrada de modo especial, acima dos outros santos, por ser a Mãe de Jesus.',
      'A tradição dá nomes diferentes a isso: “latria” é a adoração a Deus; “dulia”, a veneração dos santos; “hiperdulia”, a veneração especial a Maria. Não são graus da mesma coisa: só Deus é adorado.',
    ],
    scripture: { reference: 'Lc 1,48', text: 'Doravante todas as gerações me chamarão bem-aventurada.' },
  },
  {
    question: 'Se Jesus é o único mediador, por que pedir a Maria?',
    answer: [
      'Jesus é o único mediador entre Deus e os homens. Mas isso não impede que os cristãos rezem uns pelos outros, algo que a própria Bíblia pede.',
      'Pedir a intercessão de Maria é como pedir a um amigo que reze por você. Ela não substitui Cristo: leva a ele, como em Caná (Catecismo, § 970).',
    ],
    scripture: {
      reference: '1Tm 2,1.5',
      text: 'Recomendo que se façam preces, orações, súplicas e ações de graças por todos […] Pois há um só Deus e um só mediador entre Deus e os homens: um homem, Cristo Jesus.',
    },
  },
  {
    question: 'Jesus não teve irmãos?',
    answer: [
      'Os Evangelhos falam dos “irmãos de Jesus”. Mas, no hebraico e no aramaico, a mesma palavra servia para primos e outros parentes próximos: Abraão chama seu sobrinho Ló de “irmão” (Gn 13,8).',
      'Tiago e José, citados como “irmãos” de Jesus (Mt 13,55), aparecem depois como filhos de outra Maria, presente junto à cruz (Mt 27,56). E, na cruz, Jesus entrega sua mãe a João, o que não faria sentido se ela tivesse outros filhos.',
    ],
  },
  {
    question: 'Por que tantos nomes: Aparecida, Fátima, Lourdes…?',
    answer: [
      'Há uma só Maria, a mãe de Jesus. Os diferentes títulos lembram lugares onde ela foi venerada, aparições ou aspectos da sua missão.',
      'Nossa Senhora Aparecida, de Fátima ou de Lourdes é sempre a mesma pessoa, assim como uma mãe continua sendo a mesma em cada foto de família.',
    ],
  },
]

export type MarianPlace = {
  name: string
  year: string
  place: string
  text: string
  /** Aparição reconhecida, ou devoção a uma imagem. */
  kind: 'apparition' | 'image'
}

export const marianPlaces: MarianPlace[] = [
  {
    name: 'Guadalupe',
    year: '1531',
    place: 'Cidade do México',
    text: 'Maria aparece ao indígena São Juan Diego e deixa sua imagem estampada no manto dele, a tilma, venerada até hoje.',
    kind: 'apparition',
  },
  {
    name: 'Aparecida',
    year: '1717',
    place: 'Rio Paraíba do Sul, SP',
    text: 'Três pescadores encontram na rede uma pequena imagem de Nossa Senhora da Conceição. Não é uma aparição, e sim a imagem que se tornou símbolo da fé do Brasil. Padroeira do Brasil, festa em 12 de outubro.',
    kind: 'image',
  },
  {
    name: 'Lourdes',
    year: '1858',
    place: 'França',
    text: 'Maria aparece 18 vezes à jovem Santa Bernadete e se apresenta: “Eu sou a Imaculada Conceição”, quatro anos depois da proclamação do dogma.',
    kind: 'apparition',
  },
  {
    name: 'Fátima',
    year: '1917',
    place: 'Portugal',
    text: 'Maria aparece a três pastorinhos, Lúcia, Francisco e Jacinta, de maio a outubro, pedindo oração do terço e conversão. Em 13 de outubro, milhares de pessoas testemunham o “milagre do sol”.',
    kind: 'apparition',
  },
]

export type MarianFeast = { name: string; month: number; day: number; note?: string }

/** Principais festas marianas (mês de 0 a 11). */
export const marianFeasts: MarianFeast[] = [
  { name: 'Santa Maria, Mãe de Deus', month: 0, day: 1 },
  { name: 'Anunciação do Senhor', month: 2, day: 25 },
  { name: 'Assunção de Nossa Senhora', month: 7, day: 15, note: 'No Brasil, celebrada no domingo seguinte, se não cair num domingo' },
  { name: 'Natividade de Nossa Senhora', month: 8, day: 8 },
  { name: 'Nossa Senhora Aparecida', month: 9, day: 12, note: 'Padroeira do Brasil' },
  { name: 'Imaculada Conceição', month: 11, day: 8 },
]

export const magnificat = [
  'A minha alma engrandece o Senhor,',
  'e o meu espírito se alegra em Deus, meu Salvador,',
  'porque olhou para a humildade de sua serva.',
  'Doravante todas as gerações me chamarão bem-aventurada,',
  'porque o Todo-poderoso fez em mim maravilhas: santo é o seu nome.',
]
