import { useProgress } from '@react-three/drei'

/**
 * Progresso de carregamento dos modelos 3D, como overlay HTML comum.
 * Fica FORA do <Canvas>: o <Html> do drei cria uma raiz React paralela que,
 * no React 19, quebra ao ser desmontada durante o Suspense.
 */
export function CanvasLoader() {
  const { active, progress } = useProgress()

  if (!active) return null

  return (
    <div
      role="status"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <p className="text-sm text-ink-muted">Carregando… {progress.toFixed(0)}%</p>
    </div>
  )
}
