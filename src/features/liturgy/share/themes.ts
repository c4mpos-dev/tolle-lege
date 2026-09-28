import type { LiturgicalColor } from '../types'

export type ShareThemeId = 'canvas' | 'gold' | 'marian' | 'terracotta' | 'sage' | 'rose' | 'night'

export type ShareTheme = {
  id: ShareThemeId
  name: string
  /** Fundo externo da imagem. */
  outer: string
  /** O cartão com o texto. */
  card: string
  text: string
  muted: string
  accent: string
}

/** Cores fixas (o canvas não lê as variáveis CSS do tema). */
export const shareThemes: ShareTheme[] = [
  { id: 'canvas', name: 'Cal', outer: '#e9dfcf', card: '#fbf8f3', text: '#2b2622', muted: '#6b625a', accent: '#8a6a35' },
  { id: 'gold', name: 'Ouro', outer: '#5c4522', card: '#8a6a35', text: '#fbf8f3', muted: '#f3eadbcc', accent: '#f3eadb' },
  { id: 'marian', name: 'Mariano', outer: '#2f4764', card: '#4a6b94', text: '#fbf8f3', muted: '#e3eaf3cc', accent: '#e3eaf3' },
  { id: 'terracotta', name: 'Terracota', outer: '#8f4a38', card: '#c9725b', text: '#fffaf6', muted: '#f6e4decc', accent: '#fff1ea' },
  { id: 'sage', name: 'Sálvia', outer: '#3f5842', card: '#5f7f63', text: '#fbf8f3', muted: '#e5ede4cc', accent: '#e5ede4' },
  { id: 'rose', name: 'Rosa', outer: '#7a1f35', card: '#b3334e', text: '#fff7f8', muted: '#f8e3e7cc', accent: '#f8e3e7' },
  { id: 'night', name: 'Noite', outer: '#171412', card: '#2b2622', text: '#fbf8f3', muted: '#fbf8f399', accent: '#b08d57' },
]

/** Tema que combina com a cor litúrgica do dia. */
export const themeForLiturgicalColor: Record<LiturgicalColor, ShareThemeId> = {
  Verde: 'sage',
  Vermelho: 'rose',
  Roxo: 'marian',
  Rosa: 'rose',
  Branco: 'canvas',
}

export type ShareFormatId = 'story' | 'post' | 'square'

export const shareFormats: { id: ShareFormatId; name: string; width: number; height: number }[] = [
  { id: 'story', name: 'Stories', width: 1080, height: 1920 },
  { id: 'post', name: 'Post', width: 1080, height: 1350 },
  { id: 'square', name: 'Quadrado', width: 1080, height: 1080 },
]

export const shareRadii = [
  { id: 'none', name: 'Reto', value: 0 },
  { id: 'soft', name: 'Suave', value: 36 },
  { id: 'round', name: 'Redondo', value: 80 },
] as const

export type ShareRadiusId = (typeof shareRadii)[number]['id']
