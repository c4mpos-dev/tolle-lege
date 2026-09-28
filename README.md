# Tolle Lege

Site de introdução à fé cristã católica: trilhas para cada história, a Missa passo a passo,
liturgia diária, orações, sacramentos e uma visita guiada por uma igreja em 3D.

> _Tolle, lege_ — “Toma e lê” (Santo Agostinho, _Confissões_ VIII, 12, 29).

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) com tokens de design em `src/styles/index.css`
- [React Router](https://reactrouter.com) (rotas em inglês, páginas carregadas sob demanda)
- [TanStack Query](https://tanstack.com/query) + [axios](https://axios-http.com) para dados remotos
- [Motion](https://motion.dev) para animações (respeita "reduzir movimento")
- [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://drei.docs.pmnd.rs) para o 3D

## Rotas

| Rota               | Página                                                 |
| ------------------ | ------------------------------------------------------ |
| `/`                | Início                                                 |
| `/trails`          | Trilhas por perfil                                     |
| `/trails/:trailId` | Passos de uma trilha (progresso salvo no navegador)    |
| `/mass`            | Como funciona a Missa                                  |
| `/liturgy`         | Liturgia diária, com criação de imagem para partilhar  |
| `/faq`             | Dúvidas                                                |
| `/curiosities`     | Curiosidades                                           |
| `/prayers`         | Orações essenciais e terço guiado                      |
| `/sacraments`      | Os sete sacramentos                                    |
| `/liturgical-year` | Ano litúrgico (calculado a partir da Páscoa)           |
| `/confession`      | Guia da Confissão e exame de consciência               |
| `/glossary`        | Glossário da fé                                        |
| `/trinity`         | Santíssima Trindade e heresias antigas                 |
| `/rose-novena`     | Novena das Rosas a Santa Teresinha                     |
| `/mary`            | Maria, Mãe de Jesus                                    |
| `/tour`            | Visita guiada: igreja 3D por fora e planta por dentro  |

## Scripts

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção (dist/)
npm run preview  # serve o build localmente
npm run lint     # oxlint
```

## Deploy (Vercel)

O projeto é uma SPA estática. Na Vercel, basta importar o repositório: o preset **Vite** já
usa `npm run build` e publica a pasta `dist/`.

O [`vercel.json`](vercel.json) redireciona todas as rotas para o `index.html`, para que links
diretos (ex.: `/mass`) e o F5 em páginas internas funcionem. Arquivos estáticos (`/models`,
`/hdri`, `/assets`) são servidos antes dessa regra.

### Prévia dos links

As tags de compartilhamento (Open Graph) ficam no [`index.html`](index.html) e usam a imagem
[`public/og-image.jpg`](public/og-image.jpg) (1200×630). Como as redes sociais exigem o endereço
completo da imagem, o domínio vem da variável `VITE_SITE_URL`, definida no [`.env`](.env):

```bash
VITE_SITE_URL=https://tolle-lege.vercel.app   # troque se usar outro domínio
```

Os robôs das redes não executam JavaScript, então todos os links mostram a mesma prévia.

### Modelo 3D

O `.glb` foi otimizado com [glTF Transform](https://gltf-transform.dev) (`dedup`), que
reaproveita as peças idênticas (balaústres, grades…) sem nenhuma perda: de 8,2 MB para 1,6 MB.
Ao trocar o modelo, repita o processo:

```bash
npx @gltf-transform/cli dedup original.glb public/models/igreja-matriz-nsc.glb
```

## Estrutura

```
public/
  models/                 # modelo 3D da igreja (.glb)
  og-image.jpg            # imagem de prévia ao compartilhar o link
  hdri/                   # iluminação de ambiente do 3D (HDR), servida pelo próprio site
src/
  app/                    # App (providers), layout raiz e definição das rotas
  config/                 # constantes globais (rotas, navegação)
  components/             # componentes reutilizáveis entre features
    layout/               # Header, Footer, PageHeader, 404…
    ui/                   # peças visuais base (vitral, rosácea, logo, avisos, Reveal…)
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
`liturgical-year`, `confession`, `glossary`, `trinity`, `rose-novena`, `mary`, `tour` e
`church` (igreja em partículas da hero).

A navegação (menu e rodapé) é gerada a partir de `navGroups` em `src/config/routes.ts`.

Imports internos usam o alias `@/` → `src/`. Uma feature só importa outra pelo seu `index.ts`.

## Conteúdo

- Os textos ficam nos arquivos `data.ts` de cada feature, para editar sem mexer nos componentes.
- O site é uma introdução: as páginas lembram que cada caso é único e deve ser tratado com a
  secretaria paroquial e o padre.
- A Novena das Rosas aparece automaticamente de 22/9 a 1/10 de cada ano.

## Créditos

- **Modelo 3D:** igreja inspirada na Igreja Matriz de Resende (RJ).
- **Liturgia diária:** [API Liturgia Diária](https://liturgia.up.railway.app).
- **Iluminação 3D:** HDRI _Potsdamer Platz_, do [Poly Haven](https://polyhaven.com) (CC0),
  distribuído pelo [drei-assets](https://github.com/pmndrs/drei-assets).
