import { ArrowRight } from 'lucide-react'
import { Link, type LinkProps } from 'react-router'

type Variant = 'primary' | 'light' | 'text' | 'textLight'

const variants: Record<Variant, string> = {
  primary:
    'rounded-full bg-ink px-7 py-3.5 text-canvas shadow-sm hover:bg-primary-strong focus-visible:outline-ink',
  light:
    'rounded-full bg-canvas px-7 py-3.5 text-ink shadow-sm hover:bg-primary-soft focus-visible:outline-canvas',
  text: 'group text-ink hover:text-primary-strong focus-visible:outline-primary',
  textLight: 'group text-canvas hover:text-primary focus-visible:outline-primary',
}

type ButtonLinkProps = LinkProps & { variant?: Variant }

/** Link com aparência de botão. As variantes de texto incluem a seta animada. */
export function ButtonLink({ variant = 'primary', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {(variant === 'text' || variant === 'textLight') && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  )
}
