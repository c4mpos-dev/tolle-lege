import type { SVGProps } from 'react'

/**
 * Marca do Tolle Lege ("toma e lê"): um livro aberto sob a cruz, dentro de um arco romano
 * como as janelas da igreja do site. Usa `currentColor` para o traço e `--logo-accent` (ouro) na cruz.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {/* Arco (porta/janela da igreja) */}
      <path d="M6.5 29V14.5a9.5 9.5 0 0 1 19 0V29" />
      {/* Cruz */}
      <path d="M16 8.5v8M12.75 11.5h6.5" stroke="var(--logo-accent, currentColor)" />
      {/* Livro aberto */}
      <path d="M16 21.2c-1.9-1.3-4.1-1.8-6.3-1.6v6.2c2.2-.2 4.4.3 6.3 1.6 1.9-1.3 4.1-1.8 6.3-1.6v-6.2c-2.2-.2-4.4.3-6.3 1.6Z" />
      <path d="M16 21.2v6.2" />
    </svg>
  )
}
