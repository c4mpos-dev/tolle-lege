import { routes } from '@/config/routes'

export type Scripture = { reference: string; text: string }

export type TourStop = {
  id: string
  title: string
  text: string[]
  scripture?: Scripture
  link?: { label: string; to: string }
}

/** Ponto da visita externa, ancorado em peças do modelo 3D (pelo início do nome da malha). */
export type ExteriorStop = TourStop & {
  nodes: string[]
  /** Ajustes de câmera: distância e ângulo vertical (0 = de cima, π/2 = na altura). */
  view?: { distance?: number; polar?: number }
}

/** Ponto da visita interna, posicionado na planta ilustrada (viewBox 360 × 560). */
export type InteriorStop = TourStop & { x: number; y: number }

export const exteriorStops: ExteriorStop[] = [
  {
    id: 'forecourt',
    title: 'O adro e a escadaria',
    text: [
      'O adro é o espaço de acolhida entre a rua e a igreja, onde a comunidade se encontra antes e depois da Missa.',
      'Subir os degraus lembra que ir à igreja é ir ao encontro de Deus. Os judeus subiam cantando até o Templo de Jerusalém.',
    ],
    scripture: { reference: 'Sl 122(121),1', text: 'Que alegria quando me disseram: vamos à casa do Senhor!' },
    nodes: ['front_stair_step'],
    view: { distance: 7, polar: 1.15 },
  },
  {
    id: 'door',
    title: 'A porta principal',
    text: [
      'Jesus se apresentou como a porta. Atravessá-la é deixar o barulho do mundo e entrar na casa de Deus.',
      'Nos anos jubilares, as grandes basílicas de Roma abrem uma Porta Santa, sinal da misericórdia que acolhe a todos.',
    ],
    scripture: { reference: 'Jo 10,9', text: 'Eu sou a porta. Quem entrar por mim será salvo.' },
    nodes: ['main_door'],
    view: { distance: 4.5 },
  },
  {
    id: 'cross',
    title: 'A cruz no alto da fachada',
    text: [
      'No ponto mais alto do frontão, a cruz identifica a igreja de longe: é a casa de Deus.',
      'Ela lembra que a salvação vem pela cruz de Cristo, sinal de amor até o fim.',
    ],
    scripture: {
      reference: 'Gl 6,14',
      text: 'Quanto a mim, que eu não me glorie a não ser na cruz de nosso Senhor Jesus Cristo.',
    },
    nodes: ['pediment_cross'],
    view: { distance: 4, polar: 1.35 },
  },
  {
    id: 'quatrefoil',
    title: 'A rosácea',
    text: [
      'Janelas redondas ou em forma de flor enfeitam a fachada de muitas igrejas e deixam entrar a luz sobre a nave.',
      'Esta tem forma de quadrifólio, com quatro lóbulos, muitas vezes associado aos quatro evangelistas. É o desenho que inspirou o ornamento deste site.',
    ],
    nodes: ['pediment_quatrefoil', 'quatrefoil_'],
    view: { distance: 4, polar: 1.4 },
  },
  {
    id: 'bells',
    title: 'As torres e os sinos',
    text: [
      'As torres apontam para o céu e abrigam os sinos.',
      'Os sinos chamam o povo para a Missa, marcam a oração do Angelus (às 6h, 12h e 18h) e anunciam as festas e os falecimentos da comunidade.',
    ],
    nodes: ['belfry_west_opening'],
    view: { distance: 5, polar: 1.4 },
  },
  {
    id: 'clock',
    title: 'O relógio',
    text: [
      'Por muito tempo, o relógio da torre marcou o ritmo da cidade inteira.',
      'Ele lembra que o tempo é dom de Deus e pode ser santificado pela oração, como faz a Igreja com a Liturgia das Horas, rezada em vários momentos do dia.',
    ],
    scripture: { reference: 'Sl 90(89),12', text: 'Ensinai-nos a contar os nossos dias, para que tenhamos um coração sábio.' },
    nodes: ['belfry_east_clock'],
    view: { distance: 3.5, polar: 1.45 },
  },
  {
    id: 'rooster',
    title: 'O galo do cata-vento',
    text: [
      'No alto das torres, os cata-ventos têm um galo. Na tradição cristã, ele lembra o canto que fez Pedro chorar por ter negado Jesus, e o convite a vigiar.',
      'Por anunciar o amanhecer, o galo também é sinal de Cristo, a luz que vence a noite.',
    ],
    scripture: {
      reference: 'Lc 22,60.62',
      text: 'No mesmo instante, enquanto ele ainda falava, um galo cantou. […] E Pedro, saindo para fora, chorou amargamente.',
    },
    nodes: ['spire_west_weathervane_rooster'],
    view: { distance: 4, polar: 1.3 },
  },
  {
    id: 'nave',
    title: 'A nave',
    text: [
      'O corpo central da igreja se chama nave, do latim navis: navio.',
      'A Igreja é como uma barca que leva o povo de Deus pelas águas da história, como a arca de Noé e a barca de Pedro.',
    ],
    nodes: ['nave_roof'],
    view: { distance: 8, polar: 0.85 },
  },
  {
    id: 'windows',
    title: 'Os vitrais',
    text: [
      'As janelas das laterais têm vitrais, que filtram a luz do dia em cores.',
      'Na Idade Média, os vitrais eram uma “Bíblia de luz” para quem não sabia ler: contavam cenas da Escritura e da vida dos santos.',
    ],
    nodes: ['aisle_east_window_3'],
    view: { distance: 5, polar: 1.35 },
  },
  {
    id: 'chancel',
    title: 'A capela-mor',
    text: [
      'Nos fundos fica a capela-mor, a parte mais nobre da igreja: é ali que está o altar.',
      'Em muitas igrejas antigas, ela era voltada para o Oriente, onde nasce o sol, símbolo de Cristo ressuscitado. Agora, vamos entrar.',
    ],
    nodes: ['chancel_roof'],
    view: { distance: 7, polar: 1.05 },
  },
]

