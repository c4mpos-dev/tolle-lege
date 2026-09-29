/**
 * Título e descrição de cada página para a prévia do link (WhatsApp, Instagram, Facebook…).
 * Os robôs dessas redes não rodam JavaScript: no build, cada página ganha um HTML próprio com
 * estas tags (ver `pageMetaPlugin`). A página inicial usa as tags do próprio index.html.
 * A mesma lista gera o sitemap.xml enviado ao Google.
 *
 * Os caminhos seguem `src/config/routes.ts`. Ao criar uma página, acrescente-a aqui também.
 */
export type PageMeta = {
  path: string
  title: string
  description: string
}

export const pages: PageMeta[] = [
  {
    path: '/trails',
    title: 'Trilhas · Tolle Lege',
    description:
      'Escolha a trilha que mais se parece com a sua história: passos curtos, com algo concreto para fazer em cada um.',
  },
  {
    path: '/trails/not-baptized',
    title: 'Não sou batizado · Tolle Lege',
    description:
      'Conheça o caminho do catecumenato e como dar os primeiros passos rumo ao Batismo.',
  },
  {
    path: '/trails/returning',
    title: 'Sou batizado e quero voltar · Tolle Lege',
    description: 'Reencontre a vida da Igreja: Confissão, Missa, Crisma e uma rotina de oração.',
  },
  {
    path: '/trails/other-religion',
    title: 'Venho de outra religião · Tolle Lege',
    description:
      'O que muda, o que permanece e as perguntas mais comuns de quem chega de outra tradição.',
  },
  {
    path: '/trails/curious',
    title: 'Só tenho curiosidade · Tolle Lege',
    description: 'Sem compromisso: entenda o essencial da fé católica, seus símbolos e costumes.',
  },
  {
    path: '/mass',
    title: 'Como funciona a Missa · Tolle Lege',
    description:
      'Passo a passo, o que acontece em cada momento, se é hora de ficar em pé, sentado ou de joelhos, e o que responder.',
  },
  {
    path: '/liturgy',
    title: 'Liturgia diária · Tolle Lege',
    description:
      'As leituras, o salmo e o Evangelho que a Igreja inteira lê hoje, em cada Missa no mundo.',
  },
  {
    path: '/faq',
    title: 'Dúvidas · Tolle Lege',
    description:
      'Não existe pergunta boba. As perguntas mais comuns de quem está chegando à fé católica, com respostas diretas.',
  },
  {
    path: '/curiosities',
    title: 'Curiosidades · Tolle Lege',
    description: 'Histórias, palavras e símbolos por trás da fé católica. Você sabia?',
  },
  {
    path: '/prayers',
    title: 'Orações e Terço · Tolle Lege',
    description:
      'As orações que todo católico conhece e um terço guiado para rezar conta por conta.',
  },
  {
    path: '/sacraments',
    title: 'Os sete sacramentos · Tolle Lege',
    description:
      'Sinais visíveis pelos quais Deus age de verdade na vida de cada pessoa, do nascimento na fé até o fim da vida.',
  },
  {
    path: '/liturgical-year',
    title: 'Ano litúrgico · Tolle Lege',
    description:
      'Ao longo do ano, a Igreja percorre toda a vida de Jesus. Cada tempo tem seu clima e sua cor.',
  },
  {
    path: '/confession',
    title: 'Como se confessar · Tolle Lege',
    description:
      'O reencontro com a misericórdia de Deus. Passo a passo e exame de consciência, para quem faz tempo ou nunca foi.',
  },
  {
    path: '/glossary',
    title: 'Glossário da fé · Tolle Lege',
    description:
      'Ambão, sacrário, homilia… As palavras que você vai ouvir na igreja, explicadas de um jeito simples.',
  },
  {
    path: '/trinity',
    title: 'A Santíssima Trindade · Tolle Lege',
    description:
      'Um só Deus em três Pessoas: Pai, Filho e Espírito Santo. O que isso quer dizer e onde está na Bíblia.',
  },
  {
    path: '/rose-novena',
    title: 'Novena das Rosas · Tolle Lege',
    description:
      'Nove dias de oração a Santa Teresinha do Menino Jesus, que prometeu passar o seu Céu fazendo o bem sobre a terra.',
  },
  {
    path: '/mary',
    title: 'Maria, Mãe de Jesus · Tolle Lege',
    description:
      'Quem foi a jovem de Nazaré, por que os católicos a honram e o que a Igreja ensina sobre ela.',
  },
  {
    path: '/tour',
    title: 'Visita guiada · Tolle Lege',
    description:
      'Percorra uma igreja em 3D, da escadaria ao galo no alto da torre, e descubra o sentido do altar, do sacrário e da pia batismal.',
  },
]
