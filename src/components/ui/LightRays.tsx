const BEAMS = [
  { left: '8%', width: '7rem', delay: '0s' },
  { left: '26%', width: '4rem', delay: '-3s' },
  { left: '44%', width: '9rem', delay: '-6s' },
  { left: '70%', width: '5rem', delay: '-1.5s' },
]

/** Feixes de luz diagonais e suaves, como sol entrando pelas janelas da nave. */
export function LightRays({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {BEAMS.map((beam) => (
        <div
          key={beam.left}
          className="absolute -top-1/4 h-[140%] origin-top rotate-[24deg] bg-linear-to-b from-primary-soft via-primary-soft/40 to-transparent blur-2xl motion-safe:animate-rays"
          style={{ left: beam.left, width: beam.width, animationDelay: beam.delay }}
        />
      ))}
    </div>
  )
}
