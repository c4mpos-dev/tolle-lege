import { Link } from 'react-router'
import { mainNav } from '@/config/routes'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-ink text-canvas/80">
      {/* Faixa de "vitral" no topo do rodapé */}
      <div
        aria-hidden
        className="h-1.5 bg-linear-to-r from-marian via-primary to-terracotta"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr] lg:px-10">
        <div className="max-w-md">
          <Logo className="text-canvas" />
          <p className="mt-6 font-serif text-lg text-canvas/90 italic">
            “Fizeste-nos para ti, Senhor, e inquieto está o nosso coração enquanto não repousa em
            ti.”
          </p>
          <p className="mt-2 text-sm text-canvas/60">Santo Agostinho, Confissões I, 1</p>
        </div>

        <nav aria-label="Rodapé">
          <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">Explore</p>
          <ul className="mt-4 space-y-3">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm transition-colors hover:text-canvas">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-canvas/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-canvas/50 sm:flex-row sm:justify-between lg:px-10">
          <p>Este site é uma introdução e não substitui o acompanhamento da sua paróquia.</p>
          <p>
            Liturgia diária via{' '}
            <a
              href="https://liturgia.up.railway.app"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-canvas"
            >
              API Liturgia Diária
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
