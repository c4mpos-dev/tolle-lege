import { Compass, DoorOpen, Droplets, Lightbulb, type LucideIcon } from 'lucide-react'
import { routes } from '@/config/routes'

export type TrailTone = 'sage' | 'marian' | 'terracotta' | 'primary'

export type Scripture = { reference: string; text: string }

export type TrailStep = {
  title: string
  body: string[]
  /** Passagem bíblica que ilumina o passo. */
  scripture?: Scripture
  /** Informações práticas e esclarecimentos ("Bom saber"). */
  tips?: string[]
  /** Uma ação concreta para colocar o passo em prática. */
  practice: string
  /** Página do site para aprofundar o passo. */
  link?: { label: string; to: string }
}

export type Trail = {
  id: string
  title: string
  description: string
  /** Para quem a trilha foi pensada. */
  audience: string
  intro: string[]
  /** Palavra final, exibida ao concluir a trilha. */
  closing: string
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
    audience:
      'Jovens e adultos que nunca foram batizados, em nenhuma igreja cristã, e desejam conhecer a fé ou receber o Batismo.',
    intro: [
      'A Igreja tem um caminho próprio para adultos que desejam ser batizados: a iniciação cristã, descrita no Ritual da Iniciação Cristã de Adultos (RICA). Ninguém faz esse caminho sozinho: a comunidade, os catequistas e um padrinho ou madrinha acompanham cada passo.',
      'Não há pressa. O tempo de cada etapa respeita o amadurecimento da fé de cada pessoa.',
    ],
    closing:
      'O Batismo não é o fim do caminho, é o começo de uma vida nova. Continue perto da sua comunidade: é ali que a fé cresce.',
    icon: Droplets,
    tone: 'marian',
    steps: [
      {
        title: 'Deus chama você pelo nome',
        body: [
          'Se você sente curiosidade, saudade de algo que não sabe explicar ou desejo de conhecer Deus, isso já é um começo. A fé cristã ensina que é Deus quem toma a iniciativa: ele procura cada pessoa, com a sua história inteira.',
          'Você não precisa estar “pronto”, ter uma vida organizada ou todas as respostas. O caminho existe justamente para isso.',
        ],
        scripture: {
          reference: 'Is 43,1',
          text: 'Não temas, porque eu te resgatei; chamei-te pelo nome, tu és meu.',
        },
        practice:
          'Reserve alguns minutos em silêncio e diga a Deus, com suas próprias palavras, que você quer conhecê-lo.',
      },
      {
        title: 'Procure uma paróquia',
        body: [
          'A porta de entrada é a paróquia mais próxima da sua casa. Vá à secretaria paroquial e diga, simplesmente, que é adulto, não é batizado e gostaria de se preparar para o Batismo.',
          'Você será encaminhado à catequese de adultos (também chamada de catequese com adultos ou de iniciação cristã). Em algumas paróquias, primeiro há uma conversa com o padre ou com um catequista.',
        ],
        tips: [
          'Leve um documento de identidade. Não é preciso levar mais nada no primeiro contato.',
          'Se a sua paróquia não tiver turma aberta, pergunte qual paróquia vizinha tem.',
          'Se você vive uma situação familiar complexa, como uma segunda união, converse abertamente com o padre desde o início. Isso não é motivo para desistir: há caminhos para cada caso.',
        ],
        practice:
          'Descubra o horário da secretaria da paróquia mais próxima e faça uma visita ou ligação nesta semana.',
      },
      {
        title: 'As etapas do caminho',
        body: [
          'O Ritual prevê quatro tempos. Primeiro, o pré-catecumenato: um tempo de primeiro anúncio, para conhecer Jesus e decidir seguir adiante. Depois, o catecumenato propriamente dito: formação na fé, na oração e na vida cristã, que começa com um rito de entrada celebrado com a comunidade.',
          'Quando a pessoa está preparada, vem o tempo da purificação e iluminação, que normalmente coincide com a Quaresma. Ele começa com o rito da eleição (a “inscrição do nome”) e inclui os escrutínios, orações especiais celebradas nas Missas de domingo, e as entregas do Credo e do Pai-Nosso.',
          'Por fim, depois dos sacramentos, vem a mistagogia: um tempo, durante a Páscoa, para aprofundar o que foi vivido.',
        ],
        tips: [
          'A duração varia conforme a paróquia e o caminho de cada um. O próprio Ritual admite que o catecumenato pode se estender por anos, se for necessário.',
          'Os catecúmenos já são considerados parte da família da Igreja (Catecismo, § 1249), mesmo antes do Batismo.',
        ],
        practice:
          'Pergunte ao seu catequista em qual etapa você está e o que se espera de você nesse tempo.',
      },
      {
        title: 'Escolha um padrinho ou madrinha',
        body: [
          'O padrinho ou a madrinha acompanha o catecúmeno durante a preparação, apresenta-o à comunidade e continua ajudando depois do Batismo. É alguém que testemunha a fé com a própria vida.',
        ],
        tips: [
          'Pelo Código de Direito Canônico (cân. 874), o padrinho precisa ser católico, já ter recebido Batismo, Crisma e Eucaristia, levar uma vida de fé coerente e ter pelo menos 16 anos (a diocese pode definir outra idade).',
          'O pai ou a mãe do batizando não podem ser padrinhos.',
          'Basta um padrinho ou uma madrinha; também podem ser dois, um homem e uma mulher.',
        ],
        practice:
          'Pense em alguém de fé que você admira e converse com essa pessoa sobre o convite.',
      },
      {
        title: 'Participe da Missa desde já',
        body: [
          'Você pode e deve participar da Missa mesmo antes do Batismo. É ali que a comunidade que vai acolher você se reúne, e é ouvindo a Palavra que a fé cresce.',
          'Apenas a Comunhão fica para depois: a Eucaristia é o ponto de chegada da iniciação cristã, recebida pela primeira vez junto com o Batismo.',
        ],
        tips: [
          'Na hora da Comunhão, você pode permanecer no banco rezando. Em muitas paróquias, também é costume ir à fila com os braços cruzados sobre o peito para receber uma bênção; se tiver dúvida, pergunte na sua paróquia.',
          'Em algumas comunidades, os catecúmenos são despedidos com uma bênção depois da homilia, para refletirem juntos sobre a Palavra. É um costume antigo, não uma exclusão.',
        ],
        scripture: {
          reference: 'Mt 18,20',
          text: 'Onde dois ou três estiverem reunidos em meu nome, eu estou ali, no meio deles.',
        },
        practice: 'Vá a uma Missa de domingo. Antes, leia como ela funciona.',
        link: { label: 'Como funciona a Missa', to: routes.mass },
      },
      {
        title: 'Aprenda a rezar',
        body: [
          'Rezar é conversar com Deus. Não existe jeito errado de começar: com suas palavras, em silêncio, ou com as orações que os cristãos rezam há séculos, como o Sinal da Cruz, o Pai-Nosso, a Ave-Maria e o Glória.',
          'Ao mesmo tempo, comece a ler os Evangelhos. Uma boa porta de entrada é o Evangelho de Marcos, o mais curto, ou o de Lucas.',
        ],
        scripture: {
          reference: 'Lc 11,1',
          text: 'Senhor, ensina-nos a rezar.',
        },
        practice:
          'Aprenda o Pai-Nosso de cor e leia um capítulo do Evangelho de Marcos por dia.',
        link: { label: 'Orações essenciais', to: routes.prayers },
      },
      {
        title: 'Batismo, Crisma e Eucaristia',
        body: [
          'Ao final do caminho, o adulto recebe na mesma celebração os três sacramentos da iniciação cristã: Batismo, Crisma e Eucaristia. Normalmente isso acontece na Vigília Pascal, a noite mais importante do ano para a Igreja.',
          'O Batismo apaga todos os pecados, inclusive o original, e faz de você filho de Deus e membro da Igreja. A Crisma confirma essa graça com os dons do Espírito Santo. E na Eucaristia você recebe pela primeira vez o Corpo de Cristo.',
        ],
        scripture: {
          reference: 'Jo 3,5',
          text: 'Em verdade, em verdade te digo: quem não nascer da água e do Espírito não pode entrar no Reino de Deus.',
        },
        practice:
          'Converse com seu catequista sobre a data prevista para receber os sacramentos e prepare o coração com a Quaresma.',
        link: { label: 'Os sete sacramentos', to: routes.sacraments },
      },
    ],
  },
  {
    id: 'returning',
    title: 'Sou batizado e quero voltar',
    description: 'Reencontre a vida da Igreja: Confissão, Missa, Crisma e uma rotina de oração.',
    audience:
      'Quem foi batizado na Igreja Católica, se afastou por algum motivo e quer voltar, ou nunca chegou a viver a fé de verdade.',
    intro: [
      'Você não precisa ser batizado de novo: o Batismo marca a alma para sempre. O que existe é um caminho de volta, que Jesus descreveu na parábola do filho pródigo.',
      'Não importa quanto tempo passou nem o motivo do afastamento. A porta está aberta.',
    ],
    closing:
      'Voltar é um recomeço, não uma prova. Seja paciente consigo mesmo e continue dando um passo de cada vez.',
    icon: DoorOpen,
    tone: 'sage',
    steps: [
      {
        title: 'A porta está aberta',
        body: [
          'Jesus contou a história de um filho que pediu sua herança, saiu de casa e desperdiçou tudo. Quando decidiu voltar, preparou um discurso de arrependimento. Mas o pai correu ao seu encontro antes que ele terminasse de falar.',
          'É assim que Deus recebe quem retorna: sem cobranças, com festa. Você não precisa se explicar para ninguém para voltar a entrar numa igreja.',
        ],
        scripture: {
          reference: 'Lc 15,20',
          text: 'Quando ainda estava longe, seu pai o avistou e sentiu compaixão. Correu-lhe ao encontro, abraçou-o e cobriu-o de beijos.',
        },
        practice: 'Leia a parábola inteira, em Lucas 15,11-32, e perceba em qual personagem você se reconhece.',
      },
      {
        title: 'Volte à Missa de domingo',
        body: [
          'O domingo é o dia da Ressurreição de Jesus, e a Missa dominical é o coração da vida católica. Comece por ela, mesmo que ainda não se sinta pronto para comungar: participar já é voltar.',
          'Se faz muito tempo, algumas respostas podem ter mudado. Desde 2023 as paróquias do Brasil usam uma nova tradução do Missal. Acompanhe a comunidade, sem medo de errar.',
        ],
        tips: [
          'Enquanto não se confessar, se tiver consciência de pecado grave, não comungue: permaneça no banco rezando. Isso é perfeitamente normal.',
          'Para comungar, faça jejum de uma hora antes (água e remédios não quebram o jejum).',
        ],
        practice: 'Escolha uma paróquia e um horário de Missa para o próximo domingo.',
        link: { label: 'Como funciona a Missa', to: routes.mass },
      },
      {
        title: 'Faça uma boa Confissão',
        body: [
          'O sacramento da Reconciliação é o grande passo de volta. Nele, Deus perdoa os pecados por meio do sacerdote, e você sai com a certeza do perdão.',
          'Prepare-se com um exame de consciência. Na Confissão, diga há quanto tempo não se confessa e conte os pecados graves que lembrar, com a quantidade aproximada. Se for difícil, diga ao padre: ele vai conduzir você.',
        ],
        scripture: {
          reference: '1Jo 1,9',
          text: 'Se reconhecemos nossos pecados, Deus é fiel e justo para nos perdoar e nos purificar de toda injustiça.',
        },
        tips: [
          'O padre é obrigado a guardar sigilo absoluto sobre tudo o que ouve, sem nenhuma exceção.',
          'Pecados esquecidos sem culpa também são perdoados. Se lembrar deles depois, basta mencioná-los na próxima Confissão.',
          'Muitas paróquias têm horários fixos de Confissão; em outras, é preciso marcar.',
        ],
        practice:
          'Descubra os horários de Confissão da sua paróquia e faça o exame de consciência com calma, um dia antes.',
        link: { label: 'Guia da Confissão', to: routes.confession },
      },
      {
        title: 'Complete a sua iniciação',
        body: [
          'Muita gente foi batizada quando criança, mas não fez a Primeira Eucaristia ou a Crisma. Nunca é tarde: as paróquias oferecem catequese de adultos justamente para completar a iniciação cristã.',
          'A Crisma, em especial, costuma ser pedida para ser padrinho ou madrinha e para o casamento na Igreja.',
        ],
        tips: [
          'Leve a sua certidão de Batismo. Se não tiver, a paróquia onde você foi batizado pode emitir uma segunda via.',
        ],
        practice:
          'Pergunte na secretaria paroquial sobre a catequese de adultos para Primeira Eucaristia ou Crisma.',
        link: { label: 'Sobre a Crisma', to: `${routes.sacraments}#confirmation` },
      },
      {
        title: 'Se a sua situação de casamento for delicada',
        body: [
          'Se você é casado só no civil, é possível regularizar a união celebrando o sacramento do Matrimônio. Muitas paróquias fazem inclusive casamentos comunitários.',
          'Se você está numa segunda união depois de um divórcio, converse com um padre. A Igreja tem o processo de declaração de nulidade, que avalia se o primeiro casamento foi válido desde o início. Ele ficou mais simples e acessível desde 2015.',
          'Qualquer que seja a sua situação, você continua sendo parte da Igreja e é chamado a participar da Missa, rezar e viver a comunidade.',
        ],
        tips: [
          'Quem vive uma segunda união, sem a nulidade do primeiro casamento, normalmente não recebe a Comunhão. Isso não significa exclusão da comunidade; converse com o padre sobre o seu caso.',
        ],
        practice: 'Se esse for o seu caso, marque uma conversa com o padre da sua paróquia.',
      },
      {
        title: 'Crie uma rotina de oração',
        body: [
          'A fé cresce com o hábito, como uma amizade. Comece pequeno e seja fiel: uma oração ao acordar, a leitura do Evangelho do dia, um terço por semana.',
          'Participar de um grupo, pastoral ou movimento da paróquia também ajuda muito a não caminhar sozinho.',
        ],
        scripture: {
          reference: 'At 2,42',
          text: 'Eram perseverantes em ouvir o ensinamento dos apóstolos, na comunhão fraterna, no partir do pão e nas orações.',
        },
        practice: 'Escolha um horário fixo do dia para rezar por cinco minutos, todos os dias desta semana.',
        link: { label: 'Terço guiado', to: `${routes.prayers}#terco` },
      },
    ],
  },
  {
    id: 'other-religion',
    title: 'Venho de outra religião',
    description:
      'O que muda, o que permanece e as perguntas mais comuns de quem chega de outra tradição.',
    audience:
      'Quem vem de outra igreja cristã (evangélica, protestante, ortodoxa) ou de outra religião e deseja conhecer ou abraçar a fé católica.',
    intro: [
      'Muito do que você já viveu tem valor. Se você é cristão, a Igreja Católica o reconhece como irmão em Cristo, unido pelo Batismo e pela fé em Jesus.',
      'Esta trilha apresenta, com respeito, os pontos em que a fé católica se diferencia e o caminho para entrar na plena comunhão.',
    ],
    closing:
      'Buscar a verdade com sinceridade é sempre um caminho que agrada a Deus. Continue perguntando, lendo e rezando.',
    icon: Compass,
    tone: 'terracotta',
    steps: [
      {
        title: 'O que você já traz',
        body: [
          'Se você foi batizado em outra igreja cristã com água e com as palavras “em nome do Pai, e do Filho e do Espírito Santo”, a Igreja Católica reconhece esse Batismo como válido. Ele não é repetido.',
          'Se houver dúvida real sobre como o Batismo foi feito, a Igreja pode celebrar um Batismo “sob condição”.',
          'Se você vem de uma religião não cristã, ou foi batizado num grupo que não professa a Santíssima Trindade, o caminho é o catecumenato, o mesmo de quem não é batizado.',
        ],
        tips: [
          'A Igreja não reconhece, por exemplo, o batismo das Testemunhas de Jeová nem o da Igreja de Jesus Cristo dos Santos dos Últimos Dias, porque a compreensão de Deus nesses grupos é diferente.',
          'Se você tiver uma certidão ou registro do seu Batismo, leve à paróquia.',
        ],
        scripture: {
          reference: 'Jo 17,21',
          text: 'Que todos sejam um, como tu, Pai, estás em mim e eu em ti.',
        },
        practice: 'Procure registros do seu Batismo: certidão, fotos, a igreja e a data.',
      },
      {
        title: 'Escritura e Tradição',
        body: [
          'Para os católicos, a Palavra de Deus chega até nós de duas formas unidas: a Sagrada Escritura e a Tradição viva da Igreja, transmitida desde os apóstolos. O Magistério, isto é, o Papa e os bispos, tem a missão de interpretá-las fielmente.',
          'Foi a Igreja dos primeiros séculos que discerniu quais livros formam a Bíblia. A Bíblia católica tem 73 livros: além dos presentes nas Bíblias protestantes, inclui Tobias, Judite, Sabedoria, Eclesiástico, Baruc, 1 e 2 Macabeus e partes de Ester e Daniel, chamados deuterocanônicos.',
        ],
        scripture: {
          reference: '2Ts 2,15',
          text: 'Ficai firmes e guardai as tradições que vos ensinamos, seja de viva voz, seja por carta.',
        },
        practice: 'Folheie uma Bíblia católica e leia o capítulo 7 do livro da Sabedoria.',
      },
      {
        title: 'Graça, fé e obras',
        body: [
          'Uma dúvida comum é se os católicos acreditam que se salvam “pelas obras”. Não: a Igreja ensina que a salvação é graça, um dom gratuito de Deus que ninguém pode merecer, acolhido pela fé.',
          'Essa fé, porém, é viva e se expressa no amor. As boas obras não compram a salvação: são fruto da graça em quem crê.',
          'Em 1999, a Igreja Católica e a Federação Luterana Mundial assinaram uma Declaração Conjunta reconhecendo um consenso fundamental sobre esse tema.',
        ],
        scripture: {
          reference: 'Ef 2,8',
          text: 'Pela graça fostes salvos, mediante a fé; e isto não vem de vós, é dom de Deus.',
        },
        practice: 'Leia Efésios 2,8-10 e Tiago 2,14-17 e perceba como os dois textos se completam.',
      },
      {
        title: 'A Eucaristia',
        body: [
          'A Igreja crê que, na Missa, o pão e o vinho se tornam verdadeiramente o Corpo e o Sangue de Cristo. Não é apenas um símbolo ou uma recordação: é a presença real de Jesus. A Igreja chama essa mudança de transubstanciação.',
          'Por isso a Eucaristia é chamada de “fonte e ápice” de toda a vida cristã, e por isso o pão consagrado é guardado com reverência no sacrário.',
        ],
        scripture: {
          reference: 'Jo 6,51',
          text: 'Eu sou o pão vivo descido do céu. Quem comer deste pão viverá eternamente.',
        },
        tips: [
          'Enquanto não entrar na plena comunhão, você pode participar de toda a Missa, mas não comungar.',
        ],
        practice: 'Leia o capítulo 6 do Evangelho de João inteiro.',
        link: { label: 'Sobre a Eucaristia', to: `${routes.sacraments}#eucharist` },
      },
      {
        title: 'Maria e os santos',
        body: [
          'Os católicos não adoram Maria nem os santos: a adoração é devida somente a Deus. Maria e os santos são venerados, isto é, honrados como exemplos de quem viveu o Evangelho.',
          'Pedir a intercessão de um santo é como pedir que um amigo reze por você, só que um amigo que já está junto de Deus.',
          'Sobre Maria, a Igreja proclama quatro dogmas: ela é Mãe de Deus (Concílio de Éfeso, ano 431), sempre virgem, concebida sem pecado (Imaculada Conceição, 1854) e elevada ao céu de corpo e alma (Assunção, 1950).',
        ],
        scripture: {
          reference: 'Lc 1,48',
          text: 'Doravante todas as gerações me chamarão bem-aventurada.',
        },
        practice: 'Leia o Magnificat, o cântico de Maria, em Lucas 1,46-55.',
        link: { label: 'Maria, Mãe de Jesus', to: routes.mary },
      },
      {
        title: 'O Papa e a Igreja',
        body: [
          'A Igreja entende que Jesus confiou a Pedro uma missão especial entre os apóstolos, e que os bispos são os sucessores dos apóstolos. O Papa, bispo de Roma, é o sucessor de Pedro e sinal da unidade da Igreja.',
          'A infalibilidade do Papa é muitas vezes mal entendida: ela não significa que ele não erre ou não peque. Vale apenas quando ele define solenemente uma verdade de fé ou de moral para toda a Igreja, algo que acontece muito raramente.',
        ],
        scripture: {
          reference: 'Mt 16,18',
          text: 'Tu és Pedro, e sobre esta pedra edificarei a minha Igreja.',
        },
        practice: 'Leia Mateus 16,13-19 e João 21,15-17.',
      },
      {
        title: 'Como entrar na plena comunhão',
        body: [
          'Quem já é batizado validamente em outra igreja cristã não passa pelo catecumenato de quem não é batizado. Faz um tempo de preparação, adaptado à sua história, e é recebido na Igreja Católica com uma profissão de fé.',
          'Na mesma celebração, ou pouco depois, recebe a Crisma e a Eucaristia. Antes, normalmente, faz a sua primeira Confissão.',
        ],
        tips: [
          'Cristãos ortodoxos já têm sacramentos válidos, inclusive a Crisma. Para eles, o caminho costuma ser ainda mais simples; converse com o padre.',
          'O primeiro passo é sempre uma conversa com o padre ou com a catequese de adultos da paróquia.',
        ],
        practice: 'Marque uma conversa com o padre da paróquia mais próxima.',
      },
    ],
  },
  {
    id: 'curious',
    title: 'Só tenho curiosidade',
    description: 'Sem compromisso: entenda o essencial da fé católica, seus símbolos e costumes.',
    audience:
      'Quem quer entender o que os católicos creem e vivem, por curiosidade, estudo ou por conviver com católicos, sem compromisso nenhum.',
    intro: [
      'Não é preciso crer para entender. Esta trilha resume, em poucos passos, o essencial da fé católica e explica gestos e costumes que chamam a atenção de quem vê de fora.',
    ],
    closing:
      'Se algo aqui tocou você, as outras trilhas estão abertas. E se não, obrigado pela visita: a curiosidade também é um bom caminho.',
    icon: Lightbulb,
    tone: 'primary',
    steps: [
      {
        title: 'Quem é Jesus para os cristãos',
        body: [
          'Jesus de Nazaré viveu na Palestina no século I. Os cristãos creem que ele é o Filho de Deus feito homem: verdadeiro Deus e verdadeiro homem.',
          'Ele anunciou o Reino de Deus, curou doentes, acolheu os excluídos, foi crucificado em Jerusalém e, no terceiro dia, ressuscitou. A Ressurreição é o centro de toda a fé cristã.',
        ],
        scripture: {
          reference: 'Jo 1,14',
          text: 'E a Palavra se fez carne e habitou entre nós.',
        },
        practice: 'Leia o Evangelho de Marcos, o mais curto: dá para ler em uma ou duas horas.',
      },
      {
        title: 'Em que os católicos creem',
        body: [
          'O resumo da fé está no Credo, rezado desde os primeiros séculos: um só Deus em três Pessoas (Pai, Filho e Espírito Santo); Jesus Cristo, que morreu e ressuscitou; a Igreja; o perdão dos pecados; a ressurreição e a vida eterna.',
          'Para quem quer ir além, o Catecismo da Igreja Católica, de 1992, explica tudo isso de forma organizada.',
        ],
        practice: 'Leia o Credo dos Apóstolos e anote o que mais chamou a sua atenção.',
        link: { label: 'Ler o Credo', to: `${routes.prayers}#apostles-creed` },
      },
      {
        title: 'Os sete sacramentos',
        body: [
          'Sacramentos são sinais visíveis, como água, óleo, pão e vinho, pelos quais os católicos creem que Deus age de verdade na vida das pessoas.',
          'São sete e acompanham a vida inteira: Batismo, Crisma e Eucaristia (iniciação); Confissão e Unção dos Enfermos (cura); Ordem e Matrimônio (serviço).',
        ],
        practice: 'Lembre-se de quais sacramentos você já viu serem celebrados, num batizado ou casamento.',
        link: { label: 'Os sete sacramentos', to: routes.sacraments },
      },
      {
        title: 'Símbolos e costumes',
        body: [
          'O Sinal da Cruz lembra a morte e ressurreição de Jesus. A água benta na entrada da igreja recorda o Batismo. A lâmpada acesa perto do sacrário indica que ali está a Eucaristia, e por isso os católicos se ajoelham ou fazem reverência diante dele.',
          'As cores das vestes do padre mudam conforme o tempo do ano: verde, roxo, branco, vermelho e, em dois domingos, rosa.',
        ],
        practice: 'Veja qual é o tempo litúrgico e a cor de hoje.',
        link: { label: 'Ano litúrgico', to: routes.liturgicalYear },
      },
      {
        title: 'Visite uma Missa',
        body: [
          'Qualquer pessoa pode assistir a uma Missa, sem compromisso. Basta chegar, sentar e acompanhar; ninguém vai pedir explicações.',
          'Só a Comunhão é reservada aos católicos. Durante esse momento, é só permanecer no lugar.',
        ],
        scripture: {
          reference: 'Sl 34(33),9',
          text: 'Provai e vede como o Senhor é bom.',
        },
        practice: 'Leia como funciona a Missa e visite uma igreja perto de você num domingo.',
        link: { label: 'Como funciona a Missa', to: routes.mass },
      },
    ],
  },
]

export function getTrail(id: string | undefined) {
  return trails.find((trail) => trail.id === id)
}
