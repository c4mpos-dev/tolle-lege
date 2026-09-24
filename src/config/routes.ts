/** Caminhos da aplicação (em inglês). Use sempre estas constantes em vez de strings soltas. */
export const routes = {
  home: '/',
  trails: '/trails',
  trail: (id: string) => `/trails/${id}`,
  mass: '/mass',
  liturgy: '/liturgy',
  faq: '/faq',
  curiosities: '/curiosities',
} as const

export type NavItem = { label: string; to: string }

export const mainNav: NavItem[] = [
  { label: 'Trilhas', to: routes.trails },
  { label: 'A Missa', to: routes.mass },
  { label: 'Liturgia', to: routes.liturgy },
  { label: 'Dúvidas', to: routes.faq },
  { label: 'Curiosidades', to: routes.curiosities },
]
