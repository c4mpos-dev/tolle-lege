import type { ReactNode } from 'react'
import { Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

/** Estrutura de todas as páginas. `children` recebe elementos globais (avisos, sobreposições). */
export function RootLayout({ children }: { children?: ReactNode }) {
  const navigation = useNavigation()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Pular para o conteúdo
      </a>

      {/* Barra dourada enquanto a próxima página carrega */}
      {navigation.state === 'loading' && (
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 animate-pulse bg-primary" />
      )}

      <Header />
      <main id="content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {children}
      <ScrollRestoration />
    </div>
  )
}

/** Exibido enquanto a primeira página (carregada sob demanda) é baixada. */
export function PageFallback() {
  return <div className="min-h-dvh bg-parchment" />
}
