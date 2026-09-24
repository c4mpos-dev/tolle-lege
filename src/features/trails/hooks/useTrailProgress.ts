import { useCallback, useEffect, useState } from 'react'

const storageKey = (trailId: string) => `tolle-lege:trail:${trailId}`

function readProgress(trailId: string): number[] {
  try {
    const raw = localStorage.getItem(storageKey(trailId))
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === 'number') : []
  } catch {
    return []
  }
}

/** Passos concluídos de uma trilha, salvos no navegador do visitante. */
export function useTrailProgress(trailId: string) {
  const [done, setDone] = useState<number[]>(() => readProgress(trailId))

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(trailId), JSON.stringify(done))
    } catch {
      // Armazenamento indisponível (modo privado etc.): o progresso vale só para esta visita.
    }
  }, [trailId, done])

  const toggle = useCallback((step: number) => {
    setDone((current) =>
      current.includes(step) ? current.filter((n) => n !== step) : [...current, step],
    )
  }, [])

  return { done, toggle, isDone: (step: number) => done.includes(step) }
}
