import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import type { NavGroup } from '@/config/routes'

/** Grupo do menu desktop: abre ao clicar, fecha com Esc, clique fora ou troca de página. */
export function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const { pathname } = useLocation()
  const isActive = group.items.some((item) => pathname.startsWith(item.to))

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          isActive || open ? 'bg-primary-soft text-ink' : 'text-ink-muted hover:text-ink'
        }`}
      >
        {group.label}
        <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 w-80 rounded-2xl border border-line bg-canvas p-2 shadow-[0_20px_50px_-20px_rgb(43_38_34/0.35)]"
          >
            <ul>
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive: active }) =>
                      `group flex items-start gap-3 rounded-xl p-3 transition-colors ${active ? 'bg-surface' : 'hover:bg-surface'}`
                    }
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-t-full rounded-b-md bg-primary-soft text-primary-strong">
                      <item.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{item.label}</span>
                      <span className="block text-xs text-ink-muted">{item.description}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
