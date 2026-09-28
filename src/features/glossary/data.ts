import { routes } from '@/config/routes'

export type GlossaryTerm = {
  term: string
  definition: string
  link?: { label: string; to: string }
}

export const glossary: GlossaryTerm[] = [
  { term: 'Advento', definition: 'Tempo de cerca de quatro semanas que prepara o Natal e abre o ano litúrgico.', link: { label: 'Ano litúrgico', to: routes.liturgicalYear } },
  { term: 'Aleluia', definition: 'Palavra hebraica que significa “louvai a Deus”. É cantada antes do Evangelho, exceto na Quaresma.' },
  { term: 'Altar', definition: 'Mesa onde se celebra a Eucaristia. Representa o próprio Cristo, por isso o padre o beija no início da Missa.' },
  { term: 'Ambão', definition: 'Estante de onde são proclamadas as leituras da Bíblia na Missa. É a “mesa da Palavra”.' },
  { term: 'Amém', definition: 'Palavra hebraica que significa “é verdade”, “assim seja”. Expressa adesão ao que foi dito.' },
  { term: 'Água benta', definition: 'Água abençoada pelo sacerdote. Ao entrar na igreja, fazemos o sinal da cruz com ela, lembrando o Batismo.' },
  { term: 'Assunção', definition: 'Dogma segundo o qual Maria, ao fim da vida terrena, foi levada ao céu de corpo e alma. Proclamado em 1950 e celebrado em 15 de agosto.', link: { label: 'Os dogmas marianos', to: `${routes.mary}#dogmas` } },
  { term: 'Batismo', definition: 'Primeiro sacramento: liberta do pecado e torna a pessoa filha de Deus e membro da Igreja.', link: { label: 'Sacramentos', to: `${routes.sacraments}#baptism` } },
  { term: 'Bispo', definition: 'Sucessor dos apóstolos, responsável por uma diocese. Recebeu a plenitude do sacramento da Ordem.' },
  { term: 'Cálice', definition: 'Taça onde o vinho é consagrado e se torna o Sangue de Cristo.' },
  { term: 'Catecismo', definition: 'Livro que resume, de modo organizado, tudo o que a Igreja crê, celebra, vive e reza. O atual é de 1992.' },
  { term: 'Catecumenato', definition: 'Tempo de preparação dos adultos que desejam receber o Batismo.', link: { label: 'Trilha: não sou batizado', to: routes.trail('not-baptized') } },
  { term: 'Círio Pascal', definition: 'Grande vela acesa na Vigília Pascal, símbolo de Cristo ressuscitado, luz do mundo.' },
  { term: 'Comunhão', definition: 'Receber a Eucaristia na Missa. Também indica a união entre todos os fiéis em Cristo.' },
  { term: 'Confissão', definition: 'Sacramento em que Deus perdoa os pecados por meio do sacerdote. Também chamado de Reconciliação.', link: { label: 'Como se confessar', to: routes.confession } },
  { term: 'Credo', definition: 'Oração que resume os pontos essenciais da fé cristã. Rezado na Missa de domingo.', link: { label: 'Orações', to: `${routes.prayers}#apostles-creed` } },
  { term: 'Crisma', definition: 'Sacramento que confirma o Batismo e derrama os dons do Espírito Santo. Também chamado de Confirmação.', link: { label: 'Sacramentos', to: `${routes.sacraments}#confirmation` } },
  { term: 'Consubstancial', definition: 'Da mesma substância, da mesma natureza. No Credo, dizemos que o Filho é “consubstancial ao Pai”: é Deus tanto quanto o Pai, e não uma criatura.', link: { label: 'Santíssima Trindade', to: routes.trinity } },
  { term: 'Diácono', definition: 'Ministro ordenado para o serviço. Pode batizar, presidir casamentos e proclamar o Evangelho.' },
  { term: 'Diocese', definition: 'Território da Igreja confiado a um bispo, formado por várias paróquias.' },
  { term: 'Dogma', definition: 'Verdade de fé proposta pela Igreja como revelada por Deus, que todo católico é chamado a crer.' },
  { term: 'Eucaristia', definition: 'Sacramento do Corpo e Sangue de Cristo, sob as aparências de pão e vinho. Centro da vida cristã.', link: { label: 'Sacramentos', to: `${routes.sacraments}#eucharist` } },
  { term: 'Evangelho', definition: 'Significa “boa notícia”. São os quatro livros (Mateus, Marcos, Lucas e João) que narram a vida de Jesus.' },
  { term: 'Genuflexão', definition: 'Dobrar o joelho direito até o chão diante do sacrário, em adoração a Jesus presente na Eucaristia.' },
  { term: 'Heresia', definition: 'Negação obstinada, por parte de um batizado, de uma verdade que deve ser crida com fé divina e católica, ou a dúvida obstinada sobre ela (Código de Direito Canônico, cân. 751). Ter dúvidas sinceras ou dificuldade para entender não é heresia.', link: { label: 'Heresias sobre a Trindade', to: `${routes.trinity}#heresias` } },
  { term: 'Homilia', definition: 'Pregação do sacerdote ou diácono na Missa, que explica as leituras e as aproxima da vida.' },
  { term: 'Hóstia', definition: 'Pão sem fermento usado na Missa. Após a consagração, é o Corpo de Cristo.' },
  { term: 'Imaculada Conceição', definition: 'Dogma segundo o qual Maria foi preservada do pecado original desde a sua concepção. Não se refere à concepção de Jesus. Proclamado em 1854 e celebrado em 8 de dezembro.', link: { label: 'Os dogmas marianos', to: `${routes.mary}#dogmas` } },
  { term: 'Liturgia', definition: 'A oração pública e oficial da Igreja: a Missa, os sacramentos e a Liturgia das Horas.', link: { label: 'Liturgia diária', to: routes.liturgy } },
  { term: 'Magistério', definition: 'A missão de ensinar confiada ao Papa e aos bispos em comunhão com ele.' },
  { term: 'Missa', definition: 'Celebração da Eucaristia, em que se torna presente o sacrifício de Cristo.', link: { label: 'Como funciona a Missa', to: routes.mass } },
  { term: 'Novena', definition: 'Oração feita durante nove dias seguidos por uma intenção, lembrando os apóstolos que rezaram à espera do Espírito Santo.' },
  { term: 'Padroeiro', definition: 'Santo escolhido como protetor de uma pessoa, paróquia, cidade ou profissão.' },
  { term: 'Paróquia', definition: 'Comunidade de fiéis de um território, confiada a um pároco. É onde a vida cristã acontece no dia a dia.' },
  { term: 'Páscoa', definition: 'Festa da Ressurreição de Jesus, a maior do ano cristão. Sua data muda a cada ano.', link: { label: 'Ano litúrgico', to: routes.liturgicalYear } },
  { term: 'Quaresma', definition: 'Quarenta dias de preparação para a Páscoa, com oração, jejum e caridade.' },
  { term: 'Sacrário', definition: 'Pequeno armário onde se guarda a Eucaristia. A lâmpada acesa ao lado indica a presença de Jesus. Também chamado de tabernáculo.' },
  { term: 'Sacramento', definition: 'Sinal visível e eficaz da graça, instituído por Cristo. São sete.', link: { label: 'Os sete sacramentos', to: routes.sacraments } },
  { term: 'Santíssima Trindade', definition: 'O mistério central da fé: um só Deus em três Pessoas, Pai, Filho e Espírito Santo.', link: { label: 'Entenda a Trindade', to: routes.trinity } },
  { term: 'Terço', definition: 'Oração que medita a vida de Jesus e de Maria com Pai-Nossos e Ave-Marias. Quatro terços formam o Rosário.', link: { label: 'Terço guiado', to: `${routes.prayers}#terco` } },
  { term: 'Theotókos', definition: 'Palavra grega para “Mãe de Deus”, título de Maria definido no Concílio de Éfeso, em 431.', link: { label: 'Maria, Mãe de Jesus', to: routes.mary } },
  { term: 'Vigília', definition: 'Celebração na noite anterior a uma grande festa. A mais importante é a Vigília Pascal.' },
]
