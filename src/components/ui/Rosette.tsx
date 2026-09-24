import type { SVGProps } from 'react'

/** Quadrifólio inspirado na rosácea da fachada da igreja. Herda a cor de `currentColor`. */
export function Rosette(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden {...props}>
      <path d="M7 7a5 5 0 0 1 10 0a5 5 0 0 1 0 10a5 5 0 0 1-10 0a5 5 0 0 1 0-10Z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Divisor ornamental: linha — rosácea — linha. */
export function RosetteDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-primary ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-primary/40" />
      <Rosette className="size-5" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-primary/40" />
    </div>
  )
}
