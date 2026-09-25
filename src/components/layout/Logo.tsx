import { Link } from 'react-router'
import { LogoMark } from '@/components/ui/LogoMark'
import { routes } from '@/config/routes'

export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to={routes.home}
      onClick={onClick}
      aria-label="Tolle Lege, página inicial"
      className={`group inline-flex items-center gap-2.5 font-serif text-xl font-medium tracking-tight ${className}`}
    >
      <LogoMark className="size-8 transition-transform duration-500 [--logo-accent:var(--color-primary)] group-hover:-translate-y-0.5" />
      Tolle Lege
    </Link>
  )
}
