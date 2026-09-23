# Tolle Lege

Site de introdução à fé cristã católica.

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://drei.docs.pmnd.rs) para o modelo 3D

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
  app/                    # componente raiz e composição da aplicação
  components/             # componentes reutilizáveis entre features
    three/                # utilitários genéricos de cena 3D
  features/               # módulos por domínio (cada um expõe um index.ts)
    church/               # visualizador 3D da Igreja Matriz
    home/                 # seções da página inicial (hero, …)
  styles/                 # CSS global (entrada do Tailwind)
  main.tsx                # ponto de entrada
```

Imports internos usam o alias `@/` → `src/`.
