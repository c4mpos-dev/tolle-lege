import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

type SwayRotationProps = {
  /** Ângulo máximo para cada lado, em radianos. */
  amplitude?: number
  /** Velocidade do balanço (radianos de fase por segundo). */
  speed?: number
  /** Tempo, em ms, sem interação até o balanço voltar. */
  resumeDelay?: number
}

/**
 * Balança a câmera de um lado para o outro em torno da frente do modelo.
 * Pausa enquanto o usuário interage e, após um tempo parado, volta suavemente.
 * Requer <OrbitControls makeDefault />.
 */
export function SwayRotation({
  amplitude = Math.PI / 4,
  speed = 0.35,
  resumeDelay = 3000,
}: SwayRotationProps) {
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null
  const phase = useRef(0)
  const pausedUntil = useRef(0)
  const interacting = useRef(false)

  useEffect(() => {
    if (!controls) return

    const onStart = () => {
      interacting.current = true
    }
    const onEnd = () => {
      interacting.current = false
      pausedUntil.current = performance.now() + resumeDelay
    }

    controls.addEventListener('start', onStart)
    controls.addEventListener('end', onEnd)
    return () => {
      controls.removeEventListener('start', onStart)
      controls.removeEventListener('end', onEnd)
    }
  }, [controls, resumeDelay])

  useFrame((_, delta) => {
    if (!controls || interacting.current || performance.now() < pausedUntil.current) return

    phase.current += delta * speed
    const target = amplitude * Math.sin(phase.current)
    const current = controls.getAzimuthalAngle()
    // Menor diferença angular, para voltar pelo caminho mais curto se o usuário girou até atrás.
    const diff = Math.atan2(Math.sin(target - current), Math.cos(target - current))

    controls.setAzimuthalAngle(current + diff * Math.min(1, delta * 2))
    controls.update()
  })

  return null
}
