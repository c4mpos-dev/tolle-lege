import { PageHeader } from '@/components/layout/PageHeader'
import { CuriosityGrid } from '../components/CuriosityGrid'
import { curiosities } from '../data'

export function CuriositiesPage() {
  return (
    <>
      <title>Curiosidades · Tolle Lege</title>
      <PageHeader
        eyebrow="Curiosidades"
        title="Você sabia?"
        description="Histórias, palavras e símbolos por trás da fé católica. Toque em uma carta para descobrir a resposta."
        glassSeed={89}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-10">
        <CuriosityGrid items={curiosities} />
      </section>
    </>
  )
}
