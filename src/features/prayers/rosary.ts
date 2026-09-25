import type { PrayerId } from './data'

export type MysterySetId = 'joyful' | 'luminous' | 'sorrowful' | 'glorious'

export type Mystery = { title: string; reference: string }

export type MysterySet = {
  id: MysterySetId
  title: string
  days: string
  mysteries: Mystery[]
}

export const mysterySets: Record<MysterySetId, MysterySet> = {
  joyful: {
    id: 'joyful',
    title: 'Mistérios gozosos',
    days: 'Segunda e sábado',
    mysteries: [
      { title: 'A Anunciação do anjo a Maria', reference: 'Lc 1,26-38' },
      { title: 'A visita de Maria a Isabel', reference: 'Lc 1,39-56' },
      { title: 'O nascimento de Jesus', reference: 'Lc 2,1-20' },
      { title: 'A apresentação de Jesus no Templo', reference: 'Lc 2,22-38' },
      { title: 'Jesus reencontrado no Templo', reference: 'Lc 2,41-52' },
    ],
  },
  luminous: {
    id: 'luminous',
    title: 'Mistérios luminosos',
    days: 'Quinta-feira',
    mysteries: [
      { title: 'O Batismo de Jesus no Jordão', reference: 'Mt 3,13-17' },
      { title: 'As bodas de Caná', reference: 'Jo 2,1-11' },
      { title: 'O anúncio do Reino e o convite à conversão', reference: 'Mc 1,14-15' },
      { title: 'A Transfiguração', reference: 'Lc 9,28-36' },
      { title: 'A instituição da Eucaristia', reference: 'Lc 22,14-20' },
    ],
  },
  sorrowful: {
    id: 'sorrowful',
    title: 'Mistérios dolorosos',
    days: 'Terça e sexta',
    mysteries: [
      { title: 'A agonia de Jesus no Horto', reference: 'Lc 22,39-46' },
      { title: 'A flagelação', reference: 'Jo 19,1' },
      { title: 'A coroação de espinhos', reference: 'Mt 27,27-31' },
      { title: 'Jesus carrega a cruz', reference: 'Jo 19,16-17' },
      { title: 'A crucifixão e morte de Jesus', reference: 'Lc 23,33-46' },
    ],
  },
  glorious: {
    id: 'glorious',
    title: 'Mistérios gloriosos',
    days: 'Quarta e domingo',
    mysteries: [
      { title: 'A Ressurreição de Jesus', reference: 'Mc 16,1-7' },
      { title: 'A Ascensão de Jesus ao céu', reference: 'At 1,6-11' },
      { title: 'A vinda do Espírito Santo', reference: 'At 2,1-4' },
      { title: 'A Assunção de Maria ao céu', reference: 'cf. Ap 12,1' },
      { title: 'A coroação de Maria como Rainha', reference: 'cf. Ap 12,1' },
    ],
  },
}

/** Mistérios de cada dia da semana (0 = domingo). */
const setByWeekday: MysterySetId[] = [
  'glorious',
  'joyful',
  'sorrowful',
  'glorious',
  'luminous',
  'sorrowful',
  'joyful',
]

export function mysterySetForDate(date: Date) {
  return setByWeekday[date.getDay()]
}

/**
 * Contas do terço desenhadas no SVG:
 * - pendant: cruz (0), conta grande (1), três contas pequenas (2-4)
 * - loop: 5 dezenas, cada uma com 1 conta grande + 10 pequenas (55 contas)
 */
export type Bead = { kind: 'cross' | 'large' | 'small'; area: 'pendant' | 'loop'; index: number }

export type RosaryStep = {
  prayer: PrayerId
  /** Texto curto exibido acima da oração (ex.: "3ª Ave-Maria"). */
  label: string
  bead: Bead | null
  /** Índice do mistério (0-4) quando o passo pertence a uma dezena. */
  decade?: number
  extraPrayer?: PrayerId
}

export function buildRosarySteps(): RosaryStep[] {
  const steps: RosaryStep[] = [
    { prayer: 'sign-of-cross', label: 'Início', bead: { kind: 'cross', area: 'pendant', index: 0 } },
    { prayer: 'apostles-creed', label: 'Profissão de fé', bead: { kind: 'cross', area: 'pendant', index: 0 } },
    { prayer: 'our-father', label: 'Pai-Nosso', bead: { kind: 'large', area: 'pendant', index: 1 } },
    ...['pela fé', 'pela esperança', 'pela caridade'].map(
      (intention, i): RosaryStep => ({
        prayer: 'hail-mary',
        label: `${i + 1}ª Ave-Maria, ${intention}`,
        bead: { kind: 'small', area: 'pendant', index: 2 + i },
      }),
    ),
    { prayer: 'glory-be', label: 'Glória', bead: null },
  ]

  for (let decade = 0; decade < 5; decade++) {
    const first = decade * 11
    steps.push({
      prayer: 'our-father',
      label: `${decade + 1}º mistério · Pai-Nosso`,
      bead: { kind: 'large', area: 'loop', index: first },
      decade,
    })
    for (let ave = 1; ave <= 10; ave++) {
      steps.push({
        prayer: 'hail-mary',
        label: `${decade + 1}º mistério · Ave-Maria ${ave} de 10`,
        bead: { kind: 'small', area: 'loop', index: first + ave },
        decade,
      })
    }
    steps.push({
      prayer: 'glory-be',
      label: `${decade + 1}º mistério · Glória`,
      bead: null,
      decade,
      extraPrayer: 'fatima',
    })
  }

  steps.push({ prayer: 'hail-holy-queen', label: 'Encerramento', bead: null })
  steps.push({ prayer: 'sign-of-cross', label: 'Fim', bead: { kind: 'cross', area: 'pendant', index: 0 } })

  return steps
}

export const beadKey = (bead: Bead) => `${bead.area}-${bead.index}`
