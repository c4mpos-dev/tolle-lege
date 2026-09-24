import { Link } from 'react-router'
import { Rosette } from '@/components/ui/Rosette'
import { routes } from '@/config/routes'

export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to={routes.home}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 font-serif text-xl font-medium tracking-tight ${className}`}
    >
      <Rosette className="size-6 text-primary transition-transform duration-500 group-hover:rotate-45" />
      Tolle Lege
    </Link>
  )
}
