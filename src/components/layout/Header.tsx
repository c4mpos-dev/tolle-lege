import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { navGroups } from '@/config/routes'
import { Logo } from './Logo'
import { NavDropdown } from './NavDropdown'

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
      <header className="sticky top-0 z-40 border-b-[3px] border-double border-line bg-parchment/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Logo onClick={close} />

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {navGroups.map((group) => (
              <NavDropdown key={group.label} group={group} />
            ))}
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
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-parchment md:hidden"
          >
            <div className="space-y-8 px-6 py-8">
              {navGroups.map((group, groupIndex) => (
                <motion.section
                  key={group.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * groupIndex }}
                >
                  <p className="rubric text-primary-strong">
                    {group.label}
                  </p>
                  <ul className="mt-2">
                    {group.items.map((item) => (
                      <li key={item.to} className="border-b border-line">
                        <NavLink
                          to={item.to}
                          onClick={close}
                          className={({ isActive }) =>
                            `flex items-center gap-3 py-4 font-serif text-2xl ${isActive ? 'text-primary-strong' : 'text-ink'}`
                          }
                        >
                          <item.icon className="size-5 text-primary" strokeWidth={1.5} />
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
