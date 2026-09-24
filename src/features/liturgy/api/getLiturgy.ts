import { createHttpClient, isHttpError } from '@/lib/http'
import type { Liturgy } from '../types'

const liturgyClient = createHttpClient({ baseURL: 'https://liturgia.up.railway.app/v2/' })

export class LiturgyNotFoundError extends Error {
  constructor(options?: ErrorOptions) {
    super('Não encontramos nenhuma liturgia para esta data', options)
    this.name = 'LiturgyNotFoundError'
  }
}

type LiturgyParams = { dia: number; mes: number; ano: number }

/** Busca a liturgia de uma data (padrão: hoje). */
export async function getLiturgy(date?: Date, signal?: AbortSignal): Promise<Liturgy> {
  const params: LiturgyParams | undefined = date && {
    dia: date.getDate(),
    mes: date.getMonth() + 1,
    ano: date.getFullYear(),
  }

  try {
    const { data } = await liturgyClient.get<Liturgy>('', { params, signal })
    return data
  } catch (error) {
    if (isHttpError(error) && error.status === 404) {
      throw new LiturgyNotFoundError({ cause: error })
    }
    throw error
  }
}
