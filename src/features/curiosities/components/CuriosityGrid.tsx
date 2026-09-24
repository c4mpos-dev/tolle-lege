import { Reveal } from '@/components/ui/Reveal'
import type { Curiosity } from '../data'
import { CuriosityCard } from './CuriosityCard'

export function CuriosityGrid({ items }: { items: Curiosity[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((curiosity, index) => (
        <Reveal key={curiosity.id} delay={(index % 3) * 0.08}>
          <CuriosityCard curiosity={curiosity} />
        </Reveal>
      ))}
    </div>
  )
}
