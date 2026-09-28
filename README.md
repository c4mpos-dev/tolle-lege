# Tolle Lege

Site de introdução à fé cristã católica.

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) com tokens de design em `src/styles/index.css`
- [React Router](https://reactrouter.com) (rotas em inglês, páginas carregadas sob demanda)
- [TanStack Query](https://tanstack.com/query) + [axios](https://axios-http.com) para dados remotos
- [Motion](https://motion.dev) para animações (respeita "reduzir movimento")
- [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://drei.docs.pmnd.rs) para o modelo 3D

## Rotas

| Rota                | Página                                              |
| ------------------- | --------------------------------------------------- |
| `/`                 | Início                                              |
| `/trails`           | Trilhas por perfil                                  |
| `/trails/:trailId`  | Passos de uma trilha (progresso salvo no navegador) |
| `/mass`             | Como funciona a Missa                               |
| `/liturgy`          | Liturgia diária                                     |
| `/faq`              | Dúvidas                                             |
| `/curiosities`      | Curiosidades                                        |
| `/prayers`          | Orações essenciais e terço guiado                   |
| `/sacraments`       | Os sete sacramentos                                 |
| `/liturgical-year`  | Ano litúrgico (calculado a partir da Páscoa)        |
| `/confession`       | Guia da Confissão e exame de consciência            |
| `/glossary`         | Glossário da fé                                     |
| `/trinity`          | Santíssima Trindade e heresias antigas              |
| `/rose-novena`      | Novena das Rosas a Santa Teresinha                  |
| `/mary`             | Maria, Mãe de Jesus                                 |

Em produção, configure o servidor para redirecionar rotas desconhecidas para `index.html` (SPA).

## Scripts

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção (dist/)
npm run preview  # serve o build localmente
npm run lint     # oxlint
```

## Estrutura

```
public/
  models/                 # arquivos 3D (.glb) servidos estaticamente
src/
  app/                    # App (providers) e definição das rotas
  config/                 # constantes globais (rotas, navegação)
  components/             # componentes reutilizáveis entre features
    layout/               # Header, Footer, PageHeader, 404…
    ui/                   # peças visuais base (vitral, rosácea, Reveal, ButtonLink…)
  features/               # módulos por domínio; cada um expõe um index.ts
    <feature>/
      pages/              # páginas ligadas a rotas
      components/         # componentes da feature
      hooks/ api/ utils/  # quando necessário
      data.ts             # conteúdo estático da feature
  lib/                    # infraestrutura compartilhada (cliente HTTP, texto…)
  styles/                 # CSS global e tokens de design
  main.tsx                # ponto de entrada
```

Features: `home`, `trails`, `mass`, `liturgy`, `faq`, `curiosities`, `prayers`, `sacraments`,
`liturgical-year`, `confession`, `glossary`, `trinity`, `rose-novena`, `mary` e `church` (igreja em partículas da hero).

A navegação (menu e rodapé) é gerada a partir de `navGroups` em `src/config/routes.ts`.

Imports internos usam o alias `@/` → `src/`. Uma feature só importa outra pelo seu `index.ts`.
