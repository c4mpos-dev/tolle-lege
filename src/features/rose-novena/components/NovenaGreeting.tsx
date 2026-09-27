import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { routes } from '@/config/routes'
import { novenaMoment, ordinalDay } from '../novena'
import { RosePetals } from './RosePetals'

/**
 * Durante a Novena das Rosas (22/9 a 1/10), toda vez que o site é aberto cai uma
 * "chuva de rosas" e aparece um convite discreto para rezar o dia da novena.
 */
export function NovenaGreeting() {
  const { pathname } = useLocation()
  const [today] = useState(() => new Date())
  const moment = novenaMoment(today)
  const [visible, setVisible] = useState(moment.kind !== 'off')
  const [petals, setPetals] = useState(visible)

  if (moment.kind === 'off' || pathname === routes.roseNovena) return null

  const message =
    moment.kind === 'novena'
      ? `Estamos no ${ordinalDay(moment.day)} da Novena das Rosas.`
      : 'Hoje é a festa de Santa Teresinha!'

  return (
    <>
      {petals && <RosePetals onDone={() => setPetals(false)} />}
      <AnimatePresence>
        {visible && (
          <motion.aside
            aria-label="Novena das Rosas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-rose/20 bg-canvas p-5 shadow-[0_20px_50px_-15px_rgb(43_38_34/0.35)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96"
          >
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Fechar"
              className="absolute top-3 right-3 rounded-full p-1.5 text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <X className="size-4" />
            </button>
            <p className="pr-6 text-xs font-semibold tracking-[0.2em] text-rose uppercase">🌹 Chuva de rosas</p>
            <p className="mt-2 font-serif text-lg leading-snug text-ink">{message}</p>
            <p className="mt-1 text-sm text-ink-muted">
              “Depois da minha morte, farei cair uma chuva de rosas.” — Santa Teresinha
            </p>
            <Link
              to={routes.roseNovena}
              onClick={() => setVisible(false)}
              className="mt-4 inline-flex rounded-full bg-rose px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose/90"
            >
              {moment.kind === 'novena' ? 'Rezar hoje' : 'Conhecer a novena'}
            </Link>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
