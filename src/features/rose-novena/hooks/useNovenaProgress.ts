import { useCallback, useEffect, useState } from 'react'

const storageKey = (year: number) => `tolle-lege:rose-novena:${year}`

function read(year: number): number[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(storageKey(year)) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === 'number') : []
  } catch {
    return []
  }
}

/** Dias da novena já rezados neste ano, salvos só no navegador do visitante. */
export function useNovenaProgress(year: number) {
  const [days, setDays] = useState<number[]>(() => read(year))

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(year), JSON.stringify(days))
    } catch {
      // Armazenamento indisponível: o progresso vale só para esta visita.
    }
  }, [year, days])

  const markDay = useCallback((day: number) => {
    setDays((current) => (current.includes(day) ? current : [...current, day].sort((a, b) => a - b)))
  }, [])

  return { days, markDay }
}
