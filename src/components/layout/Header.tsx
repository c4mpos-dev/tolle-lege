import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { mainNav } from '@/config/routes'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Trava o scroll da página e fecha com Esc enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Logo onClick={close} />
  
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'bg-primary-soft text-ink' : 'text-ink-muted hover:text-ink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
  
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="-mr-2 rounded-full p-2 text-ink md:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/*
       * O menu mobile fica fora do <header>: o backdrop-blur do header cria um novo
       * contexto para elementos "fixed", o que prenderia o menu dentro dele.
       */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Principal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-canvas md:hidden"
          >
            <ul className="px-6 py-8">
              {mainNav.map((item, index) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-b border-line"
                >
                  <NavLink
                    to={item.to}
                    onClick={close}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-5 font-serif text-3xl ${isActive ? 'text-primary-strong' : 'text-ink'}`
                    }
                  >
                    <span className="font-sans text-xs text-ink-muted">0{index + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