export const interiorStops: InteriorStop[] = [
  {
    id: 'holy-water',
    title: 'A água benta',
    text: [
      'Ao entrar, os católicos molham os dedos na água benta e fazem o sinal da cruz.',
      'É uma lembrança do próprio Batismo, que nos fez entrar na família de Deus.',
    ],
    x: 250,
    y: 505,
  },
  {
    id: 'font',
    title: 'A pia batismal',
    text: [
      'É onde se celebra o Batismo. Muitas igrejas a colocam perto da entrada, porque o Batismo é a porta da vida cristã.',
    ],
    scripture: {
      reference: 'Rm 6,4',
      text: 'Pelo batismo na sua morte, fomos sepultados com ele, para que, como Cristo ressuscitou dos mortos pela glória do Pai, assim também nós levemos uma vida nova.',
    },
    link: { label: 'O sacramento do Batismo', to: `${routes.sacraments}#baptism` },
    x: 88,
    y: 478,
  },
  {
    id: 'assembly',
    title: 'Os bancos da assembleia',
    text: [
      'A assembleia não é uma plateia: é o povo de Deus que celebra junto, cada um com a sua voz e a sua oração.',
      'Antes de entrar no banco, é costume fazer uma genuflexão (dobrar o joelho direito até o chão) voltado para o sacrário.',
    ],
    scripture: { reference: '1Pd 2,9', text: 'Vós sois raça eleita, sacerdócio régio, nação santa, povo que ele conquistou.' },
    link: { label: 'Como funciona a Missa', to: routes.mass },
    x: 180,
    y: 350,
  },
  {
    id: 'confessional',
    title: 'O confessionário',
    text: [
      'É o lugar do sacramento da Reconciliação.',
      'Pode ter uma grade, para quem prefere não ser visto, ou ser uma pequena sala para conversar frente a frente com o padre. Você escolhe.',
    ],
    link: { label: 'Como se confessar', to: routes.confession },
    x: 300,
    y: 420,
  },
  {
    id: 'stations',
    title: 'A Via-Sacra',
    text: [
      'Nas paredes laterais há 14 quadros ou cruzes que contam o caminho de Jesus, da condenação até o sepulcro.',
      'Rezá-la é acompanhar Jesus estação por estação, especialmente nas sextas-feiras da Quaresma.',
    ],
    x: 52,
    y: 330,
  },
  {
    id: 'saints',
    title: 'Nossa Senhora e os santos',
    text: [
      'As imagens não são adoradas: lembram pessoas que viveram o Evangelho, como fotos de família que nos animam a seguir o mesmo caminho.',
    ],
    link: { label: 'Maria, Mãe de Jesus', to: routes.mary },
    x: 72,
    y: 222,
  },
  {
    id: 'ambo',
    title: 'O ambão',
    text: [
      'É a mesa da Palavra. Dele se proclamam as leituras, o salmo e o Evangelho, e se faz a homilia.',
      'Por isso é reservado à Palavra de Deus: avisos e cantos costumam ser feitos de outro lugar.',
    ],
    scripture: { reference: 'Is 55,11', text: 'A palavra que sair de minha boca não voltará para mim vazia.' },
    link: { label: 'A liturgia de hoje', to: routes.liturgy },
    x: 110,
    y: 168,
  },
  {
    id: 'paschal-candle',
    title: 'O círio pascal',
    text: [
      'Grande vela acesa na Vigília Pascal, sinal de Cristo ressuscitado, a luz do mundo.',
      'No Tempo Pascal, fica perto do ambão ou do altar. No resto do ano, fica junto à pia batismal e é aceso nos batizados e nos funerais.',
    ],
    x: 128,
    y: 122,
  },
  {
    id: 'altar',
    title: 'O altar',
    text: [
      'É o centro da igreja: a mesa onde o sacrifício de Cristo se torna presente e onde se partilha o Pão da Vida.',
      'O altar representa o próprio Cristo. Por isso o padre o beija no início e no fim da Missa. Muitos guardam relíquias de santos, costume que vem das Missas celebradas sobre os túmulos dos mártires.',
    ],
    link: { label: 'A Liturgia Eucarística', to: `${routes.mass}#liturgy-of-the-eucharist` },
    x: 180,
    y: 135,
  },
  {
    id: 'crucifix',
    title: 'O crucifixo',
    text: [
      'Sobre o altar ou perto dele há sempre uma cruz com a imagem de Cristo.',
      'Ela lembra que a Missa torna presente o único sacrifício de Jesus na cruz, oferecido uma vez por todas.',
    ],
    scripture: { reference: '1Cor 1,23', text: 'Nós pregamos Cristo crucificado.' },
    x: 180,
    y: 62,
  },
  {
    id: 'tabernacle',
    title: 'O sacrário',
    text: [
      'Também chamado de tabernáculo, guarda as hóstias consagradas: para levar a Comunhão aos doentes e para a adoração.',
      'A lâmpada acesa ao lado indica que Jesus está ali presente. É diante dele que os católicos fazem a genuflexão.',
    ],
    scripture: { reference: 'Mt 28,20', text: 'Eu estou convosco todos os dias, até o fim do mundo.' },
    link: { label: 'O sacramento da Eucaristia', to: `${routes.sacraments}#eucharist` },
    x: 262,
    y: 96,
  },
]
