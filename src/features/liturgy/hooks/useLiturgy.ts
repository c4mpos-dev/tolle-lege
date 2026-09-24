import { useQuery } from '@tanstack/react-query'
import { getLiturgy, LiturgyNotFoundError } from '../api/getLiturgy'
import { toDateKey } from '../utils/date'

/** Liturgia de uma data, com cache compartilhado entre as páginas. */
export function useLiturgy(date: Date) {
  return useQuery({
    queryKey: ['liturgy', toDateKey(date)],
    queryFn: ({ signal }) => getLiturgy(date, signal),
    // A liturgia de um dia não muda.
    staleTime: Infinity,
    // Não adianta tentar de novo quando a data não existe na API.
    retry: (failureCount, error) => !(error instanceof LiturgyNotFoundError) && failureCount < 2,
  })
}
