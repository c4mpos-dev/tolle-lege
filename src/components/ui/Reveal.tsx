import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const elements = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
}

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  /** Tag renderizada (use `li` dentro de listas para manter o HTML válido). */
  as?: keyof typeof elements
}

/** Surge suavemente (fade + leve subida) quando entra na tela. Só anima uma vez. */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Element = elements[as]

  return (
    <Element
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Element>
  )
}
