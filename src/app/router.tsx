import { createBrowserRouter } from 'react-router'
import { NotFoundPage } from '@/components/layout/NotFoundPage'
import { PageFallback, RootLayout } from '@/components/layout/RootLayout'
import { routes } from '@/config/routes'

/*
 * Cada página é carregada sob demanda (code splitting): o three.js da home,
 * por exemplo, não pesa no carregamento das outras páginas.
 */
export const router = createBrowserRouter([
  {
    path: routes.home,
    Component: RootLayout,
    HydrateFallback: PageFallback,
    children: [
      {
        index: true,
        lazy: () => import('@/features/home').then((m) => ({ Component: m.HomePage })),
      },
      {
        path: routes.trails,
        lazy: () => import('@/features/trails').then((m) => ({ Component: m.TrailsPage })),
      },
      {
        path: `${routes.trails}/:trailId`,
        lazy: () => import('@/features/trails').then((m) => ({ Component: m.TrailPage })),
      },
      {
        path: routes.mass,
        lazy: () => import('@/features/mass').then((m) => ({ Component: m.MassPage })),
      },
      {
        path: routes.liturgy,
        lazy: () => import('@/features/liturgy').then((m) => ({ Component: m.LiturgyPage })),
      },
      {
        path: routes.faq,
        lazy: () => import('@/features/faq').then((m) => ({ Component: m.FaqPage })),
      },
      {
        path: routes.curiosities,
        lazy: () =>
          import('@/features/curiosities').then((m) => ({ Component: m.CuriositiesPage })),
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
