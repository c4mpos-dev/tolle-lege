import { createBrowserRouter } from 'react-router'
import { NotFoundPage } from '@/components/layout/NotFoundPage'
import { PageFallback } from '@/components/layout/RootLayout'
import { routes } from '@/config/routes'
import { AppLayout } from './AppLayout'

/*
 * Cada página é carregada sob demanda (code splitting): o three.js da home,
 * por exemplo, não pesa no carregamento das outras páginas.
 */
export const router = createBrowserRouter([
  {
    path: routes.home,
    Component: AppLayout,
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
      {
        path: routes.prayers,
        lazy: () => import('@/features/prayers').then((m) => ({ Component: m.PrayersPage })),
      },
      {
        path: routes.sacraments,
        lazy: () => import('@/features/sacraments').then((m) => ({ Component: m.SacramentsPage })),
      },
      {
        path: routes.liturgicalYear,
        lazy: () => import('@/features/liturgical-year').then((m) => ({ Component: m.LiturgicalYearPage })),
      },
      {
        path: routes.confession,
        lazy: () => import('@/features/confession').then((m) => ({ Component: m.ConfessionPage })),
      },
      {
        path: routes.glossary,
        lazy: () => import('@/features/glossary').then((m) => ({ Component: m.GlossaryPage })),
      },
      {
        path: routes.trinity,
        lazy: () => import('@/features/trinity').then((m) => ({ Component: m.TrinityPage })),
      },
      {
        path: routes.roseNovena,
        lazy: () => import('@/features/rose-novena').then((m) => ({ Component: m.RoseNovenaPage })),
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
