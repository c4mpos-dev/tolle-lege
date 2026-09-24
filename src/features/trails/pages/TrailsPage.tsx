import { PageHeader } from '@/components/layout/PageHeader'
import { TrailGrid } from '../components/TrailGrid'

export function TrailsPage() {
  return (
    <>
      <title>Trilhas · Tolle Lege</title>
      <PageHeader
        eyebrow="Trilhas"
        title="Cada caminho começa de um lugar"
        description="Escolha a trilha que mais se parece com a sua história. Cada uma tem passos curtos, com algo concreto para fazer, e o seu progresso fica salvo neste navegador."
        glassSeed={11}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-10">
        <TrailGrid />
      </section>
    </>
  )
}
