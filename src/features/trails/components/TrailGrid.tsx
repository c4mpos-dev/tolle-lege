import { Reveal } from '@/components/ui/Reveal'
import { trails } from '../data'
import { TrailCard } from './TrailCard'

export function TrailGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {trails.map((trail, index) => (
        <Reveal key={trail.id} delay={index * 0.08}>
          <TrailCard trail={trail} />
        </Reveal>
      ))}
    </div>
  )
}
