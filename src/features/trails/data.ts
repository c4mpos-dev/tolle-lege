import { Compass, DoorOpen, Droplets, Lightbulb, type LucideIcon } from 'lucide-react'
import { routes } from '@/config/routes'

export type TrailTone = 'sage' | 'marian' | 'terracotta' | 'primary'

export type TrailStep = {
  title: string
  body: string[]
  /** Uma ação concreta para colocar o passo em prática. */
  practice: string
  /** Página do site para aprofundar o passo. */
  link?: { label: string; to: string }
}

export type Trail = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  tone: TrailTone
  steps: TrailStep[]
}

export const trails: Trail[] = [
  {
    id: 'not-baptized',
    title: 'Não sou batizado',
    description:
      'Conheça o caminho do catecumenato e como dar os primeiros passos rumo ao Batismo.',
    icon: Droplets,
    tone: 'marian',
    steps: [
      {
        title: 'Deus chama você pelo nome',
        body: [
          'Se você sente curiosidade ou desejo de conhecer Deus, isso já é um começo. A fé cristã ensina que é Deus quem toma a iniciativa: ele procura cada pessoa, com a sua história.',
          'Você não precisa “estar pronto” nem ter todas as respostas. O caminho é justamente para isso.',
        ],
        practice: 'Reserve alguns minutos em silêncio e diga a Deus, com suas palavras, que quer conhecê-lo.',
      },
      {
        title: 'Procure uma paróquia',
        body: [
          'A porta de entrada é a paróquia mais próxima. Procure a secretaria paroquial e diga que você é adulto, não é batizado e gostaria de se preparar para o Batismo.',
          'Você será encaminhado à catequese de adultos, que segue o RICA — Rito de Iniciação Cristã de Adultos.',
        ],
        practice: 'Anote o horário da secretaria da paróquia mais próxima e faça uma visita ou ligação.',
      },
      {
        title: 'O catecumenato',
        body: [
          'O catecumenato é um tempo de formação e amadurecimento, que costuma durar cerca de um ano (varia conforme a paróquia). Você aprende sobre a fé, a oração e a vida cristã, acompanhado por catequistas e por um padrinho ou madrinha.',
          'Ao longo do caminho há ritos que marcam cada etapa, celebrados junto com a comunidade.',
        ],
        practice: 'Pense em alguém de fé que você admira e que poderia acompanhá-lo como padrinho ou madrinha.',
      },
      {
        title: 'Participe da Missa desde já',
        body: [
          'Você pode e deve participar da Missa mesmo antes do Batismo. Apenas a Comunhão fica para depois: ela é o ponto de chegada da iniciação cristã.',
          'Na hora da Comunhão, você pode permanecer no banco rezando. Em muitas paróquias, também é possível ir à fila com os braços cruzados sobre o peito para receber uma bênção.',
        ],
        practice: 'Vá a uma Missa de domingo. Antes, leia como ela funciona na nossa página sobre a Missa.',
        link: { label: 'Como funciona a Missa', to: routes.mass },
      },
      {
        title: 'Aprenda a rezar',
        body: [
          'A oração é conversa com Deus. Comece pelas orações que todo cristão sabe: o Sinal da Cruz, o Pai-Nosso (que o próprio Jesus ensinou), a Ave-Maria e o Glória ao Pai.',
          'Aos poucos, leia os Evangelhos: eles contam a vida de Jesus e são o centro da fé.',
        ],
        practice: 'Leia o Evangelho do dia na página de Liturgia e reze um Pai-Nosso ao final.',
        link: { label: 'Orações essenciais', to: routes.prayers },
      },
      {
        title: 'Os sacramentos da iniciação',
        body: [
          'Ao final do caminho, o adulto recebe juntos os três sacramentos da iniciação cristã: Batismo, Crisma e Eucaristia. Normalmente isso acontece na Vigília Pascal, a noite mais importante do ano para a Igreja.',
          'A partir daí, você passa a fazer parte plenamente da Igreja, e o caminho continua pela vida inteira.',
        ],
        practice: 'Converse com seu catequista sobre a data prevista para receber os sacramentos.',
        link: { label: 'Os sete sacramentos', to: routes.sacraments },
      },
    ],
  },
  {
    id: 'returning',
    title: 'Sou batizado e quero voltar',
    description: 'Reencontre a vida da Igreja: Confissão, Missa, Crisma e uma rotina de oração.',
    icon: DoorOpen,
    tone: 'sage',
    steps: [
      {
        title: 'A porta está aberta',
        body: [
          'Jesus contou a parábola do filho que sai de casa e, quando volta, é recebido pelo pai com um abraço e uma festa (Lucas 15). É assim que Deus recebe quem retorna.',
          'Não importa quanto tempo passou. Você não precisa se explicar para ninguém para voltar a entrar numa igreja.',
        ],
        practice: 'Leia Lucas 15,11-32, a parábola do filho pródigo.',
      },
      {
        title: 'Volte à Missa de domingo',
        body: [
          'O domingo é o dia da Ressurreição, e a Missa dominical é o coração da vida católica. Comece por ela, mesmo que ainda não se sinta pronto para comungar.',
          'Se faz tempo, pode ser que algumas respostas tenham mudado. Não se preocupe: acompanhe a comunidade.',
        ],
        practice: 'Escolha uma paróquia e um horário de Missa para o próximo domingo.',
        link: { label: 'Como funciona a Missa', to: routes.mass },
      },
      {
        title: 'Faça uma boa Confissão',
        body: [
          'O sacramento da Reconciliação (Confissão) é o caminho de volta. Nele, Deus perdoa os pecados por meio do sacerdote, que guarda absoluto sigilo sobre tudo o que ouve.',
          'Prepare-se com um exame de consciência, procure o padre e diga há quanto tempo não se confessa. Ele vai ajudá-lo em tudo.',
        ],
        practice: 'Procure os horários de Confissão da sua paróquia e faça um exame de consciência antes.',
        link: { label: 'Guia da Confissão', to: routes.confession },
      },
      {
        title: 'Complete a sua iniciação',
        body: [
          'Se você foi batizado mas não fez a Primeira Eucaristia ou a Crisma, as paróquias oferecem catequese de adultos para completar a iniciação cristã.',
        ],
        practice: 'Pergunte na secretaria paroquial sobre a catequese de adultos ou a Crisma de adultos.',
        link: { label: 'Sobre a Crisma', to: `${routes.sacraments}#confirmation` },
      },
      {
        title: 'Crie uma rotina de oração',
        body: [
          'A fé cresce com o hábito. Comece pequeno: uma oração ao acordar, a leitura do Evangelho do dia, um terço por semana.',
          'Participar de um grupo ou pastoral da paróquia também ajuda a não caminhar sozinho.',
        ],
        practice: 'Escolha um horário fixo do dia para rezar por cinco minutos.',
        link: { label: 'Terço guiado', to: `${routes.prayers}#terco` },
      },
    ],
  },
  {
    id: 'other-religion',
    title: 'Venho de outra religião',
    description:
      'O que muda, o que permanece e as perguntas mais comuns de quem chega de outra tradição.',
    icon: Compass,
    tone: 'terracotta',
    steps: [
      {
        title: 'O que você já traz',
        body: [
          'Se você foi batizado em outra Igreja cristã, com água e “em nome do Pai, e do Filho e do Espírito Santo”, a Igreja Católica reconhece esse Batismo. Ele não é repetido.',
          'Se você vem de uma religião não cristã, o caminho é o catecumenato, o mesmo de quem não é batizado.',
        ],
        practice: 'Procure seu registro ou certidão de Batismo, se tiver, para levar à paróquia.',
      },
      {
        title: 'Escritura e Tradição',
        body: [
          'Para os católicos, a Revelação de Deus chega por meio da Sagrada Escritura e da Tradição, interpretadas pelo Magistério da Igreja.',
          'A Bíblia católica tem 73 livros: inclui sete livros do Antigo Testamento (como Tobias, Judite e Sabedoria) que não constam em muitas Bíblias protestantes.',
        ],
        practice: 'Folheie uma Bíblia católica e procure os livros de Tobias e Sabedoria.',
      },
      {
        title: 'A Eucaristia',
        body: [
          'A Igreja crê que, na Missa, o pão e o vinho se tornam verdadeiramente o Corpo e o Sangue de Cristo. Não é apenas um símbolo: é a presença real de Jesus.',
          'Por isso a Eucaristia é chamada de “fonte e ápice” de toda a vida cristã.',
        ],
        practice: 'Leia João 6,51-58, onde Jesus fala do Pão da Vida.',
        link: { label: 'Sobre a Eucaristia', to: `${routes.sacraments}#eucharist` },
      },
      {
        title: 'Maria e os santos',
        body: [
          'Os católicos não adoram Maria nem os santos: a adoração é devida somente a Deus. Maria e os santos são venerados, isto é, honrados como exemplos de fé.',
          'Pedir a intercessão de um santo é como pedir que um amigo reze por você.',
        ],
        practice: 'Leia o Magnificat, o cântico de Maria, em Lucas 1,46-55.',
        link: { label: 'Os católicos adoram Maria?', to: `${routes.faq}#worship-mary` },
      },
      {
        title: 'O Papa e a Igreja',
        body: [
          'A Igreja Católica entende que Jesus confiou a Pedro uma missão especial (Mateus 16,18) e que os bispos são sucessores dos apóstolos. O Papa, bispo de Roma, é o sucessor de Pedro.',
        ],
        practice: 'Leia Mateus 16,13-19.',
      },
      {
        title: 'Como ingressar',
        body: [
          'Quem já é batizado em outra Igreja cristã passa por um tempo de preparação e é recebido na plena comunhão da Igreja Católica com uma profissão de fé, recebendo depois a Crisma e a Eucaristia.',
          'O primeiro passo é conversar com um padre ou com a catequese de adultos da paróquia.',
        ],
        practice: 'Marque uma conversa com o padre da paróquia mais próxima.',
      },
    ],
  },
  {
    id: 'curious',
    title: 'Só tenho curiosidade',
    description: 'Sem compromisso: entenda o essencial da fé católica, seus símbolos e costumes.',
    icon: Lightbulb,
    tone: 'primary',
    steps: [
      {
        title: 'Em que os católicos creem',
        body: [
          'O resumo da fé está no Credo: um só Deus em três Pessoas (Pai, Filho e Espírito Santo); Jesus Cristo, verdadeiro Deus e verdadeiro homem, que morreu e ressuscitou; a Igreja; o perdão dos pecados e a vida eterna.',
        ],
        practice: 'Leia o Credo dos Apóstolos e anote o que mais chamou a sua atenção.',
        link: { label: 'Ler o Credo', to: `${routes.prayers}#apostles-creed` },
      },
      {
        title: 'Os sete sacramentos',
        body: [
          'Sacramentos são sinais visíveis pelos quais Deus age na vida das pessoas. São sete: Batismo, Crisma, Eucaristia, Confissão, Unção dos Enfermos, Ordem e Matrimônio.',
        ],
        practice: 'Tente lembrar de quais sacramentos você já viu serem celebrados.',
        link: { label: 'Os sete sacramentos', to: routes.sacraments },
      },
      {
        title: 'Símbolos e costumes',
        body: [
          'O Sinal da Cruz, a água benta na entrada da igreja, as velas, o incenso e as cores das vestes do padre: cada gesto e objeto tem um significado.',
          'As cores, por exemplo, mudam conforme o tempo do ano: verde, roxo, branco, vermelho e rosa.',
        ],
        practice: 'Veja na página de Liturgia qual é a cor litúrgica de hoje.',
        link: { label: 'As cores do ano litúrgico', to: routes.liturgicalYear },
      },
      {
        title: 'Visite uma Missa',
        body: [
          'Qualquer pessoa pode assistir a uma Missa, sem compromisso. Basta chegar, sentar e acompanhar. Ninguém vai pedir explicações.',
        ],
        practice: 'Leia como funciona a Missa e visite uma igreja perto de você.',
        link: { label: 'Como funciona a Missa', to: routes.mass },
      },
    ],
  },
]

export function getTrail(id: string | undefined) {
  return trails.find((trail) => trail.id === id)
}
