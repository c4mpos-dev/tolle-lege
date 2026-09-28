import { useId } from 'react'

const RAYS = 72

/** Raios alternados, longos e curtos, como no resplendor de um ostensório. */
const rays = Array.from({ length: RAYS }, (_, i) => {
  const angle = (i / RAYS) * Math.PI * 2
  const long = i % 2 === 0
  const r = long ? 100 : 74
  const spread = long ? 0.022 : 0.014
  const point = (a: number) => `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`
  return `0,0 ${point(angle - spread)} ${point(angle + spread)}`
})

/** Resplendor dourado: raios finos que se apagam na ponta. Herda o tamanho do contêiner. */
export function Resplendor({ className = '' }: { className?: string }) {
  const gradientId = useId()

  return (
    <svg viewBox="-100 -100 200 200" aria-hidden className={className}>
      <defs>
        <radialGradient id={gradientId} cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
          <stop offset="0.3" stopColor="#a8823f" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="#c59d55" stopOpacity="0.45" />
          <stop offset="1" stopColor="#c59d55" stopOpacity="0" />
        </radialGradient>
      </defs>
      {rays.map((points, i) => (
        <polygon key={i} points={points} fill={`url(#${gradientId})`} />
      ))}
    </svg>
  )
}
