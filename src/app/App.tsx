import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'motion/react'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Desliga as animações para quem pediu "reduzir movimento" no sistema */}
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
      {/* Contagem anônima de visitas (sem cookies); os números ficam só no painel da Vercel */}
      <Analytics />
    </QueryClientProvider>
  )
}
