import type { LiturgicalColor, SeasonId } from './calendar'

export const seasonDescriptions: Record<SeasonId, string> = {
  advent:
    'Cerca de quatro semanas de espera e preparação para o Natal. Tempo de esperança e vigilância: esperamos a vinda de Jesus, no presépio e no fim dos tempos.',
  christmas:
    'Celebra o nascimento de Jesus e sua manifestação ao mundo, da noite de Natal até o Batismo do Senhor.',
  'ordinary-1':
    'Acompanha os primeiros passos da vida pública de Jesus. “Comum” vem de “contado”: as semanas são numeradas, não é um tempo sem importância.',
  lent: 'Quarenta dias de oração, jejum e caridade para preparar o coração para a Páscoa. Começa na Quarta-feira de Cinzas.',
  triduum:
    'Os três dias mais importantes do ano: a Ceia do Senhor, a Paixão na Sexta-feira Santa e a grande Vigília da Ressurreição.',
  easter:
    'Cinquenta dias de alegria pela Ressurreição, vividos como um único grande domingo, até Pentecostes.',
  'ordinary-2':
    'O tempo mais longo do ano: a vida cristã no dia a dia, até a festa de Cristo Rei, que encerra o ano litúrgico.',
}

/** Cores de desenho (SVG) e classes literais para o Tailwind. */
export const colorStyles: Record<LiturgicalColor, { fill: string; label: string; swatch: string }> = {
  purple: { fill: '#6d5591', label: 'Roxo', swatch: 'bg-[#6d5591]' },
  white: { fill: 'var(--color-primary-soft)', label: 'Branco', swatch: 'bg-primary-soft ring-1 ring-primary/40' },
  green: { fill: 'var(--color-sage)', label: 'Verde', swatch: 'bg-sage' },
  red: { fill: '#b0463a', label: 'Vermelho', swatch: 'bg-[#b0463a]' },
}

export const colorMeanings = [
  { swatch: 'bg-sage', name: 'Verde', meaning: 'Esperança e vida que cresce. Usado no Tempo Comum.' },
  { swatch: 'bg-[#6d5591]', name: 'Roxo', meaning: 'Penitência e preparação. Advento e Quaresma.' },
  { swatch: 'bg-primary-soft ring-1 ring-primary/40', name: 'Branco', meaning: 'Alegria, festa e pureza. Natal, Páscoa e festas de Nossa Senhora.' },
  { swatch: 'bg-[#b0463a]', name: 'Vermelho', meaning: 'O fogo do Espírito e o sangue dos mártires. Pentecostes e Paixão.' },
  { swatch: 'bg-pink-300', name: 'Rosa', meaning: 'Alegria no meio da espera. Só em dois domingos: 3º do Advento e 4º da Quaresma.' },
]
