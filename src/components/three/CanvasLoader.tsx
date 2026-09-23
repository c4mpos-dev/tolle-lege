import { Html, useProgress } from '@react-three/drei'

export function CanvasLoader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <p className="text-sm whitespace-nowrap text-stone-500">
        Carregando… {progress.toFixed(0)}%
      </p>
    </Html>
  )
}
