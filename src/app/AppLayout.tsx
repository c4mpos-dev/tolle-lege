import { RootLayout } from '@/components/layout/RootLayout'
import { NovenaGreeting } from '@/features/rose-novena'

/** Layout raiz com os elementos sazonais do site (ex.: Novena das Rosas). */
export function AppLayout() {
  return (
    <RootLayout>
      <NovenaGreeting />
    </RootLayout>
  )
}
