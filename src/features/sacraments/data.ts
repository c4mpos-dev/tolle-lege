import { routes } from '@/config/routes'

export type SacramentGroupId = 'initiation' | 'healing' | 'service'

export type SacramentGroup = {
  id: SacramentGroupId
  title: string
  description: string
}

export type Sacrament = {
  id: string
  group: SacramentGroupId
  name: string
  tagline: string
  meaning: string[]
  symbols: string[]
  bible: { reference: string; text: string }
  who: string
  frequency: string
  preparation: string
  link?: { label: string; to: string }
}

export const sacramentGroups: SacramentGroup[] = [
  {
    id: 'initiation',
    title: 'Sacramentos da iniciação',
    description: 'Colocam os fundamentos da vida cristã: nascer, crescer e alimentar-se na fé.',
  },
  {
    id: 'healing',
    title: 'Sacramentos de cura',
    description: 'Curam as feridas da alma e do corpo, pela misericórdia de Deus.',
  },
  {
    id: 'service',
    title: 'Sacramentos do serviço',
    description: 'Consagram a vida para a missão e para o bem dos outros.',
  },
]

export const sacraments: Sacrament[] = [
  {
    id: 'baptism',
    group: 'initiation',
    name: 'Batismo',
    tagline: 'A porta de entrada da vida cristã',
    meaning: [
      'Pelo Batismo somos libertos do pecado original e de todos os pecados, renascemos como filhos de Deus e passamos a fazer parte da Igreja.',
      'Ele imprime na alma uma marca que nunca se apaga. Por isso é recebido uma única vez.',
    ],
    symbols: ['Água', 'Veste branca', 'Vela acesa', 'Óleo do crisma'],
    bible: {
      reference: 'Mt 28,19',
      text: 'Ide, pois, fazer discípulos entre todas as nações, e batizai-os em nome do Pai, e do Filho e do Espírito Santo.',
    },
    who: 'Toda pessoa ainda não batizada. Crianças são batizadas a pedido dos pais; adultos, depois do catecumenato.',
    frequency: 'Uma única vez na vida.',
    preparation: 'Pais e padrinhos participam de um encontro de preparação na paróquia. Adultos fazem o catecumenato.',
  },
  {
    id: 'confirmation',
    group: 'initiation',
    name: 'Crisma',
    tagline: 'A força do Espírito Santo',
    meaning: [
      'Também chamada de Confirmação, a Crisma completa a graça do Batismo e une a pessoa mais intimamente a Cristo e à Igreja.',
      'Ela derrama os dons do Espírito Santo: sabedoria, entendimento, conselho, fortaleza, ciência, piedade e temor de Deus.',
    ],
    symbols: ['Óleo do crisma', 'Imposição das mãos', 'Sinal da cruz na testa'],
    bible: {
      reference: 'At 8,17',
      text: 'Pedro e João impuseram-lhes as mãos, e eles receberam o Espírito Santo.',
    },
    who: 'Batizados que ainda não foram crismados, jovens ou adultos. Normalmente é celebrada pelo bispo.',
    frequency: 'Uma única vez na vida.',
    preparation: 'Catequese de Crisma na paróquia e escolha de um padrinho ou madrinha já crismado.',
  },
  {
    id: 'eucharist',
    group: 'initiation',
    name: 'Eucaristia',
    tagline: 'Fonte e ápice de toda a vida cristã',
    meaning: [
      'Na Missa, o pão e o vinho se tornam verdadeiramente o Corpo e o Sangue de Cristo. Ao comungar, recebemos o próprio Jesus.',
      'A primeira vez que alguém recebe a Eucaristia é chamada de Primeira Comunhão (ou Primeira Eucaristia).',
    ],
    symbols: ['Pão (hóstia)', 'Vinho', 'Altar'],
    bible: {
      reference: 'Lc 22,19',
      text: 'Tomou o pão, deu graças, partiu-o e deu-lhes, dizendo: “Isto é o meu corpo, que é dado por vós. Fazei isto em memória de mim.”',
    },
    who: 'Católicos que já fizeram a Primeira Eucaristia e estão em estado de graça (sem pecado grave não confessado).',
    frequency: 'Pode ser recebida em toda Missa. A Igreja pede que se comungue ao menos uma vez por ano, no tempo da Páscoa.',
    preparation: 'Fazer jejum de uma hora antes de comungar (água e remédios não quebram o jejum) e, se houver pecado grave, confessar-se antes.',
    link: { label: 'Como funciona a Missa', to: routes.mass },
  },
  {
    id: 'reconciliation',
    group: 'healing',
    name: 'Confissão',
    tagline: 'O abraço do Pai que perdoa',
    meaning: [
      'Também chamada de Reconciliação ou Penitência. Nela, Deus perdoa os pecados cometidos depois do Batismo, por meio do sacerdote.',
      'Mais do que um tribunal, é um encontro com a misericórdia: quem se confessa sai com a paz de quem foi perdoado.',
    ],
    symbols: ['Absolvição', 'Estola roxa', 'Sinal da cruz'],
    bible: {
      reference: 'Jo 20,22-23',
      text: 'Recebei o Espírito Santo. A quem perdoardes os pecados, eles lhes serão perdoados.',
    },
    who: 'Todo batizado. O padre guarda sigilo absoluto sobre tudo o que ouve.',
    frequency: 'Sempre que precisar. É obrigatória ao menos uma vez por ano para quem cometeu pecado grave.',
    preparation: 'Fazer um exame de consciência, arrepender-se sinceramente e ter o propósito de mudar.',
    link: { label: 'Guia da Confissão', to: routes.confession },
  },
  {
    id: 'anointing',
    group: 'healing',
    name: 'Unção dos Enfermos',
    tagline: 'Conforto e força na doença',
    meaning: [
      'Dá força, paz e coragem a quem enfrenta uma doença grave ou a fragilidade da velhice, unindo o sofrimento à paixão de Cristo. Se for da vontade de Deus, pode trazer também a cura do corpo.',
      'Não é só para quem está morrendo: pode ser pedida antes de uma cirurgia de risco ou numa doença séria.',
    ],
    symbols: ['Óleo dos enfermos', 'Imposição das mãos'],
    bible: {
      reference: 'Tg 5,14',
      text: 'Alguém de vós está doente? Mande chamar os presbíteros da Igreja, para que orem sobre ele, ungindo-o com óleo em nome do Senhor.',
    },
    who: 'Fiéis gravemente doentes, idosos fragilizados ou pessoas antes de uma cirurgia de risco.',
    frequency: 'Pode ser repetida se a doença se agravar ou surgir uma nova doença grave.',
    preparation: 'Basta chamar um padre da paróquia. Se possível, a pessoa também se confessa.',
  },
  {
    id: 'holy-orders',
    group: 'service',
    name: 'Ordem',
    tagline: 'Servir como diácono, padre ou bispo',
    meaning: [
      'Pela Ordem, homens são consagrados para servir a Igreja em nome de Cristo. Há três graus: diaconato, presbiterato (padres) e episcopado (bispos).',
      'É por ela que a missão confiada por Jesus aos apóstolos continua ao longo dos séculos.',
    ],
    symbols: ['Imposição das mãos pelo bispo', 'Óleo do crisma', 'Estola'],
    bible: {
      reference: '1Tm 4,14',
      text: 'Não negligencies o dom da graça que há em ti, que te foi dado com a imposição das mãos do presbitério.',
    },
    who: 'Homens batizados e crismados, chamados por Deus e aceitos pela Igreja após anos de formação.',
    frequency: 'Cada grau é recebido uma única vez.',
    preparation: 'Discernimento vocacional e formação no seminário, que costuma levar vários anos.',
  },
  {
    id: 'matrimony',
    group: 'service',
    name: 'Matrimônio',
    tagline: 'Uma aliança para toda a vida',
    meaning: [
      'O casamento entre um homem e uma mulher batizados é sinal do amor de Cristo pela Igreja: fiel, fecundo e para sempre.',
      'Curiosamente, os ministros do sacramento são os próprios noivos, que se doam um ao outro. O padre ou diácono é a testemunha da Igreja.',
    ],
    symbols: ['Consentimento dos noivos', 'Alianças', 'Bênção nupcial'],
    bible: {
      reference: 'Mt 19,6',
      text: 'De modo que já não são dois, mas uma só carne. Portanto, o que Deus uniu, o homem não separe.',
    },
    who: 'Um homem e uma mulher livres para se casar, que desejam uma união fiel e para toda a vida.',
    frequency: 'O vínculo dura enquanto os dois viverem.',
    preparation: 'Procurar a paróquia com meses de antecedência para o processo matrimonial e fazer o curso de noivos.',
  },
]
