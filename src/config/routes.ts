import {
  BookA,
  BookOpenText,
  CalendarRange,
  Church,
  Droplets,
  HandHeart,
  Footprints,
  Lightbulb,
  MessageCircleQuestion,
  Rose,
  Route,
  Sparkles,
  Star,
  Triangle,
  type LucideIcon,
} from 'lucide-react'

/** Caminhos da aplicação (em inglês). Use sempre estas constantes em vez de strings soltas. */
export const routes = {
  home: '/',
  trails: '/trails',
  trail: (id: string) => `/trails/${id}`,
  mass: '/mass',
  liturgy: '/liturgy',
  faq: '/faq',
  curiosities: '/curiosities',
  prayers: '/prayers',
  sacraments: '/sacraments',
  liturgicalYear: '/liturgical-year',
  confession: '/confession',
  glossary: '/glossary',
  trinity: '/trinity',
  roseNovena: '/rose-novena',
  mary: '/mary',
  tour: '/tour',
} as const

export type NavItem = {
  label: string
  to: string
  description: string
  icon: LucideIcon
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'Começar',
    items: [
      {
        label: 'Trilhas',
        to: routes.trails,
        description: 'Um caminho para cada história',
        icon: Route,
      },
      {
        label: 'Dúvidas',
        to: routes.faq,
        description: 'Perguntas de quem está chegando',
        icon: MessageCircleQuestion,
      },
      {
        label: 'Curiosidades',
        to: routes.curiosities,
        description: 'Histórias e símbolos da fé',
        icon: Lightbulb,
      },
    ],
  },
  {
    label: 'Aprender',
    items: [
      {
        label: 'Visita guiada',
        to: routes.tour,
        description: 'Uma igreja por dentro e por fora',
        icon: Footprints,
      },
      {
        label: 'A Missa',
        to: routes.mass,
        description: 'O que acontece em cada momento',
        icon: Church,
      },
      {
        label: 'Santíssima Trindade',
        to: routes.trinity,
        description: 'Um só Deus em três Pessoas',
        icon: Triangle,
      },
      {
        label: 'Maria',
        to: routes.mary,
        description: 'A Mãe de Jesus e da Igreja',
        icon: Star,
      },
      {
        label: 'Sacramentos',
        to: routes.sacraments,
        description: 'Os sete sinais da graça',
        icon: Droplets,
      },
      {
        label: 'Ano litúrgico',
        to: routes.liturgicalYear,
        description: 'Os tempos e as cores do ano',
        icon: CalendarRange,
      },
      {
        label: 'Glossário',
        to: routes.glossary,
        description: 'As palavras da fé, explicadas',
        icon: BookA,
      },
    ],
  },
  {
    label: 'Rezar',
    items: [
      {
        label: 'Liturgia diária',
        to: routes.liturgy,
        description: 'As leituras de hoje',
        icon: BookOpenText,
      },
      {
        label: 'Orações e Terço',
        to: routes.prayers,
        description: 'Orações essenciais e terço guiado',
        icon: Sparkles,
      },
      {
        label: 'Novena das Rosas',
        to: routes.roseNovena,
        description: 'Nove dias com Santa Teresinha',
        icon: Rose,
      },
      {
        label: 'Confissão',
        to: routes.confession,
        description: 'Guia e exame de consciência',
        icon: HandHeart,
      },
    ],
  },
]
