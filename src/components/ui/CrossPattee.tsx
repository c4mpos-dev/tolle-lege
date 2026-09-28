import type { SVGProps } from 'react'

/** Cruz pátea, a das iluminuras e dos selos antigos. Preenchida com `currentColor`. */
export function CrossPattee(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M9 1h6l-1.6 8.6L22 9v6l-8.6-.6L15 23H9l1.6-8.6L2 15V9l8.6.6Z" />
    </svg>
  )
}
