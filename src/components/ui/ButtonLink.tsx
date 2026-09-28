import { ArrowRight } from 'lucide-react'
import { Link, type LinkProps } from 'react-router'

type Variant = 'primary' | 'light' | 'text' | 'textLight'

const variants: Record<Variant, string> = {
  primary:
    'border border-ink bg-ink px-7 py-3.5 tracking-[0.14em] text-canvas uppercase shadow-[inset_0_0_0_3px_var(--color-ink),inset_0_0_0_4px_rgb(168_130_63/0.7)] hover:bg-primary-strong hover:shadow-[inset_0_0_0_3px_var(--color-primary-strong),inset_0_0_0_4px_rgb(250_247_240/0.5)] focus-visible:outline-ink',
  light:
    'border border-canvas bg-canvas px-7 py-3.5 tracking-[0.14em] text-ink uppercase shadow-[inset_0_0_0_3px_var(--color-canvas),inset_0_0_0_4px_rgb(168_130_63/0.7)] hover:bg-primary-soft hover:shadow-[inset_0_0_0_3px_var(--color-primary-soft),inset_0_0_0_4px_rgb(168_130_63/0.9)] focus-visible:outline-canvas',
  text: 'group text-ink hover:text-primary-strong focus-visible:outline-primary',
  textLight: 'group text-canvas hover:text-primary focus-visible:outline-primary',
}

type ButtonLinkProps = LinkProps & { variant?: Variant }

/** Link com aparência de botão. As variantes de texto incluem a seta animada. */
export function ButtonLink({ variant = 'primary', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-[color,background-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {(variant === 'text' || variant === 'textLight') && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  )
}
