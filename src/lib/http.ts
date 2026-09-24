import axios, { type CreateAxiosDefaults } from 'axios'

/** Erro HTTP normalizado, independente do axios. */
export class HttpError extends Error {
  status: number | undefined

  constructor(message: string, status?: number, options?: ErrorOptions) {
    super(message, options)
    this.name = 'HttpError'
    this.status = status
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError
}

/**
 * Cria um cliente HTTP com os padrões do projeto.
 * Cada API externa tem o seu cliente (baseURL própria), todos com o mesmo comportamento.
 */
export function createHttpClient(config: CreateAxiosDefaults = {}) {
  const client = axios.create({
    timeout: 15_000,
    headers: { Accept: 'application/json' },
    ...config,
  })

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      // Cancelamentos (AbortController) seguem como estão, para quem chamou poder ignorá-los.
      if (axios.isCancel(error) || !axios.isAxiosError(error)) return Promise.reject(error)

      const status = error.response?.status
      const message = status
        ? `Falha na requisição (${status})`
        : 'Não foi possível conectar ao servidor'

      return Promise.reject(new HttpError(message, status, { cause: error }))
    },
  )

  return client
}
