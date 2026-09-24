export type LiturgicalColor = 'Verde' | 'Vermelho' | 'Roxo' | 'Rosa' | 'Branco'

export type Reading = {
  referencia: string
  titulo: string
  texto: string
}

export type Psalm = {
  referencia: string
  refrao: string
  texto: string
}

export type ExtraReading = Reading & {
  /** Ex.: "Terceira Leitura", "Epístola". Ausente em textos como o Exulte. */
  tipo?: string
}

export type ExtraPrayer = {
  titulo: string
  texto: string
}

export type Liturgy = {
  /** Formato dd/mm/aaaa */
  data: string
  liturgia: string
  cor: LiturgicalColor
  oracoes: {
    coleta: string
    oferendas: string
    comunhao: string
    extras: ExtraPrayer[]
  }
  leituras: {
    primeiraLeitura: Reading[]
    salmo: Psalm[]
    segundaLeitura: Reading[]
    evangelho: Reading[]
    extras: ExtraReading[]
  }
  antifonas: {
    entrada: string
    comunhao: string
  }
}
