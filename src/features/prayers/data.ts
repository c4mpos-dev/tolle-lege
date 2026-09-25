export type PrayerId =
  | 'sign-of-cross'
  | 'our-father'
  | 'hail-mary'
  | 'glory-be'
  | 'apostles-creed'
  | 'hail-holy-queen'
  | 'guardian-angel'
  | 'act-of-contrition'
  | 'holy-spirit'
  | 'fatima'

export type Prayer = {
  id: PrayerId
  title: string
  text: string
  /** Quando ou por que rezar. */
  note: string
}

export const prayers: Record<PrayerId, Prayer> = {
  'sign-of-cross': {
    id: 'sign-of-cross',
    title: 'Sinal da Cruz',
    text: 'Pelo sinal da Santa Cruz, livrai-nos, Deus, nosso Senhor, dos nossos inimigos.\nEm nome do Pai, e do Filho e do Espírito Santo. Amém.',
    note: 'Abre e fecha toda oração. Traçamos a cruz na testa, na boca e no peito, e depois do ombro esquerdo ao direito.',
  },
  'our-father': {
    id: 'our-father',
    title: 'Pai-Nosso',
    text: 'Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu.\nO pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
    note: 'A oração que o próprio Jesus ensinou aos discípulos (Mateus 6,9-13).',
  },
  'hail-mary': {
    id: 'hail-mary',
    title: 'Ave-Maria',
    text: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.\nSanta Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.',
    note: 'A primeira parte vem da saudação do anjo e de Isabel (Lucas 1,28.42); a segunda é um pedido de intercessão.',
  },
  'glory-be': {
    id: 'glory-be',
    title: 'Glória ao Pai',
    text: 'Glória ao Pai, e ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    note: 'Um pequeno louvor à Santíssima Trindade.',
  },
  'apostles-creed': {
    id: 'apostles-creed',
    title: 'Credo (Símbolo dos Apóstolos)',
    text: 'Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos.\nCreio no Espírito Santo, na santa Igreja católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.',
    note: 'O resumo da fé cristã, usado desde os primeiros séculos no Batismo.',
  },
  'hail-holy-queen': {
    id: 'hail-holy-queen',
    title: 'Salve-Rainha',
    text: 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas.\nEia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria.\nRogai por nós, santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    note: 'Tradicionalmente rezada ao final do terço.',
  },
  'guardian-angel': {
    id: 'guardian-angel',
    title: 'Santo Anjo',
    text: 'Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa e me ilumina. Amém.',
    note: 'Uma das primeiras orações que muitos aprendem na infância.',
  },
  'act-of-contrition': {
    id: 'act-of-contrition',
    title: 'Ato de Contrição',
    text: 'Meu Deus, eu me arrependo de todo o coração de vos ter ofendido, porque sois tão bom e amável.\nPrometo, com a vossa graça, esforçar-me para ser bom. Meu Jesus, misericórdia!',
    note: 'Pedido de perdão rezado na Confissão e ao fim do dia.',
  },
  'holy-spirit': {
    id: 'holy-spirit',
    title: 'Vinde, Espírito Santo',
    text: 'Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor.\nEnviai o vosso Espírito e tudo será criado. E renovareis a face da terra.\nOremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, concedei-nos que no mesmo Espírito saibamos o que é reto e gozemos sempre da sua consolação. Por Cristo, Senhor nosso. Amém.',
    note: 'Para pedir luz antes de estudar, decidir ou ler a Bíblia.',
  },
  fatima: {
    id: 'fatima',
    title: 'Ó meu Jesus',
    text: 'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.',
    note: 'Ensinada em Fátima (1917) e rezada depois de cada dezena do terço.',
  },
}

/** Orações exibidas na lista principal, na ordem de aprendizado. */
export const essentialPrayers: PrayerId[] = [
  'sign-of-cross',
  'our-father',
  'hail-mary',
  'glory-be',
  'apostles-creed',
  'hail-holy-queen',
  'act-of-contrition',
  'holy-spirit',
  'guardian-angel',
]
