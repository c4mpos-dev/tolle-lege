import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

type Petal = {
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  spin: number
  hue: string
}

const HUES = ['#e27d91', '#d9667d', '#c9465f', '#f0a3b1', '#b3334e']

function createPetals(count: number): Petal[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    size: 12 + Math.random() * 14,
    delay: Math.random() * 1.6,
    duration: 3.6 + Math.random() * 2.4,
    drift: (Math.random() - 0.5) * 160,
    spin: (Math.random() - 0.5) * 720,
    hue: HUES[Math.floor(Math.random() * HUES.length)],
  }))
}

type RosePetalsProps = {
  count?: number
  /** Chamado quando a última pétala termina de cair. */
  onDone?: () => void
}

/**
 * "Depois da minha morte, farei cair uma chuva de rosas." (Santa Teresinha)
 * Pétalas caindo pela tela, uma única vez. Não aparece para quem pediu menos movimento.
 */
export function RosePetals({ count = 32, onDone }: RosePetalsProps) {
  const reduceMotion = useReducedMotion()
  const [petals] = useState(() => createPetals(count))

  // Remove a camada quando todas as pétalas caíram.
  useEffect(() => {
    const longest = Math.max(...petals.map((petal) => petal.delay + petal.duration))
    const timer = setTimeout(() => onDone?.(), longest * 1000 + 200)
    return () => clearTimeout(timer)
  }, [petals, onDone])

  if (reduceMotion) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute top-0 block rounded-[60%_0_60%_0] shadow-sm"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.8,
            background: `radial-gradient(circle at 30% 30%, #fff4 0%, ${petal.hue} 60%)`,
          }}
          initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            x: [0, petal.drift * 0.5, -petal.drift * 0.3, petal.drift],
            rotate: petal.spin,
            opacity: [0, 1, 1, 0.9],
          }}
          transition={{ duration: petal.duration, delay: petal.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
