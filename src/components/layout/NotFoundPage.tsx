import { ButtonLink } from '@/components/ui/ButtonLink'
import { StainedGlassWindow } from '@/components/ui/StainedGlassWindow'
import { routes } from '@/config/routes'

export function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <title>Página não encontrada · Tolle Lege</title>
      <StainedGlassWindow seed={404} className="w-32" />
      <p className="mt-10 text-xs font-semibold tracking-[0.25em] text-primary-strong uppercase">
        Erro 404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium text-ink">Esta página se perdeu</h1>
      <p className="mt-4 text-ink-muted">
        Mas, como na parábola da ovelha perdida, sempre há um caminho de volta.
      </p>
      <ButtonLink to={routes.home} className="mt-8">
        Voltar ao início
      </ButtonLink>
    </section>
  )
}
